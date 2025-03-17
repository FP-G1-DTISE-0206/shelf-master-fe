import axios from "axios";
import { OrderRequest, OrderResponse } from "@/types/order";
import { useAddressStore } from "@/store/addressStore";
import { useWarehouseStore } from "@/store/warehouseStore";
import { useShippingStore } from "@/store/shippingStore";
import { usePaymentStore } from "@/store/paymentStore";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`;

const getAuthHeaders = (token: string | undefined) => {
  if (!token) throw new Error("User is not authenticated");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

//Fetch Orders
export const getOrders = async (token: string): Promise<OrderResponse[]> => {
  console.log("Fetching orders...");
  const response = await axios.get(API_URL, getAuthHeaders(token));
  console.log("Orders Retrieved:", response.data);
  return response.data.data; // Extracting order list
};

// Create Order
export const createOrder = async (token: string): Promise<OrderResponse> => {
  // Fetch persisted data from Zustand stores
  const { addressId } = useAddressStore.getState(); // Get persisted address ID
  const { warehouseId } = useWarehouseStore.getState(); // Get persisted warehouse ID
  const { choosenShippingCost, choosenCourierId } = useShippingStore.getState(); // Get persisted shipping cost & courier ID
  const { choosenPaymentMethod } = usePaymentStore.getState(); // Get persisted payment method

  
  const fixedAddressId = addressId ?? 0; 
  const fixedPaymentMethodId = choosenPaymentMethod ?? 0; 
  const fixedWarehouseId = warehouseId ?? 0; 
  const fixedShippingCost = choosenShippingCost ?? 0; 

  // Prepare request payload
  const orderRequest: OrderRequest = {
    addressId: fixedAddressId, 
    paymentMethodId: fixedPaymentMethodId, 
    warehouseId: fixedWarehouseId, 
    shippingCost: fixedShippingCost, 
    shippingMethod: choosenCourierId || "N/A", 
  };

  console.log("Sending Order Request:", orderRequest);
  
  // Send POST request to create an order
  const response = await axios.post(API_URL, orderRequest, getAuthHeaders(token));

  console.log("Order Created Successfully:", response.data);
  return response.data;
};


// import { useAddressStore } from "@/store/addressStore";
// import { useWarehouseStore } from "@/store/warehouseStore";
// import { useShippingStore } from "@/store/shippingStore";
// import { usePaymentStore } from "@/store/paymentStore";

// const { addressId } = useAddressStore.getState(); // Get persisted address ID
// const { warehouseId } = useWarehouseStore.getState(); // Get persisted warehouse ID
// const { choosenShippingCost, choosenCourierId } = useShippingStore.getState(); // Get persisted shipping cost & courier ID
// const { choosenPaymentMethod } = usePaymentStore.getState(); 

// const orderRequest = {
//   addressId: addressId, // Use persisted address ID
//   paymentMethodId: choosenPaymentMethod, // Replace with selected payment method
//   warehouseId: warehouseId, // Use persisted warehouse ID
//   shippingCost: choosenShippingCost, // Use persisted shipping cost
//   courierId: choosenCourierId, //Use persisted courier ID
// };

// console.log("Sending Order Request:", orderRequest);
