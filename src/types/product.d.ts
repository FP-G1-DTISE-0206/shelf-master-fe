export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  categories: CategoryResponse[];
}

export interface CategoryResponse {
  id: number;
  name: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  categories: number[];
}

export interface UpdateProductResponse {
  id: number;
  name: string;
  price: number;
  categories: number[];
}