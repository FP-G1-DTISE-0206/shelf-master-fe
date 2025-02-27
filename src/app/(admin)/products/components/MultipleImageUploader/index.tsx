import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import useUploadImage from "@/hooks/image/useUploadImage";
import { FileInput } from "flowbite-react";

interface ImageUploaderProps {
  setFieldValue: (field: string, value: string[]) => void;
  urlImages: string[];
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

const MultipleImageUploader: FC<ImageUploaderProps> = ({
  setFieldValue,
  urlImages,
  setLoading,
  loading,
}) => {
  const { uploadImages, isLoading, uploadedUrls } = useUploadImage();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const MAX_SIZE_MB = 1;
    const validFiles = Array.from(files).filter((file) => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`File "${file.name}" exceeds 1MB limit.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setLoading(true);

    try {
      await uploadImages(validFiles);
    } catch (error) {
      console.error(error);
      alert("Failed to upload one or more images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading]);

  useEffect(() => {
    setFieldValue("images", Array.from(new Set([...urlImages, ...uploadedUrls])));
  }, [uploadedUrls]);

  return (
    <div>
      <FileInput accept="image/*" multiple onChange={handleFileChange} />
      <p className="w-full text-gray-500 text-sm mt-2 text-center">
        Jpg, Jpeg, gif, png are allowed. Max 1MB.</p>
      {loading && <p>Uploading...</p>}
    </div>
  );
};

export default MultipleImageUploader;
