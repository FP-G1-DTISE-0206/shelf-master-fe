"use client"
import { FC, useState, useCallback, useEffect } from 'react'
import {
  Dropdown,
  DropdownItem,
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TextInput,
  TableRow,
  TableCell,
  Pagination
} from "flowbite-react";
import { useSession } from "next-auth/react";
import useMutation from '@/hooks/mutation/useMutation';
import useMutationType from '@/hooks/mutation/useMutationType';
import { AssignedWarehouse } from '@/types/product';
import { debounce } from "lodash";
import WarehouseSelect from '../WarehouseSelect';
import MutationRow from '../MutationRow';

const MutationTable: FC = () => {
  const [warehouse, setWarehouse] = useState<AssignedWarehouse>({ id: 0, name: "No Warehouse" });
  const { data: session } = useSession();
  const { types } = useMutationType(session?.accessToken as string);
  const { error, isLoading, mutations, setParams, params, refetch } =
    useMutation(session?.accessToken as string, warehouse.id);
  const [searchTerm, setSearchTerm] = useState(params.search);
  const handleSearch = useCallback(
    debounce((value: string) => {
      setParams({ ...params, search: value });
    }, 500),
    [setParams]
  );

  const handleSort = (sort: string) => {
    setParams({ ...params, order: sort });
  }

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
  }, [warehouse]);

  return (
    <div className="bg-shelf-white rounded-lg p-5">
      <div className="flex justify-between max-lg:flex-col max-lg:items-start">
        <div className="font-semibold text-xl">
          <WarehouseSelect session={session} warehouse={warehouse} setWarehouse={setWarehouse} />
        </div>
        <div className="flex gap-2 items-center max-md:flex-col max-md:items-start">
          <Dropdown
            color="light"
            label={params.order == "desc" ? "From Latest" : "From Oldest"}
            dismissOnClick={true}
          >
            <DropdownItem onClick={() => handleSort("desc")}>
              From Latest
            </DropdownItem>
            <DropdownItem onClick={() => handleSort("asc")}>
              From Oldest
            </DropdownItem>
          </Dropdown>
          <TextInput
            placeholder="Search Product"
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
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Product</TableHeadCell>
            <TableHeadCell>Qty</TableHeadCell>
            <TableHeadCell>Requester</TableHeadCell>
            <TableHeadCell>Processor</TableHeadCell>
            <TableHeadCell>Approved</TableHeadCell>
            <TableHeadCell className="text-center">Action</TableHeadCell>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>Loading . . .</TableCell>
              </TableRow>
            )}
            {!isLoading && mutations?.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>No Mutation found.</TableCell>
              </TableRow>
            )}
            {!isLoading && error && (
              <TableRow>
                <TableCell colSpan={4}>{error.message}</TableCell>
              </TableRow>
            )}
            {mutations?.data.map((mutation) => (
              <MutationRow mutation={mutation} refetch={refetch} />
            ))}
          </TableBody>
        </Table>
        <div className="flex overflow-x-auto sm:justify-end">
          <Pagination
            currentPage={params.start / params.length + 1}
            totalPages={
              mutations?.recordsFiltered
                ? Math.ceil(mutations?.recordsFiltered / params.length)
                : 1
            }
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </div>
  )
}

export default MutationTable;