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
  [key: string]: string | number | boolean | null;
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
};

export type RawNewDataContainerWithImageFile = RawNewDataContainer & {
  image: File | null;
};

export type RawNewDataContainerWithImagePath = RawNewDataContainer & {
  image: string | null;
};

export type ImageInfo = {
  name: string;
  path: string;
};
