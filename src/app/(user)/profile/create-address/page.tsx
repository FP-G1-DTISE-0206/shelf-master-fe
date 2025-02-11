"use client";
import { FC, useState } from "react";
import { AreaOption } from "../components/BiteshipSearch";
import UserAddressForm from "../components/UserAddressForm";

interface AddressFormValues {
  contactName: string;
  contactNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  biteshipArea: AreaOption | null;
}

const CreateAddressPage: FC = () => {
  const [selectedArea, setSelectedArea] = useState<AreaOption | null>(null);
  const initialValues: AddressFormValues = {
    contactName: "",
    contactNumber: "",
    address: "",
    latitude: 0,
    longitude: 0,
    biteshipArea: null,
  };

  const handleSubmit = (values: AddressFormValues) => {
    const finalValues = {
      contactName: values.contactName,
      contactNumber: values.contactNumber,
      address: values.address,
      latitude: values.latitude,
      longitude: values.longitude,
      province: selectedArea?.administrative_division_level_1_name,
      city: selectedArea?.administrative_division_level_2_name,
      district: selectedArea?.administrative_division_level_3_name,
      postalCode: selectedArea?.postal_code,
      areaId: selectedArea?.id,
    };
    console.log("Form Data:", finalValues);
    alert("Form submitted successfully!");
  };
  return (
    <div className="flex flex-col gap-5 p-6 w-full md:w-1/2 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">
        Create New Address
      </h2>

      <UserAddressForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        setSelectedArea={setSelectedArea}
        selectedArea={selectedArea}
      />
    </div>
  );
};
export default CreateAddressPage;
