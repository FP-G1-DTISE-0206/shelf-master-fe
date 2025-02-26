"use client";
import { MutationTypeResponse } from "@/types/mutation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMutationType = async (
  accessToken: string
): Promise<MutationTypeResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/type`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as MutationTypeResponse[];
};

const useMutationType = (accessToken: string) => {
  const {
    isLoading,
    error,
    data: types,
    refetch,
  } = useQuery({
    queryKey: ["fetchMutationType", accessToken],
    queryFn: async () => fetchMutationType(accessToken),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isTypeLoading: isLoading,
    fetchTypeError: error,
    types,
    refetchType: refetch,
  };
};

export default useMutationType;
