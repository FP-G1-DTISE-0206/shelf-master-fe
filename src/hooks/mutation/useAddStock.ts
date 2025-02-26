import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AddProductStockRequest } from "@/types/mutation";
import { useToast } from "@/providers/ToastProvider";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";

const addStock = async (accessToken: string, creationData: AddProductStockRequest) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/add-stock`,
    creationData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data;
};

const useAddStock = (accessToken: string) => {
  const { showToast } = useToast();
  const { setRefetchData } = useSearchSortPaginationStore();
  const {
    mutate: addStockMutate,
  } = useMutation({
    mutationFn: ({ creationData }: { creationData: AddProductStockRequest }) =>
      addStock(accessToken, creationData),
    onSuccess: () => {
      showToast(`Stock added successfully`, "success");
      setRefetchData(true);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      showToast(error.response.data.message, "error");
    },
  });

  return {
    addStock: addStockMutate,
  };
};

export default useAddStock;