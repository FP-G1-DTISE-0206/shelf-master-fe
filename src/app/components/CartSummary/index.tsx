'use client'
import { FC } from "react";
import Link from "next/link";
import ChoosenProduct from "./ChoosenProduct";
import useCartStore from "@/hooks/useCartStore";
import cartStore from "@/store/cartStore";

const CartSummary:FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  
  return(
    <>
      <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
        
        {/* Cart Item Section */}
        <div className="w-full h-auto rounded-2xl bg-shelf-white lg:w-[90%] mb-6 p-4 lg:p-6 lg:col-span-2">
          
          <div className="lg:pb-10">
            <h3 className="text-xl lg:text-3xl lg:pb-2 font-semibold">Your Bag</h3>
            <p className="text-[14px] lg:text-base mb-2">
              Items in your bag not reserved - check out now to make them yours
            </p>
          </div>

          {/* <ChoosenProduct />
          <ChoosenProduct />
          <ChoosenProduct /> */}
          {/* Render all chosen products dynamically */}
          {cartStore.getState().cartItems.length > 0 ? (
            cartStore.getState().cartItems.map((item) => (
              <ChoosenProduct key={item.id} product={item} />
            ))
          ) : (
            <p className="text-center text-gray-500">Your bag is empty.</p>
          )}
        </div>

          {/* Order Summary Section */}
        <div className="w-full h-[326px] rounded-2xl bg-shelf-white lg:bg-transparent p-4 lg:grow-3">
          <h3 className="text-xl font-semibold lg:text-[32px]">Order Summary</h3>
          <div className="w-full mx-auto mt-2">
            <table className="w-full">
              <tbody>
                <tr className="lg:text-xl">
                  <td className="py-2">{cartStore.getState().cartItems.length} ITEM(S)</td>
                  <td className="text-right py-2">Rp {cartStore.getState().cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString("id-ID")}</td>
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
                    Rp {cartStore.getState().cartItems.reduce((total, item) => total + item.price * item.quantity, 6999).toLocaleString("id-ID")}
                  </td>
                </tr>
              </tbody>
            </table>

            <button className="bg-shelf-black mt-4 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
            CHECKOUT
          </button>
          <p className="pt-2 lg:text-xl">
            <Link href="/promo" className="underline text-base">User a promo code</Link>
          </p>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default CartSummary;