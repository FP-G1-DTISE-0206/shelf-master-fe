import { FC } from "react";
import Image from "next/image";

const HeroCard: FC = () => {
  return (
    <div className="hero-card-container rounded-3xl w-full h-[382px] border-2 relative overflow-hidden">
      <Image
        src="/kohceng-senam.jpg"
        alt="hero-card"
        layout="fill"
        className="object-cover" // Ensures the image fills the container
      />
    </div>
  );
};

export default HeroCard;



// import { FC } from "react";
// import Image from "next/image";

// const HeroCard: FC = () => {
//   return (
//     <>
//       <div className="hero-card-container rounded-3xl w-full h-[382px] border-2 relative overflow-hidden">
//         <Image
//           src="/kohceng-senam.jpg"
//           alt="hero-card"
//           layout="responsive"
//           className="object-contain"
//         />
//       </div>
//     </>
//   );
// };

// export default HeroCard;
