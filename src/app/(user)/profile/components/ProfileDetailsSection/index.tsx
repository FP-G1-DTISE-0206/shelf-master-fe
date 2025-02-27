"use client";
import { ProfileResponse } from "@/types/profile";
import { FC, useState } from "react";
import ChangeUsernameModal from "../ChangeUsernameModal";
import ChangeEmailModal from "../ChangeEmailModal";
interface ProfileDetailSectionProps {
  profile: ProfileResponse;
  refetch: () => void;
}
const ProfileDetailsSection: FC<ProfileDetailSectionProps> = ({
  profile,
  refetch,
}) => {
  const [openModalUsername, setOpenModalUsername] = useState(false);
  const [openModalEmail, setOpenModalEmail] = useState(false);

  return (
    <>
      <div className="flex gap-5 text-wrap">
        <div>
          <div className="text-lg font-medium">Name</div>
          <div className="text-lg font-medium">Email</div>
        </div>
        <div>
          <div className="text-lg font-normal flex gap-2">
            {profile?.userName}
            <span
              className="text-xs text-shelf-orange font-normal hover:cursor-pointer"
              onClick={() => setOpenModalUsername(true)}
            >
              Edit
            </span>
          </div>
          <div className="text-lg font-normal flex gap-2">
            {profile?.email}
            <span
              className="text-xs text-shelf-orange font-normal hover:cursor-pointer"
              onClick={() => setOpenModalEmail(true)}
            >
              Change
            </span>
          </div>
        </div>
      </div>
      <ChangeUsernameModal
        openModalUsername={openModalUsername}
        setOpenModalUsername={setOpenModalUsername}
        profile={profile}
        refetch={refetch}
      />
      <ChangeEmailModal
        openModalEmail={openModalEmail}
        setOpenModalEmail={setOpenModalEmail}
      />
    </>
  );
};
export default ProfileDetailsSection;
