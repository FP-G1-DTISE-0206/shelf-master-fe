"use client";
import { FC } from "react";
import Image from "next/image";
import { Carousel } from "flowbite-react";
import { useSimplePromotion } from "@/hooks/usePromotion";
import CustomSpinner from "@/components/CustomSpinner";
import Link from "next/link";

const HeroCard: FC = () => {
  const { error, isLoading, promotion } = useSimplePromotion();

  if (isLoading) return <CustomSpinner />;
  if (error) return <>{error}</>;
  if (promotion?.length === 0) return null;
  return (
    <div className="w-full h-[720px] rounded-3xl border-2 overflow-hidden">
      <Carousel slideInterval={5000} pauseOnHover draggable={false}>
        {promotion?.map((promotion) => {
          return (
            <div key={promotion.id} className="relative w-full h-full">
              <Image
                src={promotion.imageUrl}
                alt={promotion.title}
                width={1920}
                height={720}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 text-white text-2xl font-bold flex items-end p-12">
                <div>
                  <h2 className="text-7xl max-xl:text-2xl font-semibold">
                    {promotion.title}
                  </h2>
                  <p className="text-2xl max-xl:text-sm font-semibold">
                    {promotion.description}
                  </p>
                  {promotion.productUrl && (
                    <Link
                      href={promotion.productUrl}
                      className="bg-blue-500 text-white py-4 px-8 rounded-lg mt-4 text-sm block w-max"
                    >
                      BUY NOW
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeroCard;
