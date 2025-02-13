import { CategoryResponse } from "@/types/category";
import { ResponseWithPagination } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchPaginationStore } from "@/store/useSearchPaginationStore";

const fetchCategory = async (
  accessToken: string,
  page: number,
  length: number,
  search: string
): Promise<ResponseWithPagination> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category?`
    + `start=${(page - 1) * length}&length=${length}`
    + `&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as ResponseWithPagination;
};

const useProductCategory = (accessToken: string) => {
  const { page, length, search } = useSearchPaginationStore();

  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchCategory", accessToken, page, length, search],
    queryFn: () =>
      fetchCategory(accessToken, page, length, search),
  });

  return {
    isLoading,
    error,
    categories: data?.data as CategoryResponse[],
    totalData: data?.recordsFiltered,
    refetch,
  };
};

export default useProductCategory;