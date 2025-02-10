import { CategoryResponse } from "@/types/category";

export interface CreateProductRequest {
  sku: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  categories: number[];
  images: string[];
}

export interface UpdateProductRequest {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  categories: number[];
  images: string[];
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface DetailProductResponse {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  categories: CategoryResponse[];
  images: ProductImageResponse[];
}

export interface CreateProductResponse {
  id: number;
  name: string;
}

export interface UpdateProductResponse {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  categories: CategoryResponse[];
  images: ProductImageResponse[];
}

export interface ProductImageResponse {
  id: number;
  imageUrl: string;
}
