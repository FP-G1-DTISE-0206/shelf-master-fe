import { CourierRequest, CourierResponse } from "@/types/biteship";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchCourier = async (
  request: CourierRequest
): Promise<CourierResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BITESHIP_URL}/v1/rates/couriers`,
    request,
    {
      headers: {
        authorization: process.env.NEXT_PUBLIC_BITESHIP_KEY,
      },
    }
  );
  return data as CourierResponse;
};

const useCourier = () => {
  const [request, setRequest] = useState<CourierRequest>({
    origin_area_id: "",
    destination_area_id: "",
    origin_latitude: null,
    origin_longitude: null,
    destination_latitude: null,
    destination_longitude: null,
    couriers: "paxel,jne,sicepat,gojek,grab",
    items: [],
  });

  const isRequestValid = Boolean(
    request.origin_area_id &&
      request.destination_area_id &&
      request.items.length > 0 &&
      request.origin_latitude &&
      request.origin_longitude &&
      request.destination_latitude &&
      request.destination_longitude
  );

  const {
    isLoading,
    error,
    data: couriers,
    refetch,
  } = useQuery<CourierResponse>({
    queryKey: ["fetchCourier", request],
    queryFn: async () => fetchCourier(request),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
    enabled: isRequestValid,
  });

  return {
    isLoading,
    error,
    couriers,
    refetch,
    request,
    setRequest,
  };
};

export default useCourier;
