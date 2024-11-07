import { CategoryType } from "./CategoryType";

export interface productType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountpercentage: number;
  stock: number;
  brand: string;
  thumbnail: string;
  categories: CategoryType[];
  rating?: number;
  images?: string[];
}

export interface cartProduct {
  id: number;
  title: string;
  price: number;
  stock: number;
  quantity: number;
  discountpercentage: number;
  brand: string;
  thumbnail: string;
}