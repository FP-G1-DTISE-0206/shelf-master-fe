import { FC } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

const ChoosenProduct: FC = () => {
  return (
    <>
      <div className="flex gap-4 py-5">
        <div className="hero-card-container relative rounded-3xl w-[157px] lg:w-[207px] lg:h-[225px] h-[216px] overflow-hidden">
          <Image
            src="/kohceng-senam.jpg"
            alt="hero-card"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 relative lg:w-[75%]">
          <h4 className="text-base lg:text-2xl font-semibold">
            DROPSET TRAINER SHOES
          </h4>
          <p className="text-[14px] lg:text-xl">Men's Road Running Shoes</p>
          <p className="text-[14px] lg:text-xl">
            Enamel Blue / University White
          </p>
          <div className="flex gap-4 lg:gap-x-10 lg:text-xl lg:pt-5">
            <p>Size 10</p>
            <p>Quantity 1</p>
          </div>
          <p className="text-shelf-blue text-xl font-semibold lg:absolute lg:top-0 lg:right-0">
            $130.00
          </p>
          <div className="flex gap-6 lg:text-3xl lg:absolute lg:bottom-0 lg:left-0">
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosenProduct;
