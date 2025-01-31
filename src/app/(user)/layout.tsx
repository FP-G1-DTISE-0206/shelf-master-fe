import { FC } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
interface NestedLayoutProps {
  children: React.ReactNode;
}
const UserLayout: FC<NestedLayoutProps> = ({ children }) => {
  return (
    <div className="xl:mx-14 max-xl:mx-4 mt-8">
      <Header />
      <div className="flex flex-col gap-6 mt-6">{children}</div>
      <Footer />
    </div>
  );
};

export default UserLayout;
