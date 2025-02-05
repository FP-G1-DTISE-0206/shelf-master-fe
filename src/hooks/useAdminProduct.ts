import { ProductResponse } from "@/types/product";
import { ResponseWithPagination } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProductByAdmin = async (accessToken: string): Promise<ResponseWithPagination> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?start=0&length=10&field=id&order=asc&search=`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as ResponseWithPagination;
};

const useAdminProduct = (accessToken: string) => {
  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchProductByAdmin", accessToken],
    queryFn: async () => fetchProductByAdmin(accessToken),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    products: data?.data as ProductResponse[],
    totalData: data?.recordsFiltered,
    refetch,
  };
};
export default useAdminProduct;
