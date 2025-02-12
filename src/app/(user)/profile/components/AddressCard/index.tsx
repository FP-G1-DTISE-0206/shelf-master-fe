import ConfirmationModal from "@/components/ConfirmationModal";
import { useToast } from "@/providers/ToastProvider";
import { UserAddressResponse } from "@/types/address";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Badge } from "flowbite-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
interface AddressCardProps {
  address: UserAddressResponse;
  refetch: () => void;
}

const AddressCard: FC<AddressCardProps> = ({ address, refetch }) => {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const handleDeleteAddress = async (id: number) => {
    setIsDeleteLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/address/${id}`,
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
      refetch();
      setIsDeleteLoading(false);
    }
  };
  return (
    <div
      key={address.id}
      className="border rounded-lg border-shelf-light-grey p-2"
    >
      <div className="flex justify-between gap-2">
        <div className="break-words">
          <div>{address.contactName}</div>
          <div>{address.contactNumber}</div>
        </div>
        <div className="flex gap-2 items-center">
          {address.isDefault ? (
            <Badge color="success" className="text-center">
              Default
            </Badge>
          ) : (
            <Badge color="light" className="text-center">
              Set as default
            </Badge>
          )}
          <Link href={`/profile/edit-address/${address.id}`}>
            <FontAwesomeIcon icon={faEdit} className="text-shelf-orange " />
          </Link>
          <FontAwesomeIcon
            onClick={() => setIsModalDeleteOpen(true)}
            icon={faTrash}
            className="text-shelf-grey "
          />
        </div>
      </div>
      <div>
        {address.district}, {address.city}, {address.province}.{" "}
        {address.postalCode}
      </div>
      <div>{address.address}</div>
      <ConfirmationModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={() => {
          handleDeleteAddress(address.id);
        }}
        // isLoading={}
        title="Are you sure you want to delete this address?"
        message={
          <div className="bg-shelf-light-grey text-start p-2 rounded-lg">
            <div>{address.contactName}</div>
            <div>{address.contactNumber}</div>
            <div>
              {address.district}, {address.city}, {address.province}.{" "}
              {address.postalCode}
            </div>
            <div>{address.address}</div>
          </div>
        }
      />
    </div>
  );
};
export default AddressCard;
