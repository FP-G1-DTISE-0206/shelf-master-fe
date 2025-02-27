"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MutationLogResponse } from "@/types/mutation";

const fetchLogs = async (
  accessToken: string,
  mutationId: number
): Promise<MutationLogResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/logs/${mutationId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as MutationLogResponse[];
};

const useMutationLogs = (accessToken: string, muationId: number) => {
  const {
    isLoading,
    error,
    data: logs,
    refetch,
  } = useQuery({
    queryKey: ["fetchLogs", accessToken, muationId],
    queryFn: async () => fetchLogs(accessToken, muationId),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    logs,
    refetch
  };
};

export default useMutationLogs;