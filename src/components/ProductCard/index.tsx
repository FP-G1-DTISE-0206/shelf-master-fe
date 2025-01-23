import { FC } from "react";
import Image from "next/image";

const ProductCard: FC = () => {
  return (
    <>
      <div className="product-card-container w-[171px] lg:w-[318px]">
        <div className="product-image-container border-8 border-shelf-white rounded-[32px] ">
          <div className="hero-card-container relative rounded-3xl w-full lg:h-[334px] h-[164px] overflow-hidden">
            <Image
              src="/kohceng-senam.jpg"
              alt="hero-card"
              layout="fill"
              className="object-cover"
            />
            <div className="product-status bg-shelf-blue w-auto h-auto  flex items-center justify-center rounded-tl-3xl rounded-br-3xl absolute top-0">
              <p className="text-shelf-white text-[12px] px-4 py-2 font-semibold">10% off</p>
            </div>
          </div>
        </div>
        <div className="product-information-container">
          <div className="product-information-title my-4">
            <h3 className="font-semibold lg:text-2xl text-base text-shelf-black">
              ADIDAS 3DFWD X PARLEY RUNNING SHOES
            </h3>
          </div>
          <div className="view-product-button">
            <button className="bg-shelf-black lg:py-[15.5px] py-[13px] lg:px-20 px-[16px] w-full rounded-lg text-shelf-white lg:font-semibold font-medium lg:text-[14px] text-[12px]">
              VIEW PRODUCT - <span className="text-shelf-orange">$125</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
