"use client";
import { FC, useEffect, useRef, useState } from "react";
import ProductCard from "../ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import useProductSuggestion from "@/hooks/product/useProductSuggestion";

interface ProductSuggestionProps {
  category: number[];
  exceptProductId: number | null;
}

const ProductSuggestion: FC<ProductSuggestionProps> = ({ category, exceptProductId }) => {
  const { data: session } = useSession();
  const { products, error, isLoading, params, setParams } = useProductSuggestion(session?.accessToken as string);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    setParams({ ...params, category });
  }, [category]);

  const filteredProducts = products?.data?.filter((product) => 
    exceptProductId !== null ? product.id !== exceptProductId : true
  ) || [];

  useEffect(() => {
    if (filteredProducts.length > 4) {
      setShowCarousel(true);
    } else {
      setShowCarousel(false);
    }
  }, [filteredProducts.length]);

  if (error || isLoading || filteredProducts.length === 0) return null;

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="pt-7">
      <div className="flex justify-between pb-6">
        <h2 className="text-2xl font-semibold lg:text-5xl">You may also like</h2>
        {showCarousel && (
          <div className="flex gap-2">
            <button title="left" onClick={() => scrollCarousel("left")} className="p-2 bg-shelf-grey text-shelf-white rounded-lg">
              <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
            </button>
            <button title="right" onClick={() => scrollCarousel("right")} className="p-2 bg-shelf-black text-shelf-white rounded-lg">
              <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      <div className="pb-6">
        {showCarousel ? (
          <div className="relative overflow-hidden">
            <div ref={carouselRef} className="flex space-x-4 overflow-x-scroll scrollbar-hide">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex-none w-64">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 py-6">
            {filteredProducts
              .filter((product) => product.id !== exceptProductId)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSuggestion;
