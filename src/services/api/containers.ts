import supabase from '@/services/supabase';
import { DataContainer } from '@/services/api/containers.types';

export async function getContainers(): Promise<DataContainer[]> {
  const { data, error } = await supabase.from('containers').select('*');

  if (error) {
    throw new Error(`Containers could not be loaded! -> ${error.message}`);
  }

  const containerData: DataContainer[] = data.map((rawData) => ({
    id: rawData.id,
    name: rawData.name,
    maxCapacity: rawData.max_capacity,
    regularPrice: rawData.regular_price,
    discount: rawData.discount,
    description: rawData.description,
    image: rawData.image,
  }));

  return containerData;
}

export async function deleteContainer(id: number): Promise<void> {
  const { error } = await supabase.from('containers').delete().eq('id', id);

  if (error) {
    throw new Error(`Container could not be deleted! -> ${error.message}`);
  }
}
