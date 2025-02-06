import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

const deleteProduct = async (accessToken: string, id: string) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

const useDeleteProduct = (accessToken: string) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    mutate: deleteProductMutate
  } = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteProduct(accessToken, id),
    onSuccess: () => {
      showToast("Product deleted successfully", "success");
      router.push("/products");
    },
    onError: (error: any) => {
      console.error("Error:", error);
      showToast("Error deleting product", "error");
    },
  });

  return {
    deleteProduct: deleteProductMutate
  };
};

export default useDeleteProduct;