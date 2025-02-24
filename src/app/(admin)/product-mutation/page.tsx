import { FC } from 'react'
import MutationTable from './components/MutationTable';
import {
  Dropdown,
  DropdownItem,
} from "flowbite-react";

const ProductMutation: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-semibold text-2xl">Product Mutation</div>
      <MutationTable />
    </div>
  )

}

export default ProductMutation;