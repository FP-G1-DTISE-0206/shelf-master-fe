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
    },
    onError: (error: any) => {
      console.error("Error:", error);
      showToast(error.response.data.message, "error");
    },
  });

  return {
    reqStock: reqStockMutate,
  };
};

export default useRequestStock;