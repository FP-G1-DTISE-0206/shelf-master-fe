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
      <div className="mt-4">
        <div className="bg-shelf-blue text-shelf-white rounded-3xl">
          <div className="grid max-xl:grid-cols-1 grid-cols-2 px-16 py-12">
            <div>
              <div className="max-lg:text-3xl text-5xl font-semibold mb-2">
                <h3>Need Help? We’re Here for You</h3>
              </div>
              <div className="max-lg:text-base text-xl font-semibold mb-6">
                <h4>Contact our support team for assistance.</h4>
              </div>
              <div className="mb-8 space-y-4">
                <p className="text-lg">
                  📞 <span className="font-semibold">Phone:</span> +62 812 3456
                  7890
                </p>
                <p className="text-lg">
                  ✉️ <span className="font-semibold">Email:</span>{" "}
                  support@shelfmaster.com
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="text-shelf-white font-extrabold max-sm:text-3xl max-lg:text-5xl text-8xl text-center space-y-2">
                <h2>ShelfMaster</h2>
                <p className="text-shelf-white font-medium text-base text-justify">
                  Welcome to ShelfMaster – the ultimate multi-warehouse
                  eCommerce hub where speed meets convenience. With our
                  nationwide warehouse network, we deliver the hottest products
                  straight from the nearest stockpile. Shop{" "}
                  <span className="text-shelf-orange">smarter</span>, receive
                  faster, and enjoy the best deals!
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
