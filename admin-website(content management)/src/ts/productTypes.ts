export type ProductType = {
  _id: string;
  country: string;
  city: string;
  price: string;
  description: string;
  image: ImageType | null;
  date: string;
  createdAt: string;
  updatedAt: string;
  __V: number;
};

export type ImageType = {
  public_id: string;
  fileName: string;
  imageURL: string;
  fileType: string;
  fileSize: string;
};

export type Product = {
  country: string;
  city: string;
  price: string;
  description: string;
  image: ImageType | null;
  date: string;
};
