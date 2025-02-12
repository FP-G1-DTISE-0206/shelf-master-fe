"use client";
import CustomSpinner from "@/components/CustomSpinner";
import useUserAddress from "@/hooks/useUserAddress";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect } from "react";
import AddressCard from "../AddressCard";

const AddressSection: FC = () => {
  const { data: session } = useSession();

  const { error, isLoading, userAddress, refetch } = useUserAddress(
    session?.accessToken as string
  );
  useEffect(() => {
    refetch();
  }, []);
  if (isLoading) return <CustomSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="bg-shelf-white rounded-xl w-full">
      <div className="mx-6 my-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="text-lg font-medium text-shelf-black">Address</div>
          {userAddress && userAddress?.length < 5 ? (
            <Link
              href="/profile/create-address"
              className="text-lg font-medium text-shelf-white bg-shelf-blue rounded-lg py-1 px-2"
            >
              Create Address
            </Link>
          ) : (
            <button
              disabled
              className="text-lg font-medium text-shelf-white bg-shelf-grey rounded-lg py-1 px-2"
            >
              Max 5 Address
            </button>
          )}
        </div>
        <div className="max-h-[500px] overflow-y-auto flex flex-col gap-2">
          {userAddress?.length === 0 ? (
            <div>
              <div className="text-center text-lg font-medium text-shelf-black">
                No addresses found.
              </div>
            </div>
          ) : (
            userAddress?.map((address) => (
              <AddressCard
                address={address}
                key={address.id}
                refetch={refetch}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default AddressSection;
