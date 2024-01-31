export type RawDataContainer = {
  id: number;
  name: string | null;
  max_capacity: number | null;
  regular_price: number | null;
  discount: number | null;
  description: string | null;
  image: string | null;
};

export type DataContainer = {
  id: number;
  name: string | null;
  maxCapacity: number | null;
  regularPrice: number | null;
  discount: number | null;
  description: string | null;
  image: string | null;
};

export type RawNewDataContainer = {
  name: string | null;
  max_capacity: number | null;
  regular_price: number | null;
  discount: number | null;
  description: string | null;
  image: File | null;
};

export type ImageInfo = {
  name: string;
  path: string;
};
