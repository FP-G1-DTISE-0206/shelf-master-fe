import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import BiteshipSearch, { AreaOption } from "../BiteshipSearch";
interface AddressFormValues {
  contactName: string;
  contactNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  biteshipArea: AreaOption | null;
}
interface UserAddressFormProps {
  initialValues: AddressFormValues;
  handleSubmit: (
    values: AddressFormValues,
    formikHelpers: FormikHelpers<AddressFormValues>
  ) => void;
  setSelectedArea: (area: AreaOption | null) => void;
  selectedArea: AreaOption | null;
}

const validationSchema = Yup.object({
  contactName: Yup.string().required("Name is required"),
  contactNumber: Yup.string()
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .min(10, "Number must be at least 10 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  latitude: Yup.number().required("Latitude is required"),
  longitude: Yup.number().required("Longitude is required"),
  biteshipArea: Yup.object().nullable().required("Biteship area is required"),
});

const UserAddressForm: FC<UserAddressFormProps> = ({
  initialValues,
  handleSubmit,
  setSelectedArea,
  selectedArea,
}) => {
  return (
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
                  type="number"
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
                <label className="block text-sm font-bold" htmlFor="longitude">
                  Longitude
                </label>
                <Field
                  type="number"
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
  );
};
export default UserAddressForm;
