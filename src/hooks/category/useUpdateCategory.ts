import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UpdateCategoryRequest, CategoryResponse } from "@/types/category";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";

const updateCategory = async (accessToken: string, id: string, updateData: UpdateCategoryRequest) => {
  const { data } = await axios.patch(
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
    setIsModalCategoryOpen,  
  } = useSidebarAdminStore();
  const { showToast } = useToast();
  const router = useRouter();
  const {
    mutate: updateCategoryMutate
  } = useMutation({
    mutationFn: ({ id, updateData }: { id: string, updateData: UpdateCategoryRequest }) =>
      updateCategory(accessToken, id, updateData),
    onSuccess: (data) => {
      showToast("Category updated successfully", "success");
      setIsModalCategoryOpen(false);
      router.push("/products" );
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