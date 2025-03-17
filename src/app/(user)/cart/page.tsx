"use client";
import { FC, useEffect, useState } from "react";
import ProductSuggestion from "@/app/components/ProductSuggestion";
import ShippingSection from "./components/ShippingSection";
import { useCartStore } from "@/store/cartStore";
import { useCartQuery } from "@/hooks/cart/useCartQuery";
import { useSession } from "next-auth/react";
import { CartItem } from "@/types/cart";
import ChoosenProduct from "./components/ChoosenProduct";
import CustomSpinner from "@/components/CustomSpinner";
import PaymentMethodSection from "./components/PaymentMethod";

import { useAddressStore } from "@/store/addressStore";
import { usePaymentStore } from "@/store/paymentStore";
import { useWarehouseStore } from "@/store/warehouseStore";
import { useOrderMutation } from "@/hooks/order/useOrderMutation";
import { useRouter } from "next/navigation";
import { useShippingStore } from "@/store/shippingStore";

const Cart: FC = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";
  const { data: cartData, isLoading: isCartLoading } =
    useCartQuery(accessToken);
  const { setCart, cartItems } = useCartStore();

  const [shippingCost, setShippingCost] = useState<number>(0);

  const totalPrice = cartData?.totalPrice ?? 0;
  const formattedTotalPrice = (totalPrice + shippingCost).toLocaleString(
    "id-ID"
  );
  const totalQuantity = cartData?.totalQuantity ?? 0;

  // Kerjaan Made ==========================================================
  const { addressId } = useAddressStore();
  const { choosenPaymentMethod } = usePaymentStore();
  const { warehouseId } = useWarehouseStore();
  const { choosenShippingCost, choosenCourierId } = useShippingStore.getState();
  const { mutate: createOrder, isPending } = useOrderMutation(accessToken);
  const router = useRouter();

  const handleCheckout = () => {
    if (!addressId || !choosenPaymentMethod || !warehouseId) {
      alert("Please complete all required fields before checking out.");
      return;
    }

    if (!choosenCourierId) {
      alert("Please select a shipping method before proceeding to checkout.");
      return;
    }
    

    const orderRequest = {
      addressId,
      paymentMethodId: choosenPaymentMethod,
      warehouseId,
      shippingCost: choosenShippingCost,
      shippingMethod: choosenCourierId,
    };

    console.log("Creating Order with Data:", orderRequest);

    createOrder(orderRequest, {
      onSuccess: () => {
        router.push("/payment");
      },
    });
  };

  // Kerjaan Made ==========================================================

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
          <ShippingSection setShippingCost={setShippingCost} />
          <PaymentMethodSection />
          <div className="w-full h-auto rounded-2xl bg-shelf-white lg:bg-transparent p-4 lg:grow-3">
            <h3 className="text-xl font-semibold lg:text-[32px]">
              Order Summary
            </h3>
            <div className="w-full mx-auto mt-2">
              <table className="w-full">
                <tbody>
                  <tr className="lg:text-xl">
                    <td className="py-2">{totalQuantity} ITEM(S)</td>

                    <td className="text-right py-2">{`Rp ${totalPrice.toLocaleString(
                      "id-ID"
                    )}`}</td>
                  </tr>
                  <tr className="lg:text-xl">
                    <td className="py-2">Delivery</td>
                    <td className="text-right py-2">{`Rp ${shippingCost.toLocaleString(
                      "id-ID"
                    )}`}</td>
                  </tr>
                  <tr className="lg:text-xl">
                    <td className="py-2">Sales Tax</td>
                    <td className="text-right py-2">-</td>
                  </tr>
                  <tr className="font-bold lg:text-2xl">
                    <td className="py-2">Total</td>
                    <td className="text-right py-2">{`Rp ${formattedTotalPrice}`}</td>
                  </tr>
                </tbody>
              </table>

              {/* <Link href="/payment">
                <button className="bg-shelf-black mt-4 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
                  CHECKOUT
                </button>
              </Link> */}
              <button
                className="bg-shelf-black mt-4 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]"
                onClick={handleCheckout}
                disabled={isPending}
              >
                {isPending ? "Processing..." : "CHECKOUT"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProductSuggestion category={[]} exceptProductId={null} />
    </>
  );
};

export default Cart;
