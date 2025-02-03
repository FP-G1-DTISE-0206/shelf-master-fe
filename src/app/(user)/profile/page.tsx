"use client";
import Image from "next/image";
import { FC } from "react";
import ProfileImageSection from "./components/ProfileImageSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import useProfile from "@/hooks/useProfile";
import { useSession } from "next-auth/react";
import CustomSpinner from "@/components/CustomSpinner";
import { ProfileResponse } from "@/types/profile";
import ProfileDetailsSection from "./components/ProfileDetailsSection";

const ProfilePage: FC = () => {
  const { data: session } = useSession();
  const {
    error: profileError,
    isLoading: isProfileLoading,
    profile,
    refetch,
  } = useProfile(session?.accessToken as string);
  if (isProfileLoading) return <CustomSpinner />;
  if (profileError) return <div>Error: {profileError.message}</div>;
  return (
    <div className="flex gap-5 md:gap-2 w-full max-md:flex-col">
      <div className="flex flex-col gap-4 w-full md:mx-10">
        <div className="text-4xl font-semibold text-shelf-black">
          Your Profile
        </div>
        <div className="flex gap-5 max-md:flex-col">
          <ProfileImageSection
            profile={profile as ProfileResponse}
            refetch={refetch}
          />
          <ProfileDetailsSection
            profile={profile as ProfileResponse}
            refetch={refetch}
          />
        </div>
      </div>
      <div className="bg-shelf-white rounded-xl w-full">
        <div className="mx-6 my-6 flex flex-col gap-4">
          <div className="text-lg font-medium text-shelf-black">Address</div>
          <div className="border rounded-lg border-shelf-grey p-2 flex justify-between">
            <div>
              <div>John Doe</div>
              <div>+123456789</div>
              <div>123 Main St, Anytown, USA, 12345</div>
            </div>
            <FontAwesomeIcon icon={faCheck} className="text-shelf-orange " />
          </div>
          <div className="border rounded-lg border-shelf-light-grey p-2">
            <div>John Doe</div>
            <div>+123456789</div>
            <div>123 Main St, Anytown, USA, 12345</div>
          </div>
          <div className="border rounded-lg border-shelf-light-grey p-2">
            <div>John Doe</div>
            <div>+123456789</div>
            <div>123 Main St, Anytown, USA, 12345</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
