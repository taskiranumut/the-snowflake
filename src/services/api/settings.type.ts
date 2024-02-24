export type RawSettingsData = {
  id: number;
  breakfast_price: number | null;
  max_booking_length: number | null;
  max_guest_num: number | null;
  min_booking_length: number | null;
};

export type SettingsData = {
  id: number;
  breakfastPrice: number | null;
  maxBookingLength: number | null;
  maxGuestNum: number | null;
  minBookingLength: number | null;
};
