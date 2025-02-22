"use client";
import { FC, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductSuggestion from "@/app/components/ProductSuggestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "@/app/components/ImageGallery";
import useCartStore from "@/store/cartStore";
import { CartItem } from "@/types/cartItem";
import products from "@/data/product";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}

const ProductPage: FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const productData = products.find((p) => p.id === Number(id));
    if (productData) {
      setProduct(productData);
      setLoading(false);
    } else {
      console.error("Product not found");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p className="text-red-500">Product not found</p>;

  const handleAddToCart = async () => {
    if (product) {
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        quantity: 1,
        description: "",
      };
      console.log("✅ Add to Cart Button Clicked");
      addToCart(cartItem); // ✅ Uses Zustand state function correctly

      // ✅ Log the entire updated cart state after adding a product
      setTimeout(() => {
        console.log(
          "🛒 Updated Cart State:",
          useCartStore.getState().cartItems
        );
        useCartStore.getState().sendCartToBackend();
      }, 100);
    }
  };

  return (
    <>
      {/* Image Gallery */}
      <div className="lg:grid lg:grid-cols-5 xl:grid-cols-4">
        <div className="lg:col-span-3 xl:col-span-2 mb-6">
          <ImageGallery images={product.images} />
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2 xl:col-span-1">
          <div>
            <div className="px-4 py-2 bg-shelf-blue rounded-xl inline-block mb-2">
              <p className="text-white text-[12px] font-semibold">
                New Release
              </p>
            </div>
            <div className="mb-2">
              <p className="text-shelf-black font-semibold text-xl">
                {product.name}
              </p>
            </div>
            <div>
              <p className="text-shelf-blue font-semibold text-2xl">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="my-4">
            <div className="mb-2 flex gap-2">
              <button
                onClick={handleAddToCart}
                className="bg-shelf-black flex-1 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]"
              >
                ADD TO CART
              </button>
              <button className="bg-shelf-black xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
            <button className="bg-shelf-blue xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
              BUY IT NOW
            </button>
          </div>

          {/* Product Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About the Product</h2>
            <div className="text-gray-700 space-y-2">
              <p className="text-lg font-semibold">Shadow Navy / Army Green</p>
              <p>
                This product is excluded from all promotional discounts and
                offers.
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>
                  Pay over time in interest-free installments with Affirm,
                  Klarna or Afterpay.
                </li>
                <li>
                  Join adiClub to get unlimited free standard shipping, returns,
                  & exchanges.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Product Suggestion */}
      <ProductSuggestion />
    </>
  );
};

export default ProductPage;
