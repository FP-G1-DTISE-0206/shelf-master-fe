"use client";
import { PromotionResponse } from "@/types/promotion";
import { Button, TableCell, TableRow } from "flowbite-react";
import Image from "next/image";
import { FC, useState } from "react";
import EditPromotionModal from "../EditPromotionModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useSession } from "next-auth/react";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
interface PromotionItemProps {
  promotion: PromotionResponse;
  refetch: () => void;
}
const PromotionItem: FC<PromotionItemProps> = ({ promotion, refetch }) => {
  const [openModalEditPromotion, setOpenModalEditPromotion] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { data: session } = useSession();
  const { showToast } = useToast();
  const handleDeletePromotion = async (id: number) => {
    setIsDeleteLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/promotion/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (data.success) {
        showToast(data.message, "success");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    } finally {
      setIsDeleteModalOpen(false);
      setIsDeleteLoading(false);
      refetch();
    }
  };
  return (
    <>
      <TableRow key={promotion.id}>
        <TableCell>{promotion.id}</TableCell>
        <TableCell>{promotion.title}</TableCell>
        <TableCell>{promotion.description}</TableCell>
        <TableCell>
          <Image
            src={promotion.imageUrl}
            alt={promotion.title}
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />
        </TableCell>
        <TableCell>
          <div className="flex gap-2 justify-center">
            <Button
              size="xs"
              color="blue"
              onClick={() => {
                setOpenModalEditPromotion(true);
              }}
            >
              Edit
            </Button>
            <Button
              size="xs"
              color="red"
              className="ml-2"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <EditPromotionModal
        refetch={refetch}
        openModalEditPromotion={openModalEditPromotion}
        setOpenModalEditPromotion={setOpenModalEditPromotion}
        promotion={promotion}
      />

      <ConfirmationModal
        isLoading={isDeleteLoading}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeletePromotion(promotion.id);
        }}
        title="Confirm Deletion"
        message={
          <div className="flex flex-col gap-2">
            <div>Are you sure you want to delete this Promotion?</div>
            <div className="bg-shelf-light-grey text-center p-2 rounded-lg">
              <div>{promotion.title}</div>
            </div>
          </div>
        }
      />
    </>
  );
};
export default PromotionItem;
