import { cn } from "@/utils";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Sidebar, TextInput } from "flowbite-react";
import { FC, useCallback, useEffect } from "react";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";
import { debounce } from "lodash";
import { useSearchPaginationStore } from "@/store/useSearchPaginationStore";
import { useSession } from "next-auth/react";
import useAdminProductCategory from "@/hooks/category/useProductCategory";
import CategoriesItem from "../CategoriesItem";

const CategoriesControl: FC = () => {
  const { data: session } = useSession();
  const { setSearch } = useSearchPaginationStore();
  const { categories, refetch } = useAdminProductCategory(
    session?.accessToken as string
  );
  const {
    setIsModalCategoryOpen,
    refetchData,
    setModalCategoryType,
    setCategory,
    setIsDeletingCategory,
    setRefetchData,
  } = useSidebarAdminStore();
  const handleFilter = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 700),
    [setSearch]
  );

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
        <span>Categories</span>
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
                setIsDeletingCategory={setIsDeletingCategory}
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
