import { FC } from "react";
import Image from "next/image";

const HeroCard: FC = () => {
  return (
    <div className="rounded-3xl lg:h-[720px] h-full w-full border-2 relative overflow-hidden">
      <div>
        <Image
          src="/images/Shoes1.jpg"
          alt="hero-card"
          width={500}
          height={500}
          className="object-cover w-full xl:-mt-[15%] md:-mt-[5%]"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 text-white text-2xl font-bold">
        <div className="absolute bottom-12 left-12 max-xl:bottom-4 max-xl:left-4">
          <div className="text-7xl max-xl:text-2xl font-semibold">
            Adidas Boost
          </div>
          <div className="text-2xl max-xl:text-sm font-semibold">
            Adidas introducing the new air boost for everyone's comfort
          </div>
          <div>
            <button className="bg-shelf-blue text-white py-4 px-8 rounded-lg mt-4 text-sm">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
