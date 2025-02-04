import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/Sidebar";
import { FC } from "react";
interface NestedLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: FC<NestedLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen bg-gray-100">
      <div className="w-48 sticky top-0 h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1">
        <header className="sticky top-0 z-10">
          <AdminHeader />
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;