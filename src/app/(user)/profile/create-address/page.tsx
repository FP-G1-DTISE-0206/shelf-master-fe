"use client";
import { FC, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BiteshipSearch from "./components/BiteshipSearch";
import Select from "react-select";
interface AddressFormValues {
  name: string;
  number: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;
  coordinate: string;
}

const CreateAddressPage: FC = () => {
  const initialValues: AddressFormValues = {
    name: "",
    number: "",
    province: "",
    city: "",
    district: "",
    postalCode: "",
    address: "",
    coordinate: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    number: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Number must be at least 10 digits")
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
    district: Yup.string().required("District is required"),
    postalCode: Yup.string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Postal Code is required"),
    address: Yup.string().required("Address is required"),
    coordinate: Yup.string().required("Coordinate is required"),
  });

  const handleSubmit = (values: AddressFormValues) => {
    console.log("Form Data:", values);
    alert("Form submitted successfully!");
  };
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
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-semibold">Contact Details</h3>
              <div className="flex flex-col gap-2">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm"
                />
                <Field
                  type="text"
                  name="number"
                  placeholder="Phone Number"
                  className="input"
                />
                <ErrorMessage
                  name="number"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Address Details</h3>

              <div className="flex flex-col gap-2">
                <BiteshipSearch />
                <Field
                  type="text"
                  name="province"
                  placeholder="Province"
                  className="input"
                />
                <ErrorMessage
                  name="province"
                  component="p"
                  className="text-red-500 text-sm"
                />

                <Field
                  type="text"
                  name="city"
                  placeholder="City"
                  className="input"
                />
                <ErrorMessage
                  name="city"
                  component="p"
                  className="text-red-500 text-sm"
                />

                <Field
                  type="text"
                  name="district"
                  placeholder="District"
                  className="input"
                />
                <ErrorMessage
                  name="district"
                  component="p"
                  className="text-red-500 text-sm"
                />

                <Field
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  className="input"
                />
                <ErrorMessage
                  name="postalCode"
                  component="p"
                  className="text-red-500 text-sm"
                />

                <Field
                  as="textarea"
                  name="address"
                  placeholder="Full Address"
                  className="input"
                  rows={3}
                />
                <ErrorMessage
                  name="address"
                  component="p"
                  className="text-red-500 text-sm"
                />

                <Field
                  type="text"
                  name="coordinate"
                  placeholder="Coordinate (Latitude, Longitude)"
                  className="input"
                />
                <ErrorMessage
                  name="coordinate"
                  component="p"
                  className="text-red-500 text-sm"
                />
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
export default CreateAddressPage;
