import { FC } from "react";
import ProductCard from "../ProductCard";
import products from "@/data/product";

const NewArrival: FC = () => {
  return (
    <div className="flex flex-col gap-8 max-xl:mt-4 max-xl:mb-4 mt-20 mb-28">
      <div className="max-xl:text-2xl text-7xl font-semibold text-center md:text-left">
        Don’t miss out new drops
      </div>
      <div className="grid max-sm:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 max-sm:gap-2 gap-4 max-lg:mx-auto">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            images={product.images}
            discount={product.price > 100 ? "10% off" : undefined} // Optional dynamic discount logic
            id={product.id}          />
        ))}
      </div>
    </div>
  );
};

export default NewArrival;

// import { FC } from "react";
// import ProductCard from "../ProductCard";

// const NewArrival: FC = () => {
//   return (
//     <>
//       <div className="flex flex-col gap-8 max-xl:mt-4 max-xl:mb-4 mt-20 mb-28">
//         <div className="max-xl:text-2xl text-7xl font-semibold text-center md:text-left">
//           Don’t miss out new drops
//         </div>
//         <div className="grid max-sm:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 max-sm:gap-2 gap-4 max-lg:mx-auto">
//           <ProductCard />
//           <ProductCard />
//           <ProductCard />
//           <ProductCard />
//         </div>
//       </div>
//     </>
//   );
// };

// export default NewArrival;
