"use client";
import CustomSpinner from "@/components/CustomSpinner";
import useWarehouses from "@/hooks/useWarehouse";
import {
  faPlus,
  faSortAlphaAsc,
  faSortAlphaDesc,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dropdown,
  DropdownItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useCallback, useState } from "react";

interface DataRow {
  id: number;
  name: string;
  adminName: string;
}

const data: DataRow[] = [
  { id: 1, name: "Warehouse A", adminName: "John Doe" },
  { id: 2, name: "Warehouse B", adminName: "Jane Smith" },
  { id: 3, name: "Warehouse C", adminName: "Alice Johnson" },
];
const WarehouseTable: FC = () => {
  const { data: session } = useSession();
  const { error, isLoading, warehouses, setParams, params } = useWarehouses(
    session?.accessToken as string
  );
  const [searchTerm, setSearchTerm] = useState(params.search);
  const handleSearch = useCallback(
    debounce((value: string) => {
      setParams({ ...params, search: value });
    }, 500),
    [setParams]
  );

  const handleSort = () => {
    if (params.order === "desc") {
      setParams({ ...params, order: "asc" });
    } else {
      setParams({ ...params, order: "desc" });
    }
  };

  const handleSetField = (field: string) => {
    setParams({ ...params, field: field });
  };

  const onPageChange = (page: number) => {
    setParams({ ...params, start: (page - 1) * params.length });
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="bg-shelf-white rounded-lg p-5">
      <div className="flex justify-between max-lg:flex-col max-lg:items-start">
        <div className="font-semibold text-xl">Warehouse</div>
        <div className="flex gap-2 items-center max-md:flex-col max-md:items-start">
          <div>Sort by:</div>
          <Dropdown
            color="light"
            label={params.field.toUpperCase()}
            dismissOnClick={true}
          >
            <DropdownItem onClick={() => handleSetField("id")}>ID</DropdownItem>
            <DropdownItem onClick={() => handleSetField("name")}>
              NAME
            </DropdownItem>
          </Dropdown>
          <Button color="light" size="lg" onClick={handleSort}>
            {params.order === "desc" ? (
              <FontAwesomeIcon icon={faSortAlphaDesc} />
            ) : (
              <FontAwesomeIcon icon={faSortAlphaAsc} />
            )}
          </Button>
          <TextInput
            placeholder="Search Warehouse"
            autoComplete="off"
            value={searchTerm}
            onChange={onChangeSearch}
          />
          <Link
            href={"/warehouse/create-warehouse"}
            className="bg-shelf-black px-4 py-2 text-shelf-white rounded-lg flex gap-2 items-center"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New Warehouse
          </Link>
        </div>
      </div>
      <hr className="border-t border-gray-300 my-4" />

      <div className="overflow-x-auto">
        <Table hoverable className="min-w-max">
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Admin</TableHeadCell>
            <TableHeadCell className="text-center">Action</TableHeadCell>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>Searching . . .</TableCell>
              </TableRow>
            )}
            {!isLoading && warehouses?.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>No warehouses found.</TableCell>
              </TableRow>
            )}
            {warehouses?.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.admins.length === 0 && <>No assigned Admin.</>}
                  {row.admins.map((admin) => admin.email).join(", ")}
                </TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Button size="xs" color="blue">
                    Assign Admin
                  </Button>
                  <Button size="xs" color="blue">
                    Edit
                  </Button>
                  <Button size="xs" color="red" className="ml-2">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex overflow-x-auto sm:justify-end">
          <Pagination
            currentPage={params.start / params.length + 1}
            totalPages={
              warehouses?.recordsFiltered
                ? Math.ceil(warehouses?.recordsFiltered / params.length)
                : 1
            }
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </div>
  );
};
export default WarehouseTable;
