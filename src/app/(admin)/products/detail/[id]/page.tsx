"use client"
import Link from "next/link";
import { 
  Card, TextInput, Textarea, Badge, Carousel, Breadcrumb, Label, 
} from "flowbite-react";
import Image from "next/image";
import useProductDetail from "@/hooks/product/useProductDetail";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import CustomSpinner from "@/components/CustomSpinner";

const AdminDetailProduct = () => {
  const { id }: { id: string } = useParams() ?? { id: "" };
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";
  const { 
    product, isLoading, errorProductDetail, 
  } = useProductDetail(accessToken, id);

  if (errorProductDetail) return <div>Error: {errorProductDetail.message}</div>;
  if (isLoading) return <div><CustomSpinner /></div>;
  if (!product) return <div>No such product</div>;

  return (
    <div className="container mx-auto px-4 w-full">
      <Breadcrumb className="px-5 py-3">
        <Breadcrumb.Item><Link href={"/products"}>Products</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Detail</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="w-full">
            <div className="flex w-full">
              <div className="w-1/2 p-4 space-y-4">
                <div>
                  <Label htmlFor="name" className="font-medium">Product Name</Label>
                  <TextInput id="name" name="name" disabled={true} placeholder="Enter product name" 
                    value={product.name}/>
                </div>
                <div>
                  <Label htmlFor="sku" className="font-medium">SKU</Label>
                  <TextInput id="sku" name="sku" disabled={true} placeholder="Enter product SKU" 
                    value={product.sku}/>
                </div>
                <div>
                  <Label htmlFor="description" className="font-medium">Description</Label>
                  <Textarea id="description" name="description" 
                    disabled={true} placeholder="Enter product description" rows={7} 
                    value={product.description}/>
                </div>
                <div>
                  <Label htmlFor="price" className="font-medium">Price</Label>
                  <TextInput id="price" name="price" 
                    type="number" disabled={true} placeholder="Enter price" 
                    value={product.price}/>
                </div>
                <div>
                  <Label htmlFor="weight" className="font-medium">Weight</Label>
                  <TextInput id="weight" name="weight" 
                    type="number" disabled={true} placeholder="Enter weight in grams" 
                    value={product.weight}/>
                </div>
              </div>
              <div className="w-1/2 p-4 space-y-4">
                <Label className="font-medium">Category</Label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {product.categories.map((category, idx) => {
                    return category && (
                      <Badge key={idx} color="info" className="relative inline-block pr-5">
                        {category.name}
                      </Badge>
                    );
                  })}
                </div>
                <div>
                  <Label className="font-medium">Product Gallery</Label>
                  <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center">
                    {product.images.length > 0 ? (
                      <Carousel slide={false}>
                        {product.images.map((src, index) => (
                          <div key={index} className="relative w-full aspect-[9/6]">
                            <Image src={src.imageUrl} alt={`Product ${index + 1}`} layout="fill" objectFit="cover" />
                          </div>
                        ))}
                      </Carousel>
                    ) : (
                      <div className="relative w-full aspect-[9/6] flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500">
                        No images available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
      </Card>
    </div>
  );
};

export default AdminDetailProduct;
