export interface GraphResponse {
  x: number;
  y: number;
}

export interface PopularProductResponse {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface SalesInfoCardResponse {
  income: number;
  percentage: number;
}

export interface SalesReportRequest {
  productId: number | null;
  categoryId: number | null;
  startDate: string;
  endDate: string;
  warehouseId: number | null;
}

export interface StockReportRequest {
  productId: number | null;
  startDate: string;
  endDate: string;
  warehouseId: number | null;
}

export interface SalesReportResponse {
  mutationOrderId: number;
  orderId: number;
  productId: number;
  productName: string;
  categoryName: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

export interface StockReportResponse {
  id: number;
  originName: string;
  destinationName: string;
  productId: number;
  productName: string;
  quantity: number;
  absQuantity: number;
  requesterName: string;
  processorName: string;
  remark: string;
  processedAt: string;
}