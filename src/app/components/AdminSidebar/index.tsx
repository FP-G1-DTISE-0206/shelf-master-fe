"use client";

import { FC, useEffect, useRef } from "react";
import { Sidebar } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBoxesStacked,
  faFile,
  faChartLine,
  faChevronDown,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import AdminHeader from "../AdminHeader";
import CategoriesControl from "../CategoriesControl";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";

interface NestedLayoutProps {
  children: React.ReactNode;
}

const AdminSidebar: FC<NestedLayoutProps> = ({ children }) => {
  const isFirstRender = useRef(true);
  const pathName = usePathname();
  const page = pathName.split("/")[1];
  const { openMenus, setOpenMenus, isOpen, setIsOpen } = useSidebarAdminStore();
  const toggleMenu = (menu: string) => {
    const newOpenMenus = { ...openMenus, [menu]: !openMenus[menu] };
    setOpenMenus(newOpenMenus);
  };
  useEffect(() => {
    if (page === "warehouse" || page === "user") {
      toggleMenu("management");
    }
  }, [page]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const SidebarItemStyle = (activePage: string) => {
    return cn(
      "px-5 py-3 rounded-lg flex items-center",
      page === activePage
        ? "text-blue-500 bg-blue-100"
        : "text-gray-600 hover:text-blue-500 hover:bg-blue-100"
    );
  };
  return (
    <div className="h-screen flex overflow-hidden">
      <motion.div
        initial={isFirstRender.current ? { x: 0 } : { x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.2 }}
        className={`absolute lg:relative top-0 left-0 h-screen bg-white shadow-md z-50 ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden`}
        onAnimationComplete={() => (isFirstRender.current = false)}
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
                className={SidebarItemStyle("dashboard")}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="/products"
                icon={() => <FontAwesomeIcon icon={faBoxesStacked} />}
                className={SidebarItemStyle("products")}
              >
                Products
              </Sidebar.Item>
              <Sidebar.Item
                href="/mutation-form"
                icon={() => <FontAwesomeIcon icon={faFile} />}
                className={SidebarItemStyle("mutation-form")}
              >
                Mutation Form
              </Sidebar.Item>
              <Sidebar.Item
                onClick={() => toggleMenu("management")}
                icon={() => <FontAwesomeIcon icon={faListCheck} />}
                className="px-5 py-3 rounded-lg flex items-center text-gray-600 hover:text-blue-500 hover:bg-blue-100"
              >
                <div className="flex justify-between items-center w-full cursor-pointer">
                  <span>Management</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform ${
                      openMenus["management"] ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </Sidebar.Item>
              {openMenus["management"] && (
                <div className="pl-6 flex flex-col gap-2">
                  <Sidebar.Item
                    href="/warehouse"
                    className={SidebarItemStyle("warehouse")}
                  >
                    Warehouse
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/warehouse-admin"
                    className={SidebarItemStyle("warehouse-admin")}
                  >
                    Warehouse Admin
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/user"
                    className={SidebarItemStyle("user")}
                  >
                    User
                  </Sidebar.Item>
                </div>
              )}
            </Sidebar.ItemGroup>
            {pathName === "/products" && <CategoriesControl />}
          </Sidebar.Items>
        </Sidebar>
      </motion.div>
      <div className="flex-1 overflow-auto p-6 transition-all">
        <AdminHeader isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="pt-16">{children}</div>
      </div>
    </div>
  );
};

export default AdminSidebar;
