import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import ChoosenProduct from "./ChoosenProduct";

const CartSummary:FC = () => {
  return(
    <>
      <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
        
        <div className="w-full h-auto rounded-2xl bg-shelf-white lg:w-[90%] mb-6 p-4 lg:p-6 lg:col-span-2">
          
          <div className="lg:pb-10">
            <h3 className="text-xl lg:text-3xl lg:pb-2 font-semibold">Your Bag</h3>
            <p className="text-[14px] lg:text-base mb-2">
              Items in your bag not reserved - check out now to make them yours
            </p>
          </div>

          <ChoosenProduct />
          <ChoosenProduct />
          <ChoosenProduct />
          
          {/* <div className="flex gap-4 border-2 border-red-600">
            <div className="hero-card-container relative rounded-3xl w-[157px] lg:w-[207px] lg:h-[225px] h-[216px] overflow-hidden">
              <Image
                src="/kohceng-senam.jpg"
                alt="hero-card"
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 relative lg:w-[75%] border-2">
              <h4 className="text-base lg:text-2xl font-semibold">DROPSET TRAINER SHOES</h4>
              <p className="text-[14px] lg:text-xl">Men's Road Running Shoes</p>
              <p className="text-[14px] lg:text-xl">Enamel Blue / University White</p>
              <div className="flex gap-4 lg:gap-x-10 lg:text-xl lg:pt-5">
                <p>Size 10</p>
                <p>Quantity 1</p>
              </div>
              <p className="text-shelf-blue text-xl font-semibold lg:absolute border-2 lg:top-0 lg:right-0">$130.00</p>
              <div className="flex gap-6 lg:text-3xl border-2 lg:absolute lg:bottom-0 lg:left-0">
                <FontAwesomeIcon icon={faHeart}/>
                <FontAwesomeIcon icon={faTrash}/>
              </div>
            </div>
          </div> */}
        </div>

        <div className="w-full h-[326px] rounded-2xl bg-shelf-white lg:bg-transparent p-4 lg:grow-3">
          <h3 className="text-xl font-semibold lg:text-[32px]">Order Summary</h3>
          <div className="w-full mx-auto mt-2">
            <table className="w-full">
              <tbody>
                <tr className="lg:text-xl">
                  <td className="py-2">1 ITEM</td>
                  <td className="text-right py-2">$130.00</td>
                </tr>
                <tr className="lg:text-xl">
                  <td className="py-2">Delivery</td>
                  <td className="text-right py-2">$6.99</td>
                </tr>
                <tr className="lg:text-xl">
                  <td className="py-2">Sales Tax</td>
                  <td className="text-right py-2">-</td>
                </tr>
                <tr className="font-bold lg:text-2xl">
                  <td className="py-2">Total</td>
                  <td className="text-right py-2">$130.00</td>
                </tr>
              </tbody>
            </table>

            <button className="bg-shelf-black mt-4 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
            CHECKOUT
          </button>
          <p className="pt-2 lg:text-xl">
            <Link href="/promo" className="underline text-base">User a promo code</Link>
          </p>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default CartSummary;