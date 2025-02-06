import { CategoryResponse } from "@/types/category";

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  categories: CategoryResponse[];
}

export interface CreateProductRequest {
  name: string;
  price: number;
  categories: number[];
}

export interface UpdateProductRequest {
  id: number;
  name: string;
  price: number;
  categories: number[];
}