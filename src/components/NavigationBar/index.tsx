import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

const NavigationBar: FC = () => {
  return (
    <>
      <div className="navbar-container flex justify-between rounded-xl bg-[#FAFAFA] p-4 mb-6 items-center">
        <div className="navbar-container-left">
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="navbar-container-center">
          <h1 className="logo font-extrabold text-xl">ShelfMaster</h1>
        </div>
        <div className="navbar-container-right">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </>
  );
};






export default NavigationBar;
