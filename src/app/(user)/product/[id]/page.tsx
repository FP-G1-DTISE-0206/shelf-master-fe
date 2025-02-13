"use client";
import { FC, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductSuggestion from "@/app/components/ProductSuggestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ColorOption from "@/app/components/ColorOptions";
import ImageGallery from "@/app/components/ImageGallery";
import UnifiedSizeSelector from "@/app/components/SizeOptions";
import products from "@/data/product";
// import useCartStore from "@/store/cartStore";
import useCartStore from "@/hooks/useCartStore";
import { CartItem } from "@/types/cartItem";
interface SizeStatusMap {
  [size: number]: "active" | "disabled" | "default";
}

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}


const ProductPage: FC = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const {addToCart} = useCartStore((state) => state.addToCart);


  const [selectedColor, setSelectedColor] = useState<string>("navy");

  const sizes: number[] = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
  const sizeStatus: SizeStatusMap = {
    38: "active",
    39: "disabled",
    40: "disabled",
    41: "default",
    42: "default",
    43: "default",
    44: "default",
    45: "default",
    46: "default",
    47: "default",
  };

  const colors = [
    { name: "navy", hex: "#1e2a47" },
    { name: "green", hex: "#697b69" },
  ];

  const handleSizeSelect = (size: number) => {
    console.log(`Selected size: ${size}`);
  };

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        quantity: 1,
      };
      addToCart(cartItem); // No more error
    }
  };
  
  

  useEffect(() => {
    const productData = products.find((p) => p.id === Number(id));
    if (productData) {
      setProduct(productData);
    } else {
      console.error("Product not found");
    }
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  // useEffect(() => {
  //   const productData = products.find((p) => p.id === Number(id)) || null;
  //   setProduct(productData);
  // }, [id]);

  return (
    <>
      {/* <CartPage /> */}
      {/* Gambar Sliding */}
      <div>
        <ImageGallery images={product.images} />
      </div>

      {/* Info Utama : Nama & Harga */}
      <div>
        <div className="px-4 py-2 bg-shelf-blue rounded-xl inline-block mb-2">
          <p className="text-white text-[12px] font-semibold">New Release</p>
        </div>
        <div className="mb-2">
          <p className="text-shelf-black font-semibold text-xl">{product.name}</p>
        </div>
        <div>
          <p className="text-shelf-blue font-semibold text-2xl">Rp {product.price.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* Variasi 1 ex. Color*/}
      <div>
        <h2 className="text-lg font-bold mb-4">Color</h2>
        <div className="flex items-center space-x-4">
          {colors.map((color) => (
            <ColorOption
              key={color.name}
              color={color.hex}
              isSelected={selectedColor === color.name}
              onSelect={() => setSelectedColor(color.name)}
            />
          ))}
        </div>
      </div>

      {/* Variasi 2 ex. Size*/}
      <UnifiedSizeSelector sizes={sizes} sizeStatus={sizeStatus} onSizeSelect={handleSizeSelect} />

      {/* Tombol Add To Cart, Wishlist & Buy Now */}
      <div>
        <div className="mb-2 flex gap-2">
          <button 
            onClick={handleAddToCart}
            className="bg-shelf-black basis-5/6 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
            ADD TO CART
          </button>
          <button className="bg-shelf-black basis-1/6 xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <button className="bg-shelf-blue xl:py-[15.5px] py-[13px] lg:px-10 px-[16px] w-full rounded-lg text-shelf-white xl:font-semibold font-medium xl:text-[14px] text-[12px]">
          BUY IT NOW
        </button>
      </div>

      {/* Product Description */}
      <div>
        <h2 className="text-2xl font-bold mb-4">About the Product</h2>
        <div className="text-gray-700 space-y-2">
          <p className="text-lg font-semibold">Shadow Navy / Army Green</p>
          <p>
            This product is excluded from all promotional discounts and offers.
          </p>

          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>
              Pay over time in interest-free installments with Affirm, Klarna or
              Afterpay.
            </li>
            <li>
              Join adiClub to get unlimited free standard shipping, returns, &
              exchanges.
            </li>
          </ul>
        </div>
      </div>

      {/* Product Suggestion */}
      <ProductSuggestion />
    </>
  );
};

export default ProductPage;
