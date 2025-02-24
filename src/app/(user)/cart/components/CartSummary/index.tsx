"use client";
import { FC } from "react";
import Link from "next/link";
import useCartStore from "@/store/cartStore";

const CartSummary: FC = () => {
  const { totalAmount, totalItems } = useCartStore();

  return (
    <>
      <h3 className="text-xl font-semibold lg:text-[32px]">Order Summary</h3>
      <div className="w-full mx-auto mt-2">
        <table className="w-full">
          <tbody>
            <tr className="lg:text-xl">
              <td className="py-2">{totalItems} ITEM(S)</td>

              <td className="text-right py-2">
                Rp {totalAmount.toLocaleString("id-ID")}
              </td>
            </tr>
            <tr className="lg:text-xl">
              <td className="py-2">Delivery</td>
              <td className="text-right py-2">Rp 6,999</td>
            </tr>
            <tr className="lg:text-xl">
              <td className="py-2">Sales Tax</td>
              <td className="text-right py-2">-</td>
            </tr>
            <tr className="font-bold lg:text-2xl">
              <td className="py-2">Total</td>
              <td className="text-right py-2">
                Rp {(totalAmount + 6999).toLocaleString("id-ID")}
              </td>
            </tr>
          </tbody>
        </table>

        <Link href="/checkout">
          <button className="bg-shelf-black mt-4 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
            CHECKOUT
          </button>
        </Link>

        <div className="pt-2 lg:text-xl">
          <Link href="/promo" className="underline text-base">
            Use a promo code
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
