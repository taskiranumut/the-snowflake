import {
  type DataContainer,
  type RawDataContainer,
  type ImageInfo,
} from '@/services/api/containers.types';
import {
  type RawSettingsData,
  type SettingsData,
} from '@/services/api/settings.type';
import { DataGuest, RawDataGuest } from '@/services/api/guests.types';
import {
  type RawDataBooking,
  type DataBooking,
} from '@/services/api/bookings.types';
import { v4 as uuidv4 } from 'uuid';

const containerImagesUrl = import.meta.env.VITE_SUPABASE_CONTAINER_IMAGES_URL;
const profilePicturesUrl = import.meta.env.VITE_SUPABASE_PROFILE_PICTURES_URL;

export function convertRawContainerData(data: RawDataContainer): DataContainer {
  return {
    id: data.id,
    name: data.name,
    maxCapacity: data.max_capacity,
    regularPrice: data.regular_price,
    discount: data.discount,
    description: data.description,
    image: data.image,
  };
}

export function convertRawSettingsData(data: RawSettingsData): SettingsData {
  return {
    breakfastPrice: data.breakfast_price,
    maxBookingLength: data.max_booking_length,
    maxGuestNum: data.max_guest_num,
    minBookingLength: data.min_booking_length,
  };
}

export function convertRawGuestData(data: RawDataGuest): DataGuest {
  return {
    id: data.id,
    countryFlag: data.country_flag,
    email: data.email,
    fullName: data.full_name,
    nationalId: data.national_id,
    nationality: data.nationality,
  };
}

export function convertRawBookingData(data: RawDataBooking): DataBooking {
  return {
    id: data.id,
    createdAt: data.created_at,
    containerId: data.container_id,
    containerPrice: data.container_price,
    endDate: data.end_date,
    extrasPrice: data.extras_price,
    guestId: data.guest_id,
    guestsNum: data.guests_num,
    hasBreakfast: data.has_breakfast,
    isPaid: data.is_paid,
    nigthsNum: data.nigths_num,
    observations: data.observations,
    startDate: data.start_date,
    status: data.status,
    totalPrice: data.total_price,
    guests: data.guests ? convertRawGuestData(data.guests) : null,
    containers: data.containers
      ? convertRawContainerData(data.containers)
      : null,
  };
}

export function getImageInfo(
  imageFile: File,
  urlKey: 'container' | 'profile',
): ImageInfo {
  const name = `${uuidv4()}-${imageFile?.name}`.replaceAll('/', '');

  const paths = {
    container: `${containerImagesUrl}${name}`,
    profile: `${profilePicturesUrl}${name}`,
  };

  return { name, path: paths[urlKey] };
}

export function getPlaceholderImagePath(urlKey: 'container' | 'profile') {
  const paths = {
    container: `${containerImagesUrl}default.png`,
    profile: `${profilePicturesUrl}default.jpg`,
  };

  return paths[urlKey];
}
