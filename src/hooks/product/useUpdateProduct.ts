import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UpdateProductRequest, ProductResponse } from "@/types/product";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

const updateProduct = async (accessToken: string, id: string, updateData: UpdateProductRequest) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as ProductResponse;
};

const useUpdateProduct = (accessToken: string) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    mutate: updateProductMutate
  } = useMutation({
    mutationFn: ({ id, updateData }: { id: string, updateData: UpdateProductRequest }) =>
      updateProduct(accessToken, id, updateData),
    onSuccess: (data) => {
      showToast("Product updated successfully", "success");
      router.push("/update-product/" + data?.id );
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response: { data: { message: string } } };
        showToast(err.response.data.message, "error");
      } else {
        showToast("An unknown error occurred", "error");
      }
    },
  });

  return {
    updateProduct: updateProductMutate
  };
};

export default useUpdateProduct;