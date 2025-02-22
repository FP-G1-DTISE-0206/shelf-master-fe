"use client"
import { FC } from "react";
import Link from "next/link";
import CartSummary from "@/app/components/CartSummary";
import ProductSuggestion from "@/app/components/ProductSuggestion";

const Cart: FC = () => {
  return (
    <>
      <div className="py-2">

        <h2 className="text-2xl font-bold pb-2 lg:text-[32px]">Saving to celebrate</h2>

        <p className="text-[12px] lg:text-[14px] pb-2">
          Enjoy up to 60% off thousands of styles during the End of Year sale -
          while supplies last. No code needed
        </p>

        {/* <div className="text-[14px] lg:text-base">
          <Link href="/signup" className="underline">
            Join us
          </Link>{" "}
          or{" "}
          <Link href="/login" className="underline">
            Sign-in
          </Link>
        </div> */}
      </div>

      <CartSummary />

      <ProductSuggestion />
    </>
  );
};

export default Cart;
