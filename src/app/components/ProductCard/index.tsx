"use client";
import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductResponse } from "@/types/product";

interface ProductCardProps {
  product: ProductResponse;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
}) => {
  const router = useRouter();

  const formatPrice = (price?: number): string => {
    if (typeof price !== "number" || isNaN(price)) {
      return "Rp 0";
    }
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  const handleViewProduct = () => {
    router.push(`/product/${product.id}`);
  };
  return (
    <>
      <div className="product-card-container w-full">
        <div className="product-image-container border-8 border-shelf-white rounded-3xl ">
          <div className="hero-card-container relative rounded-2xl w-full h-full overflow-hidden">
              <Image
                src={product.image.imageUrl || "/images/kohceng-senam.jpg"}
                alt={product.name || "Product Image"}
                width={500}
                height={500}
                className="object-cover rounded-2xl"
              />
          </div>
        </div>
        <div className="product-information-container">
          <div className="product-information-title my-2">
            <h3 className="font-semibold xl:text-2xl text-base text-shelf-black truncate">
              {product.name}
            </h3>
          </div>
          <div className="view-product-button">
            <button
              onClick={handleViewProduct}
              className="bg-shelf-black xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]"
            >
              VIEW PRODUCT <br />
              <span className="text-shelf-orange">{formatPrice(product.price)}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
