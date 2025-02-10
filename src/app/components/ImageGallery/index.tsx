"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="rounded-lg max-w-xl mx-auto">
        {/* Main Image Container with Fixed Aspect Ratio */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
          <Image
            src={images[selectedImageIndex]}
            alt={`Image ${selectedImageIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />

          {/* Dots Indicator Positioned at the Bottom Over the Image */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                  selectedImageIndex === index ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-4 mt-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-16 h-16 p-1 rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                selectedImageIndex === index
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </>
    // <>
    //   <div className="rounded-lg max-w-xl mx-auto">
    //     {/* Main Image */}
    //     <div className="relative flex justify-center items-center mb-4">
    //       <img
    //         src={images[selectedImageIndex]}
    //         alt={`Image ${selectedImageIndex + 1}`}
    //         className="w-full h-auto rounded-lg shadow-md"
    //       />
    //     </div>

    //     {/* Dots Indicator */}
    //     <div className="flex justify-center space-x-2 mb-4 relative border-2 border-red-600 -top-8">
    //       {images.map((_, index) => (
    //         <span
    //           key={index}
    //           className={`w-2 h-2 rounded-full cursor-pointer ${
    //             selectedImageIndex === index ? "bg-blue-500" : "bg-gray-300"
    //           }`}
    //           onClick={() => setSelectedImageIndex(index)}
    //         ></span>
    //       ))}
    //     </div>

    //     {/* Thumbnails */}
    //     <div className="flex space-x-4">
    //       {images.map((image, index) => (
    //         <div
    //           key={index}
    //           className={`w-16 h-16 p-1 rounded-lg cursor-pointer border-2 ${
    //             selectedImageIndex === index
    //               ? "border-blue-500"
    //               : "border-transparent"
    //           }`}
    //           onClick={() => setSelectedImageIndex(index)}
    //         >
    //           <img
    //             src={image}
    //             alt={`Thumbnail ${index + 1}`}
    //             className="w-full h-full object-cover rounded-md"
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </>
  );
};

export default ImageGallery;
