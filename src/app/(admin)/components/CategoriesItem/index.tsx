import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { CategoryResponse } from "@/types/category";
import { Label, Checkbox } from "flowbite-react";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";

interface CategoriesLineProps {
  category: CategoryResponse;
  setModalCategoryType: (page: string) => void;
  setCategory: (page: CategoryResponse) => void;
  setIsModalCategoryOpen: (isModalCategoryOpen: boolean) => void;
}

const CategoriesItem: FC<CategoriesLineProps> = ({
  category,
  setModalCategoryType,
  setCategory,
  setIsModalCategoryOpen,
}) => {
  const { data: session } = useSession();
  const { filters, setFilters } = useSearchSortPaginationStore();

  const handleCheckboxChange = () => {
    setFilters(
      filters.includes(category.id)
        ? filters.filter((c) => c !== category.id)
        : [...filters, category.id]
    );
  };    

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Label
            key={category.id}
            className="flex items-center space-x-2"
          >
            <Checkbox
              color="black"
              checked={filters.includes(category.id)}
              onChange={handleCheckboxChange}
            />
            <span>{category.name}</span>
          </Label>
        </div>
        <div>
          {session?.user.roles.includes("SUPER_ADMIN") && (
            <span
              onClick={() => {
                setModalCategoryType("update");
                setCategory(category);
                setIsModalCategoryOpen(true);
              }}
              className="cursor-pointer"
            >
              <FontAwesomeIcon icon={faEdit} />
            </span>
          )}
        </div>
      </div>
      <div className="h-0.5 w-full mt-1 bg-shelf-black rounded-full" />
    </>
  );
};
export default CategoriesItem;
