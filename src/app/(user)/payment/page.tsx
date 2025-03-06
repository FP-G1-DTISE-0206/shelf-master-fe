import Link from "next/link";

const PaymentPage = () => {
  return (
    <>
      <h1>This is Payment Page</h1>
      {/* Your Order */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
        <div className="w-full h-auto rounded-2xl bg-shelf-white lg:w-[100%] mb-6 p-4 lg:p-6 lg:col-span-2">
          <div className="lg:pb-4">
            <h3 className="text-xl lg:text-3xl lg:pb-2 font-semibold">
              Checkout
            </h3>
            <h4 className="text-[14px] lg:text-xl mb-2">Your Address</h4>
            <div className="p-5 border-2 border-shelf-light-grey rounded-3xl">
              <p className="font-semibold text-base text-shelf-blue">
                Home - Noah Anderson
              </p>
              <p className="text-base">
                Jln. Anggrek Cendrawasih II, No.14, Slipi, Palmerah, Jakarta
                Barat, DKI Jakarta, 081916362256
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] lg:text-xl mb-2">Your Product</h4>
          </div>
        </div>

        {/* Payment */}
        <div className="w-full h-auto rounded-2xl bg-shelf-black p-4 lg:grow-3 space-y-10">
          <div>
            <Link href="/payment">
              <button className="bg-shelf-blue mt-4 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
                PAY NOW
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;

// "use client";

// import { useState } from "react";
// import { usePaymentStore } from "@/store/paymentStore";
// import { useSession } from "next-auth/react";
// import PaymentButton from "@/app/(user)/payment/components/PaymentButton";
// import useCartStore from "@/store/cartStore";

// export default function PaymentPage() {
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

// // "use client";

// // import { useState } from "react";
// // import { usePaymentStore } from "@/store/paymentStore";
// // import { useSession } from "next-auth/react";
// // import PaymentButton from "@/app/components/PaymentButton";
// // import useCartStore from "@/store/cartStore";

// // export default function PaymentPage() {
// //   const { setSnapToken } = usePaymentStore();
// //   const { data: session } = useSession();
// //   const totalPrice = useCartStore((state) => state.getTotalPrice());
// //   const [loading, setLoading] = useState(false);

// //   const fetchToken = async () => {
// //     if (!session?.accessToken) {
// //       console.error("No access token available.");
// //       return;
// //     }

// //     if (totalPrice <= 0) {
// //       console.warn("Total price is 0, cannot create a payment.");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const res = await fetch("http://localhost:8080/api/v1/payment/create", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${session.accessToken}`,
// //         },
// //         body: JSON.stringify({
// //           orderId: `ORDER-${Date.now()}`,
// //           amount: totalPrice,
// //         }),
// //       });

// //       if (!res.ok) {
// //         throw new Error(`Failed to fetch payment token: ${res.statusText}`);
// //       }

// //       const data = await res.json();
// //       console.log("Payment URL:", data.paymentUrl);

// //       if (data.paymentUrl) {
// //         setSnapToken(data.paymentUrl);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching payment token:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-10">
// //       <button
// //         onClick={fetchToken}
// //         className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
// //       >
// //         Generate Payment Token
// //       </button>

// //       {loading ? (
// //         <p className="text-gray-500">Fetching payment token...</p>
// //       ) : (
// //         <PaymentButton />
// //       )}
// //     </div>
// //   );
// // }

// // "use client";

// // import { useEffect, useState } from "react";
// // import { usePaymentStore } from "@/store/paymentStore";
// // import { useSession } from "next-auth/react";
// // import PaymentButton from "@/app/components/PaymentButton";
// // import useCartStore from "@/store/cartStore"; // ✅ Use Zustand Hook

// // export default function PaymentPage() {
// //   const { setSnapToken } = usePaymentStore();
// //   const { data: session } = useSession();
// //   const totalPrice = useCartStore((state) => state.getTotalPrice()); // ✅ Reactive state
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     async function fetchToken() {
// //       if (!session?.accessToken) {
// //         console.error("No access token available.");
// //         return;
// //       }

// //       if (totalPrice <= 0) {
// //         console.warn("Total price is 0, cannot create a payment.");
// //         return;
// //       }

// //       try {
// //         setLoading(true);
// //         const res = await fetch("http://localhost:8080/api/v1/payment/create", {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${session.accessToken}`, // ✅ Include the access token
// //           },
// //           body: JSON.stringify({
// //             orderId: `ORDER-${Date.now()}`,
// //             amount: totalPrice, // ✅ Uses the latest total price dynamically
// //           }),
// //         });

// //         if (!res.ok) {
// //           throw new Error(`Failed to fetch payment token: ${res.statusText}`);
// //         }

// //         const data = await res.json();
// //         console.log("Payment URL:", data.paymentUrl);

// //         if (data.paymentUrl) {
// //           setSnapToken(data.paymentUrl);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching payment token:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchToken();
// //   }, [setSnapToken, session, totalPrice]);

// //   return (
// //     <div className="p-10">
// //       {loading ? (
// //         <p className="text-gray-500">Fetching payment token...</p>
// //       ) : (
// //         <>
// //           <PaymentButton />
// //         </>
// //       )}
// //     </div>
// //   );
// // }
