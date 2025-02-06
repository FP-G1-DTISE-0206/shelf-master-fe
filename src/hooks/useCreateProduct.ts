import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateProductRequest, ProductResponse } from "@/types/product";
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
  return data.data as ProductResponse;
};

const useCreateProduct = (accessToken: string) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    mutate: createProductMutate,
    data
  } = useMutation({
    mutationFn: ({ creationData }: { creationData: CreateProductRequest }) =>
      createProduct(accessToken, creationData),
    onSuccess: (data) => {
      showToast("Product created successfully", "success");
      router.push("/products/detail/" + data?.id );
    },
    onError: (error: any) => {
      console.error("Error:", error);
      showToast("Error creating product", "error");
    },
  });

  return {
    createProduct: createProductMutate,
    data
  };
};

export default useCreateProduct;