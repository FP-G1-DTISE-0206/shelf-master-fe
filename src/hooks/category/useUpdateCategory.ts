import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UpdateCategoryRequest, CategoryResponse } from "@/types/category";
import { useToast } from "@/providers/ToastProvider";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";

const updateCategory = async (accessToken: string, id: string, updateData: UpdateCategoryRequest) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${id}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as CategoryResponse;
};

const useUpdateCategory = (accessToken: string) => {
  const { 
    setRefetchData, 
    setIsModalCategoryOpen,  
  } = useSidebarAdminStore();
  const { showToast } = useToast();
  const {
    mutate: updateCategoryMutate
  } = useMutation({
    mutationFn: ({ id, updateData }: { id: string, updateData: UpdateCategoryRequest }) =>
      updateCategory(accessToken, id, updateData),
    onSuccess: (data) => {
      showToast("Category updated successfully", "success");
      setIsModalCategoryOpen(false);
      setRefetchData(true);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      showToast("Error updating category", "error");
    },
  });

  return {
    updateCategory: updateCategoryMutate
  };
};

export default useUpdateCategory;