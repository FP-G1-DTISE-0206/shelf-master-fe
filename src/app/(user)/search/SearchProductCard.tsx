import { FC } from 'react'
import Image from 'next/image';
import { Card, Button } from "flowbite-react";
import { ProductResponse } from '@/types/product';
import Link from 'next/link';

interface SearchProductCardProps {
  product: ProductResponse;
}

const SearchProductCard: FC<SearchProductCardProps> = ({ product }) => {
  const currencyFormatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      currencySign: 'accounting',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
  });

  return (
    <Card>
      <div className="product-card-container w-full">
        <div className="product-image-container border-8 border-shelf-white rounded-[32px] ">
          <div className="hero-card-container relative rounded-3xl w-full aspect-[9/6] overflow-hidden">
            <Image
              src={product.image.imageUrl}
              alt="hero-card"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
        <div className="product-information-container">
          <div className="product-information-title my-4">
            <h3 className="font-semibold xl:text-xl text-sm text-shelf-black">
              {product.name}
            </h3>
          </div>
          <div className="view-product-button">
            <Button as={Link} href={"product/"+product.id}
              className="bg-shelf-black w-full rounded-lg text-shelf-white font-medium">
              View Product&nbsp;-&nbsp;
              <span className="text-shelf-orange">
                {currencyFormatter.format(product.price)}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SearchProductCard;