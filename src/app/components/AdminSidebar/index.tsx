"use client";

import { FC, useRef, useState } from "react";
import { Sidebar } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBoxesStacked,
  faFile,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import AdminHeader from "../AdminHeader";
import CategoriesControl from "../CategoriesControl";

interface NestedLayoutProps {
  children: React.ReactNode;
}

const AdminSidebar: FC<NestedLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFirstRender = useRef(true);
  const pathName = usePathname();
  const page = pathName.split("/")[1];
  return (
    <div className="flex">
      <motion.div
        initial={isFirstRender.current ? { x: 0 } : { x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.2 }}
        className={`fixed lg:relative top-0 left-0 h-screen bg-white shadow-md z-50 ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden`}
        onAnimationComplete={() => (isFirstRender.current = false)} // Disable `initial` after first render
      >
        <Sidebar className="w-64">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <div className="flex items-center justify-between p-4 border-b">
                <img
                  src="/images/shelfmaster-medium.jpeg"
                  alt="Logo"
                  className="w-full"
                />
                <button onClick={() => setIsOpen(false)}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-gray-600 hover:text-gray-800 w-5 h-5"
                  />
                </button>
              </div>

              <Sidebar.Item
                href="/dashboard"
                icon={() => <FontAwesomeIcon icon={faChartLine} />}
                className={cn(
                  "px-5 py-3 rounded-lg flex items-center",
                  page === "dashboard"
                    ? "text-blue-500 bg-blue-100"
                    : "text-gray-600 hover:text-blue-500 hover:bg-blue-100"
                )}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="/products"
                icon={() => <FontAwesomeIcon icon={faBoxesStacked} />}
                className={cn(
                  "px-5 py-3 rounded-lg flex items-center",
                  page === "products"
                    ? "text-blue-500 bg-blue-100"
                    : "text-gray-600 hover:text-blue-500 hover:bg-blue-100"
                )}
              >
                Products
              </Sidebar.Item>
              <Sidebar.Item
                href="/mutation-form"
                icon={() => <FontAwesomeIcon icon={faFile} />}
                className={cn(
                  "px-5 py-3 rounded-lg flex items-center",
                  page === "mutation-form"
                    ? "text-blue-500 bg-blue-100"
                    : "text-gray-600 hover:text-blue-500 hover:bg-blue-100"
                )}
              >
                Mutation Form
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            {pathName === "/products" && <CategoriesControl />}
          </Sidebar.Items>
        </Sidebar>
      </motion.div>
      <div className="flex-1 p-6 transition-all">
        <AdminHeader isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="pt-16">{children}</div>
      </div>
    </div>
  );
};

export default AdminSidebar;
