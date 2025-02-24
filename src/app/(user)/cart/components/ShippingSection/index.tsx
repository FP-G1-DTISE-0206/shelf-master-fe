import { FC } from "react";

const ShippingSection: FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Shipping Address</h2>
        <div className="mt-2 p-3 border rounded-md bg-gray-50">
          <p className="text-sm text-gray-700">[User's Default Address]</p>
          <button className="mt-2 text-sm text-blue-600 hover:underline">
            Change Address
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Shipping Method</h2>
        <div className="mt-2 space-y-2">
          <div className="p-3 border rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-100">
            <span className="text-sm text-gray-700">Standard Shipping</span>
            <span className="text-sm font-medium">$5.00</span>
          </div>
          <div className="p-3 border rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-100">
            <span className="text-sm text-gray-700">Express Shipping</span>
            <span className="text-sm font-medium">$10.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShippingSection;
