import { FC} from "react";
import ProductCard from "../ProductCard";

import { useSession } from "next-auth/react";
import useProduct from "@/hooks/product/useProduct";


interface Product {
  imageUrl: any;
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
}
const NewArrival: FC = () => {
  const { data: session } = useSession();
  const { isLoading, error, products } = useProduct(session?.accessToken ?? "");
  console.log("Product Data:", products);

  
  return (
    <div className="flex flex-col gap-8 max-xl:mt-4 max-xl:mb-4 mt-20 mb-28">
      <div className="max-xl:text-2xl text-7xl font-semibold text-center md:text-left">
        <p>Dont miss out new drops</p>
      </div>

      {/* Show loading state */}
      {isLoading && <p className="text-center">Loading products...</p>}

      {/* Show error message */}
      {error && <p className="text-center text-red-500">{error.message}</p>}

      {!isLoading && !error && products.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 mx-auto">      
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            images={product.image.imageUrl}
            discount={product.price > 500000 ? "10% off" : undefined}
            id={product.id}
          />
        ))}
        {/* <p>My Product</p> */}
      </div>
      ) : (
        !isLoading && <p className="text-center">No products available</p>
      )}
    </div>
  );
};

export default NewArrival;
