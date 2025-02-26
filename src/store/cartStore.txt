import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  description: string;
}

interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
  totalItems: number;
  transactionToken: string | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  sendCartToBackend: () => Promise<void>;
  initiatePayment: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      totalAmount: 0,
      totalItems: 0,
      transactionToken: null,

      addToCart: (item: CartItem) => {
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (cartItem) => cartItem.id === item.id
          );

          let updatedCart;
          if (existingItemIndex > -1) {
            updatedCart = [...state.cartItems];
            updatedCart[existingItemIndex].quantity += item.quantity;
          } else {
            updatedCart = [...state.cartItems, item];
          }

          console.log("Cart Updated:", updatedCart);
          return { cartItems: updatedCart };
        });

        setTimeout(() => {
          get().sendCartToBackend();
        }, 100);
      },

      // sendCartToBackend: async () => {
      //   const cartItems = get().cartItems;
      //   if(cartItems.length === 0){
      //     console.log("Cart is empty. Now request sent.");
      //     return;
      //   }

      //   try {
      //     const response = await axios.post(
      //       "http://localhost:8080/api/v1/cart/calculate-total",
      //       { cartItems }
      //     );
      //     console.log("Total Price from Backend:", response.data.data);
      //   } catch(error){
      //     console.error("Error sending cart to backend:", error);
      //   }
      // },

      sendCartToBackend: async () => {
        const cartItems = get().cartItems;
        if (cartItems.length === 0) {
          console.log("Cart is empty. No request sent.");
          set({ totalAmount: 0, totalItems: 0 });
          return;
        }
      
        // Get Bearer Token from NextAuth session
        const session = await getSession();
        const token = session?.accessToken; // Ensure token is available
      
        if (!token) {
          console.error("❌ No authentication token found. Please log in.");
          return;
        }
      
        console.log("Sending Cart Data to Backend:", JSON.stringify({ cartItems }, null, 2));
      
        try {
          const response = await axios.post(
            "http://localhost:8080/api/v1/product/calculate-total",
            { cartItems },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach Bearer Token dynamically
                "Content-Type": "application/json",
              },
            }
          );
      
          console.log("✅ Total Price from Backend:", response.data.totalPrice);
          console.log("✅ Total Items from Backend:", response.data.totalItems);
          
          set({ 
            totalAmount: response.data.totalPrice,
            totalItems: response.data.totalItems 
          });
      
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error("❌ Axios Error sending cart to backend:", error.message);
            
            if (error.response) {
              console.error("⚠️ Backend Response:", error.response.data);
            }
          } else if (error instanceof Error) {
            console.error("❌ General Error:", error.message);
          } else {
            console.error("❌ Unknown Error:", error);
          }
        }
      },

      initiatePayment: async () => {
        const { cartItems, totalAmount } = get();

        if (!cartItems.length) {
          console.error("⚠️ Cannot initiate payment. Cart is empty.");
          return;
        }

        const session = await getSession();
        const token = session?.accessToken;

        if (!token) {
          console.error("❌ No authentication token found. Please log in.");
          return;
        }

        console.log("💰 Initiating Payment with Amount:", totalAmount);

        try {
          const response = await axios.post(
            "http://localhost:8080/api/v1/payment/create",
            { cartItems, totalAmount },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            const { transactionToken } = response.data.data;
            console.log("✅ Payment Token Received:", transactionToken);

            set({ transactionToken });

            // Load Midtrans Snap.js
            const snapScript = document.createElement("script");
            snapScript.src = "https://app.sandbox.midtrans.com/snap/snap.js";
            snapScript.setAttribute("data-client-key", "YOUR_CLIENT_KEY");
            document.body.appendChild(snapScript);

            snapScript.onload = () => {
              window.snap?.pay(transactionToken, {
                onSuccess: function (result: any) {
                  console.log("🎉 Payment Success:", result);
                },
                onPending: function (result: any) {
                  console.log("⌛ Payment Pending:", result);
                },
                onError: function (error: any) {
                  console.error("❌ Payment Failed:", error);
                },
                onClose: function () {
                  console.warn("⚠️ Payment popup closed.");
                },
              });
            };
          }
        } catch (error: any) {
          console.error("❌ Error initiating payment:", error.response?.data || error.message);
        }
      },
      
      updateQuantity: (id: number, quantity: number) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));

        setTimeout(() => {
          get().sendCartToBackend();
        }, 100);
      },

      removeFromCart: (id: number) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));

        setTimeout(() => {
          get().sendCartToBackend();
        }, 100);
      },
      

  
      

      getTotalItems: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0),

      // clearCart: () => set({ cartItems: [] }),

      clearCart: () => {
        console.log("🛒 Cart Cleared");
        set({ cartItems: [], totalAmount: 0 });
      },
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
