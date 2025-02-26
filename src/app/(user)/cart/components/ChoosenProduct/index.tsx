"use client";
import { FC } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { CartItem } from "@/types/cartItem";
// import useCartStore from "@/store/cartStore";
import { useCartStore } from "@/store/cartStore";
import { updateCartItem, removeCartItem } from "@/hooks/cart/cartService";
import { useSession } from "next-auth/react";
import useProductDetail from "@/hooks/product/useProductDetail";
import { CartItem } from "@/types/cart";

type Props = {
  product: CartItem;
};


const ChoosenProduct: FC<Props> = ({ product }) => {
  const { data: session } = useSession();
  const { updateCartItem: updateLocal, removeCartItem: removeLocal } = useCartStore();

  const { product: productDetail, isLoading } = useProductDetail(
    session?.accessToken ?? "" , product.productId.toString()
  );

  // const handleUpdateQuantity = async (newQuantity: number) => {
  //   await updateCartItem(product.cartId, newQuantity);
  //   updateLocal(product.cartId, newQuantity); 
  // };

  // const handleRemove = async () => {
  //   await removeCartItem(1, product.cartId); 
  //   removeLocal(product.cartId);
  // };

  const formattedPrice = (productDetail?.price || 0) * product.quantity;
  // (productDetail?.price * product.quantity).toLocaleString("id-ID")
  return (
    <>
      <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 lg:mb-8 mb-4 lg:border-none lg:p-0 border-2 border-opacity-30 border-shelf-grey rounded-2xl p-8">
        <div className="col-span-2">
          <div className="hero-card-container relative rounded-2xl w-full h-full overflow-hidden">
            <Image
              // src={product.images[0]}
              src={productDetail?.images[0]?.imageUrl || '/images/kohceng-senam.jpg'}
              // src={"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              // alt={product.name}
              alt={productDetail?.name || "Product Image"}
              width={500}
              height={500}
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
        <div className="col-span-2">
          <h4 className="font-bold md:text-xl text-base">{productDetail?.name}</h4>
          {/* <p className="py-2 md:text-base text-[14px]">Product Description {product.description}</p> */}
          {/* <p className="md:text-base text-[14px]">Size 10</p> */}
          <p className="md:text-base text-[12px]">Quantity {product.quantity}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 mt-2">
            <button
              // onClick={() => {
              //   if (product.quantity > 1) {
              //     updateQuantity(product.id, product.quantity - 1);
              //   }
              // }}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 text-sm md:text-base lg:text-lg rounded-md"
            >
              -
            </button>
            <p className="text-sm md:text-base lg:text-lg">{product.quantity}</p>
            <button
              // onClick={() => updateQuantity(product.id, product.quantity + 1)}
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
              // onClick={handleRemove}
              className="cursor-pointer text-red-500 hover:text-red-700 transition"
            />
          </div>
        </div>
        <div className="col-span-1">
          <p className="font-bold text-shelf-blue text-lg lg:text-right">
            {/* Rp. {(productDetail?.price * product.quantity).toLocaleString("id-ID")} */}
            Rp. {formattedPrice}
            
          </p>
        </div>
      </div>
    </>
  );
};

export default ChoosenProduct;
