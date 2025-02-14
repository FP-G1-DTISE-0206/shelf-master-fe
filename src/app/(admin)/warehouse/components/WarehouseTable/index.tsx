import { faPlus, faSortAlphaAsc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dropdown,
  DropdownItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { FC } from "react";

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
  return (
    <div className="bg-shelf-white rounded-lg p-5">
      <div className="flex justify-between">
        <div className="font-semibold text-xl">Warehouse</div>
        <div className="flex gap-2 items-center">
          <div>Sort by:</div>
          <Dropdown color="light" label="ID" dismissOnClick={false}>
            <DropdownItem>ID</DropdownItem>
            <DropdownItem>Name</DropdownItem>
          </Dropdown>
          <Button color="light" size="lg">
            <FontAwesomeIcon icon={faSortAlphaAsc} />
          </Button>
          <TextInput placeholder="Search Warehouse" autoComplete="off" />
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
        <Table hoverable>
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Admin Name</TableHeadCell>
            <TableHeadCell className="text-center">Action</TableHeadCell>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.adminName}</TableCell>
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
      </div>
    </div>
  );
};
export default WarehouseTable;
