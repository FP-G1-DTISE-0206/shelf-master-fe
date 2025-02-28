"use client";
import { FC } from "react";
import Image from "next/image";
import { DropdownItem } from "flowbite-react";
import { CartItem } from "@/types/cart";
import useProductDetail from "@/hooks/product/useProductDetail";
import { useSession } from "next-auth/react";

interface Props {
  item: CartItem;
}

const CartItemDropdown: FC<Props> = ({ item }) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";
  const { product, isLoading } = useProductDetail(
    accessToken,
    item.productId.toString()
  );

  return (
    <DropdownItem className="w-80">
      <div className="flex gap-3 items-center w-full">
        <Image
          src={
            isLoading
              ? "/images/loading-placeholder.jpg"
              : product?.images[0]?.imageUrl ||
                "/images/default-placeholder.jpg"
          }
          alt={product?.name || "Product Image"}
          width={40}
          height={40}
          className="rounded-md"
        />
        <div className="flex-grow">
          <p className="font-semibold text-left">
            {product?.name && product.name.length > 40
              ? product.name.substring(0, 40) + "..."
              : product?.name}
          </p>
          <p className="text-sm text-gray-600 text-left">
            {item.quantity} pc(s) - Rp{" "}
            {isLoading ? "..." : product?.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </DropdownItem>
  );
};

export default CartItemDropdown;
