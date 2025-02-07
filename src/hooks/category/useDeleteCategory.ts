import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

const deleteCategory = async (accessToken: string, id: string) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

const useDeleteCategory = (accessToken: string) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    mutate: deleteCategoryMutate
  } = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteCategory(accessToken, id),
    onSuccess: () => {
      showToast("Category deleted successfully", "success");
      router.push("/products");
    },
    onError: (error: any) => {
      console.error("Error:", error);
      showToast("Error deleting category", "error");
    },
  });

  return {
    deleteCategory: deleteCategoryMutate
  };
};

export default useDeleteCategory;