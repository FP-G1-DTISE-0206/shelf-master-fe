import { FC } from "react";
import HeroCard from "./HeroCard";
import { Button } from "flowbite-react";


const Header:FC = () => {
  return (
    <>
      <h2 className="text-5xl font-black mt-10 mb-6 text-center">SHOP <span className="text-[#4A69E2]">SMART</span></h2>
      <HeroCard />

    </>
  )
}

export default Header;