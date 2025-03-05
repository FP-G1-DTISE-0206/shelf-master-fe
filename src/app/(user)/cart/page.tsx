"use client";
import { FC, useEffect } from "react";
import ProductSuggestion from "@/app/components/ProductSuggestion";
import ShippingSection from "./components/ShippingSection";
import { useCartStore } from "@/store/cartStore";
import { useCartQuery } from "@/hooks/cart/useCartQuery";
import { useSession } from "next-auth/react";
import { CartItem } from "@/types/cart";
import ChoosenProduct from "./components/ChoosenProduct";
import Link from "next/link";
import CustomSpinner from "@/components/CustomSpinner";

const Cart: FC = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";
  const { data: cartData, isLoading: isCartLoading } =
    useCartQuery(accessToken);
  const { setCart, cartItems } = useCartStore();

  const totalPrice = cartData?.totalPrice?.toLocaleString("id-ID") ?? 0;
  const totalQuantity = cartData?.totalQuantity ?? 0;

  useEffect(() => {
    if (cartData) {
      setCart(cartData.cartItems);
    }
  }, [cartData, setCart]);

  return (
    <>
      <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
        <div className="w-full h-auto rounded-2xl bg-shelf-white lg:w-[100%] mb-6 p-4 lg:p-6 lg:col-span-2">
          <div className="lg:pb-4">
            <h3 className="text-xl lg:text-3xl lg:pb-2 font-semibold">
              Your Cart
            </h3>
            <p className="text-[14px] lg:text-base mb-2">
              Items in your cart are not reserved—check out now to make them
              yours.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {isCartLoading && <CustomSpinner />}
            {cartItems.length > 0 ? (
              cartItems.map((item: CartItem) => (
                <ChoosenProduct key={item.cartId} product={item} />
              ))
            ) : (
              <p className="text-center text-gray-500">Your bag is empty.</p>
            )}
          </div>
        </div>
        <div className="w-full h-auto rounded-2xl bg-shelf-white lg:bg-transparent p-4 lg:grow-3 space-y-10">
          <ShippingSection />
          <div className="w-full h-auto rounded-2xl bg-shelf-white lg:bg-transparent p-4 lg:grow-3">
            <h3 className="text-xl font-semibold lg:text-[32px]">
              Order Summary
            </h3>
            <div className="w-full mx-auto mt-2">
              <table className="w-full">
                <tbody>
                  <tr className="lg:text-xl">
                    <td className="py-2">{totalQuantity} ITEM(S)</td>

                    <td className="text-right py-2">{`Rp ${totalPrice}`}</td>
                  </tr>
                  <tr className="lg:text-xl">
                    <td className="py-2">Delivery</td>
                    <td className="text-right py-2">Rp 6.999</td>
                  </tr>
                  <tr className="lg:text-xl">
                    <td className="py-2">Sales Tax</td>
                    <td className="text-right py-2">-</td>
                  </tr>
                  <tr className="font-bold lg:text-2xl">
                    <td className="py-2">Total</td>
                    <td className="text-right py-2">{`Rp ${(
                      (cartData?.totalPrice ?? 0) + 6999
                    ).toLocaleString("id-ID")}`}</td>
                  </tr>
                </tbody>
              </table>

              <Link href="/checkout">
                <button className="bg-shelf-black mt-4 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
                  CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ProductSuggestion category={[]} exceptProductId={null} />
    </>
  );
};

export default Cart;
