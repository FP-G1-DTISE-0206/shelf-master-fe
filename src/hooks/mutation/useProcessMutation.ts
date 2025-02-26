import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import { RejectionReasonRequest } from '@/types/mutation';

const cancelMutation = async (accessToken: string, mutationId: number) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/cancel/${mutationId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data;
};

const rejectMutation = async (accessToken: string, mutationId: number, dataCreation: RejectionReasonRequest) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/reject/${mutationId}`,
    dataCreation,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data;
};

const approveMutation = async (accessToken: string, mutationId: number) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/approve/${mutationId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data;
};

const useProcessMutation = (accessToken: string, refetch: () => void) => {
  const { showToast } = useToast();
  const {
    mutate: cancelMutate,
  } = useMutation({
    mutationFn: ({ mutationId }: { mutationId: number}) =>
      cancelMutation(accessToken, mutationId),
    onSuccess: () => {
      showToast(`Mutation canceled successfully`, "success");
      refetch();
    },
    onError: (error: any) => {
      showToast(error.response.data.message, "error");
    },
  });

  const {
    mutate: rejectMutate,
  } = useMutation({
    mutationFn: ({ mutationId, data }: { mutationId: number, data: RejectionReasonRequest }) =>
      rejectMutation(accessToken, mutationId, data),
    onSuccess: () => {
      showToast(`Mutation rejected successfully`, "success");
      refetch();
    },
    onError: (error: any) => {
      showToast(error.response.data.message, "error");
    },
  });

  const {
    mutate: approveMutate,
  } = useMutation({
    mutationFn: ({ mutationId }: { mutationId: number }) =>
      approveMutation(accessToken, mutationId),
    onSuccess: () => {
      showToast(`Mutation approved successfully`, "success");
      refetch();
    },
    onError: (error: any) => {
      showToast(error.response.data.message, "error");
    },
  });

  return {
    cancelMutation: cancelMutate,
    rejectMutation: rejectMutate,
    approveMutation: approveMutate,
  };
};

export default useProcessMutation;