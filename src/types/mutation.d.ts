export interface ProductMutationResponse {
  id: number,
  originType: string,
  destinationType: string,
  originId: number
  destinationId: number,
  productId: number,
  productName: string,
  quantity: number,
  requesterId: number,
  requesterName: string,
  processorId: number,
  processorName: string,
  isApproved: boolean,
}

export interface MutationTypeResponse {
  id: number,
  originType: string,
  destinationType: string,
}

export interface ProductMutationLogResponse {
  id: number,
  status: string,
  createdAt: Date,
}

export interface InternalProductMutationRequest {
  productId: number,
  warehouseOriginId: number,
  warehouseDestinationId: number,
  quantity: number,
}

export interface AddProductStockRequest {
  productId: number,
  warehouseId: number,
  vendorId: number,
  quantity: number,
}