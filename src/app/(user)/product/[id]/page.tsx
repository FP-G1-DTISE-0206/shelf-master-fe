"use client";
import { FC } from "react";
import { useParams } from "next/navigation";
import ProductSuggestion from "@/app/components/ProductSuggestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "@/app/components/ImageGallery";
// import useCartStore from "@/store/cartStore";
import { CartItem } from "@/types/cartItem";
import { useSession } from "next-auth/react";
import useProductDetail from "@/hooks/product/useProductDetail";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "@/hooks/cart/cartService";
import { useCartStore } from "@/store/cartStore";


interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}


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
          // useCartStore.getState().cartItems
        );
        // useCartStore.getState().sendCartToBackend();
      }, 100);
    }
  };

  const { id } = useParams();
  const { data: session } = useSession();
  const { addToCartLocal } = useCartStore();

  const { isLoading, errorProductDetail, product } = useProductDetail(session?.accessToken ?? "", id as string);
  console.log("Product Data: ", product);
  console.log("Product Image:  ", product?.images[0].imageUrl);

  const productImage = product?.images?.map((img) => img.imageUrl) ?? ['/images/kohceng-senam.jpg'];

  const mutation = useMutation({
    mutationFn: async () => {
      if (!session) throw new Error("User must be logged in to add items to cart.");
      if (!product) throw new Error("Product data is not available."); 
  
      const userId = 1; 
      const newItem = await addToCart(session.accessToken, userId, product.id, 1);
      addToCartLocal(newItem); 
    },
  });
  


  
  return (
    <>
      {isLoading && <p className="text-center">Loading product details...</p>}
      {errorProductDetail && <p className="text-center text-red-500">{errorProductDetail.message}</p>}

      {!isLoading && !errorProductDetail && product && (
      
      <>
        <div className="lg:grid lg:grid-cols-5 xl:grid-cols-4">
          <div className="lg:col-span-3 xl:col-span-2 mb-6">
            <ImageGallery images={productImage}/>
          </div>
      {/* Image Gallery */}
      <div className="lg:grid lg:grid-cols-5 xl:grid-cols-4">
        <div className="lg:col-span-3 xl:col-span-2 mb-6">
          <ImageGallery images={product.images.map(image => image.imageUrl)} />
        </div>

          
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
                  // onClick={handleAddToCart}
                  onClick={() => mutation.mutate()}
                  className="bg-shelf-black flex-1 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Adding..." : "ADD TO CART"}
                </button>
                <button className="bg-shelf-black xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <button className="bg-shelf-blue xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
                BUY IT NOW
              </button>
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
      </>
      )}

      {/* Product Suggestion */}
      <ProductSuggestion category={
        product.categories.length > 0 ?
        product.categories.map(c=>c.id) : []
        } exceptProductId={product.id} />
    </>
  );
};

export default ProductPage;
