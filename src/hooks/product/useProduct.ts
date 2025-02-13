import { ProductResponse } from "@/types/product";
import { ResponseWithPagination } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";

const fetchProduct = async (
  accessToken: string,
  page: number,
  length: number,
  field: string,
  order: string,
  search: string
): Promise<ResponseWithPagination> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?`
    + `start=${(page - 1) * length}&length=${length}`
    + `&field=${field}&order=${order}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as ResponseWithPagination;
};

const useProduct = (accessToken: string) => {
  const { page, length, field, order, search } = useSearchSortPaginationStore();

  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchProduct", accessToken, page, length, field, order, search],
    queryFn: () =>
      fetchProduct(accessToken, page, length, field, order, search),
  });

  return {
    isLoading,
    error,
    products: data?.data as ProductResponse[],
    totalData: data?.recordsFiltered,
    refetch,
  };
};

export default useProduct;