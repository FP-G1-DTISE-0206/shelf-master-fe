import { DetailProductResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProductDetail = async (accessToken: string, id:string ): Promise<DetailProductResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as DetailProductResponse;
};

const useProductDetail = (accessToken: string, id: string) => {
  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchProductDetail", accessToken, id],
    queryFn: () =>
      fetchProductDetail(accessToken, id),
  });

  return {
    isLoading,
    errorProductDetail: error,
    product: data,
    refetch,
  };
};

export default useProductDetail;