import CustomSpinner from "@/components/CustomSpinner";
import useUserAddress from "@/hooks/useUserAddress";
import { UserAddressResponse } from "@/types/address";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import ChangeAddressModal from "../ChangeAddressModal";
import { useFindClosest } from "@/hooks/useWarehouse";
import useCourier from "@/hooks/useCourier";
import { Pricing } from "@/types/biteship";
import GroupedCouriers from "../GroupedCouriers";

const dummyItems = [
  {
    name: "Shoes",
    description: "Black colored size 45",
    value: 199000,
    length: 30,
    width: 15,
    height: 20,
    weight: 200,
    quantity: 2,
  },
];

const ShippingSection: FC = () => {
  const { data: session } = useSession();
  const { error, isLoading, userAddress } = useUserAddress(
    session?.accessToken as string
  );
  const { closestWarehouse, setUserAddressId } = useFindClosest(
    session?.accessToken as string
  );

  const { couriers, setRequest, isLoading: isCourierLoading } = useCourier();

  const [defaultAddress, setDefaultAddress] =
    useState<UserAddressResponse | null>(null);
  const [isChangeAddressModalOpen, setIsChangeAddressModalOpen] =
    useState(false);
  const [choosenCourier, setChoosenCourier] = useState<Pricing | null>(null);

  useEffect(() => {
    if (userAddress?.length) {
      const defaultAddr = userAddress.find((address) => address.isDefault);
      setDefaultAddress(defaultAddr ?? null);
    }
  }, [userAddress]);

  useEffect(() => {
    if (defaultAddress) {
      setUserAddressId(defaultAddress.id);
    }
  }, [defaultAddress, setUserAddressId]);

  useEffect(() => {
    if (closestWarehouse && defaultAddress) {
      setRequest((prev) => ({
        ...prev,
        origin_area_id: closestWarehouse.areaId,
        destination_area_id: defaultAddress.areaId,
        origin_latitude: closestWarehouse.latitude,
        origin_longitude: closestWarehouse.longitude,
        destination_latitude: defaultAddress.latitude,
        destination_longitude: defaultAddress.longitude,
        items: dummyItems,
      }));
    }
  }, [closestWarehouse, defaultAddress, setRequest]);

  if (isLoading) return <CustomSpinner />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  if (!userAddress) return <p className="text-gray-500">No address found.</p>;

  const groupedCouriers = couriers?.pricing?.reduce((acc, row) => {
    if (!acc[row.courier_name]) {
      acc[row.courier_name] = [];
    }
    acc[row.courier_name].push(row);
    return acc;
  }, {} as Record<string, Pricing[]>);

  return (
    <>
      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Shipping Address</h2>
          <div className="mt-2 p-4 border rounded-lg bg-gray-50 shadow-sm">
            {defaultAddress && (
              <>
                <div className="flex justify-between items-start gap-4">
                  <div className="break-words">
                    <div className="font-semibold text-lg">
                      {defaultAddress.contactName}
                    </div>
                    <div className="text-shelf-grey text-sm">
                      {defaultAddress.contactNumber}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-shelf-grey text-sm">
                  <div>{defaultAddress.address}</div>
                  <div>
                    {defaultAddress.district}, {defaultAddress.city},{" "}
                    {defaultAddress.province}. {defaultAddress.postalCode}
                  </div>
                </div>
              </>
            )}
            <button
              onClick={() => setIsChangeAddressModalOpen(true)}
              className="mt-3 text-sm text-blue-600 font-medium hover:underline"
            >
              Change Address
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Closest Warehouse</h2>
          <div className="mt-2 p-3 border rounded-md bg-gray-50">
            {closestWarehouse && (
              <>
                <div>
                  {closestWarehouse.district}, {closestWarehouse.city},{" "}
                  {closestWarehouse.province}. {closestWarehouse.postalCode}
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Shipping Method</h2>
          <div className="mt-2 space-y-4">
            {isCourierLoading && <CustomSpinner />}
            {groupedCouriers && (
              <GroupedCouriers
                groupedCouriers={groupedCouriers}
                choosenCourier={choosenCourier}
                setChoosenCourier={setChoosenCourier}
              />
            )}
          </div>
        </div>
      </div>

      <ChangeAddressModal
        isChangeAddressModalOpen={isChangeAddressModalOpen}
        setIsChangeAddressModalOpen={setIsChangeAddressModalOpen}
        userAddress={userAddress}
        defaultAddress={defaultAddress}
        setDefaultAddress={setDefaultAddress}
      />
    </>
  );
};

export default ShippingSection;
