"use client";
import { useOrderQuery } from "@/hooks/order/useOrderQuery";
import { useSession } from "next-auth/react";
import CustomSpinner from "@/components/CustomSpinner";
import Link from "next/link";
import useUserAddress from "@/hooks/useUserAddress";
import { useAddressStore } from "@/store/addressStore";



const PaymentPage = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";

  
  const { data: orders, isLoading } = useOrderQuery(accessToken, 0, 10);
  console.log("Orders data: ", orders)
  
  
  const { userAddress } = useUserAddress(accessToken);
  const { addressId } = useAddressStore();

  
  

  if (isLoading) return <CustomSpinner />;
  const latestOrder = orders?.[0] ?? null;
  const latestOrderProducts = orders?.[0].orderItems;

  
  const selectedAddress = userAddress?.find((addr) => addr.id === addressId);

  console.log("Latest Order Details:", latestOrder);
  console.log("Latest Order Products:", latestOrderProducts);
  

  return (
    <>
      <h1>This is Payment Page</h1>

      {/* Order Section */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
        {/* Left Section (Address & Products) */}
        <div className="w-full h-auto rounded-2xl bg-shelf-white p-4 lg:p-6 lg:col-span-2">
          <div className="lg:pb-4">
            <h3 className="text-xl lg:text-3xl font-semibold">Checkout</h3>

            {/* Address Section */}
            <h4 className="text-[14px] lg:text-xl mb-2">Your Address</h4>
            <div className="p-5 border-2 border-shelf-light-grey rounded-3xl">
              {selectedAddress ? (
                <>
                  <p className="font-semibold text-base text-shelf-blue">
                    {selectedAddress.contactName} - {selectedAddress.contactNumber}
                  </p>
                  <p className="text-base">
                    {selectedAddress.address}, {selectedAddress.district},{" "}
                    {selectedAddress.city}, {selectedAddress.province},{" "}
                    {selectedAddress.postalCode}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No address found.</p>
              )}
            </div>
          </div>

          {/* Product List */}
          <div className="flex flex-col gap-4 mt-4">
            <h4 className="text-[14px] lg:text-xl mb-2">Your Products</h4>
            <div className="flex flex-col">
              <p className="font-semibold text-base text-shelf-blue">
                
              </p>
              
              <p className="text-base">
                
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Order Summary & Payment) */}
        <div className="w-full h-auto rounded-2xl bg-shelf-light-grey p-4 lg:grow-3 space-y-6">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Product Price:</span>
              <span>Rp. {latestOrder?.totalPrice?.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Cost:</span>
              <span>Rp. {latestOrder?.shippingCost?.toLocaleString("id-ID") ?? "0"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Final Price:</span>
              <span>
                Rp. {((latestOrder?.finalPrice ?? 0))}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <div>
            <Link href="/payment">
              <button className="bg-shelf-blue mt-4 py-[13px] px-[16px] w-full rounded-lg text-shelf-white font-semibold text-[14px]">
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


 
 
 
 