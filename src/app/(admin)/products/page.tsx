import { Card, Dropdown, DropdownItem, Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faAdd } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import Link from "next/link";
config.autoAddCss = false;

const Products = () => {
  const products = [
    { name: 'Adidas Ultra boost', type: 'Sneaker', price: '$110.40', sales: 1269, remaining: 1269 },
    { name: 'Adizero SL Running', type: 'Running', price: '$64.40', sales: 1269, remaining: 1269 },
    { name: 'Adidas Ultra boost', type: 'Sneaker', price: '$100.40', sales: 1269, remaining: 1269 },
    { name: 'Ultraboost Cleats', type: 'Sneaker', price: '$800.40', sales: 1269, remaining: 1269 },
    { name: 'Adidas Ultra boost', type: 'Sneaker', price: '$100.40', sales: 1269, remaining: 1269 },
    { name: 'Adidas Ultra boost', type: 'Sneaker', price: '$800.40', sales: 1269, remaining: 1269 },
    { name: 'Form Exhibit Low', type: 'Sneaker', price: '$74.00', sales: 109, remaining: 1500 },
    { name: 'Adidas Ultra boost', type: 'Sneaker', price: '$800.40', sales: 1269, remaining: 1269 },
  ];

  return (
    <div className="container mx-auto px-4 w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold my-4">All Products</h1>
        <Button className="flex items-center h-10 mt-4 px-2 py-2 rounded-lg" as={Link} href={"/products/create"}>
          <FontAwesomeIcon icon={faAdd} className="mt-[0.15rem]" />&nbsp;Product
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <Card key={index} className="max-w-sm">
            <div className="flex gap-2">
              <div className="w-1/3">
                <div className="flex w-20 aspect-[9/6] relative">
                    <Image
                      src="/images/kohceng-senam.jpg"
                      alt="hero-card"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-sm"
                    />
                </div>
              </div>
              <div className="w-4/6 flex flex-col gap-1">
                <div className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {product.type}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {product.price}
                </p>
              </div>
              <div className="w-1/6">
                <div className="mr-3 w-5">
                  <>
                    <Dropdown
                      label={<FontAwesomeIcon icon={faEllipsis} />}
                      inline
                      arrowIcon={false}
                    >
                      <DropdownItem>Detail</DropdownItem>
                      <DropdownItem>Request Stock</DropdownItem>
                    </Dropdown>
                  </>
                </div>
              </div>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Description: Long distance running requires a lot from athletes.
            </p>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Sales ↑ {product.sales}</span>
              <span className="text-sm text-gray-500">Remaining ➤ {product.remaining}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;