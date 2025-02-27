"use client";
import { FC } from "react";
import { useParams } from "next/navigation";
import ProductSuggestion from "@/app/components/ProductSuggestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "@/app/components/ImageGallery";
import useCartStore from "@/store/cartStore";
import { CartItem } from "@/types/cartItem";
import { useSession } from "next-auth/react";
import useProductDetail from "@/hooks/product/useProductDetail";
import { 
  Badge, 
} from "flowbite-react";

const ProductPage: FC = () => {
  const { id }: { id: string } = useParams() ?? { id: "" };
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";
  const { 
    product, isLoading, errorProductDetail, 
  } = useProductDetail(accessToken, id);
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) return <p>Loading...</p>;
  if (errorProductDetail) return <p>Error loading product: {errorProductDetail.message}</p>;
  if (!product) return <p className="text-red-500">Product not found</p>;

  const handleAddToCart = async () => {
    if (product) {
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images.map(image => image.imageUrl),
        quantity: 1,
        description: "",
      };
      console.log("✅ Add to Cart Button Clicked");
      addToCart(cartItem);
      
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
          <ImageGallery images={product.images.map(image => image.imageUrl)} />
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2 xl:col-span-1">
          <div> 
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
              <button title="favorite" className="bg-shelf-black xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
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
              <p className="text-lg font-semibold">{product.sku}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {product.categories.map((category, idx) => {
                  return category && (
                    <Badge key={idx} color="info" className="relative inline-block pr-5">
                      {category.name}
                    </Badge>
                  );
                })}
              </div>
              <p>
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Suggestion */}
      <ProductSuggestion category={
        product.categories.length > 0 ?
        product.categories.map(c=>c.id) : []
        } exceptProductId={product.id} />
    </>
  );
};

export default ProductPage;
