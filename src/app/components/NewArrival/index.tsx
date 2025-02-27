import { FC } from "react";
import ProductCard from "../ProductCard";
import products from "@/data/product";

const NewArrival: FC = () => {
  return (
    <div className="flex flex-col gap-8 max-xl:mt-4 max-xl:mb-4 mt-20 mb-28">
      <div className="max-xl:text-2xl text-7xl font-semibold text-center md:text-left">
        Don’t miss out new drops
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrival;