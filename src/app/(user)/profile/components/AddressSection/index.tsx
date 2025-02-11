import CustomSpinner from "@/components/CustomSpinner";
import useUserAddress from "@/hooks/useUserAddress";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "flowbite-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

const AddressSection: FC = () => {
  const { data: session } = useSession();

  const { error, isLoading, userAddress, refetch } = useUserAddress(
    session?.accessToken as string
  );
  if (isLoading) return <CustomSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="bg-shelf-white rounded-xl w-full">
      <div className="mx-6 my-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="text-lg font-medium text-shelf-black">Address</div>
          <Link
            href="/profile/create-address"
            className="text-lg font-medium text-shelf-white bg-shelf-blue rounded-lg py-1 px-2"
          >
            Create Address
          </Link>
        </div>
        {userAddress?.map((address) => (
          <div
            key={address.id}
            className="border rounded-lg border-shelf-light-grey p-2"
          >
            <div className="flex justify-between gap-2">
              <div>
                <div>{address.contactName}</div>
                <div>{address.contactNumber}</div>
              </div>
              <div className="flex gap-2 items-start">
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
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-shelf-orange "
                  />
                </Link>
                <Link href={`/profile/delete-address/${address.id}`}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-shelf-grey "
                  />
                </Link>
              </div>
            </div>
            <div>
              {address.district}, {address.city}, {address.province}.{" "}
              {address.postalCode}
            </div>
            <div>{address.address}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AddressSection;
