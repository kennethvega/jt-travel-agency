import { ImageType } from './productTypes';

export type CustomerType = {
  _id: string;
  name: string;
  message: string;
  image: ImageType;
  createdAt: string;
  updatedAt: string;
  __V: number;
};

export type Customer = {
  name: string;
  message: string;
  image: ImageType;
};
