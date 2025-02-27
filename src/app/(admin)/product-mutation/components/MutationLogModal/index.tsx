import React, { FC, Dispatch, SetStateAction } from 'react'
import { useSession } from "next-auth/react";
import useMutationLogs from '@/hooks/mutation/useMutationLogs';
import { 
  Table, TableHead, Modal, TableRow, 
  TableBody, TableCell, TableHeadCell, 
} from "flowbite-react";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface MutationLogModalProps {
  mutationId: number;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MutationLogModal: FC<MutationLogModalProps> = ({
  mutationId,
  isOpen,
  setOpen
}) => {
  const { data: session } = useSession();
  const { 
    isLoading, error, logs
  } = useMutationLogs(session?.accessToken as string, mutationId)
  
  const formatOffsetDateTime = (offsetDateTime: string): string => {
    const date = new Date(offsetDateTime);
    const zonedDate = toZonedTime(date, 'UTC');
    return format(zonedDate, "EEEE, dd MMMM yyyy 'at' HH.mm 'UTC'X");
  };

  return (
    <Modal show={isOpen} onClose={() => setOpen(false)}>
      <Modal.Header>
        Logs
      </Modal.Header>
      <Modal.Body>
        <Table hoverable className="min-w-max" id="mutation-log">
          <TableHead>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Created At</TableHeadCell>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell className="text-center" colSpan={2}>Loading . . .</TableCell>
              </TableRow>
            )}
            {!isLoading && logs?.length === 0 && (
              <TableRow>
                <TableCell className="text-center" colSpan={2}>No Mutation found.</TableCell>
              </TableRow>
            )}
            {!isLoading && error && (
              <TableRow>
                <TableCell className="text-center" colSpan={2}>{error.message}</TableCell>
              </TableRow>
            )}
            {(logs ?? []).map((log) => (
              <React.Fragment key={log.id}>
                <TableRow>
                  <TableCell>{log.status}</TableCell>
                  <TableCell>{formatOffsetDateTime(log.createdAt)}</TableCell>
                </TableRow>
                {!!log.reason && (
                  <TableRow>
                    <TableCell className="text-wrap" colSpan={2}>
                      <span className="font-bold">Rejection reason:</span>
                      &nbsp;{log.reason}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Modal.Body>
    </Modal>
  )
}

export default MutationLogModal;