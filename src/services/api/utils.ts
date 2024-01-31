import {
  type DataContainer,
  type RawDataContainer,
  type ImageInfo,
} from '@/services/api/containers.types';
import { v4 as uuidv4 } from 'uuid';

const containerImagesUrl = import.meta.env.VITE_SUPABASE_CONTAINER_IMAGES_URL;

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

export function getImageInfo(imageFile: File): ImageInfo {
  const name = `${uuidv4()}-${imageFile?.name}`.replaceAll('/', '');
  const path = `${containerImagesUrl}${name}`;
  return { name, path };
}

export function getContainerPlaceholderImagePath() {
  return `${containerImagesUrl}default-placeholder.png`;
}
