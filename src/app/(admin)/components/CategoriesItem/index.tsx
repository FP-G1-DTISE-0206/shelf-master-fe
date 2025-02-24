import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { Dispatch, FC, SetStateAction } from "react";

interface CategoriesLineProps {
  category: any;
  setModalCategoryType: (page: string) => void;
  setCategory: Dispatch<SetStateAction<any>>;
  setIsModalCategoryOpen: (isModalCategoryOpen: boolean) => void;
  setIsDeletingCategory: (isDeletingCategory: boolean) => void;
}

const CategoriesItem: FC<CategoriesLineProps> = ({
  category,
  setModalCategoryType,
  setCategory,
  setIsModalCategoryOpen,
  setIsDeletingCategory,
}) => {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
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
          <span>{category.name}</span>
        </div>
        <div>
          {session?.user.roles.includes("SUPER_ADMIN") && (
            <span
              onClick={() => {
                setIsDeletingCategory(true);
                setCategory(category);
              }}
              className="cursor-pointer"
            >
              <FontAwesomeIcon icon={faTrash} color="red" />
            </span>
          )}
        </div>
      </div>
      <div className="h-0.5 w-full mt-1 bg-shelf-black rounded-full" />
    </>
  );
};
export default CategoriesItem;
