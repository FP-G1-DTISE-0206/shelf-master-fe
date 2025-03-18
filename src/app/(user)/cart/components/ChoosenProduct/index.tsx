"use client";
import { FC } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { updateCartItem, removeCartItem } from "@/hooks/cart/cartService";
import { useSession } from "next-auth/react";
import useProductDetail from "@/hooks/product/useProductDetail";
import { CartItem } from "@/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import { HiPlus, HiMinus, HiTrash } from "react-icons/hi";
import Link from "next/link";
import useProductStock from "@/hooks/product/useProductStock"; // to get productt stock

type Props = {
  product: CartItem;
};

const ChoosenProduct: FC<Props> = ({ product }) => {
  const { data: session } = useSession();
  const { updateCartItem: updateLocal, removeCartItem: removeLocal } =
    useCartStore();

  const { product: productDetail } = useProductDetail(
    session?.accessToken ?? "",
    product.productId.toString()
  );

  const { data: productStock, isLoading: isStockLoading } = useProductStock(
    session?.accessToken ?? "",
    product.productId
  );

  const formattedPrice = (productDetail?.price || 0) * product.quantity;
  const productDetailFormatted = productDetail?.description
    ? productDetail.description.length > 100
      ? productDetail.description.slice(0, 100) + "..."
      : productDetail.description
    : "";

  const queryClient = useQueryClient();
  const updateQuantityMutation = useMutation({
    mutationFn: async (newQuantity: number) => {
      if (!session?.accessToken) throw new Error("User must be logged in.");
      return await updateCartItem(
        session.accessToken,
        product.cartId,
        newQuantity
      );
    },
    onMutate: async (newQuantity: number) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData(["cart"]);

      updateLocal(product.cartId, newQuantity);

      return { previousCart };
    },
    onError: (err, newQuantity, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSuccess: async (updatedItem) => {
      updateLocal(updatedItem.cartId, updatedItem.quantity);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!session?.accessToken || !session.user.id)
        throw new Error("User must be logged in.");
      await removeCartItem(session.accessToken, product.cartId);
    },
    onSuccess: async () => {
      removeLocal(product.cartId);
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <>
      <div className="grid lg:grid-cols-5 grid-cols-1 gap-4 p-6 border-2 border-opacity-30 border-shelf-grey rounded-2xl shadow-md">
        <div className="lg:col-span-1 flex items-center justify-center">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden">
            <Image
              src={
                productDetail?.images[0]?.imageUrl ||
                "/images/kohceng-senam.jpg"
              }
              alt={productDetail?.name || "Product Image"}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between w-full">
          <div className="flex justify-between items-center">
            <Link href={`/product/${productDetail?.id}`}>
              <h4 className="font-bold text-lg md:text-xl">
                {productDetail?.name}
              </h4>
            </Link>
            <p className="font-bold text-shelf-blue text-lg md:text-xl">
              Rp. {formattedPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <p className="text-sm md:text-base text-gray-600">
            {productDetailFormatted}
          </p>
          <p className="text-sm md:text-base mt-1">
            <span className="font-semibold">Stock:</span>
            {isStockLoading ? (
              <span className="ml-1 text-gray-400">Loading...</span>
            ) : (
              <span
                className={`ml-1 font-bold ${
                  productStock === 0 ? "text-red-500" : "text-green-600"
                }`}
              >
                {productStock ?? "N/A"}
              </span>
            )}
          </p>
          
          <p className="text-sm md:text-base mt-1">
            Weight: {productDetail?.weight}
          </p>
          <p className="text-sm md:text-base mt-1">Qty: {product.quantity}</p>
          <div className="flex justify-between">
            <div className="flex items-center space-x-3 mt-3">
              <Button
                size="sm"
                color="warning"
                onClick={() =>
                  updateQuantityMutation.mutate(product.quantity - 1)
                }
                disabled={product.quantity <= 1}
              >
                <HiMinus className="text-lg text-shelf-black" />
              </Button>
              <span className="text-base md:text-lg font-medium">
                {product.quantity}
              </span>
              <Button
                size="sm"
                color="warning"
                onClick={() =>
                  updateQuantityMutation.mutate(product.quantity + 1)
                }
                disabled={product.quantity >= (productStock ?? 0)}
              >
                <HiPlus className="text-lg text-shelf-black" />
              </Button>
            </div>
            <div className="flex items-center space-x-3 mt-3">
              <Button
                size="sm"
                color="light"
                onClick={() => deleteMutation.mutate()}
              >
                <HiTrash className="text-lg text-shelf-grey" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosenProduct;
