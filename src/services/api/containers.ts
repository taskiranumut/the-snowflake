import supabase from '@/services/supabase';
import {
  convertRawContainerData,
  getImageInfo,
  getContainerPlaceholderImagePath,
} from '@/services/api/utils';
import {
  type DataContainer,
  type RawNewDataContainer,
  type ImageInfo,
} from '@/services/api/containers.types';

export async function getContainers(): Promise<DataContainer[]> {
  const { data, error } = await supabase.from('containers').select('*');

  if (error) {
    throw new Error('Containers could not be loaded!');
  }

  const containerData: DataContainer[] = convertRawContainerData(data);
  return containerData;
}

export async function deleteContainer(id: number): Promise<void> {
  const { error } = await supabase.from('containers').delete().eq('id', id);

  if (error) {
    throw new Error('Container could not be deleted!');
  }
}

export async function addNewContainer(
  newContainerData: RawNewDataContainer,
): Promise<DataContainer[]> {
  const imageInfo: ImageInfo = newContainerData.image
    ? getImageInfo(newContainerData.image)
    : { name: '', path: getContainerPlaceholderImagePath() };

  const { data, error } = await supabase
    .from('containers')
    .insert([{ ...newContainerData, image: imageInfo.path }])
    .select();

  if (error) {
    throw new Error('Containers could not be added!');
  }

  if (newContainerData.image) {
    const { error: storageError } = await supabase.storage
      .from('container_images')
      .upload(imageInfo.name, newContainerData.image);

    if (storageError) {
      await deleteContainer(data[0].id);
      throw new Error(
        'Container image could not be uploaded and the container was not added!',
      );
    }
  }

  return convertRawContainerData(data);
}
