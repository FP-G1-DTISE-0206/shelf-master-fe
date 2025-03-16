"use client";
import { FC, useEffect, useState } from "react";
import { usePaymentStore } from "@/store/paymentStore";
import CustomSpinner from "@/components/CustomSpinner";



const paymentMethods = [
  { id: 1, name: "Payment Gateway (Midtrans)" },
  { id: 2, name: "Manual Transfer" },
];

const PaymentMethodSection: FC = () => {
  const { choosenPaymentMethod, setChoosenPaymentMethod } = usePaymentStore();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!choosenPaymentMethod) {
      setChoosenPaymentMethod(paymentMethods[0].id);
    }
    console.log("Current Payment Method:", choosenPaymentMethod);
  }, [choosenPaymentMethod, setChoosenPaymentMethod]);

  
  const handlePaymentMethodChange = (methodId: number) => {
    setLoading(true); 
    setTimeout(() => {
      setChoosenPaymentMethod(methodId);
      setLoading(false); 
    }, 500); 
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
      {loading ? (
        <CustomSpinner />
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-4 border rounded-md cursor-pointer ${
                choosenPaymentMethod === method.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={choosenPaymentMethod === method.id}
                onChange={() => handlePaymentMethodChange(method.id)}
                className="hidden"
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center mr-3">
                {choosenPaymentMethod === method.id && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className="text-lg font-medium">{method.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSection;
