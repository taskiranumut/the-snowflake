import {
  type DataContainer,
  type RawDataContainer,
  type ImageInfo,
} from '@/services/api/containers.types';
import {
  type RawSettingsData,
  type SettingsData,
} from '@/services/api/settings.type';
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

export function convertRawSettingsData(data: RawSettingsData): SettingsData {
  return {
    id: data.id,
    breakfastPrice: data.breakfast_price,
    maxBookingLength: data.max_booking_length,
    maxGuestNum: data.max_guest_num,
    minBookingLength: data.min_booking_length,
  };
}

export function getImageInfo(imageFile: File): ImageInfo {
  const name = `${uuidv4()}-${imageFile?.name}`.replaceAll('/', '');
  const path = `${containerImagesUrl}${name}`;
  return { name, path };
}

export function getContainerPlaceholderImagePath() {
  return `${containerImagesUrl}default-placeholder.png`;
}
