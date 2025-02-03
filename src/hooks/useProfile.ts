import { ProfileResponse } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProfile = async (accessToken: string): Promise<ProfileResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as ProfileResponse;
};

const useProfile = (accessToken: string) => {
  const {
    isLoading,
    error,
    data: profile,
    refetch,
  } = useQuery({
    queryKey: ["fetchProfile", accessToken],
    queryFn: async () => fetchProfile(accessToken),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    profile,
    refetch,
  };
};
export default useProfile;
