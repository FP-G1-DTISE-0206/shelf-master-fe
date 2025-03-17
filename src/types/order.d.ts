export interface OrderRequest {
  addressId: number;
  paymentMethodId: number;
  warehouseId: number;
  shippingCost: number; 
  shippingMethod: string; 
}

export interface OrderItemResponse {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    sku: string;
  };
  quantity: number;
  totalPrice: number;
}

export interface UserResponse {
  id: number;
  email: string;
  userName: string;
}

export interface WarehouseResponse {
  id: number;
  name: string;
}

export interface OrderResponse {
  orderId: number;
  user: UserResponse;
  latestStatus: string;
  paymentMethod: string;
  isPaid: boolean;
  totalPrice: number;
  finalPrice: number;
  addressId: number;
  warehouse: WarehouseResponse;
  shippingCost: number;
  shippingMethod: string;
  midtransTokenUrl?: string | null; 
  manualTransferProof?: string | null; 
  orderItems: OrderItemResponse[];
}

