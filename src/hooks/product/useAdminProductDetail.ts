import { ProductResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProductDetailByAdmin = async (accessToken: string, id:string ): Promise<ProductResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as ProductResponse;
};

const useAdminProductDetail = (accessToken: string, id: string) => {
  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchProductDetailByAdmin", accessToken, id],
    queryFn: () =>
      fetchProductDetailByAdmin(accessToken, id),
  });

  return {
    isLoading,
    errorProductDetail: error,
    product: data,
    refetch,
  };
};

export default useAdminProductDetail;