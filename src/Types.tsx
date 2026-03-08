export interface IProducts {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  brand: string;
  image: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  color: string;
  size: string;
  releaseYear: number;
}

export interface IApiResponse {
  products: IProducts[];
}
