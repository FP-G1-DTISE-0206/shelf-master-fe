"use client";
import { PaginationRequest, PaginationResponse } from "@/types/pagination";
import { Admin } from "@/types/warehouse";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchAdmins = async (
  accessToken: string,
  params: PaginationRequest
): Promise<PaginationResponse<Admin>> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return data.data as PaginationResponse<Admin>;
};

const useAdmins = (accessToken: string) => {
  const [params, setParams] = useState<PaginationRequest>({
    start: 0,
    length: 10,
    search: "",
    field: "id",
    order: "desc",
  });
  const {
    isLoading,
    error,
    data: admins,
    refetch,
  } = useQuery({
    queryKey: ["fetchAdmins", accessToken, params],
    queryFn: async () => fetchAdmins(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    admins,
    refetch,
    params,
    setParams,
  };
};

export default useAdmins;
