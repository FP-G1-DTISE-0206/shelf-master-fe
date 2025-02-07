"use client"
import { FC, useEffect } from "react";
import { 
  Button, Sidebar, TextInput, 
} from "flowbite-react";
import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartLine, faBoxOpen, faFile, faPlus, faEdit, faTrash, 
} from "@fortawesome/free-solid-svg-icons";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";
import useAdminProductCategory from "@/hooks/category/useAdminProductCategory";
import { useSearchPaginationStore } from "@/store/useSearchPaginationStore";
import { useSession } from "next-auth/react";
import { useDebouncedCallback } from "use-debounce";

const AdminSidebar: FC = () => {
  const { data: session } = useSession();
  const { search, setSearch } = useSearchPaginationStore();
  const { categories } = useAdminProductCategory(session?.accessToken as string);
  const { 
    isOpen, setIsOpen, page, setPage, setIsModalCategoryOpen, 
    setModalCategoryType, setCategory, setIsDeletingCategory, 
  } = useSidebarAdminStore();
  const pathName = usePathname();
  
  useEffect(()=> {
    setPage(pathName.split('/')[1]);
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = () => setIsOpen(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleClickLink = (clickedPage: string) => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    !mediaQuery.matches && setIsOpen(false);
    setPage(clickedPage);
  };

  const debounceFilter = useDebouncedCallback((value) => {
    setSearch(value);
  }, 500);
  
  return (
    isOpen && (
      <Sidebar className="w-full md:w-1/6 fixed z-10 top-12 h-[100vh]">
        <div>
          <div>
            <div className={cn(
              'px-5 py-3 rounded-lg flex items-center', 
              page === 'dashboard' 
                ? 'text-blue-500 bg-blue-100' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-blue-100'
            )} onClick={() => handleClickLink("dashboard")}>
              <Link href="/dashboard">
                <FontAwesomeIcon icon={faChartLine} className="mr-3 w-5" />
                <p className="inline">Dashboard</p>
              </Link>
            </div>
            <div className={cn(
              'px-5 py-3 rounded-lg flex items-center', 
              page === 'products' 
                ? 'text-blue-500 bg-blue-100' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-blue-100'
            )} onClick={() => handleClickLink("products")}>
              <Link href="/products">
                <FontAwesomeIcon icon={faBoxOpen} className="mr-3 w-5" />
                <p className="inline">Products</p>
              </Link>
            </div>
            <div className={cn(
              'px-5 py-3 rounded-lg flex items-center', 
              page === 'mutation-form' 
                ? 'text-blue-500 bg-blue-100' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-blue-100'
            )} onClick={() => handleClickLink("mutation-form")}>
              <div className="mr-3 w-5">
                <FontAwesomeIcon icon={faFile} className="ml-1 w-3" />
              </div>
              <p className="inline">Mutation Forms</p>
            </div>
          </div>
          {
            pathName === "/products" && (
            <Sidebar.ItemGroup>
              <div className={cn('flex justify-between items-center uppercase', 
                'text-gray-500 font-semibold')}>
                <span>Categories</span>
                <Button color="gray" size="sm" onClick={()=>{
                  setModalCategoryType("create")
                  setIsModalCategoryOpen(true)
                }}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
              <Sidebar.CTA className="flex flex-col gap-2 mt-6 text-gray-500">
                <div>
                  <TextInput 
                    placeholder="Search" value={search} 
                    onChange={(e) => debounceFilter(e.target.value)} />
                </div>
                { categories && categories.length > 0 ? (
                  categories.map((category, idx) => (
                    <div className="flex justify-between" key={idx}>
                      <div className="flex gap-2 items-center">
                        <span onClick={()=>{
                          setModalCategoryType("update")
                          setCategory(category)
                          setIsModalCategoryOpen(true)
                        }} className="cursor-pointer"><FontAwesomeIcon icon={faEdit} /></span>
                        <span>{category.name}</span>
                      </div>
                      <div>
                        <span onClick={()=>{
                            setIsDeletingCategory(true)
                            setCategory(category)
                          }} className="cursor-pointer">
                            <FontAwesomeIcon icon={faTrash} color="red" />
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-2 items-center">No categories found</div>
                )}
              </Sidebar.CTA>
          </Sidebar.ItemGroup>
            )
          }
        </div>
      </Sidebar>
    )
  );
};

export default AdminSidebar;
