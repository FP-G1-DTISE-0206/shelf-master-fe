"use client";
import { FC, use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useSingleUserAddress } from "@/hooks/useUserAddress";
import { useSession } from "next-auth/react";
import CustomSpinner from "@/components/CustomSpinner";
import { AreaOption } from "../../components/BiteshipSearch";
import UserAddressForm, {
  AddressFormValues,
} from "../../components/UserAddressForm";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import { FormikHelpers } from "formik";

interface PageProps {
  params: Promise<{ id: string }>; // params is a Promise<{ id: string }>
}

const EditAddressPage: FC<PageProps> = ({ params }) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  if (!id) {
    notFound(); // Redirects to the 404 page
  }
  const { data: session } = useSession();
  const { showToast } = useToast();
  const router = useRouter();
  const { error, isLoading, singleUserAddress, refetch } = useSingleUserAddress(
    session?.accessToken as string,
    parseInt(id)
  );

  const [selectedArea, setSelectedArea] = useState<AreaOption | null>(null);
  const initialValues: AddressFormValues = {
    contactName: singleUserAddress?.contactName as string,
    contactNumber: singleUserAddress?.contactNumber as string,
    address: singleUserAddress?.address as string,
    latitude: singleUserAddress?.latitude as number,
    longitude: singleUserAddress?.longitude as number,
    biteshipArea: {
      value: singleUserAddress?.areaId as string,
      label: `${singleUserAddress?.district}, ${singleUserAddress?.city}, ${singleUserAddress?.province}. ${singleUserAddress?.postalCode}`,
      id: singleUserAddress?.areaId as string,
      name: `${singleUserAddress?.district}, ${singleUserAddress?.city}, ${singleUserAddress?.province}. ${singleUserAddress?.postalCode}`,
      country_name: "Indonesia",
      country_code: "ID",
      administrative_division_level_1_name:
        singleUserAddress?.province as string,
      administrative_division_level_1_type: "province",
      administrative_division_level_2_name: singleUserAddress?.city as string,
      administrative_division_level_2_type: "city",
      administrative_division_level_3_name:
        singleUserAddress?.district as string,
      administrative_division_level_3_type: "district",
      postal_code: parseInt(singleUserAddress?.postalCode as string),
    },
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
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/address/${id}`,
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
    } finally {
      refetch();
    }
  };
  useEffect(() => {
    setSelectedArea(initialValues.biteshipArea);
  }, [singleUserAddress]);
  if (isLoading) return <CustomSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex flex-col gap-5 p-6 w-full md:w-1/2 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Edit Address</h2>
      <UserAddressForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        setSelectedArea={setSelectedArea}
        selectedArea={selectedArea}
      />
    </div>
  );
};
export default EditAddressPage;
