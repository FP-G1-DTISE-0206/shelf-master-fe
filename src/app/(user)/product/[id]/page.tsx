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
import CustomSpinner from "@/components/CustomSpinner";

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

      const newItem = await addToCart(session.accessToken, product.id, 1);
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
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <>
      {isLoading && <CustomSpinner />}
      {errorProductDetail && (
        <p className="text-center text-red-500">{errorProductDetail.message}</p>
      )}

      {!isLoading && !errorProductDetail && product && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 xl:grid-cols-3">
            <div className="lg:col-span-3 xl:col-span-2 xl:w-[85%] mb-6 flex justify-center">
              <ImageGallery
                images={product.images.map((image) => image.imageUrl)}
              />
            </div>
            <div className="lg:col-span-2 xl:col-span-1 flex flex-col gap-2">
              <div>
                <h1 className="text-shelf-black font-bold text-2xl mt-3">
                  {product.name}
                </h1>
                <p className="text-shelf-blue font-bold text-3xl mt-2">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>
              <div>
                <Button
                  color="dark"
                  onClick={() => addToCartMutation.mutate()}
                  disabled={mutation.isPending}
                  className="flex-1 py-2 text-base font-medium w-full"
                >
                  <HiShoppingCart className="mr-2 h-5 w-5" />
                  {mutation.isPending ? "Adding..." : "ADD TO CART"}
                </Button>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">About the Product</h2>
                <p className="text-gray-700 font-semibold text-lg">
                  {product.sku}
                </p>
                {product.categories.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {product.categories.map(
                      (category, idx) =>
                        category && (
                          <Badge
                            key={idx}
                            color="info"
                            className="px-3 py-1 text-sm font-medium"
                          >
                            {category.name}
                          </Badge>
                        )
                    )}
                  </div>
                )}
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>
        </>
      )}

      <ProductSuggestion category={[]} exceptProductId={null} />
    </>
  );
};

export default ProductPage;
