import { ProductResponse } from "@/types/product";
import { ResponseWithPagination } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";

const fetchProductByAdmin = async (
  accessToken: string,
  currentPage: number,
  itemsPerPage: number,
  field: string,
  order: string,
  search: string
): Promise<ResponseWithPagination> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?`
    + `start=${(currentPage - 1) * itemsPerPage}&length=${itemsPerPage}`
    + `&field=${field}&order=${order}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as ResponseWithPagination;
};

const useAdminProduct = (accessToken: string) => {
  const { page, length, field, order, search } = useSearchSortPaginationStore();

  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchProductByAdmin", accessToken, page, length, field, order, search],
    queryFn: () =>
      fetchProductByAdmin(accessToken, page, length, field, order, search),
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