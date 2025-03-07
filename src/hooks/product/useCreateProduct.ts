import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateProductRequest, CreateProductResponse } from "@/types/product";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

const createProduct = async (accessToken: string, creationData: CreateProductRequest) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product`,
    creationData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as CreateProductResponse;
};

const useCreateProduct = (accessToken: string) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    mutate: createProductMutate,
  } = useMutation({
    mutationFn: ({ creationData }: { creationData: CreateProductRequest }) =>
      createProduct(accessToken, creationData),
    onSuccess: (data) => {
      showToast(`Product '${data?.name}' created successfully`, "success");
      router.push("/update-product/" + data?.id );
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        (error instanceof Error ? error.message : "An unknown error occurred");
      showToast(message, "error");
    },
  });

  return {
    createProduct: createProductMutate,
  };
};

export default useCreateProduct;