"use client";

import { useState } from "react";
import { usePaymentStore } from "@/store/paymentStore";
import { useSession } from "next-auth/react";
import PaymentButton from "@/app/(user)/payment/components/PaymentButton";
//import useCartStore from "@/store/cartStore";

const CheckoutPage = () => {
  const { snapToken, setSnapToken } = usePaymentStore();
  const { data: session } = useSession();
  //const totalAmount = useCartStore((state) => state.totalAmount);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = async () => {
    if (!session?.accessToken) {
      console.error("❌ No access token available.");
      setError("Please log in to proceed with the payment.");
      return;
    }

    /*if (totalAmount <= 0) {
      console.warn("⚠️ Total amount is 0. Cannot proceed with payment.");
      setError("Your cart is empty.");
      return;
    }*/

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:8080/api/v1/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          orderId: `ORDER-${Date.now()}`,
          //totalAmount: totalAmount,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to fetch payment token: ${errorData.message}`);
      }

      const data = await res.json();
      const transactionData = data.data.transactionToken;
      console.log("✅ Transaction Token:", transactionData);

      if (transactionData) {
        setSnapToken(transactionData);
      }
    } catch (error) {
      console.error("❌ Error fetching payment token:", error);
      setError("Failed to fetch payment token. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="text-lg mb-2">
        Total:{" "}
        <span className="font-semibold">
          Rp {/*totalAmount.toLocaleString("id-ID")*/}
        </span>
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={fetchToken} // ✅ Fetch token only when the button is clicked
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        } transition`}
      >
        {loading ? "Fetching..." : "Get Payment Token"}
      </button>

      {snapToken && <PaymentButton />}
    </div>
  );
};

export default CheckoutPage;

// "use client";

// import { useEffect, useState } from "react";
// import { usePaymentStore } from "@/store/paymentStore";
// import { useSession } from "next-auth/react";
// import PaymentButton from "@/app/components/PaymentButton";
// import useCartStore from "@/store/cartStore";

// const CheckoutPage = () => {
//   const { snapToken, setSnapToken } = usePaymentStore();
//   const { data: session } = useSession();
//   const totalAmount = useCartStore((state) => state.totalAmount); // ✅ Use total price from backend
//   const [loading, setLoading] = useState(false);

//   const fetchToken = async () => {
//     if (!session?.accessToken) {
//       console.error("❌ No access token available.");
//       return;
//     }

//     if (totalAmount <= 0) {
//       console.warn("⚠️ Total amount is 0, waiting for update...");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:8080/api/v1/payment/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.accessToken}`,
//         },
//         body: JSON.stringify({
//           orderId: `ORDER-${Date.now()}`,
//           amount: totalAmount, // ✅ Ensure backend-calculated total is used
//         }),
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch payment token: ${res.statusText}`);
//       }

//       const data = await res.json();
//       console.log("✅ Payment URL:", data.paymentUrl);

//       if (data.paymentUrl) {
//         setSnapToken(data.paymentUrl);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching payment token:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Automatically fetch payment token on page load
//   useEffect(() => {
//   if (!snapToken && !loading && totalAmount > 0) {
//     fetchToken();
//   }
// }, [snapToken, loading, totalAmount]); // ✅ Ensure fetch only happens when `totalAmount` is valid

//   return (
//     <div className="p-10">
//       <h2 className="text-2xl font-bold mb-4">Checkout</h2>
//       <p className="text-lg mb-2">Total: <span className="font-semibold">Rp {totalAmount.toLocaleString("id-ID")}</span></p>

//       {loading ? (
//         <p className="text-gray-500">Fetching payment token...</p>
//       ) : (
//         <PaymentButton />
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;

// "use client";

// import { useState } from "react";
// import { usePaymentStore } from "@/store/paymentStore";
// import { useSession } from "next-auth/react";
// import PaymentButton from "@/app/components/PaymentButton";
// import useCartStore from "@/store/cartStore";

// const CheckoutPage = () => {
//   const { snapToken, setSnapToken } = usePaymentStore();
//   const { data: session } = useSession();
//   const totalPrice = useCartStore((state) => state.getTotalPrice());
//   const [loading, setLoading] = useState(false);

//   const fetchToken = async () => {
//     if (!session?.accessToken) {
//       console.error("No access token available.");
//       return;
//     }

//     if (totalPrice <= 0) {
//       console.warn("Total price is 0, cannot create a payment.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:8080/api/v1/payment/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.accessToken}`,
//         },
//         body: JSON.stringify({
//           orderId: `ORDER-${Date.now()}`,
//           amount: totalPrice,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch payment token: ${res.statusText}`);
//       }

//       const data = await res.json();
//       console.log("Payment URL:", data.paymentUrl);

//       if (data.paymentUrl) {
//         setSnapToken(data.paymentUrl);
//       }
//     } catch (error) {
//       console.error("Error fetching payment token:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Automatically fetch token when the page loads
//   if (!snapToken && !loading) {
//     fetchToken();
//   }

//   return (
//     <div className="p-10">
//       {loading ? (
//         <p className="text-gray-500">Fetching payment token...</p>
//       ) : (
//         <PaymentButton />
//       )}
//     </div>
//   );
// }

// export default CheckoutPage;

// "use client";

// import { useState } from "react";
// import { usePaymentStore } from "@/store/paymentStore";
// import { useSession } from "next-auth/react";
// import PaymentButton from "@/app/components/PaymentButton";
// import useCartStore from "@/store/cartStore";

// export default function PaymentPage() {
//   const { setSnapToken } = usePaymentStore();
//   const { data: session } = useSession();
//   const totalPrice = useCartStore((state) => state.getTotalPrice());
//   const [loading, setLoading] = useState(false);

//   const fetchToken = async () => {
//     if (!session?.accessToken) {
//       console.error("No access token available.");
//       return;
//     }

//     if (totalPrice <= 0) {
//       console.warn("Total price is 0, cannot create a payment.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:8080/api/v1/payment/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.accessToken}`,
//         },
//         body: JSON.stringify({
//           orderId: `ORDER-${Date.now()}`,
//           amount: totalPrice,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch payment token: ${res.statusText}`);
//       }

//       const data = await res.json();
//       console.log("Payment URL:", data.paymentUrl);

//       if (data.paymentUrl) {
//         setSnapToken(data.paymentUrl);
//       }
//     } catch (error) {
//       console.error("Error fetching payment token:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-10">
//       <button
//         onClick={fetchToken}
//         className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//       >
//         Generate Payment Token
//       </button>

//       {loading ? (
//         <p className="text-gray-500">Fetching payment token...</p>
//       ) : (
//         <PaymentButton />
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { usePaymentStore } from "@/store/paymentStore";
// import { useSession } from "next-auth/react";
// import PaymentButton from "@/app/components/PaymentButton";
// import useCartStore from "@/store/cartStore"; // ✅ Use Zustand Hook

// export default function PaymentPage() {
//   const { setSnapToken } = usePaymentStore();
//   const { data: session } = useSession();
//   const totalPrice = useCartStore((state) => state.getTotalPrice()); // ✅ Reactive state
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchToken() {
//       if (!session?.accessToken) {
//         console.error("No access token available.");
//         return;
//       }

//       if (totalPrice <= 0) {
//         console.warn("Total price is 0, cannot create a payment.");
//         return;
//       }

//       try {
//         setLoading(true);
//         const res = await fetch("http://localhost:8080/api/v1/payment/create", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${session.accessToken}`, // ✅ Include the access token
//           },
//           body: JSON.stringify({
//             orderId: `ORDER-${Date.now()}`,
//             amount: totalPrice, // ✅ Uses the latest total price dynamically
//           }),
//         });

//         if (!res.ok) {
//           throw new Error(`Failed to fetch payment token: ${res.statusText}`);
//         }

//         const data = await res.json();
//         console.log("Payment URL:", data.paymentUrl);

//         if (data.paymentUrl) {
//           setSnapToken(data.paymentUrl);
//         }
//       } catch (error) {
//         console.error("Error fetching payment token:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchToken();
//   }, [setSnapToken, session, totalPrice]);

//   return (
//     <div className="p-10">
//       {loading ? (
//         <p className="text-gray-500">Fetching payment token...</p>
//       ) : (
//         <>
//           <PaymentButton />
//         </>
//       )}
//     </div>
//   );
// }
