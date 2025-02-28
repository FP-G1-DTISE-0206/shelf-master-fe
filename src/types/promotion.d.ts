export interface PromotionRequest {
  title: string;
  description: string;
  imageUrl: string;
  productUrl: string;
}

export interface PromotionResponse {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  productUrl: string;
}
