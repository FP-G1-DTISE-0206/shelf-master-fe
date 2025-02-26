"use-client"
import { FC, useState, useEffect } from 'react'
import { ProductMutationResponse } from '@/types/mutation';
import { AssignedWarehouse } from '@/types/product';
import { MutationTypeEnum } from '../MutationRow';
import { useSession } from "next-auth/react";
import useProcessMutation from '@/hooks/mutation/useProcessMutation';
import ConfirmationModal from '@/components/ConfirmationModal';
import ReasonModal from '../ReasonModal';
import ButtonLog from '../ButtonLog';
import {
  TableCell,
  Button
} from "flowbite-react";

interface MutationActionProps {
  mutation: ProductMutationResponse;
  refetch: () => void;
  warehouse: AssignedWarehouse;
}

const MutationAction: FC<MutationActionProps> = ({
  mutation,
  refetch,
  warehouse
}) => {
  const { data: session } = useSession();
  const { 
    cancelMutation, 
    rejectMutation, 
    approveMutation, 
  } = useProcessMutation(session?.accessToken as string, refetch);
  const [ openModalConfirmation, setOpenModalConfirmation ] = useState<boolean>(false);
  const [ openModalRejection, setOpenModalRejection ] = useState<boolean>(false);
  const [ actionType, setActionType ] = useState<string>("");
  const [ reason, setReason ] = useState<string>("");

  const handleConfirm = () => {
    switch(actionType) {
      case "cancel": {
        cancelMutation({ mutationId: mutation.id });
        break;
      }
      case "reject": {
        rejectMutation({ mutationId: mutation.id, data: { reason: reason } });
        setReason("");
        break;
      }
      case "approve": {
        approveMutation({ mutationId: mutation.id });
        break;
      }
    }
    setActionType("");
    setOpenModalConfirmation(false);
  }
  
  useEffect(() => {
    if (reason) handleConfirm();
  }, [reason]);

  if(mutation.processorName != "" || mutation.isApproved) return (
    <TableCell className="flex flex-wrap gap-1 justify-center">
      <ButtonLog mutationId={mutation.id} />
    </TableCell>
  )

  return (
    <TableCell className="flex flex-wrap gap-1 justify-center">
      {
        (mutation.originId == warehouse.id 
        && mutation.originType === MutationTypeEnum.WAREHOUSE.toString())
        && (
          <>
            <Button color="failure" onClick={()=>{
              setActionType("reject");
              setOpenModalRejection(true)
            }}>Reject</Button>
            <Button onClick={()=>{
              setActionType("approve");
              setOpenModalConfirmation(true)
            }}>Approve</Button>
          </>
        )
      }
      {
        (mutation.destinationId == warehouse.id 
        && mutation.destinationType === MutationTypeEnum.WAREHOUSE.toString()) && (
          <Button color="failure" onClick={()=>{
            setActionType("cancel");
            setOpenModalConfirmation(true)
          }}>Cancel</Button>
        )
      }
      <ReasonModal setOpen={setOpenModalRejection} isOpen={openModalRejection} 
        setReason={setReason} />
      <ConfirmationModal 
        isOpen={openModalConfirmation}
        onClose={()=>setOpenModalConfirmation(false)}
        onConfirm={handleConfirm}
      />
    </TableCell>
  )
}

export default MutationAction;