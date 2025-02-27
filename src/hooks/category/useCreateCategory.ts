import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateCategoryRequest, CategoryResponse } from "@/types/category";
import { useToast } from "@/providers/ToastProvider";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";

const createCategory = async (accessToken: string, creationData: CreateCategoryRequest) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
    creationData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as CategoryResponse;
};

const useCreateCategory = (accessToken: string) => {
  const { 
    setRefetchData, 
    setIsModalCategoryOpen,  
  } = useSidebarAdminStore();
  const { showToast } = useToast();
  const {
    mutate: createCategoryMutate,
  } = useMutation({
    mutationFn: ({ creationData }: { creationData: CreateCategoryRequest }) =>
      createCategory(accessToken, creationData),
    onSuccess: () => {
      showToast("Category created successfully", "success");
      setIsModalCategoryOpen(false);
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
    createCategory: createCategoryMutate,
  };
};

export default useCreateCategory;