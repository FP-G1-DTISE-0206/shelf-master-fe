import { FC } from "react";
import NavigationBar from "@/components/NavigationBar";
import Header from "@/components/Header";
import NewArrival from "@/components/NewArrival";
import Footer from "@/components/Footer";

const Home:FC = () => {
  return (
    <>
      <div className="h-screen px-4 py-8 md:px-14">
        {/* <NavigationBar /> */}
        <Header />
        {/* <NewArrival /> */}
        {/* <Footer /> */}
      </div>
    </>
  
  );
}

export default Home;