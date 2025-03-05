import { FC } from "react";
import ProductCard from "../ProductCard";
import { useSession } from "next-auth/react";
import useProduct from "@/hooks/product/useProduct";

const NewArrival: FC = () => {
  const warehouse = { id: 0, name: "All" };
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";

  const {
    error: productError,
    isLoading: isProductLoading,
    products,
  } = useProduct(accessToken, warehouse);

  return (
    <div className="flex flex-col gap-8 max-xl:mt-4 max-xl:mb-4 mt-20 mb-28">
      {isProductLoading && <p className="text-center">Loading products...</p>}

      {productError && (
        <p className="text-center text-red-500">{productError.message}</p>
      )}

      {!isProductLoading && !productError && products?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {products.map(({ id, name, price, image }) => (
            <ProductCard
              key={id}
              product={{
                id,
                name,
                price,
                image,
                quantity: 0,
              }}
            />
          ))}
        </div>
      ) : (
        !isProductLoading && (
          <p className="text-center">No products available</p>
        )
      )}
    </div>
  );
};

export default NewArrival;
