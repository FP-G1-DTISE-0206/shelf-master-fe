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


  const myProduct = products?.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
  });

  return (
    <div className="flex flex-col gap-8 max-xl:mt-4 max-xl:mb-4 mt-20 mb-28">
      <div className="max-xl:text-2xl text-7xl font-semibold text-center md:text-left">
        <p>Dont miss out new drops</p>
      </div>

      {/* Show loading state */}
      {isProductLoading && <p className="text-center">Loading products...</p>}

      {/* Show error message */}
      {productError && <p className="text-center text-red-500">{productError.message}</p>}

      {!isProductLoading && !productError && products?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 mx-auto">
          {products.map(({ id, name, price, image }) => (

            <ProductCard
              key={id}
              product={{
                id,
                name,
                price,
                image,
                quantity: 0
              }}
            />
          ))}
          {/* <p>My Product</p> */}
        </div>
      ) : (
        !isProductLoading && <p className="text-center">No products available</p>
      )}
    </div>
  );
};

export default NewArrival;
