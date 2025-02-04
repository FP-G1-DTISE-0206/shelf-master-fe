"use client";
import Image from "next/image";
import ImageUploader from "@/app/(user)/profile/components/ImageUploader";
import { ProfileResponse } from "@/types/profile";
import { FC, useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/providers/ToastProvider";

interface ProfileImageSectionProps {
  profile: ProfileResponse;
  refetch: () => void;
}

const ProfileImageSection: FC<ProfileImageSectionProps> = ({
  profile,
  refetch,
}) => {
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState(profile.imageUrl);
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
        { ...profile, imageUrl: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (data.success) {
        showToast(data.message, "success");
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
      setOpenModalUpload(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-medium text-shelf-black">
          Profile Image
        </div>
        <div className="flex flex-col gap-5">
          <Image
            className="rounded-md max-lg:w-full aspect-square object-cover"
            src={`${profile.imageUrl || "/images/default-profile.jpg"}`}
            width={150}
            height={150}
            alt="User Profile"
          />
          <div className="flex gap-2 flex-col">
            <button
              onClick={() => setOpenModalUpload(true)}
              className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold"
            >
              Change image
            </button>
            <button className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold">
              Change Password
            </button>
          </div>
        </div>
      </div>
      <Modal show={openModalUpload} onClose={() => setOpenModalUpload(false)}>
        <Modal.Header>Update profile picture</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <ImageUploader
              setImageProfile={setImageUrl}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </Modal.Body>

        <Modal.Footer className="flex justify-between bg-ghost-white">
          <Button
            color="light"
            className="bg-white rounded-lg"
            onClick={() => setOpenModalUpload(false)}
          >
            Decline
          </Button>
          <Button
            color="warning"
            className="rounded-lg text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileImageSection;
