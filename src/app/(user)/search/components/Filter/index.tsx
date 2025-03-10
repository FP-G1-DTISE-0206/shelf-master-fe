import { FC, useState, useEffect } from "react";
import { Button, Checkbox, Label, Select } from "flowbite-react";
// import { SimpleProductReq } from "@/hooks/product/useSimpleProduct";
import useSimpleCategory from "@/hooks/category/useSimpleCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";

const FilterComponent: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { categories } = useSimpleCategory();

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [orderFilter, setOrderFilter] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get("categories");
    if (categoryParam) {
      setSelectedCategories(categoryParam.split(",").map(Number));
    }

    const orderParam = searchParams.get("order");
    if (orderParam) {
      setOrderFilter(orderParam);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth < 1024;
      setIsSmallScreen(smallScreen);
      if (!smallScreen) setIsCollapsed(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCheckboxChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleApply = () => {
    const params = new URLSearchParams(window.location.search);

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    if (orderFilter) {
      params.set("order", orderFilter);
    } else {
      params.delete("order");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="lg:w-max p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-2xl">Filters</h2>
        {isSmallScreen && (
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-lg"
          >
            {isCollapsed ? (
              <FontAwesomeIcon icon={faChevronDown} />
            ) : (
              <FontAwesomeIcon icon={faChevronUp} />
            )}
          </button>
        )}
      </div>

      {(!isSmallScreen || !isCollapsed) && (
        <>
          <div>
            <h3 className="text-md font-semibold mb-2">Category</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto px-2 border rounded-md">
              {categories?.length > 0 ? (
                categories.map((filter) => (
                  <Label
                    key={filter.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      color="black"
                      checked={selectedCategories.includes(filter.id)}
                      onChange={() => handleCheckboxChange(filter.id)}
                    />
                    <span>{filter.name}</span>
                  </Label>
                ))
              ) : (
                <p>No categories found</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Order By</h3>
            <Select
              color="black"
              className="w-max border rounded-md"
              value={orderFilter}
              onChange={(e) => setOrderFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="price,asc">Lower Price</option>
              <option value="price,desc">Higher Price</option>
              <option value="name,asc">Name (A-Z)</option>
              <option value="name,desc">Name (Z-A)</option>
            </Select>
          </div>

          <div className="mt-4 flex justify-start">
            <Button color="warning" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterComponent;
