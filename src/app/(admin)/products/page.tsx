"use client";
import { 
  Card, Dropdown, DropdownItem, Button, 
  Badge, TextInput, Select, 
  Label, 
} from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEllipsis, faArrowUpAZ, faArrowDownAZ, 
  faAdd,  
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import useAdminProduct from "@/hooks/useAdminProduct";
import { useSession } from "next-auth/react";
import CustomSpinner from "@/components/CustomSpinner";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";
import { useDebouncedCallback } from "use-debounce";

const Products = () => {
  const { data: session } = useSession();
  const { 
    page, length, search, field, order, 
    setPage, setSearch, setField, setOrder, 
  } = useSearchSortPaginationStore();
  const {
    error: productError,
    isLoading: isProductLoading,
    products,
    totalData,
  } = useAdminProduct(session?.accessToken as string);

  if (productError) {
    return <div className="align-middle justify-center">Error: {productError.message}</div>;
  }

  const debounceFilter = useDebouncedCallback((value) => {
    setSearch(value);
  }, 500);

  const debounceOrder = useDebouncedCallback(
    () => {
      const value = order === "asc" ? "desc" : "asc";  
      setOrder(value)
  }, 500);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isProductLoading) {
    return (
      <div className="flex min-h-60 align-middle justify-center">
        <CustomSpinner />
      </div>
    );
  }

  if (!products || !totalData) {
    return <div className="align-middle justify-center">No product yet</div>;
  }

  return (
    <div className="container mx-auto px-4 w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold my-4">All Products</h1>
        <div className="flex gap-2">
          <Label htmlFor="field" className="font-medium h-10 mt-4 pl-2 py-2">Sort by:</Label>
          <Select value={field} name="field"
            onChange={(e) => setField(e.target.value)} 
            className="flex items-center h-10 mt-4 px-2 py-2">
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="price">Price</option>          
          </Select>
          <Button className="flex items-center h-10 mt-4 px-0 py-2 rounded-lg" 
            color="gray"
            onClick={debounceOrder}>
            {order === "asc" 
              ? (<FontAwesomeIcon icon={faArrowDownAZ} />) 
              : (<FontAwesomeIcon icon={faArrowUpAZ} />)
            }
          </Button>
          <TextInput 
            onChange={(e) => debounceFilter(e.target.value)} 
            value={search} className="flex items-center h-10 mt-4 px-2 py-2"
            id="search" name="search" placeholder="Search" />
          <Button 
            className="flex items-center h-10 mt-4 px-2 py-2 rounded-lg" 
            as={Link} href={"/products/create"}>
            <FontAwesomeIcon icon={faAdd} className="mt-[0.15rem]" />&nbsp;Product
          </Button>
        </div>
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
                <p className="font-normal text-gray-700 dark:text-gray-400">{product.price}</p>
              </div>
              <div className="w-1/6">
                <div className="mr-3 w-5">
                  <Dropdown label={<FontAwesomeIcon icon={faEllipsis} />} inline arrowIcon={false}>
                    <DropdownItem>Detail</DropdownItem>
                    <DropdownItem>Request Stock</DropdownItem>
                  </Dropdown>
                </div>
              </div>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">Description: {"this will be description"}</p>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Sales ↑ {"product sales"}</span>
              <span className="text-sm text-gray-500">Remaining ➤ {"product stock"}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} className="mr-2">
          Previous
        </Button>
        <span className="my-auto">{`Page ${page}`}</span>
        <Button disabled={totalData < length} onClick={() => handlePageChange(page + 1)} className="ml-2">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Products;
