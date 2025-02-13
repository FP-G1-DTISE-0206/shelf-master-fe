export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Philips TAPH802 Black Wireless Bluetooth Headphones / TAPH 802",
    price: 799000,
    images: [
      "/images/ProductImage/WirelessBluetoothHeadphones/WirelessBluetoothHeadphones1.jpg",
      "/images/ProductImage/WirelessBluetoothHeadphones/WirelessBluetoothHeadphones2.jpg",
      "/images/ProductImage/WirelessBluetoothHeadphones/WirelessBluetoothHeadphones3.jpg",
      "/images/ProductImage/WirelessBluetoothHeadphones/WirelessBluetoothHeadphones4.jpg",
    ],
    description: "High-quality over-ear Bluetooth headphones with active noise cancellation, long battery life, and superior audio performance."
  },
  {
    id: 2,
    name: "ASUS LAPTOP GAMING TUF A15 FA507NVR-R746K6M-O 15.6 inch FHD AMD RYZEN 7 7435HS NVIDIA GEFORCE RTX 4060 RAM 16GB ROM 512GB SSD WINDOWS 11 - +M365",
    price: 16669000,
    images: [
      "/images/ProductImage/GamingLaptop/GamingLaptop1.jpg",
      "/images/ProductImage/GamingLaptop/GamingLaptop2.jpg",
      "/images/ProductImage/GamingLaptop/GamingLaptop3.jpg",
      "/images/ProductImage/GamingLaptop/GamingLaptop4.jpg",
    ],
    description: "Powerful gaming laptop with AMD Ryzen processor and NVIDIA RTX 4060 graphics for high-performance gaming and multitasking."
  },
  {
    id: 3,
    name: "HUAWEI WATCH FIT 3 Smartwatch | 1.82 inch Ultra-slim | 10 Days Battery - Black",
    price: 1749000,
    images: [
      "/images/ProductImage/SmartWatch/SmartWatch1.jpeg",
      "/images/ProductImage/SmartWatch/SmartWatch2.jpg",
      "/images/ProductImage/SmartWatch/SmartWatch3.jpg",
      "/images/ProductImage/SmartWatch/SmartWatch4.jpg",
      "/images/ProductImage/SmartWatch/SmartWatch5.jpg",
    ],
    description: "Ultra-slim smartwatch with a vibrant display, 10-day battery life, and advanced fitness tracking features."
  },
  {
    id: 4,
    name: "Xiaomi Mi TV Q1E 55 Inch QLED 4K Ultra HD Android TV - 55 inch UHD APRO",
    price: 5999000,
    images: [
      "/images/ProductImage/UltraTv/UltraTv1.jpg",
      "/images/ProductImage/UltraTv/UltraTv2.jpg",
      "/images/ProductImage/UltraTv/UltraTv3.jpg",
      "/images/ProductImage/UltraTv/UltraTv4.jpg",
      "/images/ProductImage/UltraTv/UltraTv5.jpg",
    ],
    description: "55-inch QLED 4K UHD Android TV with vibrant colors, HDR support, and smart features for a complete entertainment experience."
  },
  {
    id: 5,
    name: "Terraflex OFC-19 Ergonomic Office Chair Kursi Kantor Ergonomis - Black",
    price: 2199000,
    images: [
      "/images/ProductImage/ErgonomicChair/ErgonomicChair1.jpg",
      "/images/ProductImage/ErgonomicChair/ErgonomicChair2.jpg",
      "/images/ProductImage/ErgonomicChair/ErgonomicChair3.jpg",
      "/images/ProductImage/ErgonomicChair/ErgonomicChair4.jpg",
      "/images/ProductImage/ErgonomicChair/ErgonomicChair5.jpg",
    ],
    description: "Ergonomic office chair with adjustable support for optimal posture, breathable mesh, and modern design."
  },
  {
    id: 6,
    name: "Gaming Keyboard K940 - RGB Light Wireless Keyboard / Mechanical Feel - Wireless Blue",
    price: 259000,
    images: [
      "/images/ProductImage/GamingKeyboard/GamingKeyboard1.jpg",
      "/images/ProductImage/GamingKeyboard/GamingKeyboard2.jpeg",
      "/images/ProductImage/GamingKeyboard/GamingKeyboard3.jpeg",
      "/images/ProductImage/GamingKeyboard/GamingKeyboard4.jpg",
      "/images/ProductImage/GamingKeyboard/GamingKeyboard5.jpg",
    ],
    description: "RGB-lit wireless gaming keyboard with mechanical feel, responsive keys, and a sleek design for gamers."
  },
  {
    id: 7,
    name: "Nakamichi OW1100ANC Active Noise Cancelling Wireless Headphone ANC - Black",
    price: 254000,
    images: [
      "/images/ProductImage/NoiseCancellingHeadphones/NoiseCancellingHeadphone1.jpg",
      "/images/ProductImage/NoiseCancellingHeadphones/NoiseCancellingHeadphone2.jpg",
      "/images/ProductImage/NoiseCancellingHeadphones/NoiseCancellingHeadphone3.jpg",
      "/images/ProductImage/NoiseCancellingHeadphones/NoiseCancellingHeadphone4.jpg",
      "/images/ProductImage/NoiseCancellingHeadphones/NoiseCancellingHeadphone5.jpg",
      "/images/ProductImage/NoiseCancellingHeadphones/NoiseCancellingHeadphone6.jpg",
    ],
    description: "Active noise-canceling wireless headphones with deep bass, clear sound, and long-lasting comfort."
  },
  {
    id: 8,
    name: "Samsung Galaxy Z Fold 6 5G 12/256 12/512 12/1TB RAM 12GB ROM 256GB 512GB Fold6 HP Smartphone Android - Silver Shadow, 12/512GB",
    price: 24679000,
    images: [
      "/images/ProductImage/SmartPhoneSamsung/SmartPhoneSamsung1.jpg",
      "/images/ProductImage/SmartPhoneSamsung/SmartPhoneSamsung2.jpg",
      "/images/ProductImage/SmartPhoneSamsung/SmartPhoneSamsung3.jpeg",
      "/images/ProductImage/SmartPhoneSamsung/SmartPhoneSamsung4.jpeg",
      "/images/ProductImage/SmartPhoneSamsung/SmartPhoneSamsung5.jpeg",
    ],
    description: "Next-gen foldable smartphone with stunning display, powerful performance, and 5G connectivity for multitasking."
  },
  {
    id: 9,
    name: "Fanxiang Portable USB 3.2 Gen 2 Magnetic SSD Drive - PS1002 1TB",
    price: 1433700,
    images: [
      "/images/ProductImage/SsdPortable/SsdPortable1.jpg",
      "/images/ProductImage/SsdPortable/SsdPortable2.jpg",
      "/images/ProductImage/SsdPortable/SsdPortable3.jpg",
      "/images/ProductImage/SsdPortable/SsdPortable4.jpg",
      "/images/ProductImage/SsdPortable/SsdPortable5.jpg",
    ],
    description: "High-speed portable SSD with USB 3.2 connectivity, 1TB capacity, and a durable design for on-the-go data storage."
  },
  {
    id: 10,
    name: "Xiaomi Smart Band 9 Active - Fitness Tracker dengan Layar AMOLED & Fitur Kesehatan Canggih - Black",
    price: 335000,
    images: [
      "/images/ProductImage/SmartBand/SmartBand1.jpeg",
      "/images/ProductImage/SmartBand/SmartBand2.jpeg",
      "/images/ProductImage/SmartBand/SmartBand3.jpeg",
      "/images/ProductImage/SmartBand/SmartBand4.jpeg",
      "/images/ProductImage/SmartBand/SmartBand5.jpg",
    ],
    description: "Advanced fitness tracker with AMOLED display, heart rate monitoring, and a variety of health tracking features."
  },
];

export default products;
