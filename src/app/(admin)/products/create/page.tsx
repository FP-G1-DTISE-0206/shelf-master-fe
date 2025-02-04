"use client"
import Link from "next/link";
import { useState } from "react";
import { 
  Card, 
  TextInput, 
  Textarea, 
  FileInput, 
  Button, 
  Badge, 
  Carousel, 
  Breadcrumb, 
  Label, 
  Dropdown, 
} from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faSearch,  
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const CreateProduct = () => {
  const options = ["Apple", "Banana", "Cherry", "Date", "Grapes", "Mango"];
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("Select an option");
  
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="container mx-auto px-4 w-full">
      <Breadcrumb aria-Label="Solid background breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
        <Breadcrumb.Item><Link href={"/products"}>Products</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="w-full">
        <div className="flex w-full">
          <div className="w-1/2 p-4 space-y-4">
            <div>
              <Label htmlFor="name" className="font-medium">Product Name</Label>
              <TextInput id="name" name="name" placeholder="Enter product name" />
            </div>
            <div>
              <Label htmlFor="description" className="font-medium">Description</Label>
              <Textarea id="description" name="description" placeholder="Enter product description" rows={3} />
            </div>
            <div>
              <Label htmlFor="sku" className="font-medium">SKU</Label>
              <TextInput id="sku" name="sku" placeholder="Enter SKU" />
            </div>
            <div>
              <Label htmlFor="price" className="font-medium">Price</Label>
              <TextInput id="price" name="price" type="number" placeholder="Enter regular price" />
            </div>
            <div className="w-full relative">
              <Label htmlFor="category" className="font-medium">Category</Label>
              <TextInput id="category" name="category" type="text" placeholder="Enter category"
                value={query} onChange={(e) => {setQuery(e.target.value)}}/>
              <div className="absolute right-2 bottom-3">
                <Dropdown
                  label={<FontAwesomeIcon icon={faSearch} />}
                  inline
                  arrowIcon={false}
                  className="right-10"
                >
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, idx) => (
                      <Dropdown.Item
                        key={idx}
                        onClick={() => {
                          setSelected(option);
                          setQuery("");
                        }}
                      >
                        {option}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled>No results found</Dropdown.Item>
                  )}
                </Dropdown>
              </div>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {["Adidas", "Shoes", "Sneakers", "Ultraboost"].map((tag) => (
                <Badge key={tag} color="info" className="relative inline-block pr-5">
                  {tag}
                  <div className="absolute -top-2 -right-0 px-1 font-bold rounded-lg bg-black cursor-pointer">
                    <FontAwesomeIcon icon={faMinus} color="red" />
                  </div>
                </Badge>
              ))}
            </div>
          </div>
          <div className="w-1/2 p-4 space-y-4">
            <div>
              <Label className="font-medium">Product Gallery</Label>
              <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center">
                <Carousel slide={false}>
                  {["/images/kohceng-senam.jpg", "/images/kohceng-senam.jpg"].map((src, index) => (
                    <div key={index} className="relative w-full aspect-[9/6]">
                      <Image src={src} alt={`Product ${index + 1}`} layout="fill" objectFit="cover" />
                    </div>
                  ))}
                </Carousel>
                <br/>
                <FileInput name="images" multiple accept="image/jpeg, image/png" />
                <p className="text-gray-500 text-sm mt-2">Jpeg, png are allowed. Max 1MB.</p>
              </div>
            </div>
            <Button gradientDuoTone="purpleToPink" className="w-full mt-5">
              Create Product
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateProduct;
