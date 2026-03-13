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
  sizes: string[];
  size: string;
  releaseYear: number;
}

export interface IApiResponse {
  products: IProducts[];
}

export interface FormData {
  nome: string;
  cep: string;
  endereco: string;
  numero: string;
  telnumber: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
}
