'use client'
import { FC, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
interface NestedLayoutProps {
  children: React.ReactNode;
}
const UserLayout: FC<NestedLayoutProps> = ({ children }) => {

  const [snapLoaded, setSnapLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!);
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div className="xl:mx-14 max-xl:mx-4 mt-8">
      <Header />
      <div className="flex flex-col gap-6 mt-6">{children}</div>
      {snapLoaded ? children : <p>Loading Snap.js...</p>}
      <Footer />
    </div>
  );
};

export default UserLayout;
