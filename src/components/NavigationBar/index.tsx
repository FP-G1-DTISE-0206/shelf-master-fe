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
// import { FC } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";
// import {
//   Navbar,
//   NavbarBrand,
//   NavbarCollapse,
//   NavbarLink,
//   NavbarToggle,
// } from "flowbite-react"

// const NavigationBar: FC = () => {
//   return (
//     <Navbar
//       fluid
//       className="absolute left-4 right-4 md:left-14 md:right-14 rounded-xl items-center z-10"
//     >
//       <NavbarToggle />
//       <NavbarCollapse className="md:w-56 md:border-2">
//         <NavbarLink href="#" active className="cursor">
//           New Drops
//         </NavbarLink>
//         <NavbarLink as={Link} href="#" className="cursor">
//           Men
//         </NavbarLink>
//         <NavbarLink as={Link} href="#" className="cursor">
//           Women
//         </NavbarLink>
//       </NavbarCollapse>
//       <NavbarBrand as={Link} href="/" className="text-center">
//         <h2 className="font-black text-3xl cursor">ShelfMaster</h2>
//       </NavbarBrand>

//       <div className="navbar-container-right md:flex md:gap-5 md:w-56 md:border-2 item-center justify-end">
//         <div className="search-icon-container hidden md:flex ">
//           <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor" />
//         </div>
//         <FontAwesomeIcon icon={faUser} className="cursor" />
//       </div>
//     </Navbar>
//   );
// };

// export default NavigationBar;
