import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faChartLine, faCalendarAlt, faFile } from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "flowbite-react";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 text-black">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-5 text-xl font-bold">SHELFMASTER</div>
        <nav className="mt-6">
          <ul>
            <li className="px-5 py-3 text-blue-500 bg-blue-100 rounded-lg flex items-center">
              <FontAwesomeIcon icon={faChartLine} className="mr-3 w-5" />
              Dashboard
            </li>
            <li className="px-5 py-3 text-gray-600 hover:text-blue-500 hover:bg-blue-100 rounded-lg flex items-center">
              <FontAwesomeIcon icon={faBoxOpen} className="mr-3 w-5" />
              Products
            </li>
            <li className="px-5 py-3 text-gray-600 hover:text-blue-500 hover:bg-blue-100 rounded-lg flex items-center">
              <div className="mr-3 w-5">
                <FontAwesomeIcon icon={faFile} className="ml-1 w-3" />
              </div>
              Mutation Forms
            </li>
          </ul>
          <h4 className="mt-6 px-5 text-gray-500 uppercase text-sm">Categories</h4>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 w-5" />
            <span>Feb 16, 2022 - Feb 20, 2022</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {["Total Orders", "Active Orders", "Shipped Orders"].map((item, index) => (
            <Card key={index}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">${126.5}</h2>
                  <p className="text-sm text-gray-500">{item}</p>
                </div>
                <FontAwesomeIcon icon={faBoxOpen} className="text-blue-500 text-2xl w-5" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-500 font-bold">34.7% ↑</span> Compared to Jan 2022
              </p>
            </Card>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          <Card className="w-2/3 flex">
            <h2 className="text-lg font-bold mb-4">Sale Graph</h2>
            <Button.Group className="flex gap-4 mb-4">
              {["Weekly", "Monthly", "Yearly"].map((tab, idx) => (
                <Button
                  key={idx}
                  className={`px-4 py-2 rounded-lg ${
                    tab === "Monthly" ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </Button.Group>
            <div className="h-40 bg-blue-100 rounded-lg"></div>
          </Card>

          <Card className="w-1/3">
            <h2 className="text-lg font-bold mb-4">Best Sellers</h2>
            <ul>
              {[1, 2, 3].map((_, idx) => (
                <li key={idx} className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                    <div>
                      <p className="font-bold">Adidas Ultra Boost</p>
                      <p className="text-sm text-gray-500">$126.50</p>
                    </div>
                  </div>
                  <span className="font-bold">999 sales</span>
                </li>
              ))}
            </ul>
            <Button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4">
              Report
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
