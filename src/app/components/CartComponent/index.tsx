import React from "react";
import Image from "next/image";

type Product = {
  name: string;
  description: string;
  size: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  image: string;
};

type CartItemProps = {
  product: Product;
};

type CartProps = {
  products: Product[];
};

const CartItem: React.FC<CartItemProps> = ({ product }) => (
  <div className="flex items-start justify-between border-b pb-4 mb-4">
    <div className="flex gap-4">
      <Image
        className="rounded-md"
        src={product.image}
        alt={product.name}
        width={80}
        height={80}
        layout="fill"
        objectFit="cover"
      />
      <div>
        <h2 className="font-bold text-lg">{product.name}</h2>
        <p className="text-shelf-gray">{product.description}</p>
        <p className="text-sm text-shelf-gray">Ukuran: {product.size}</p>
        <p className="line-through text-shelf-gray">
          Rp {product.originalPrice.toLocaleString()}
        </p>
        <p className="text-red-500 font-bold">
          Rp {product.discountedPrice.toLocaleString()}
        </p>
        <div className="flex items-center mt-2 gap-2">
          <span className="text-sm">Jumlah</span>
          <div className="flex items-center border rounded">
            <button className="px-2">-</button>
            <input
              type="text"
              value={product.quantity}
              className="w-10 text-center border-x outline-none"
              readOnly
            />
            <button className="px-2">+</button>
          </div>
        </div>
      </div>
    </div>
    <button className="text-red-500 font-bold">&#10005;</button>
  </div>
);

const Cart: React.FC<CartProps> = ({ products }) => {
  const subtotal = products.reduce(
    (acc, product) => acc + product.discountedPrice * product.quantity,
    0
  );

  return (
    <div className="p-6 bg-white rounded-lg max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Keranjang</h2>
      {products.map((product, index) => (
        <CartItem key={index} product={product} />
      ))}
      <div className="flex justify-between font-bold text-lg mt-4">
        <span>Subtotal:</span>
        <span>Rp {subtotal.toLocaleString()}</span>
      </div>
      <div className="mt-4 space-y-2">
        <button className="w-full py-2 bg-black text-white font-bold rounded-lg">
          Beli Sekarang
        </button>
        <button className="w-full py-2 border font-bold rounded-lg">
          Lihat Keranjang
        </button>
      </div>
    </div>
  );
};

const sampleProducts: Product[] = [
  {
    name: "NIKE Air Jordan 5 Retro Women's Basketball Shoes - White",
    description: "Air Jordan 5 Retro",
    size: "US 6",
    originalPrice: 3169000,
    discountedPrice: 1000000,
    quantity: 1,
    image: "/images/Shoes2.jpg",
  },
  {
    name: "NEW BALANCE 530 Unisex Sneakers Shoes - White",
    description: "530 Unisex Sneakers",
    size: "US 4",
    originalPrice: 1599000,
    discountedPrice: 959400,
    quantity: 1,
    image: "/images/Shoes1.jpg",
  },
];

const CartPage: React.FC = () => <Cart products={sampleProducts} />;

export default CartPage;
