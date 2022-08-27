export interface IProduct {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
  quantity: number | any;
}

export interface ICart {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
  quantity?: number | any;
}

interface Rating {
  rate: number;
  count: number;
}
