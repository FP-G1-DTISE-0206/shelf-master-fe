import BiteshipSearch from "@/app/(user)/profile/components/BiteshipSearch";
import Map from "@/app/(user)/profile/components/Map";
import { WarehouseFormValues } from "@/types/address";
import { AreaOption } from "@/types/biteship";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import AdminSearch from "../AdminSearch";
import { AdminOption } from "@/types/warehouse";
interface WarehouseFormProps {
  initialValues: WarehouseFormValues;
  handleSubmit: (
    values: WarehouseFormValues,
    formikHelpers: FormikHelpers<WarehouseFormValues>
  ) => void;
  setSelectedArea: (area: AreaOption | null) => void;
  selectedArea: AreaOption | null;
  setSelectedAdmins: (admins: AdminOption[] | null) => void;
  selectedAdmins: AdminOption[] | null;
}

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Warehouse name is required"),
  contactName: Yup.string().trim().required("Name is required"),
  contactNumber: Yup.string()
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .min(10, "Number must be at least 10 digits")
    .max(15, "Number must not exceed 15 digits")
    .required("Phone number is required"),
  address: Yup.string().trim().required("Address is required"),
  biteshipArea: Yup.object().nullable().required("Region is required"),
  latitude: Yup.number().required("Location is required"),
  longitude: Yup.number(),
});
const WarehouseForm: FC<WarehouseFormProps> = ({
  initialValues,
  handleSubmit,
  setSelectedArea,
  selectedArea,
  setSelectedAdmins,
  selectedAdmins,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="flex flex-col gap-4">
          <div className="flex max-lg:flex-col gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h3 className="text-lg font-semibold">Contact Details</h3>
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="block text-sm font-bold" htmlFor="name">
                      Warehouse Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Warehouse Name"
                      className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
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
                      type="number"
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
                    <label
                      className="block text-sm font-bold"
                      htmlFor="address"
                    >
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
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Admins</h3>
                <div className="flex flex-col gap-2">
                  <div>
                    <label
                      className="block text-sm font-bold"
                      htmlFor="biteshipArea"
                    >
                      Assign Admin
                    </label>
                    <Field
                      name="admins"
                      component={AdminSearch}
                      selectedAdmins={selectedAdmins}
                      setSelectedAdmins={setSelectedAdmins}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-bold">
                Select Location on Map
              </label>
              <Map
                onLocationSelect={(lat, lng) => {
                  setFieldValue("latitude", lat);
                  setFieldValue("longitude", lng);
                }}
                selectedLatitude={values.latitude}
                selectedLongitude={values.longitude}
                selectedArea={selectedArea}
              />
              <ErrorMessage
                name="latitude"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-shelf-blue text-white py-2 px-5 rounded-lg w-max"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default WarehouseForm;
