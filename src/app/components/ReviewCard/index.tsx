import { FC } from "react";
import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewCard: FC = () => {
  return (
    <>
      <div className="review-card-container w-full relative">
        <div className="user-review-container rounded-t-xl bg-shelf-white lg:p-8 p-4">
          <div className="user-review-detail flex gap-2">
            <div className="user-review-description">
              <h4 className="font-semibold text-[20px]">Good Quality</h4>
              <p className="text-[14px] font-light">
                I highly recommend shopping from kicks
              </p>
            </div>
            <div className="user-review-profile-picture relative w-[64px] h-[64px] mb-[3px] overflow-hidden rounded-full">
              <Image
                src="/kohceng-senam.jpg"
                alt="review-card"
                layout="fill"
                className="object-cover"
              />
            </div>
          </div>
          <div className="user-review-stars flex gap-2 items-center">
            <div className="star-icon-container flex gap-1 items-center text-[14px] text-shelf-orange">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <p className="review-rating font-semibold text-[16px] flex pt-[2px]">5.0</p>
          </div>
        </div>

        <div className="product-image-review-container relative w-full h-[229px] overflow-hidden rounded-b-xl">
          <Image
            src="/kohceng-senam.jpg"
            alt="review-card"
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
