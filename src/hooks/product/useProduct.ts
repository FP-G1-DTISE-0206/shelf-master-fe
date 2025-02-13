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
  search: string,
  categories: number[], 
): Promise<ResponseWithPagination> => {
  const splittedCategory = [...categories.map(filter => `category=${filter}`)];
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?`
    + `start=${(page - 1) * length}&length=${length}`
    + `&field=${field}&order=${order}&search=${search}`
    + `&${splittedCategory.join("&")}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as ResponseWithPagination;
};

const useProduct = (accessToken: string) => {
  const { page, length, field, order, search, filters } = useSearchSortPaginationStore();

  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchProduct", accessToken, page, length, field, order, search, filters],
    queryFn: () =>
      fetchProduct(accessToken, page, length, field, order, search, filters),
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