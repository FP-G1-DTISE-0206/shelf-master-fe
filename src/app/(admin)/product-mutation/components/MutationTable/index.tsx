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
import MutationRow, { getMutationType } from '../MutationRow';
import { MutationTypeResponse } from '@/types/mutation';

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

  const handleFilter = (type: MutationTypeResponse) => {
    setParams({ ...params, mutationTypeId: type.id, start: 0 })
  }

  const onPageChange = (page: number) => {
    setParams({ ...params, start: (page - 1) * params.length });
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const getMutationTypeName = (id: number): string => {
    const type = types?.find(type => type.id === id);
    return type ? getMutationType(type.originType, type.destinationType) : "All Type";
  }
  
  useEffect(() => {
    refetch();
  }, [warehouse]);

  return (
    <div className="bg-shelf-white rounded-lg p-5">
      <div className="flex justify-between max-lg:flex-col max-lg:items-start">
        <div className="font-semibold text-xl">
          <WarehouseSelect session={session} isAllowedAll={false}
            warehouse={warehouse} setWarehouse={setWarehouse} />
        </div>
        <div className="flex gap-2 items-center max-md:flex-col max-md:items-start">
          <Dropdown
            color="light"
            label={getMutationTypeName(params.mutationTypeId)}
            dismissOnClick={true}
          >
            <DropdownItem onClick={() => handleFilter({ id: 0, originType: "", destinationType: "" })}>
              All Type
            </DropdownItem>
            {
              types?.map((type) => (
                <DropdownItem key={type.id} onClick={() => handleFilter(type)}>
                  {getMutationType(type.originType, type.destinationType)}
                </DropdownItem>
              ))
            }
          </Dropdown>
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
        <Table hoverable className="min-w-max" id="mutation">
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
                <TableCell className="text-center" colSpan={8}>Loading . . .</TableCell>
              </TableRow>
            )}
            {!isLoading && mutations?.data.length === 0 && (
              <TableRow>
                <TableCell className="text-center" colSpan={8}>No Mutation found.</TableCell>
              </TableRow>
            )}
            {!isLoading && error && (
              <TableRow>
                <TableCell className="text-center" colSpan={8}>{error.message}</TableCell>
              </TableRow>
            )}
            {mutations?.data.map((mutation) => (
              <MutationRow key={mutation.id} mutation={mutation} 
                refetch={refetch} warehouse={warehouse} />
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