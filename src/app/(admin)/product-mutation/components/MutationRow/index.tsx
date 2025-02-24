import { ProductMutationResponse } from '@/types/mutation';
import { FC } from 'react'
import {
  TableRow,
  TableCell
} from "flowbite-react";

interface MutationRowProps {
  mutation: ProductMutationResponse;
  refetch: () => void;
}

const MutationRow: FC<MutationRowProps> = ({
  mutation,
  refetch
}) => {
  return (
    <>
      <TableRow key={mutation.id}>
        <TableCell>{mutation.id}</TableCell>
        <TableCell>{mutation.destinationType}</TableCell>
        <TableCell>
          {mutation.productName}
        </TableCell>
        <TableCell>
          {mutation.quantity}
        </TableCell>
        <TableCell>
          {mutation.requesterName}
        </TableCell>
        <TableCell>
          {mutation.processorName}
        </TableCell>
        <TableCell>
          {mutation.isApproved ? "Y" : "N"}
        </TableCell>
        <TableCell>
          {"action"}
        </TableCell>
      </TableRow>
    </>
  )
}

export default MutationRow;