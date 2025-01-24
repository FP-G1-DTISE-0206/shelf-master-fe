import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const Header: FC = () => {
  return (
    <>
      {/* <h2 className="text-5xl font-black mt-10 mb-6 text-center">SHOP <span className="text-[#4A69E2]">SMART</span></h2>
      <HeroCard /> */}
      <div className="flex justify-between rounded-xl bg-shelf-white p-4 items-center">
        <h1 className="font-extrabold text-xl">ShelfMaster</h1>
        <div className="flex xl:gap-10 max-xl:gap-2">
          <FontAwesomeIcon icon={faSearch} />
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
      </div>
    </>
  );
};

export default Header;
