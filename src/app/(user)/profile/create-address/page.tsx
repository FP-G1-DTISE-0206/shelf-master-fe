"use client";
import { FC, useState } from "react";
import { AreaOption } from "../components/BiteshipSearch";
import UserAddressForm from "../components/UserAddressForm";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import { useSession } from "next-auth/react";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

interface AddressFormValues {
  contactName: string;
  contactNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  biteshipArea: AreaOption | null;
}

const CreateAddressPage: FC = () => {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const router = useRouter();
  const [selectedArea, setSelectedArea] = useState<AreaOption | null>(null);

  const initialValues: AddressFormValues = {
    contactName: "",
    contactNumber: "",
    address: "",
    latitude: 0,
    longitude: 0,
    biteshipArea: null,
  };

  const handleSubmit = async (
    values: AddressFormValues,
    formikHelpers: FormikHelpers<AddressFormValues>
  ) => {
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
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/address`,
        {
          ...finalValues,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (data.success) {
        showToast(data.message, "success");
        formikHelpers.resetForm();
        router.push("/profile");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    }
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
