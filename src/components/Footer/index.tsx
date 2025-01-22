import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';

import { FC } from "react";
import { faI } from "@fortawesome/free-solid-svg-icons";

const Footer:FC = () => {
  return (
    <>
      <div className="footer-container relative">
        <div className="footer-top-container bg-shelf-blue text-shelf-white rounded-3xl px-4 pt-6 pb-16 relative -z-1 top-10">
          <h3 className="text-3xl font-bold mb-2">Join our KiksPlus Club & get 15% off</h3>
          <p className="text-base font-semibold mb-6">Sign up for free! Join the community.</p>
          <div className="subscription-container mb-8 flex gap-1">
            <div className="w-3/4">
              <input type="text" placeholder="Email Address" className="bg-none bg-transparent border w-full border-shelf-white text-shelf-white placeholder:text-shelf-white py-3 px-4 rounded-lg text-base" />
            </div>
            <button className="bg-shelf-black text-shelf-white py-3 px-4 rounded-lg font-semibold">SUBMIT</button>
          </div>
          <h1 className="font-black text-4xl cursor">ShelfMaster</h1>
        </div>


        <div className="footer-bottom-container bg-shelf-black rounded-3xl px-4 pt-6 relative">
          <div className="footer-bottom-section">
            <h4 className="text-shelf-orange font-bold text-2xl mb-1">About Us</h4>
            <p className="text-shelf-white font-medium text-base">We are the biggest hyperstore in the universe. We got you all cover with our exclusive collections and latest drops.</p>
          </div>
          <div className="flex flex-col gap-6 py-10">
            <div className="footer-bottom-section flex flex-col gap-4">
              <h4 className="text-shelf-orange font-bold text-2xl">Categories</h4>
              <div className="sub-container flex flex-col gap-2">
                <p className="text-shelf-white font-medium text-base">Runners</p>
                <p className="text-shelf-white font-medium text-base">Sneakers</p>
                <p className="text-shelf-white font-medium text-base">Basketball</p>
                <p className="text-shelf-white font-medium text-base">Outdoor</p>
                <p className="text-shelf-white font-medium text-base">Golf</p>
                <p className="text-shelf-white font-medium text-base">Hiking</p>
              </div>
            </div>
            <div className="footer-bottom-section flex flex-col gap-4">
              <h4 className="text-shelf-orange font-bold text-2xl">Company</h4>
              <div className="sub-container flex flex-col gap-2">
                <p className="text-shelf-white font-medium text-base">About</p>
                <p className="text-shelf-white font-medium text-base">Contact</p>
                <p className="text-shelf-white font-medium text-base">Blogs</p>
              </div>
            </div>
            <div className="footer-bottom-section flex flex-col gap-4">
              <h4 className="text-shelf-orange font-bold text-2xl">Follow us</h4>
              <div className="sub-container flex gap-4">
                <p className="text-shelf-white font-medium text-base"><FontAwesomeIcon icon={faFacebookF} /></p>
                <p className="text-shelf-white font-medium text-base"><FontAwesomeIcon icon={faInstagram} /></p>
                <p className="text-shelf-white font-medium text-base"><FontAwesomeIcon icon={faTwitter} /></p>
                <p className="text-shelf-white font-medium text-base"><FontAwesomeIcon icon={faTiktok} /></p>
              </div>
            </div>

            {/* <div className="footer-bottom-section">
              <h2 className="font-black text-5xl text-center cursor text-shelf-white">ShelfMaster</h2>
            </div> */}
          </div>
        </div>

        <div className="copyright-container py-6 font-medium">
          <p className="text-center">&copy; All rights reserved | FP-Group1-DTISE0206</p>
          <p className="text-center">Digital Talent Incubator - Purwadhika</p>
        </div>
      </div>
    </>
  )
}

export default Footer;
