import AdminHeader from "@/app/components/AdminHeader";
import AdminSidebar from "@/app/components/Sidebar";
import ContainerSidebar from "@/app/components/ContainerSidebar";
import { FC } from "react";

interface NestedLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<NestedLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <AdminSidebar />
      <AdminHeader />
      <ContainerSidebar>
        {children}
      </ContainerSidebar>
    </div>
  );
};

export default AdminLayout;