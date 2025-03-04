"use client";
import { FC } from "react";
import { useParams } from "next/navigation";
import ProductSuggestion from "@/app/components/ProductSuggestion";
import ImageGallery from "@/app/components/ImageGallery";
import { useSession } from "next-auth/react";
import useProductDetail from "@/hooks/product/useProductDetail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/hooks/cart/cartService";
import { useCartStore } from "@/store/cartStore";
import { Badge, Button } from "flowbite-react";
import { HiShoppingCart, HiHeart } from "react-icons/hi";

const ProductPage: FC = () => {
  const { id }: { id: string } = useParams() ?? { id: "" };
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";
  const { addToCartLocal } = useCartStore();
  const queryClient = useQueryClient();
  const { product, isLoading, errorProductDetail } = useProductDetail(
    accessToken,
    id
  );

  const productImage = product?.images?.map((img) => img.imageUrl) ?? [
    "/images/kohceng-senam.jpg",
  ];

  const mutation = useMutation({
    mutationFn: async () => {
      if (!session)
        throw new Error("User must be logged in to add items to cart.");
      if (!product) throw new Error("Product data is not available.");

      const userId = Number(session.user.id);
      const newItem = await addToCart(
        session.accessToken,
        product.id,
        1
      );
      return newItem;
    },
    onSuccess: (newItem) => {
      addToCartLocal(newItem);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!session)
        throw new Error("User must be logged in to add items to cart.");
      if (!product) throw new Error("Product data is not available.");
      return await addToCart(session.accessToken, product.id, 1);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData(["cart"]);

      addToCartLocal({
        cartId: Math.random(), // Temporary ID
        productId: product?.id || 0,
        productName: product?.name || "",
        quantity: 1,
        price: product?.price || 0,
        image: productImage[0] || "/images/kohceng-senam.jpg",
        isProcessed: false,
        updatedAt: new Date().toISOString(),
      });

      return { previousCart };
    },
    onError: (err, _, context) => {
      console.error("Failed to add item:", err);
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSuccess: async (newItem) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <>
      {isLoading && <p className="text-center">Loading product details...</p>}
      {errorProductDetail && (
        <p className="text-center text-red-500">{errorProductDetail.message}</p>
      )}

      {!isLoading && !errorProductDetail && product && (
        <>
          <div className="lg:grid lg:grid-cols-5 lg:gap-4 xl:grid-cols-3 ">
            {/* Image Gallery */}
            <div className="lg:col-span-3 xl:col-span-2 xl:w-[85%] mb-6 ">
              <ImageGallery
                images={product.images.map((image) => image.imageUrl)}
              />
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2 xl:col-span-1  ">
              {/* Product Name */}
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

                <p className="text-shelf-blue font-semibold text-2xl">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>

              {/* Buttons */}
              <div className="my-4">
                <div className="mb-2 flex gap-2">
                  <Button
                    color="dark"
                    onClick={() => addToCartMutation.mutate()}
                    disabled={mutation.isPending}
                    className="py-1 w-full"
                  >
                    <HiShoppingCart className="mr-2 h-5 w-5" />
                    {mutation.isPending ? "Adding..." : "ADD TO CART"}
                  </Button>

                  <Button color="dark" className="py-1 w-1/4">
                    <HiHeart className="w-full text-xl" />
                  </Button>
                </div>
                <Button className="py-1 w-full bg-shelf-blue">
                  BUY IT NOW
                </Button>
              </div>

              {/* Product Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">About the Product</h2>
                <div className="text-gray-700 space-y-2">
                  <p className="text-lg font-semibold">{product.sku}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {product.categories.map((category, idx) => {
                      return (
                        category && (
                          <Badge
                            key={idx}
                            color="info"
                            className="relative inline-block pr-5"
                          >
                            {category.name}
                          </Badge>
                        )
                      );
                    })}
                  </div>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Product Suggestion */}
      <ProductSuggestion category={[]} exceptProductId={null} />
      {/* <ProductSuggestion category={
        product.categories.length > 0 ?
        product.categories.map(c=>c.id) : []
        } exceptProductId={product.id} /> */}
    </>
  );
};

export default ProductPage;
