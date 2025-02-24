import { FC } from "react";
import AdminSidebar from "./components/AdminSidebar";

interface NestedLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<NestedLayoutProps> = ({ children }) => {
  return (
    <>
      <AdminSidebar>{children}</AdminSidebar>
    </>
  );
};

export default AdminLayout;
