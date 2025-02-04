import { FC } from 'react'
import { Sidebar } from 'flowbite-react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBoxOpen, faFile } from "@fortawesome/free-solid-svg-icons";

const AdminSidebar: FC = () => {
  return (
    <>
      <Sidebar className="w-48">
        <Link href="/">
          <h1 className="font-extrabold text-xl">ShelfMaster</h1>
        </Link>
        <div className="mt-6">
          <ul>
            <li className="px-5 py-3 text-blue-500 bg-blue-100 rounded-lg flex items-center">
              <Link href="/dashboard">
                <FontAwesomeIcon icon={faChartLine} className="mr-3 w-5" />
                Dashboard
              </Link>
            </li>
            <li className="px-5 py-3 text-gray-600 hover:text-blue-500 hover:bg-blue-100 rounded-lg flex items-center">
              <Link href="/products">
                <FontAwesomeIcon icon={faBoxOpen} className="mr-3 w-5" />
                Products
              </Link>
            </li>
            <li className="px-5 py-3 text-gray-600 hover:text-blue-500 hover:bg-blue-100 rounded-lg flex items-center">
              <div className="mr-3 w-5">
                <FontAwesomeIcon icon={faFile} className="ml-1 w-3" />
              </div>
              Mutation Forms
            </li>
          </ul>
          <h4 className="mt-6 px-5 text-gray-500 uppercase text-sm">Categories</h4>
        </div>
      </Sidebar>
    </>
  )
}

export default AdminSidebar;