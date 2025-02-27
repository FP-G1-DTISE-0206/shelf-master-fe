"use state";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useToast } from "@/providers/ToastProvider";
import { WarehouseResponse } from "@/types/warehouse";
import axios from "axios";
import { Button, TableCell, TableRow } from "flowbite-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";

interface WarehouseItemProps {
  warehouse: WarehouseResponse;
  refetch: () => void;
}
const WarehouseItem: FC<WarehouseItemProps> = ({ warehouse, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { data: session } = useSession();
  const { showToast } = useToast();
  const handleDeleteWarehouse = async (id: number) => {
    setIsDeleteLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse/${id}`,
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
      setIsModalOpen(false);
      setIsDeleteLoading(false);
      refetch();
    }
  };
  return (
    <>
      <TableRow key={warehouse.id}>
        <TableCell>{warehouse.id}</TableCell>
        <TableCell>{warehouse.name}</TableCell>
        <TableCell>
          {warehouse.admins.length === 0 && <>No assigned Admin.</>}
          {warehouse.admins.map((admin) => admin.email).join(", ")}
        </TableCell>
        <TableCell className="flex gap-2 justify-center">
          <Link href={`/warehouse/edit-warehouse/${warehouse.id}`}>
            <Button size="xs" color="blue">
              Edit
            </Button>
          </Link>

          <Button
            size="xs"
            color="red"
            className="ml-2"
            onClick={() => setIsModalOpen(true)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <ConfirmationModal
        isLoading={isDeleteLoading}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleDeleteWarehouse(warehouse.id);
        }}
        title="Confirm Deletion"
        message={
          <>
            <div>Are you sure you want to delete this warehouse?</div>
            <div className="bg-shelf-light-grey text-center p-2 rounded-lg">
              <div>{warehouse.name}</div>
            </div>
          </>
        }
      />
    </>
  );
};
export default WarehouseItem;
