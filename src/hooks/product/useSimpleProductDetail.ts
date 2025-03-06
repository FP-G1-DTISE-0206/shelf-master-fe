import { DetailProductResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSimpleProductDetail = async ( id:string ): Promise<DetailProductResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`,
  );
  return data.data as DetailProductResponse;
};

const useSimpleProductDetail = (id: string) => {
  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchSimpleProductDetail", id],
    queryFn: () =>
      fetchSimpleProductDetail(id),
  });

  return {
    isLoading,
    errorProductDetail: error,
    product: data,
    refetch,
  };
};

export default useSimpleProductDetail;