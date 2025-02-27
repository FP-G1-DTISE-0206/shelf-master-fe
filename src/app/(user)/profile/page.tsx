import { FC } from "react";
import AddressSection from "./components/AddressSection";
import UserProfileSection from "./components/UserProfileSection";

const ProfilePage: FC = () => {
  return (
    <div className="flex gap-5 md:gap-2 w-full flex-col">
      <div className="text-4xl font-semibold text-shelf-black">
        Your Profile
      </div>
      <div className="flex max-lg:flex-col gap-4 w-full">
        <UserProfileSection />
        <AddressSection />
      </div>
    </div>
  );
};
export default ProfilePage;
