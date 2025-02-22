"use client";

import { useEffect, useState } from "react";
import { usePaymentStore } from "@/store/paymentStore";

// Define global `snap` type properly
declare global {
  interface Window {
    snap?: {
      embed: (token: string, options: { embedId: string }) => void;
      pay: (token: string, options?: Record<string, unknown>) => void;
    };
  }
}

export default function PaymentButton() {
  const { snapToken } = usePaymentStore();

  useEffect(() => {
    if (snapToken && typeof window !== "undefined" && window.snap) {
      console.log("Embedding Snap.js with token:", snapToken);
      window.snap.embed(snapToken, { embedId: "snap-container" });
    }
  }, [snapToken]);

  return (
    <div>
      {!snapToken ? (
        <p className="text-gray-500">Waiting for payment token...</p>
      ) : (
        <div id="snap-container" className="h-[600px]"></div>
      )}
    </div>
  );
}



// "use client";

// import { usePaymentStore } from "@/store/paymentStore";

// export default function PaymentButton() {
//   const { snapToken, isSnapEmbedded, setSnapEmbedded } = usePaymentStore();

//   const handlePayment = () => {
//     if (!snapToken) {
//       alert("No transaction token available!");
//       return;
//     }

//     if (typeof window === "undefined" || !(window as any).snap) {
//       alert("Snap.js is not loaded yet. Please wait.");
//       return;
//     }

//     if (!isSnapEmbedded) {
//       console.log("Embedding Snap for the first time...");
//       // (window as any).snap.embed(snapToken, { embedId: "snap-container" });
//       setSnapEmbedded(true);
//     } else {
//       console.warn("Snap is already embedded.");
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handlePayment}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//       >
//         Pay Now
//       </button>
//       <div id="snap-container" className="h-[600px]"></div>
//     </div>
//   );
// }


// "use client";

// import { usePaymentStore } from "@/store/paymentStore";
// import { useEffect, useState } from "react";

// export default function PaymentButton() {
//   const { snapToken } = usePaymentStore();
//   const [snapLoaded, setSnapLoaded] = useState(false);
//   const [isSnapEmbedded, setIsSnapEmbedded] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined" && (window as any).snap) {
//       setSnapLoaded(true);
//     }

//     const checkSnap = setInterval(() => {
//       if (typeof window !== "undefined" && (window as any).snap) {
//         setSnapLoaded(true);
//         clearInterval(checkSnap);
//       }
//     }, 500);

//     return () => clearInterval(checkSnap);
//   }, []);

//   useEffect(() => {
//     if (document.visibilityState === "visible" && snapToken && !isSnapEmbedded) {
//       console.log("User returned to tab, reloading Snap...");
//       (window as any).snap.embed(snapToken, { embedId: "snap-container" });
//       setIsSnapEmbedded(true);
//     }
//   }, [snapToken, isSnapEmbedded]);

//   const handlePayment = () => {
//     if (!snapToken) {
//       alert("No transaction token available!");
//       return;
//     }

//     if (!snapLoaded) {
//       alert("Snap.js is still loading. Please wait.");
//       return;
//     }

//     if (!isSnapEmbedded) {
//       console.log("Embedding Snap for the first time...");
//       (window as any).snap.embed(snapToken, { embedId: "snap-container" });
//       setIsSnapEmbedded(true);
//     } else {
//       console.warn("Snap is already embedded, skipping reinitialization.");
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handlePayment}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//       >
//         Pay Now
//       </button>
//       <div id="snap-container" className="h-[600px]"></div>
//     </div>
//   );
// }
