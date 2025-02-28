import React, { Dispatch, FC, SetStateAction, useState } from "react";
import axios from "axios";
import { FileInput } from "flowbite-react";
import { FieldProps } from "formik";

interface PromotionFormProps {
  title: string;
  description: string;
  imageUrl: string;
  productUrl: string;
}
interface ImageUploaderProps extends FieldProps {
  values: PromotionFormProps;
  setValues: (
    values:
      | PromotionFormProps
      | ((prev: PromotionFormProps) => PromotionFormProps)
  ) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}
const uploadToBuilder = async (file: File): Promise<string> => {
  try {
    const binaryData = await file.arrayBuffer();

    const response = await axios.post(
      `https://builder.io/api/v1/upload?name=${file.name}&folder=${process.env.NEXT_PUBLIC_BUILDER_IO_FOLDER}`,
      binaryData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BUILDER_IO_KEY}`, // Replace with your private API key
          "Content-Type": file.type,
        },
      }
    );
    // Return the uploaded file URL
    return response.data.url; // Assuming the response contains the uploaded URL
  } catch (error) {
    console.error("Error uploading to Builder.io:", error);
    throw new Error("Failed to upload image.");
  }
};
const ImageUploader: FC<ImageUploaderProps> = ({
  values,
  setValues,
  setLoading,
  loading,
  field,
  form,
}) => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 1 * 1024 * 1024; // 1MB
    if (file.size > MAX_SIZE) {
      alert("File size must be less than 1MB.");
      return;
    }

    setLoading(true);

    try {
      const url = await uploadToBuilder(file);
      setValues((prev: PromotionFormProps) => ({ ...prev, imageUrl: url }));
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };
  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <div>
      <FileInput
        accept="image/*"
        onChange={handleFileChange}
        onBlur={() => form.setFieldTouched(field.name, true)}
      />
      <p className="w-full text-gray-500 text-sm mt-2 text-center">
        Jpg, Jpeg, gif, png are allowed. Max 1MB.
      </p>
      {loading && <p>Uploading...</p>}
      {values.imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img
            className="mx-auto"
            src={values.imageUrl}
            alt="Uploaded"
            style={{ width: "200px" }}
          />
        </div>
      )}
      {hasError && (
        <p className="text-red-500 text-sm mt-1">
          {form.errors[field.name] as string}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
