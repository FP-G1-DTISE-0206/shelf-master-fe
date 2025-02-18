"use client";

import { useState } from "react";
import { usePaymentStore } from "@/store/paymentStore";
import { useSession } from "next-auth/react";
import PaymentButton from "@/app/components/PaymentButton";
import useCartStore from "@/store/cartStore";

export default function PaymentPage() {
  const { snapToken, setSnapToken } = usePaymentStore();
  const { data: session } = useSession();
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const [loading, setLoading] = useState(false);

  const fetchToken = async () => {
    if (!session?.accessToken) {
      console.error("No access token available.");
      return;
    }

    if (totalPrice <= 0) {
      console.warn("Total price is 0, cannot create a payment.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/v1/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          orderId: `ORDER-${Date.now()}`,
          amount: totalPrice,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch payment token: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Payment URL:", data.paymentUrl);

      if (data.paymentUrl) {
        setSnapToken(data.paymentUrl);
      }
    } catch (error) {
      console.error("Error fetching payment token:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Automatically fetch token when the page loads
  if (!snapToken && !loading) {
    fetchToken();
  }

  return (
    <div className="p-10">
      {loading ? (
        <p className="text-gray-500">Fetching payment token...</p>
      ) : (
        <PaymentButton />
      )}
    </div>
  );
}


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
