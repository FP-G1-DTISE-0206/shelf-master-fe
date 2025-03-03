"use client";
import { FC } from "react";
import CartSummary from "@/app/(user)/cart/components/CartSummary";
import ProductSuggestion from "@/app/components/ProductSuggestion";
import ShippingSection from "./components/ShippingSection";

const Cart: FC = () => {
  return (
    <>
      <div className="py-2">

        <h2 className="text-2xl font-bold pb-2 lg:text-[32px]">Saving to celebrate</h2>

        <p className="text-[12px] lg:text-[14px] pb-2">
          Enjoy up to 60% off thousands of styles during the End of Year sale -
          while supplies last. No code needed
        </p>
      </div>
      
      {/* <div className="lg:grid lg:grid-cols-3 lg:gap-x-12"> */}
        {/* <div className="w-full h-auto rounded-2xl bg-shelf-white lg:w-[100%] mb-6 p-4 lg:p-6 lg:col-span-2">
          <div className="lg:pb-10">
            <h3 className="text-xl lg:text-3xl lg:pb-2 font-semibold">
              Your Bag
            </h3>
            <p className="text-[14px] lg:text-base mb-2">
              Items in your bag are not reserved—check out now to make them
              yours.
            </p>
          </div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ChoosenProduct key={item.id} product={item} />
            ))
          ) : (
            <p className="text-center text-gray-500">Your bag is empty.</p>
          )}
          </div> */}
        {/* <div className="w-full h-auto rounded-2xl bg-shelf-white lg:bg-transparent p-4 lg:grow-3 space-y-10"> */}
          <CartSummary />
          <ShippingSection />
        {/* </div> */}
      {/* </div> */}

      <ProductSuggestion category={[]} exceptProductId={null} />
    </>
  );
};

export default Cart;
