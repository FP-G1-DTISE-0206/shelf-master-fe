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
import AddressSection from "./components/AddressSection";

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
      <AddressSection />
    </div>
  );
};
export default ProfilePage;
