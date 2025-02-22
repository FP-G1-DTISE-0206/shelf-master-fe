"use client";
import useUsers from "@/hooks/useUser";
import {
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
import { FC, useCallback, useEffect, useState } from "react";
import UserItem from "../UserItem";

const UserTable: FC = () => {
  const { data: session } = useSession();
  const { error, isLoading, users, setParams, params, refetch } = useUsers(
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

  useEffect(() => {
    refetch();
  }, []);
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
            <DropdownItem onClick={() => handleSetField("userName")}>
              USERNAME
            </DropdownItem>
            <DropdownItem onClick={() => handleSetField("email")}>
              EMAIL
            </DropdownItem>
            <DropdownItem onClick={() => handleSetField("role")}>
              ROLE
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
        </div>
      </div>
      <hr className="border-t border-gray-300 my-4" />

      <div className="overflow-x-auto">
        <Table hoverable className="min-w-max">
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>USERNAME</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>Loading . . .</TableCell>
              </TableRow>
            )}
            {!isLoading && users?.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>No warehouses found.</TableCell>
              </TableRow>
            )}
            {!isLoading && error && (
              <TableRow>
                <TableCell colSpan={4}>{error.message}</TableCell>
              </TableRow>
            )}
            {users?.data.map((user) => (
              <UserItem user={user} key={user.id} />
            ))}
          </TableBody>
        </Table>
        <div className="flex overflow-x-auto sm:justify-end">
          <Pagination
            currentPage={params.start / params.length + 1}
            totalPages={
              users?.recordsFiltered
                ? Math.ceil(users?.recordsFiltered / params.length)
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
export default UserTable;
