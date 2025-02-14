"use client";

import { useEffect } from "react";
import { usePaymentStore } from "@/store/paymentStore";
import { useSession } from "next-auth/react";
import PaymentButton from "@/app/components/PaymentButton";
import cartStore from "@/store/cartStore";

export default function PaymentPage() {
  const { setSnapToken } = usePaymentStore();
  const { data: session } = useSession();
  const totalPrice = cartStore.getState().getTotalPrice();

  useEffect(() => {
    async function fetchToken() {
      if (!session?.accessToken) {
        console.error("No access token available.");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/v1/payment/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.accessToken}`, // 🔥 Include the access token
          },
          body: JSON.stringify({
            orderId: `ORDER-${Date.now()}`,
            amount: totalPrice,
          }),
        });

        console.log("Total Price: ", totalPrice);

        if (!res.ok) {
          throw new Error(`Failed to fetch payment token: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Fetch Payment TOken: ", data.paymentUrl);


        if (data.paymentUrl) {
          setSnapToken(data.paymentUrl);
        }
      } catch (error) {
        console.error("Error fetching payment token:", error);
      }
    }
    console.log("Access Token:", session?.accessToken);
    fetchToken();
  }, [setSnapToken, session]);

  return (
    <div className="p-10">
      <PaymentButton />
      <div id="snap-container" className="h-[600px] w-full mt-6 bg-white shadow-lg"></div>
    </div>
  );
}
