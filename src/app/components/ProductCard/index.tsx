"use client";
import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductResponse } from "@/types/product";

interface ProductCardProps {
  product: ProductResponse;
  id: number;
  name: string;
  price?: number;
  // images?: string[];
  images?: string;
  discount?: string;
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

  const formattedPrice = formatPrice(price);
  const productImage =
    images && images.trim() !== "" ? images : "/images/kohceng-senam.jpg";
  return (
    <>
      <div className="product-card-container w-full">
        <div className="product-image-container border-8 border-shelf-white rounded-3xl ">
          <div className="hero-card-container relative rounded-2xl w-full h-full overflow-hidden">
<<<<<<< HEAD
              <Image
                src={product.image.imageUrl || "/images/kohceng-senam.jpg"}
                alt={product.name || "Product Image"}
                // src={images?.[0] || "/images/kohceng-senam.jpg"}
                src={images || "/images/kohceng-senam.jpg"}
                alt={name || "Product Image"}
                width={500}
                height={500}
                className="object-cover rounded-2xl"
              />
=======
            <Image
              src={productImage}
              alt={name || "Product Image"}
              width={500}
              height={500}
              className="object-cover rounded-2xl"
            />
            {/* </div> */}
            {discount && (
              <div className="product-status bg-shelf-blue w-auto h-auto flex items-center justify-center rounded-tl-2xl rounded-br-2xl absolute top-0">
                <p className="text-shelf-white text-[12px] px-4 py-2 font-semibold">
                  {discount}
                </p>
              </div>
            )}
>>>>>>> 21d923f (feat: Showing product details when click View Button)
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
<<<<<<< HEAD
              <span className="text-shelf-orange">{formatPrice(product.price)}</span>
=======
              <span className="text-shelf-orange">{formattedPrice}</span>
>>>>>>> 21d923f (feat: Showing product details when click View Button)
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
