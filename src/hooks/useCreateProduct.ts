import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateProductRequest, ProductResponse } from "@/types/product";

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
  const {
    mutate: createProductMutate,
    error,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: ({ creationData }: { creationData: CreateProductRequest }) =>
      createProduct(accessToken, creationData),
  });

  return {
    createProduct: createProductMutate,
    error,
    data,
    isSuccess,
  };
};

export default useCreateProduct;