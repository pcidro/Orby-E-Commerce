export interface IProducts {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  images: string[];
}

export interface IApiResponse {
  products: IProducts[];
  total: number;
  skip: number;
  limit: number;
}
