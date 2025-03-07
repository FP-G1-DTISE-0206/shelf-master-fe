import { cn } from "@/utils";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Sidebar, TextInput, Checkbox } from "flowbite-react";
import { FC, useCallback, useEffect } from "react";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";
import { debounce } from "lodash";
import { useSearchPaginationStore } from "@/store/useSearchPaginationStore";
import { useSession } from "next-auth/react";
import useAdminProductCategory from "@/hooks/category/useProductCategory";
import CategoriesItem from "../CategoriesItem";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";

const CategoriesControl: FC = () => {
  const { data: session } = useSession();
  const { setSearch } = useSearchPaginationStore();
  const { filters, setFilters } = useSearchSortPaginationStore();
  const { categories, refetch } = useAdminProductCategory(
    session?.accessToken as string
  );
  const {
    setIsModalCategoryOpen,
    refetchData,
    setModalCategoryType,
    setCategory,
    setRefetchData,
  } = useSidebarAdminStore();
  const handleFilter = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 700),
    [setSearch]
  );

  const handleCheckboxChange = () => {
    if(filters.length > 0) {
      setFilters([])
    } else {
      setFilters(categories.map((c)=>c.id))
    }
  }

  useEffect(() => {
    if (refetchData) {
      refetch();
      setRefetchData(false);
    }
  }, [refetchData]);

  return (
    <Sidebar.ItemGroup>
      <div
        className={cn(
          "flex justify-between items-center uppercase",
          "text-gray-500 font-semibold"
        )}
      >
        <div className="flex items-center gap-2">
          <span>Categories&nbsp;</span>
          <Checkbox
            color="black"
            checked={filters.length > 0}
            onChange={handleCheckboxChange}
          />
        </div>
        {session?.user.roles.includes("SUPER_ADMIN") && (
          <Button
            color="gray"
            size="sm"
            onClick={() => {
              setModalCategoryType("create");
              setIsModalCategoryOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        )}
      </div>
      <Sidebar.CTA className="flex flex-col gap-2 mt-6 text-gray-500">
        <div className="mb-4">
          <TextInput
            placeholder="Search"
            autoComplete="off"
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-col">
          {categories && categories.length > 0 ? (
            categories.map((category, idx) => (
              <CategoriesItem
                key={idx}
                category={category}
                setModalCategoryType={setModalCategoryType}
                setCategory={setCategory}
                setIsModalCategoryOpen={setIsModalCategoryOpen}
              />
            ))
          ) : (
            <div className="text-center">No categories found.</div>
          )}
        </div>
      </Sidebar.CTA>
    </Sidebar.ItemGroup>
  );
};
export default CategoriesControl;
