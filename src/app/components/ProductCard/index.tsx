"use client";
import { FC } from "react";
import Image from "next/image";
import { ProductResponse } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: ProductResponse;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price?: number): string => {
    if (typeof price !== "number" || isNaN(price)) {
      return "Rp 0";
    }
    return `Rp ${price.toLocaleString("id-ID")}`;
  };
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="border-4 border-shelf-white rounded-2xl p-2 shadow-md">
          <div className="relative w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] aspect-square rounded-xl overflow-hidden flex items-center justify-center">
            <Image
              src={product.image.imageUrl}
              alt={product.name || "Product Image"}
              width={200}
              height={200}
              className="w-full h-full object-cover object-center rounded-xl"
            />
          </div>
        </div>

        <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-center text-shelf-black mt-3 truncate w-full">
          {product.name}
        </h3>

        <Link
          href={`/product/${product.id}`}
          className="mt-2 bg-shelf-black px-6 py-3 w-full max-w-[200px] rounded-lg text-center text-shelf-white font-medium text-sm md:text-base transition-all hover:bg-shelf-orange"
        >
          VIEW PRODUCT <br />
          <span className="text-shelf-orange font-semibold">
            {formatPrice(product.price)}
          </span>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
