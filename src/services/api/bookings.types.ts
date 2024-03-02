import {
  DataContainer,
  RawDataContainer,
} from '@/services/api/containers.types';
import { DataGuest, RawDataGuest } from '@/services/api/guests.types';

export type RawDataBooking = {
  id: number;
  created_at: string;
  container_id: number | null;
  container_price: number | null;
  end_date: string | null;
  extras_price: number | null;
  guest_id: number | null;
  guests_num: number | null;
  has_breakfast: boolean | null;
  is_paid: boolean | null;
  nigths_num: number | null;
  observations: string | null;
  start_date: string | null;
  status: string | null;
  total_price: number | null;
  containers: RawDataContainer | null;
  guests: RawDataGuest | null;
};

export type DataBooking = {
  id: number;
  createdAt: string;
  containerId: number | null;
  containerPrice: number | null;
  endDate: string | null;
  extrasPrice: number | null;
  guestId: number | null;
  guestsNum: number | null;
  hasBreakfast: boolean | null;
  isPaid: boolean | null;
  nigthsNum: number | null;
  observations: string | null;
  startDate: string | null;
  status: string | null;
  totalPrice: number | null;
  containers: DataContainer | null;
  guests: DataGuest | null;
};
