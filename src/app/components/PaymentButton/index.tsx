"use client";

import { usePaymentStore } from "@/store/paymentStore";
import { useEffect, useState } from "react";

export default function PaymentButton() {
  const { snapToken } = usePaymentStore();
  const [snapLoaded, setSnapLoaded] = useState(false);

  useEffect(() => {
    const checkSnap = setInterval(() => {
      if (window.snap) {
        setSnapLoaded(true);
        clearInterval(checkSnap);
      }
    }, 500);

    return () => clearInterval(checkSnap);
  }, []);

  const handlePayment = () => {
    if (!snapToken) {
      alert("No transaction token available!");
      return;
    }

    console.log("Snap Token:", snapToken);

    if (!snapLoaded) {
      alert("Snap.js is still loading. Please wait.");
      return;
    }

    if (typeof window.snap !== "undefined") {
      window.snap.embed(snapToken, { embedId: "snap-container" });
    } else {
      console.error("window.snap is undefined");
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Pay Now
      </button>
      <div id="snap-container" className="h-[600px]"></div>
    </div>
  );
}
