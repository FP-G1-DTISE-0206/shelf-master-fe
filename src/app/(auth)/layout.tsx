import Image from "next/image";
import { FC } from "react";
interface NestedLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: FC<NestedLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="relative flex items-center justify-center bg-gray-100">
          <Image
            src="/images/login.jpg"
            alt="hero-card"
            width={600}
            height={600}
            className="object-cover w-full lg:max-h-[100vh] h-full"
          />
          <div className="absolute text-center text-white px-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
            <p className="text-lg">
              Discover the best deals and shop with ease.
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
