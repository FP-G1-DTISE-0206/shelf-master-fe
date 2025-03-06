import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { SimpleProductReq } from "@/hooks/product/useSimpleProduct";
import useSimpleCategory from "@/hooks/category/useSimpleCategory";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface FilterComponentProps {
  productParams: SimpleProductReq;
  setProductParams: Dispatch<SetStateAction<SimpleProductReq>>;
}

const FilterComponent: FC<FilterComponentProps> = ({
  productParams,
  setProductParams,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [filter, setfilter] = useState<string>("");
  const { params, setParams, categories } = useSimpleCategory();

  // const handleCategorySearch = useCallback(
  //   debounce((e: React.ChangeEvent<HTMLInputElement>) => {
  //     setParams({ ...params, search: e.target.value });
  //   }, 500),
  //   []
  // );

  const handleCheckboxChange = (
    categoryId: number,
    setCategoryState: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    setCategoryState((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  return (
    <div className="lg:w-max p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-2xl">Filters</h2>
        {isSmallScreen && (
          <button
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
            <div className="space-y-2 max-h-60 overflow-y-auto pe-8 border rounded-md">
              {categories?.length > 0
                ? categories.map((filter) => (
                    <Label
                      key={filter.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        color="black"
                        checked={selectedCategories.includes(filter.id)}
                        onChange={() =>
                          handleCheckboxChange(filter.id, setSelectedCategories)
                        }
                      />
                      <span>{filter.name}</span>
                    </Label>
                  ))
                : "No categories found"}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Order By</h3>
            <Select
              color="black"
              className="w-max border rounded-md"
              id="countries"
              defaultValue={""}
              onChange={(e) => setfilter(e.target.value)}
            >
              <option value="" disabled>
                All
              </option>
              <option value="price,asc">Lower Price</option>
              <option value="price,desc">Higher Price</option>
              <option value="name,asc">Name (A-Z)</option>
              <option value="name,desc">Name (Z-A)</option>
            </Select>
          </div>

          <div className="mt-4 flex justify-start">
            <Button
              color="warning"
              onClick={() => {
                if (filter) {
                  setProductParams({
                    ...productParams,
                    categories: selectedCategories,
                    field: filter.split(",")[0],
                    order: filter.split(",")[1],
                  });
                } else {
                  setProductParams({
                    ...productParams,
                    categories: selectedCategories,
                  });
                }
              }}
            >
              Apply
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterComponent;
