import { FC } from "react";
import NavigationBar from "@/components/NavigationBar";
import Header from "@/components/Header";
import NewArrival from "@/components/NewArrival";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const Home:FC = () => {
  return (
    <>
      <div className="h-screen px-4 py-8 md:px-14 relative">
        {/* <NavigationBar /> */}
        <Header />
        <div className="flex gap-4">
          <ProductCard />
          <ProductCard />
        </div>
        {/* <NewArrival /> */}
        {/* <Footer /> */}
      </div>
    </>
  
  );
}

export default Home;