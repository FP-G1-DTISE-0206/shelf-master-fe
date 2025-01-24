import { FC } from "react";
import Image from "next/image";

const HeroCard: FC = () => {
  return (
    <div className="rounded-3xl w-full max-xl:h-[382px] xl:h-[720px] border-2 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-10 text-white text-2xl font-bold">
        <div className="absolute bottom-12 left-12 max-xl:bottom-4 max-xl:left-4">
          <div className="text-7xl max-xl:text-2xl font-semibold">
            Nike Air Max
          </div>
          <div className="text-2xl max-xl:text-sm font-semibold">
            Nike introducing the new air max for everyone's comfort
          </div>
          <div>
            <button className="bg-shelf-blue text-white py-4 px-8 rounded-lg mt-4 text-sm">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
      <Image
        src="/images/kohceng-senam.jpg"
        alt="hero-card"
        layout="fill"
        className="object-cover" // Ensures the image fills the container
      />
    </div>
  );
};

export default HeroCard;
