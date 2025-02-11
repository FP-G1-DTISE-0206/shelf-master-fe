"use client";
import { FC, use, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BiteshipSearch, { AreaOption } from "./components/BiteshipSearch";
import { notFound } from "next/navigation";
import { useSingleUserAddress } from "@/hooks/useUserAddress";
import { useSession } from "next-auth/react";
import CustomSpinner from "@/components/CustomSpinner";

interface PageProps {
  params: Promise<{ id: string }>; // params is a Promise<{ id: string }>
}
interface AddressFormValues {
  contactName: string;
  contactNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  biteshipArea: AreaOption | null;
}

const EditAddressPage: FC<PageProps> = ({ params }) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  if (!id) {
    notFound(); // Redirects to the 404 page
  }
  const { data: session } = useSession();
  const { error, isLoading, singleUserAddress } = useSingleUserAddress(
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
  const validationSchema = Yup.object({
    contactName: Yup.string().required("Name is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Number must be at least 10 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    latitude: Yup.string().required("Latitude is required"),
    longitude: Yup.string().required("Longitude is required"),
    biteshipArea: Yup.object().nullable().required("Biteship area is required"),
  });

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
  useEffect(() => {
    setSelectedArea(initialValues.biteshipArea);
  }, [singleUserAddress]);
  if (isLoading) return <CustomSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex flex-col gap-5 p-6 w-full md:w-1/2 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">
        Create New Address
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-semibold">Contact Details</h3>
              <div className="flex flex-col gap-2">
                <div>
                  <label
                    className="block text-sm font-bold"
                    htmlFor="contactName"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    name="contactName"
                    placeholder="Name"
                    className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                  />
                  <ErrorMessage
                    name="contactName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-bold"
                    htmlFor="contactNumber"
                  >
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    name="contactNumber"
                    placeholder="Phone Number"
                    className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                  />
                  <ErrorMessage
                    name="contactNumber"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Address Details</h3>
              <div className="flex flex-col gap-2">
                <div>
                  <label
                    className="block text-sm font-bold"
                    htmlFor="biteshipArea"
                  >
                    Region
                  </label>
                  <Field
                    name="biteshipArea"
                    component={BiteshipSearch}
                    setSelectedArea={setSelectedArea}
                    selectedArea={selectedArea}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold" htmlFor="address">
                    Address
                  </label>
                  <Field
                    as="textarea"
                    name="address"
                    placeholder="Full Address"
                    className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                    rows={3}
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold" htmlFor="latitude">
                    Latitude
                  </label>
                  <Field
                    type="text"
                    name="latitude"
                    placeholder="Coordinate (Latitude)"
                    className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                  />
                  <ErrorMessage
                    name="latitude"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-bold"
                    htmlFor="longitude"
                  >
                    Longitude
                  </label>
                  <Field
                    type="text"
                    name="longitude"
                    placeholder="Coordinate (Longitude)"
                    className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                  />
                  <ErrorMessage
                    name="longitude"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-shelf-blue text-white py-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default EditAddressPage;
