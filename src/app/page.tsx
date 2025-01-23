import { FC } from "react";
import NavigationBar from "@/components/NavigationBar";
import Header from "@/components/Header";
import NewArrival from "@/components/NewArrival";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";

const Home:FC = () => {
  return (
    <>
      <div className="h-screen px-4 py-8 md:px-14 relative">
        {/* <NavigationBar /> */}
        <Header />
        <div className="flex gap-4 mb-4 relative">
          <ProductCard />
          <ProductCard />
        </div>
        <ReviewCard />
        {/* <NewArrival /> */}
        {/* <Footer /> */}
      </div>
    </>
  
  );
}

export default Home;