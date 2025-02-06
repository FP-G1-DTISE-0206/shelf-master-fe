"use client"
import { FC } from "react";
import { Sidebar } from "flowbite-react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBoxOpen, faFile } from "@fortawesome/free-solid-svg-icons";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";

const AdminSidebar: FC = () => {
  const { isOpen } = useSidebarAdminStore();
  console.log(isOpen)
  return (
    isOpen && (
      <Sidebar className="w-full md:w-1/6 fixed z-10 top-12 h-[100vh]">
        <div>
          <ul>
            <li className="px-5 py-3 text-blue-500 bg-blue-100 rounded-lg flex items-center">
              <Link href="/dashboard">
                <FontAwesomeIcon icon={faChartLine} className="mr-3 w-5" />
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
            </li>
            <li className="px-5 py-3 text-gray-600 hover:text-blue-500 hover:bg-blue-100 rounded-lg flex items-center">
              <Link href="/products">
                <FontAwesomeIcon icon={faBoxOpen} className="mr-3 w-5" />
                <span className="hidden lg:inline">Products</span>
              </Link>
            </li>
            <li className="px-5 py-3 text-gray-600 hover:text-blue-500 hover:bg-blue-100 rounded-lg flex items-center">
              <div className="mr-3 w-5">
                <FontAwesomeIcon icon={faFile} className="ml-1 w-3" />
              </div>
              <span className="hidden lg:inline">Mutation Forms</span>
            </li>
          </ul>
          <h4 className="mt-6 px-5 text-gray-500 uppercase text-sm">Categories</h4>
        </div>
      </Sidebar>
    )
  );
};

export default AdminSidebar;
