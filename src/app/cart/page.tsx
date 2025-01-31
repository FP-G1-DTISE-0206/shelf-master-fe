import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/ProductCard";

const Cart: FC = () => {
  return (
    <>
      <div className="py-6">

        <h2 className="text-2xl font-bold">Saving to celebrate</h2>

        <p className="text-[12px]">
          Enjoy up to 60% off thousands of styles during the End of Year sale -
          while supplies last. No code needed
        </p>

        <p className="text-[14px]">
          <Link href="/signup" className="underline">
            Join us
          </Link>{" "}
          or{" "}
          <Link href="/login" className="underline">
            Sign-in
          </Link>
        </p>
      </div>

      <div className="lg:flex lg:gap-12">
        <div className="w-full h-[326px] rounded-2xl bg-shelf-white mb-6 p-4">
          <h3 className="text-xl font-semibold">Your Bag</h3>
          <p className="text-[14px] mb-2">
            Items in your bag not reserved - check out now to make them yours
          </p>
          <div className="flex gap-4">
            <div className="hero-card-container relative rounded-3xl w-[157px] lg:w-[207px] lg:h-[225px] h-[216px] overflow-hidden">
              <Image
                src="/kohceng-senam.jpg"
                alt="hero-card"
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-semibold">DROPSET TRAINER SHOES</h4>
              <p className="text-[14px]">Men's Road Running Shoes</p>
              <p className="text-[14px]">Enamel Blue / University White</p>
              <div className="flex gap-4">
                <p>Size 10</p>
                <p>Quantity 1</p>
              </div>
              <p className="text-shelf-blue text-xl font-semibold">$130.00</p>
              <div className="flex gap-6">
                <FontAwesomeIcon icon={faHeart}/>
                <FontAwesomeIcon icon={faTrash}/>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[326px] rounded-2xl bg-shelf-white p-4">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="max-w-md mx-auto mt-2">
            <table className="min-w-full">
              <tbody>
                <tr>
                  <td className="px-4 py-2">1 ITEM</td>
                  <td className="text-right px-4 py-2">$130.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Delivery</td>
                  <td className="text-right px-4 py-2">$6.99</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Sales Tax</td>
                  <td className="text-right px-4 py-2">-</td>
                </tr>
                <tr className="font-bold">
                  <td className="px-4 py-2">Total</td>
                  <td className="text-right px-4 py-2">$130.00</td>
                </tr>
              </tbody>
            </table>

            <button className="bg-shelf-black mt-4 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
            CHECKOUT
          </button>
          <p className="pt-2">
            <Link href="/promo" className="underline text-base">User a promo code</Link>
          </p>
          </div>
          
        </div>
      </div>

      <div className="pt-7">
        <div className="flex justify-between pb-6">
          <h2 className="text-2xl font-semibold">You may also like</h2>
          <div className="flex gap-2">
            <FontAwesomeIcon icon={faChevronLeft} className="text-base w-8 h-8 bg-shelf-grey text-shelf-white rounded-lg py-2"/>
            <FontAwesomeIcon icon={faChevronRight} className="text-base w-8 h-8 bg-shelf-black text-shelf-white rounded-lg py-2" />
          </div>
        </div>

        <div className="pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 justify-center">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="flex gap-2 justify-center">
            <div className="w-8 h-1 bg-shelf-blue rounded"></div>
            <div className="w-8 h-1 bg-shelf-grey rounded"></div>
            <div className="w-8 h-1 bg-shelf-grey rounded"></div>
            <div className="w-8 h-1 bg-shelf-grey rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
