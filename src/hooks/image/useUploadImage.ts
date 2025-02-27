import { useState } from "react";
import axios from "axios";

const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const uploadImages = async (files: File[]): Promise<string[]> => {
    try {
      setIsLoading(true); // Start loading state
      const apiKey = process.env.NEXT_PUBLIC_BUILDER_IO_KEY;
      const folder = process.env.NEXT_PUBLIC_BUILDER_IO_FOLDER || "";

      if (!apiKey) throw new Error("Missing API key. Check your environment variables.");

      const uploadPromises = files.map(async (file) => {
        const binaryData = await file.arrayBuffer();

        const response = await axios.post(
          `https://builder.io/api/v1/upload?name=${encodeURIComponent(file.name)}&folder=${encodeURIComponent(folder)}`,
          binaryData,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": file.type,
            },
          }
        );

        return response.data.url; // Return uploaded file URL
      });

      const newUploadedUrls = await Promise.all(uploadPromises); 
      setUploadedUrls((prev) => [...prev, ...newUploadedUrls]); 

      return newUploadedUrls; // Return the URLs for external use if needed
    } catch (error: unknown) {
      let errorMessage = "Upload failed: An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = `Upload failed: ${error.message}`;
      } else if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = `Upload failed: ${err.response?.data?.message || "Unknown server error"}`;
      }
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return { uploadImages, uploadedUrls, isLoading };
};

export default useUploadImage;
