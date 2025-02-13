import { FC } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "@/types/cartItem";

interface ChoosenProductProps {
  product: CartItem;
}

const ChoosenProduct: FC<ChoosenProductProps> = ({ product }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 py-5">

        {/* Product Image */}
        <div className="hero-card-container relative rounded-3xl w-full lg:w-[207px] h-auto lg:h-[225px] overflow-hidden">
          <Image
            src={product.images[0] || "/kohceng-senam.jpg"}
            alt={product.name}
            layout="fill"
            className="object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-1 relative lg:w-[75%]">
          <h4 className="text-base lg:text-2xl font-semibold">
            {product.name}
          </h4>
          <p className="text-[14px] lg:text-xl">{product.description}</p>
          <p className="text-[14px] lg:text-xl">
            Enamel Blue / University White
          </p>
          <div className="flex gap-4 lg:gap-x-10 lg:text-xl lg:pt-5">
            {/* <p>Size 10</p> */}
            <p>Quantity {product.quantity}</p>
          </div>
          <p className="text-shelf-blue text-xl font-semibold lg:absolute lg:top-0 lg:right-0">
            Rp {(product.price * product.quantity).toLocaleString("id-ID")}
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
