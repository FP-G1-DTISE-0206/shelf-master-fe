import React, { Dispatch, FC, SetStateAction, useState } from "react";
import axios from "axios";
import { FileInput } from "flowbite-react";

interface ImageUploaderProps {
  setImageProfile: Dispatch<SetStateAction<string>>;
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
  setImageProfile,
  setLoading,
  loading,
}) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

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
      setUploadedImageUrl(url);
      setImageProfile(url);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FileInput accept="image/*" multiple onChange={handleFileChange} />
      <p className="w-full text-gray-500 text-sm mt-2 text-center">
        Jpg, Jpeg, gif, png are allowed. Max 1MB.
      </p>
      {/* <FileInput type="file" accept="image/*" onChange={handleFileChange} /> */}
      {loading && <p>Uploading...</p>}
      {uploadedImageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ width: "200px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
