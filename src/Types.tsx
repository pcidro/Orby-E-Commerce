export interface Reviews {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

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
  shippingInformation?: string;
  warrantyInformation?: string;
  availabilityStatus?: string;
  reviews?: Reviews[];
}

export interface IApiResponse {
  products: IProducts[];
  total: number;
  skip: number;
  limit: number;
}
