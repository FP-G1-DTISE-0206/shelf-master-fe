import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { InternalProductMutationRequest } from "@/types/mutation";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

const reqStock = async (accessToken: string, creationData: InternalProductMutationRequest) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/create-mutation`,
    creationData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data;
};

const useRequestStock = (accessToken: string) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    mutate: reqStockMutate,
  } = useMutation({
    mutationFn: ({ creationData }: { creationData: InternalProductMutationRequest }) =>
      reqStock(accessToken, creationData),
    onSuccess: (data) => {
      showToast(`Mutation with ID: ${data} created successfully`, "success");
      router.push("/product-mutation");
      router.refresh();
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        (error instanceof Error ? error.message : "An unknown error occurred");
      showToast(message, "error");
    },
  });

  return {
    reqStock: reqStockMutate,
  };
};

export default useRequestStock;