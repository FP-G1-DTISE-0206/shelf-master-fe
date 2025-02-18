import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Select, { MultiValue } from "react-select";
import { FieldProps } from "formik";

interface SelectFieldProps extends FieldProps {
  setSelectedAdmins: (admins: Admin[] | null) => void;
  selectedAdmins: Admin[] | null;
}
interface Admin {
  id: string;
  email: string;
}

const AdminSearch: FC<SelectFieldProps> = ({
  field,
  form,
  setSelectedAdmins,
  selectedAdmins,
}) => {
  const { data: session } = useSession();
  const [admins, setAdmins] = useState<Admin[]>([]);
  //   const [selectedAdmins, setSelectedAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/search`,
        {
          headers: {
            authorization: `Bearer ${session?.accessToken}`,
          },
          params: {
            search: "",
          },
        }
      );
      setAdmins(
        data?.data.map((admin: Admin) => ({
          value: admin.id,
          label: admin.email,
          ...admin,
        })) ?? []
      );
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = () => {
    if (admins.length === 0) {
      fetchAdmins();
    }
  };

  const handleChange = (newValue: MultiValue<any>) => {
    const selectedAdminsArray = Array.from(newValue);
    setSelectedAdmins(selectedAdminsArray);
    form.setFieldValue(field.name, selectedAdminsArray);
  };
  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <>
      <Select
        id="adminSelect"
        value={selectedAdmins}
        onChange={handleChange}
        onFocus={handleFocus}
        options={admins}
        isLoading={isLoading}
        placeholder="Select Admins"
        onBlur={() => form.setFieldTouched(field.name, true)}
        isMulti
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1">
          {form.errors[field.name] as string}
        </p>
      )}
    </>
  );
};

export default AdminSearch;
