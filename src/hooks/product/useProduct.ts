import { ProductResponse } from "@/types/product";
import { ResponseWithPagination } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";
import { AssignedWarehouse } from "@/types/product";

const fetchProduct = async (
  accessToken: string,
  page: number,
  length: number,
  field: string,
  order: string,
  search: string,
  categories: number[], 
  warehouse: AssignedWarehouse,
): Promise<ResponseWithPagination> => {
  const splittedCategory = [...categories.map(filter => `category=${filter}`)];
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?`
    + `start=${(page - 1) * length}&length=${length}`
    + `&field=${field}&order=${order}&search=${search}`
    + (warehouse.id === 0 ? "" : `&warehouseId=${warehouse.id}`)
    + `&${splittedCategory.join("&")}` ,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as ResponseWithPagination;
};

const useProduct = (accessToken: string, warehouse: AssignedWarehouse) => {
  const { page, length, field, order, search, filters } = useSearchSortPaginationStore();

  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchProduct", accessToken, page, length, field, order, search, filters, warehouse],
    queryFn: () =>
      fetchProduct(accessToken, page, length, field, order, search, filters, warehouse),
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