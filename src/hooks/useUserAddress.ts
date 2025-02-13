import { UserAddressResponse } from "@/types/address";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserAddress = async (
  accessToken: string
): Promise<UserAddressResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/address`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as UserAddressResponse[];
};

const useUserAddress = (accessToken: string) => {
  const {
    isLoading,
    error,
    data: userAddress,
    refetch,
  } = useQuery({
    queryKey: ["fetchUserAddress", accessToken],
    queryFn: async () => fetchUserAddress(accessToken),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    userAddress,
    refetch,
  };
};

const fetchSingleUserAddress = async (
  accessToken: string,
  id: number
): Promise<UserAddressResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/address/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as UserAddressResponse;
};

export const useSingleUserAddress = (accessToken: string, id: number) => {
  const {
    isLoading,
    error,
    data: singleUserAddress,
    refetch,
  } = useQuery({
    queryKey: ["fetchSingleUserAddress", accessToken, id],
    queryFn: async () => fetchSingleUserAddress(accessToken, id),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    singleUserAddress,
    refetch,
  };
};
export default useUserAddress;
