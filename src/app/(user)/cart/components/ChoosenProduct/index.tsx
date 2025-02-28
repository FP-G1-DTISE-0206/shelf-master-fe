"use client";
import { FC } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/store/cartStore";
import { updateCartItem, removeCartItem } from "@/hooks/cart/cartService";
import { useSession } from "next-auth/react";
import useProductDetail from "@/hooks/product/useProductDetail";
import { CartItem } from "@/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  product: CartItem;
};


const ChoosenProduct: FC<Props> = ({ product }) => {
  const { data: session } = useSession();
  const { updateCartItem: updateLocal, removeCartItem: removeLocal } = useCartStore();

  const { product: productDetail, isLoading } = useProductDetail(
    session?.accessToken ?? "" , product.productId.toString()
  );



  const formattedPrice = (productDetail?.price || 0) * product.quantity;


  const queryClient = useQueryClient();
  const updateQuantityMutation = useMutation({
    mutationFn: async (newQuantity: number) => {
      if (!session?.accessToken) throw new Error("User must be logged in.");
      console.log(`Updating cart item [CartID: ${product.cartId}] to Quantity: ${newQuantity}`);
      return await updateCartItem(session.accessToken, product.cartId, newQuantity);
    },
    onMutate: async (newQuantity: number) => {
      console.log(`Mutating... Setting Quantity to ${newQuantity} (Optimistic UI Update)`);
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData(["cart"]);

      updateLocal(product.cartId, newQuantity);

      return { previousCart };
    },
    onError: (err, newQuantity, context) => {
      console.error("Failed to update cart item:", err);
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSuccess: async (updatedItem) => {
      console.log(`Update Success! New Quantity: ${updatedItem.quantity}`);
      updateLocal(updatedItem.cartId, updatedItem.quantity);
    },
    onSettled: async () => {
      console.log("Refetching cart data to sync...");
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!session?.accessToken || !session.user.id) throw new Error("User must be logged in.");
      console.log(`Deleting cart item [CartID: ${product.cartId}]`);
      await removeCartItem(session.accessToken, session.user.id, product.cartId);
    },
    onSuccess: async () => {
      console.log(`Cart item [CartID: ${product.cartId}] deleted successfully`);
      removeLocal(product.cartId);
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <>
      <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 lg:mb-8 mb-4 lg:border-none lg:p-0 border-2 border-opacity-30 border-shelf-grey rounded-2xl p-8">
        <div className="col-span-2">
          <div className="hero-card-container relative rounded-2xl w-full h-full overflow-hidden">
            <Image
              src={productDetail?.images[0]?.imageUrl || '/images/kohceng-senam.jpg'}
              alt={productDetail?.name || "Product Image"}
              width={500}
              height={500}
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
        <div className="col-span-2">
          <h4 className="font-bold md:text-xl text-base">{productDetail?.name}</h4>
          <p className="md:text-base text-[12px]">{productDetail?.description}</p>
          <p className="md:text-base text-[12px] mt-2">Weight : {productDetail?.weight}</p>
          <p className="md:text-base text-[12px] mt-2">Qty : {product.quantity}</p>
          

          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={() => updateQuantityMutation.mutate(product.quantity - 1)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 text-sm md:text-base lg:text-lg rounded-md"
            >
              -
            </button>
            <p className="text-sm md:text-base lg:text-lg">{product.quantity}</p>
            <button
              onClick={() => updateQuantityMutation.mutate(product.quantity + 1)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 text-sm md:text-base lg:text-lg rounded-md"
            >
              +
            </button>
          </div>

          {/* Icons Section */}
          <div className="flex space-x-3 md:space-x-4 text-sm md:text-lg lg:text-xl mt-3">
            <FontAwesomeIcon
              icon={faHeart}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deleteMutation.mutate()}
              className="cursor-pointer text-red-500 hover:text-red-700 transition"
            />
          </div>
        </div>
        <div className="col-span-1">
          <p className="font-bold text-shelf-blue text-lg lg:text-right">
            Rp. {formattedPrice.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </>
  );
};

export default ChoosenProduct;
