import supabase from '@/services/supabase';
import { convertRawContainerData } from '@/services/api/utils';
import {
  type DataContainer,
  type RawNewDataContainer,
} from '@/services/api/containers.types';

export async function getContainers(): Promise<DataContainer[]> {
  const { data, error } = await supabase.from('containers').select('*');

  if (error) {
    console.error(error.message);
    throw new Error('Containers could not be loaded!');
  }

  const containerData: DataContainer[] = convertRawContainerData(data);
  return containerData;
}

export async function deleteContainer(id: number): Promise<void> {
  const { error } = await supabase.from('containers').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error('Container could not be deleted!');
  }
}

export async function addNewContainer(
  newContainerData: RawNewDataContainer,
): Promise<DataContainer[]> {
  const { data, error } = await supabase
    .from('containers')
    .insert([newContainerData])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error('Containers could not be added!');
  }

  const containerData: DataContainer[] = convertRawContainerData(data);
  return containerData;
}
