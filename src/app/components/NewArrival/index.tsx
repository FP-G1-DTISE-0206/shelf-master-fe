import { FC } from "react";
import ProductCard from "../ProductCard";

const NewArrival: FC = () => {
  return (
    <>
      <div className="flex flex-col gap-8 max-xl:mt-4 max-xl:mb-4 mt-20 mb-32">
        <div className="max-xl:text-2xl text-7xl font-semibold">
          Don’t miss out new drops
        </div>
        <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-3 grid-cols-4 max-sm:gap-2 gap-4 mx-auto">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </>
  );
};

export default NewArrival;
