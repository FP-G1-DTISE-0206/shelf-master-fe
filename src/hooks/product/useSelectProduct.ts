"use client";
import { ProductResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const getProducts = async (
  accessToken: string,
  search: string
): Promise<ProductResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?start=0&length=5&search${search}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data.data as ProductResponse[];
};

const useSelectProduct = (accessToken: string) => {
  const [search, setSearch] = useState<string>("");
  const {
    isLoading,
    error,
    data: products,
    refetch,
  } = useQuery({
    queryKey: ["getProducts", accessToken, search],
    queryFn: async () => getProducts(accessToken, search),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    products,
    refetch,
    search,
    setSearch,
  };
};

export default useSelectProduct;
