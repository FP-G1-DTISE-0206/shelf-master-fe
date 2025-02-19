"use state";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useToast } from "@/providers/ToastProvider";
import { Admin } from "@/types/warehouse";
import axios from "axios";
import { Button, TableCell, TableRow } from "flowbite-react";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import ChangePasswordModal from "../ChangePasswordModal";

interface WarehouseItemProps {
  admin: Admin;
  refetch: () => void;
}
const AdminItem: FC<WarehouseItemProps> = ({ admin, refetch }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const { data: session } = useSession();
  const { showToast } = useToast();
  const handleDeleteWarehouse = async (id: number) => {
    setIsDeleteLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/delete/${id}`,
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
      <TableRow key={admin.id}>
        <TableCell>{admin.id}</TableCell>
        <TableCell>{admin.userName}</TableCell>
        <TableCell>{admin.email}</TableCell>
        <TableCell className="flex gap-2 justify-center">
          <Button
            size="xs"
            color="blue"
            onClick={() => {
              setIsChangePasswordModalOpen(true);
            }}
          >
            Change Password
          </Button>
          <Button
            size="xs"
            color="red"
            className="ml-2"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <ChangePasswordModal
        refetch={refetch}
        isChangePasswordModalOpen={isChangePasswordModalOpen}
        setIsChangePasswordModalOpen={setIsChangePasswordModalOpen}
        admin={admin}
      />
      <ConfirmationModal
        isLoading={isDeleteLoading}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeleteWarehouse(admin.id);
        }}
        title="Confirm Deletion"
        message={
          <>
            <div>Are you sure you want to delete this Admin?</div>
            <div className="bg-shelf-light-grey text-center p-2 rounded-lg">
              <div>{admin.email}</div>
            </div>
          </>
        }
      />
    </>
  );
};
export default AdminItem;
