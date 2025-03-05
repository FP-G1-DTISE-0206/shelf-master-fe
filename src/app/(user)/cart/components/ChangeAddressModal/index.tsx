import { UserAddressResponse } from "@/types/address";
import { Button, Modal, Radio } from "flowbite-react";
import { FC, useEffect, useState } from "react";
interface ChangeAddressModalProps {
  isChangeAddressModalOpen: boolean;
  setIsChangeAddressModalOpen: (value: boolean) => void;
  userAddress: UserAddressResponse[] | [];
  defaultAddress: UserAddressResponse | null;
  setDefaultAddress: (value: UserAddressResponse | null) => void;
}
const ChangeAddressModal: FC<ChangeAddressModalProps> = ({
  isChangeAddressModalOpen,
  setIsChangeAddressModalOpen,
  userAddress,
  defaultAddress,
  setDefaultAddress,
}) => {
  const [choosenAddress, setChoosenAddress] =
    useState<UserAddressResponse | null>(defaultAddress);
  const handleChangeAddress = () => {
    if (choosenAddress) {
      setDefaultAddress(choosenAddress);
    }
    setIsChangeAddressModalOpen(false);
  };
  useEffect(() => {
    if (defaultAddress) {
      setChoosenAddress(defaultAddress);
    }
  }, [defaultAddress]);
  return (
    <Modal
      show={isChangeAddressModalOpen}
      onClose={() => setIsChangeAddressModalOpen(false)}
    >
      <Modal.Header>Change shipping address</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-2">
          {userAddress.length === 0 && <div>No addresses found.</div>}
          {userAddress.map((address) => (
            <div
              key={address.id}
              className={`w-full border rounded-lg shadow-sm bg-white p-5 flex gap-5 items-center cursor-pointer ${
                address === choosenAddress ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setChoosenAddress(address)}
            >
              <Radio
                name="address"
                onClick={(event) => event.stopPropagation()}
                checked={address === choosenAddress}
                readOnly
              />
              <div>
                <div className="flex justify-between items-start gap-4">
                  <div className="break-words">
                    <div className="font-semibold text-lg">
                      {address.contactName}
                    </div>
                    <div className="text-shelf-grey text-sm">
                      {address.contactNumber}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-shelf-grey text-sm">
                  <div>{address.address}</div>
                  <div>
                    {address.district}, {address.city}, {address.province}.{" "}
                    {address.postalCode}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        <Button
          color="light"
          className="rounded-lg border"
          onClick={() => setIsChangeAddressModalOpen(false)}
        >
          Decline
        </Button>
        <Button
          color="warning"
          className="rounded-lg flex gap-2 items-center"
          onClick={() => {
            handleChangeAddress();
          }}
        >
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ChangeAddressModal;
