import { ProductMutationResponse } from '@/types/mutation';
import { FC } from 'react'
import {
  TableRow,
  TableCell
} from "flowbite-react";
import { AssignedWarehouse } from '@/types/product';
import MutationAction from '../MutationAction';

interface MutationRowProps {
  mutation: ProductMutationResponse;
  refetch: () => void;
  warehouse: AssignedWarehouse;
}

export enum MutationTypeEnum {
  WAREHOUSE = "WAREHOUSE",
  VENDOR = "VENDOR",
  USER = "USER"
}

const mutationTypeMap: Record<string, string> = {
  [`${MutationTypeEnum.WAREHOUSE}-${MutationTypeEnum.WAREHOUSE}`]: "Internal",
  [`${MutationTypeEnum.WAREHOUSE}-${MutationTypeEnum.USER}`]: "Order",
  [`${MutationTypeEnum.USER}-${MutationTypeEnum.WAREHOUSE}`]: "Return Order",
  [`${MutationTypeEnum.VENDOR}-${MutationTypeEnum.WAREHOUSE}`]: "Restock",
};

export const getMutationType = (originType: string, destinationType: string): string => {
  return mutationTypeMap[`${originType}-${destinationType}`] || "Unknown";
};

const MutationRow: FC<MutationRowProps> = ({
  mutation,
  refetch,
  warehouse
}) => {
  return (
    <>
      <TableRow key={mutation.id}>
        <TableCell>{mutation.id}</TableCell>
        <TableCell>
          {getMutationType(
            mutation.originType, 
            mutation.destinationType
          )}
        </TableCell>
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
        <MutationAction mutation={mutation} warehouse={warehouse} refetch={refetch} />
      </TableRow>
    </>
  )
}

export default MutationRow;