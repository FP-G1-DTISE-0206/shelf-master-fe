import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";

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
  const { 
    setRefetchData, 
    setIsDeletingCategory,  
  } = useSidebarAdminStore();
  const { showToast } = useToast();
  const {
    mutate: deleteCategoryMutate
  } = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteCategory(accessToken, id),
    onSuccess: () => {
      showToast("Category deleted successfully", "success");
      setIsDeletingCategory(false)
      setRefetchData(true);
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
    deleteCategory: deleteCategoryMutate
  };
};

export default useDeleteCategory;