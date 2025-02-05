"use client"
import { Card, Dropdown, DropdownItem, Button, Badge } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faAdd } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import useAdminProduct from "@/hooks/useAdminProduct";
import { useSession } from "next-auth/react";
import CustomSpinner from "@/components/CustomSpinner";

const Products = () => {
  const { data: session } = useSession();
  const {
    error: productError,
    isLoading: isProductLoading,
    products,
  } = useAdminProduct(session?.accessToken as string);
  if (isProductLoading) return (
    <div className="flex min-h-60 align-middle justify-center">
      <CustomSpinner />
    </div>
  );
  if (productError) 
    return <div className="align-middle justify-center">Error: {productError.message}</div>;
  if (products == undefined) 
    return <div className="align-middle justify-center">No product yet</div>;

  return (
    <div className="container mx-auto px-4 w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold my-4">All Products</h1>
        <Button className="flex items-center h-10 mt-4 px-2 py-2 rounded-lg" as={Link} href={"/products/create"}>
          <FontAwesomeIcon icon={faAdd} className="mt-[0.15rem]" />&nbsp;Product
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="max-w-sm">
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
                  {product.categories.map((category) => (
                    <Badge key={category.id} color="info" className="relative inline-block">
                      {category.name}
                    </Badge>
                  ))}
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
              Description: {"this will be description"}
            </p>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Sales ↑ {"product sales"}</span>
              <span className="text-sm text-gray-500">Remaining ➤ {"product stock"}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;