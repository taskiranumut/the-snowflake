import supabase from '@/services/supabase';
import {
  convertRawContainerData,
  getImageInfo,
  getPlaceholderImagePath,
} from '@/services/api/utils';
import {
  type DataContainer,
  type RawNewDataContainerWithImageFile,
  type RawNewDataContainerWithImagePath,
  type RawNewDataContainer,
  type ImageInfo,
} from '@/services/api/containers.types';
import { t } from 'i18next';

export async function getContainers(): Promise<DataContainer[]> {
  const { data, error } = await supabase.from('containers').select('*');

  if (error) {
    throw new Error(t('message.api.containers.getContainers.error'));
  }

  return data.map((item) => convertRawContainerData(item));
}

export async function deleteContainer(id: number): Promise<void> {
  const { error } = await supabase.from('containers').delete().eq('id', id);

  if (error) {
    throw new Error(t('message.api.containers.deleteContainer.error'));
  }
}

export async function addNewContainer(
  newContainerData: RawNewDataContainerWithImageFile,
): Promise<DataContainer[]> {
  const imageInfo: ImageInfo = newContainerData.image
    ? getImageInfo(newContainerData.image, 'container')
    : { name: '', path: getPlaceholderImagePath('container') };

  const { data, error } = await supabase
    .from('containers')
    .insert([{ ...newContainerData, image: imageInfo.path }])
    .select();

  if (error) {
    throw new Error(
      t('message.api.containers.addNewContainer.error.container'),
    );
  }

  if (newContainerData.image) {
    const { error: storageError } = await supabase.storage
      .from('container_images')
      .upload(imageInfo.name, newContainerData.image);

    if (storageError) {
      await deleteContainer(data[0].id);
      throw new Error(t('message.api.containers.addNewContainer.error.image'));
    }
  }

  return data.map((item) => convertRawContainerData(item));
}

export async function editContainer({
  newContainerData,
  id,
}: {
  newContainerData: RawNewDataContainerWithImageFile;
  id: number;
}): Promise<DataContainer[]> {
  let containerData: RawNewDataContainer | RawNewDataContainerWithImagePath;
  let imageInfo: ImageInfo = { name: '', path: '' };

  if (newContainerData.image) {
    imageInfo = getImageInfo(newContainerData.image, 'container');
    containerData = { ...newContainerData, image: imageInfo.path };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image: _, ...rest } = newContainerData;
    containerData = rest;
  }

  const { data, error } = await supabase
    .from('containers')
    .update(containerData)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(t('message.api.containers.editContainer.error.container'));
  }

  if (newContainerData.image) {
    const { error: storageError } = await supabase.storage
      .from('container_images')
      .upload(imageInfo.name, newContainerData.image);

    if (storageError) {
      throw new Error(t('message.api.containers.editContainer.error.image'));
    }
  }

  return data.map((item) => convertRawContainerData(item));
}

export async function dupliateContainer(
  newContainerData: RawNewDataContainerWithImagePath,
): Promise<DataContainer[]> {
  const { data, error } = await supabase
    .from('containers')
    .insert([newContainerData])
    .select();

  if (error) {
    throw new Error(t('message.api.containers.dupliateContainer.error'));
  }

  return data.map((item) => convertRawContainerData(item));
}
