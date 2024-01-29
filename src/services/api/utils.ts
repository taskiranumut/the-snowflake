import {
  type DataContainer,
  type RawDataContainer,
} from '@/services/api/containers.types';

export function convertRawContainerData(
  data: RawDataContainer[],
): DataContainer[] {
  return data.map((rawData) => ({
    id: rawData.id,
    name: rawData.name,
    maxCapacity: rawData.max_capacity,
    regularPrice: rawData.regular_price,
    discount: rawData.discount,
    description: rawData.description,
    image: rawData.image,
  }));
}
