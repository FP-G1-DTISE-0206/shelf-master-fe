"use client";
import { FC, use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useSingleUserAddress } from "@/hooks/useUserAddress";
import { useSession } from "next-auth/react";
import CustomSpinner from "@/components/CustomSpinner";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import { FormikHelpers } from "formik";
import { AreaOption } from "@/types/biteship";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import WarehouseForm from "../../components/WarehouseForm";
import { WarehouseFormValues } from "@/types/address";
import { Admin, AdminOption } from "@/types/warehouse";
import { useSingleWarehouse } from "@/hooks/useWarehouse";

interface PageProps {
  params: Promise<{ id: string }>; // params is a Promise<{ id: string }>
}

const EditWarehousePage: FC<PageProps> = ({ params }) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  if (!id) {
    notFound(); // Redirects to the 404 page
  }
  const { data: session } = useSession();
  const { showToast } = useToast();
  const router = useRouter();
  const { error, isLoading, singleWarehouse, refetch } = useSingleWarehouse(
    session?.accessToken as string,
    parseInt(id)
  );

  const [selectedArea, setSelectedArea] = useState<AreaOption | null>(null);
  const [selectedAdmins, setSelectedAdmins] = useState<AdminOption[] | null>(
    null
  );
  const initialValues: WarehouseFormValues = {
    name: singleWarehouse?.name as string,
    contactName: singleWarehouse?.contactName as string,
    contactNumber: singleWarehouse?.contactNumber as string,
    address: singleWarehouse?.address as string,
    latitude: singleWarehouse?.latitude as number,
    longitude: singleWarehouse?.longitude as number,
    biteshipArea: {
      value: singleWarehouse?.areaId as string,
      label: `${singleWarehouse?.district}, ${singleWarehouse?.city}, ${singleWarehouse?.province}. ${singleWarehouse?.postalCode}`,
      id: singleWarehouse?.areaId as string,
      name: `${singleWarehouse?.district}, ${singleWarehouse?.city}, ${singleWarehouse?.province}. ${singleWarehouse?.postalCode}`,
      country_name: "Indonesia",
      country_code: "ID",
      administrative_division_level_1_name: singleWarehouse?.province as string,
      administrative_division_level_1_type: "province",
      administrative_division_level_2_name: singleWarehouse?.city as string,
      administrative_division_level_2_type: "city",
      administrative_division_level_3_name: singleWarehouse?.district as string,
      administrative_division_level_3_type: "district",
      postal_code: parseInt(singleWarehouse?.postalCode as string),
    },
    admins: singleWarehouse?.admins
      ? singleWarehouse.admins.map((admin) => ({
          value: admin.id.toString(),
          label: admin.email,
          ...admin,
        }))
      : null,
  };

  const handleSubmit = async (
    values: WarehouseFormValues,
    formikHelpers: FormikHelpers<WarehouseFormValues>
  ) => {
    const finalValues = {
      name: values.name,
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
      adminsId: values.admins ? values.admins.map((admin) => admin.id) : [],
    };
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse/${id}`,
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
        router.push("/warehouse");
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
    setSelectedAdmins(initialValues.admins);
  }, [singleWarehouse]);
  if (isLoading) return <CustomSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center hover:cursor-pointer">
        <Link href={"/profile"}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="font-semibold text-2xl">Edit Address</div>
      </div>
      <div className="flex flex-col gap-5 p-6 w-full mx-auto bg-white shadow-lg rounded-lg">
        <WarehouseForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          setSelectedArea={setSelectedArea}
          selectedArea={selectedArea}
          setSelectedAdmins={setSelectedAdmins}
          selectedAdmins={selectedAdmins}
        />
      </div>
    </div>
  );
};
export default EditWarehousePage;
