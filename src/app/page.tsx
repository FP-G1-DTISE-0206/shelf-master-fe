import { FC } from "react";
import Header from "@/app/components/Header";
import HeroCard from "./components/HeroCard";
import NewArrival from "./components/NewArrival";
import Footer from "./components/Footer";

const Home: FC = () => {
  return (
    <>
      <div className="xl:mx-14 max-xl:mx-4 mt-8">
        <Header />
        <div className="flex flex-col gap-6 mt-6">
          <div className="xl:text-9xl max-xl:text-6xl font-black text-center">
            SHOP <span className="text-shelf-blue">SMART</span>
          </div>
          <HeroCard />
        </div>
        <NewArrival />
        <Footer />
      </div>
    </>
  );
};

export default Home;
