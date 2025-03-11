"use client";

// import { useRouter } from "next/navigation";
import useSimpleCategory from "@/hooks/category/useSimpleCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import CustomSpinner from "@/components/CustomSpinner";

const CategoryCarousel = () => {
  // const router = useRouter();
  const { categories = [] } = useSimpleCategory();
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(3); // Mobile (sm)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(4); // Tablet (md)
      } else {
        setVisibleCount(5); // Desktop (lg)
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  //   const handleCategoryClick = (categoryId: number) => {
  //     router.push(`/search?category=${categoryId}`);
  //   };

  const next = () => {
    if (startIndex + visibleCount < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      <button
        className="absolute left-0 z-10 bg-white shadow-md p-2 rounded-full"
        onClick={prev}
        disabled={startIndex === 0}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
      </button>

      <div className="flex flex-wrap justify-center items-center w-full gap-2 px-10">
        {categories.length > 0 ? (
          categories
            .slice(startIndex, startIndex + visibleCount)
            .map((category) => (
              <Link
                href={`/search?categories=${category.id}`}
                key={category.id}
                className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition text-sm sm:text-base"
              >
                {category.name}
              </Link>
            ))
        ) : (
          <div className="my-2">
            <CustomSpinner />
          </div>
        )}
      </div>

      <button
        className="absolute right-0 z-10 bg-white shadow-md p-2 rounded-full"
        onClick={next}
        disabled={startIndex + visibleCount >= categories.length}
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CategoryCarousel;
