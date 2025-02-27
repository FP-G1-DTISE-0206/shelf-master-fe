"use client"
import { FC, useEffect } from "react";
import ProductCard from "../ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import useProductSuggestion from "@/hooks/product/useProductSuggestion";

interface ProductSuggestionProps {
  category: number[];
}

const ProductSuggestion: FC<ProductSuggestionProps> = ({
  category,
}) => {
  const { data: session } = useSession();
  const { 
    products, error, isLoading, params, setParams,
  } = useProductSuggestion(session?.accessToken as string);

  useEffect(() => {
    setParams({...params, category: category })
  }, [])

  if(error) return (<></>)
  if(isLoading || !products || products?.data.length < 0) return (<></>)

  return(
    <>
      <div className="pt-7">
        <div className="flex justify-between pb-6">
          <h2 className="text-2xl font-semibold lg:text-5xl">You may also like</h2>
          <div className="flex gap-2">
            <FontAwesomeIcon icon={faChevronLeft} className="text-base w-8 h-8 bg-shelf-grey text-shelf-white rounded-lg py-2"/>
            <FontAwesomeIcon icon={faChevronRight} className="text-base w-8 h-8 bg-shelf-black text-shelf-white rounded-lg py-2" />
          </div>
        </div>

        <div className="pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 py-6 justify-center">
          {products.data.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
          <div className="flex gap-2 justify-center">
            <div className="w-8 h-1 bg-shelf-blue rounded"></div>
            <div className="w-8 h-1 bg-shelf-grey rounded"></div>
            <div className="w-8 h-1 bg-shelf-grey rounded"></div>
            <div className="w-8 h-1 bg-shelf-grey rounded"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSuggestion