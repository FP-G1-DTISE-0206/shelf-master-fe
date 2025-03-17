import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProductStock = async (accessToken: string, productId: number) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/product-stock/${productId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return data.data; 
};

const useProductStock = (accessToken: string, productId: number) => {
  return useQuery({
    queryKey: ["productStock", productId],
    queryFn: () => fetchProductStock(accessToken, productId),
    enabled: !!accessToken && !!productId, 
    staleTime: 1000 * 60 * 5, 
  });
};

export default useProductStock;
