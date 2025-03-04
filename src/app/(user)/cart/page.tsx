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

  if (isCartLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="py-2">
        <h2 className="text-2xl font-bold pb-2 lg:text-[32px]">
          Saving to celebrate
        </h2>

        <p className="text-[12px] lg:text-[14px] pb-2">
          Enjoy up to 60% off thousands of styles during the End of Year sale -
          while supplies last. No code needed
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
        <div className="w-full h-auto rounded-2xl bg-shelf-white lg:w-[100%] mb-6 p-4 lg:p-6 lg:col-span-2">
          <div className="lg:pb-10">
            <h3 className="text-xl lg:text-3xl lg:pb-2 font-semibold">
              Your Bag
            </h3>
            <p className="text-[14px] lg:text-base mb-2">
              Items in your bag are not reserved—check out now to make them
              yours.
            </p>
          </div>

          {/* Choosen Products */}
          {cartItems.length > 0 ? (
            cartItems.map((item: CartItem) => (
              <ChoosenProduct key={item.cartId} product={item} />
            ))
          ) : (
            <p className="text-center text-gray-500">Your bag is empty.</p>
          )}
        </div>
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
        <div className="w-full h-auto rounded-2xl bg-shelf-white lg:bg-transparent p-4 lg:grow-3 space-y-10">
          {/* <CartSummary /> */}
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

              <div className="pt-2 lg:text-xl">
                <Link href="/promo" className="underline text-base">
                  Use a promo code
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductSuggestion category={[]} exceptProductId={null} />
    </>
  );
};

export default Cart;
