"use client";
import { CategoryResponse } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const getCategories = async (
  accessToken: string,
  search: string
): Promise<CategoryResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category?start=0&length=5&search${search}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data.data as CategoryResponse[];
};

const useSelectProductCategory = (accessToken: string) => {
  const [search, setSearch] = useState<string>("");
  const {
    isLoading,
    error,
    data: categories,
    refetch,
  } = useQuery({
    queryKey: ["getCategories", accessToken, search],
    queryFn: async () => getCategories(accessToken, search),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    categories,
    refetch,
    search,
    setSearch,
  };
};

export default useSelectProductCategory;
