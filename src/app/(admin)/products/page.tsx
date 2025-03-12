"use client";
import { useCallback, useState, useEffect } from "react";
import { 
  Button, TextInput, Select, Label, Pagination, 
} from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowUpAZ, faArrowDownAZ, faAdd,  
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import useProduct from "@/hooks/product/useProduct";
import { useSession } from "next-auth/react";
import CustomSpinner from "@/components/CustomSpinner";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";
import Category from "./components/Category";
import debounce from "lodash.debounce";
import AdminProductCard from "./components/ProductCard";
import { AssignedWarehouse } from "@/types/product";
import WarehouseSelect from "../product-mutation/components/WarehouseSelect";

const Products = () => {
  const [warehouse, setWarehouse] = useState<AssignedWarehouse>({ id: 0, name: "All" });
  const { data: session } = useSession();
  const { 
    page, length, field, order, refetchData, setRefetchData, 
    setPage, setSearch, setField, setOrder, 
  } = useSearchSortPaginationStore();
  const {
    error: productError,
    isLoading: isProductLoading,
    products,
    totalData,
    refetch
  } = useProduct(session?.accessToken as string, warehouse);
  
  const handleFilter = useCallback(
    debounce((value: string) => {
      setPage(1);
      setSearch(value);
    }, 700), [setSearch]
  );
  
  const handleOrder = useCallback(
    debounce(() => {
      setOrder(order === "asc" ? "desc" : "asc");
    }, 500), [order, setOrder]
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
    
  useEffect(() => {
    refetch();
  }, [warehouse]);
    
  useEffect(() => {
    if(refetchData) {
      refetch();
      setRefetchData(false);
    }
  }, [refetchData]);

  return (
    <div className="container mx-auto px-4 w-full">
      <div className="flex justify-between flex-wrap">
        <h1 className="text-2xl font-bold my-4">All Products</h1>
        <div className="flex gap-2 flex-wrap">
          <div className="mt-4">
            <WarehouseSelect isAllowedAll={true}
              session={session} warehouse={warehouse} setWarehouse={setWarehouse} />
          </div>
          <TextInput 
            className="flex items-center h-10 mt-4 px-2 py-2" 
            onChange={(e) => handleFilter(e.target.value)} autoComplete="off" 
            placeholder="Search" />
          <div className="flex">
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
              onClick={handleOrder}>
              {order === "asc" 
                ? (<FontAwesomeIcon icon={faArrowDownAZ} />) 
                : (<FontAwesomeIcon icon={faArrowUpAZ} />)
              }
            </Button>
          </div>
          {
            session?.user.roles.includes("SUPER_ADMIN") && (
              <Button 
                className="flex items-center h-10 mt-4 px-2 py-2 rounded-lg" 
                as={Link} href={"/create-product"} color="dark" >
                <FontAwesomeIcon icon={faAdd} className="mt-[0.15rem]" />&nbsp;Product
              </Button>
            )
          }
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 relative">
        {
          isProductLoading && (
            <div className="flex w-full min-h-60 align-middle justify-center absolute z-10 top-0">
              <CustomSpinner />
            </div>
          )
        }
        {
          productError && (<div className="flex w-full items-center justify-center absolute top-0">
            Error: {productError.message}</div>)
        }
        {
          (!products || !totalData) && !isProductLoading && (
          <div className="flex w-full items-center justify-center absolute top-0">
            <div className="mt-6">No products</div>
          </div>)
        }
        {!isProductLoading && products.map((product) => (
          <AdminProductCard key={product.id} product={product} session={session} warehouse={warehouse} />
        ))}
      </div>
      {
        !isProductLoading && products?.length > 0 && totalData && ( 
          <div className="flex overflow-x-auto sm:justify-end">
            <Pagination
              currentPage={page}
              totalPages={
                totalData
                  ? Math.ceil(totalData / length)
                  : 1
              }
              onPageChange={handlePageChange}
              showIcons
            />
          </div>
        )
      }
      <Category />
    </div>
  );
};

export default Products;
