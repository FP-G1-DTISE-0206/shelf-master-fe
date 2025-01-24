import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

import { FC } from "react";

const Footer: FC = () => {
  return (
    <>
      <div className="">
        <div className="footer-top-container bg-shelf-blue text-shelf-white rounded-3xl">
          <div className="grid max-xl:grid-cols-1 grid-cols-2 px-16 py-12">
            <div>
              <div className="max-lg:text-3xl text-5xl font-semibold mb-2">
                Join our KiksPlus Club & get 15% off
              </div>
              <div className="max-lg:text-base text-xl font-semibold mb-6">
                Sign up for free! Join the community.
              </div>
              <div className="mb-8 flex max-sm:flex-col gap-1">
                <div className="sm:w-3/4">
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="bg-none bg-transparent border w-full border-shelf-white text-shelf-white placeholder:text-shelf-white py-3 px-4 rounded-lg text-base"
                  />
                </div>
                <button className="bg-shelf-black text-shelf-white py-3 px-4 rounded-lg font-semibold">
                  SUBMIT
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="text-shelf-white font-extrabold max-sm:text-3xl max-lg:text-5xl text-8xl">
                ShelfMaster
              </div>
            </div>
          </div>
          <div className="bg-shelf-black rounded-3xl px-10 pt-6 pb-24 flex max-lg:flex-col justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-1 max-w-[500px]">
              <h4 className="text-shelf-orange font-bold text-2xl mb-1">
                About Us
              </h4>
              <p className="text-shelf-white font-medium text-base">
                We are the biggest hyperstore in the universe. We got you all
                cover with our exclusive collections and latest drops.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-shelf-orange font-bold text-2xl">
                Categories
              </h4>
              <div className="sub-container flex flex-col gap-2">
                <p className="text-shelf-white font-medium text-base">
                  Runners
                </p>
                <p className="text-shelf-white font-medium text-base">
                  Sneakers
                </p>
                <p className="text-shelf-white font-medium text-base">
                  Basketball
                </p>
                <p className="text-shelf-white font-medium text-base">
                  Outdoor
                </p>
                <p className="text-shelf-white font-medium text-base">Golf</p>
                <p className="text-shelf-white font-medium text-base">Hiking</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-shelf-orange font-bold text-2xl">Company</h4>
              <div className="sub-container flex flex-col gap-2">
                <p className="text-shelf-white font-medium text-base">About</p>
                <p className="text-shelf-white font-medium text-base">
                  Contact
                </p>
                <p className="text-shelf-white font-medium text-base">Blogs</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-shelf-orange font-bold text-2xl">
                Follow us
              </h4>
              <div className="sub-container flex gap-4">
                <p className="text-shelf-white font-medium text-base">
                  <FontAwesomeIcon icon={faFacebookF} />
                </p>
                <p className="text-shelf-white font-medium text-base">
                  <FontAwesomeIcon icon={faInstagram} />
                </p>
                <p className="text-shelf-white font-medium text-base">
                  <FontAwesomeIcon icon={faTwitter} />
                </p>
                <p className="text-shelf-white font-medium text-base">
                  <FontAwesomeIcon icon={faTiktok} />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 text-base">
          <p className="text-center">
            &copy; All rights reserved | FP-G1-DTISE-0206
          </p>
          <p className="text-center">Digital Talent Incubator - Purwadhika</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
