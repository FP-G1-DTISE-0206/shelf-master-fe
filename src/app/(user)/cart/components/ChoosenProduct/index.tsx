"use client";
import { FC } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "@/types/cartItem";
import useCartStore from "@/store/cartStore";

interface ChoosenProductProps {
  product: CartItem;
}

const ChoosenProduct: FC<ChoosenProductProps> = ({ product }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <>
      <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 lg:mb-8 mb-4 lg:border-none lg:p-0 border-2 border-opacity-30 border-shelf-grey rounded-2xl p-8">
        <div className="col-span-2">
          <div className="hero-card-container relative rounded-2xl w-full h-full overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
        <div className="col-span-2">
          <h4 className="font-bold md:text-xl text-base">{product.name}</h4>
          <p className="py-2 md:text-base text-[14px]">Product Description {product.description}</p>
          <p className="md:text-base text-[14px]">Size 10</p>
          <p className="md:text-base text-[12px]">Quantity {product.quantity}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={() => {
                if (product.quantity > 1) {
                  updateQuantity(product.id, product.quantity - 1);
                }
              }}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 text-sm md:text-base lg:text-lg rounded-md"
            >
              -
            </button>
            <p className="text-sm md:text-base lg:text-lg">{product.quantity}</p>
            <button
              onClick={() => updateQuantity(product.id, product.quantity + 1)}
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
              onClick={() => removeFromCart(product.id)}
              className="cursor-pointer text-red-500 hover:text-red-700 transition"
            />
          </div>
        </div>
        <div className="col-span-1">
          <p className="font-bold text-shelf-blue text-lg lg:text-right">
            Rp. {(product.price * product.quantity).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </>
  );
};

export default ChoosenProduct;
