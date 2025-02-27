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
  const [isModalDefaultOpen, setIsModalDefaultOpen] = useState(false);
  const [isDefaultLoading, setIsDefaultLoading] = useState(false);
  const handleSetAsDefault = async (id: number) => {
    setIsDefaultLoading(true);
    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/address/${id}/set-default`,
        {},
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
      setIsModalDefaultOpen(false);
      setIsDefaultLoading(false);
    }
  };
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
      setIsModalDeleteOpen(false);
      setIsDeleteLoading(false);
    }
  };
  return (
    <>
      <div
        className={`border rounded-lg p-4 shadow-sm ${
          address.isDefault
            ? "border-shelf-black bg-gray-100"
            : "border-shelf-light-grey"
        }`}
      >
        <div className="flex justify-between items-center gap-4">
          <div className="break-words">
            <div className="font-semibold text-lg">{address.contactName}</div>
            <div className="text-shelf-grey">{address.contactNumber}</div>
          </div>
          <div className="flex items-center gap-3">
            {address.isDefault ? (
              <Badge color="success" className="px-3 py-1 rounded-full text-sm">
                Default
              </Badge>
            ) : (
              <Badge
                color="light"
                className="px-3 py-1 rounded-full text-sm hover:cursor-pointer"
                onClick={() => setIsModalDefaultOpen(true)}
              >
                Set as Default
              </Badge>
            )}
            <Link
              href={`/profile/edit-address/${address.id}`}
              className="hover:text-shelf-orange"
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="text-shelf-orange text-lg"
              />
            </Link>
            <FontAwesomeIcon
              onClick={() => setIsModalDeleteOpen(true)}
              icon={faTrash}
              className="text-shelf-grey text-lg hover:text-red-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-3 text-shelf-grey">
          <div className="text-base">{address.address}</div>
          <div className="text-sm">
            {address.district}, {address.city}, {address.province}.{" "}
            {address.postalCode}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={() => {
          handleDeleteAddress(address.id);
        }}
        isLoading={isDeleteLoading}
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
      <ConfirmationModal
        isOpen={isModalDefaultOpen}
        onClose={() => setIsModalDefaultOpen(false)}
        onConfirm={() => {
          handleSetAsDefault(address.id);
        }}
        isLoading={isDefaultLoading}
        title="Are you sure you want to set this address as default shipping address?"
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
    </>
  );
};
export default AddressCard;
