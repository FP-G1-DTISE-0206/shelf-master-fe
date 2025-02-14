"use client";
import { useToast } from "@/providers/ToastProvider";
import { WarehouseFormValues } from "@/types/address";
import { AreaOption } from "@/types/biteship";
import axios from "axios";
import { FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import WarehouseForm from "../components/WarehouseForm";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBackspace,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CreateWarehousePage: FC = () => {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const router = useRouter();
  const [selectedArea, setSelectedArea] = useState<AreaOption | null>(null);

  const initialValues: WarehouseFormValues = {
    name: "",
    contactName: "",
    contactNumber: "",
    address: "",
    latitude: null,
    longitude: null,
    biteshipArea: null,
  };

  const handleSubmit = async (
    values: WarehouseFormValues,
    formikHelpers: FormikHelpers<WarehouseFormValues>
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse`,
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
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center hover:cursor-pointer">
        <Link href={"/warehouse"}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="font-semibold text-2xl">Create New Warehouse</div>
      </div>

      <div className="flex flex-col gap-5 p-6 w-full mx-auto bg-white shadow-lg rounded-lg">
        <WarehouseForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          setSelectedArea={setSelectedArea}
          selectedArea={selectedArea}
        />
      </div>
    </div>
  );
};
export default CreateWarehousePage;
