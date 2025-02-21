import { FC } from "react";
import UserTable from "./components/UserTable";

const UserPage: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-semibold text-2xl">User Management</div>
      <UserTable />
    </div>
  );
};
export default UserPage;
