import { FC, Dispatch, SetStateAction } from 'react'
import { useSession } from "next-auth/react";
import useMutationLogs from '@/hooks/mutation/useMutationLogs';
import { 
  Table, TableHead, Modal, TableRow, 
  TableBody, TableCell, TableHeadCell, 
} from "flowbite-react";
//import { DateTime } from 'luxon'

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

  /*const getFormattedDate = (date: Date): string => {
    return DateTime.fromISO(date, { setZone: true })
     .toFormat("EEEE, dd MMMM yyyy 'at' HH.mm '[UTC]'ZZ");
  }*/

  return (
    <Modal show={isOpen} onClose={() => setOpen(false)}>
      <Modal.Header>
        Logs
      </Modal.Header>
      <Modal.Body>
        <Table hoverable className="min-w-max" id="mutation-log">
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Created At</TableHeadCell>
            <TableHeadCell>Reason</TableHeadCell>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell className="text-center" colSpan={4}>Loading . . .</TableCell>
              </TableRow>
            )}
            {!isLoading && logs?.length === 0 && (
              <TableRow>
                <TableCell className="text-center" colSpan={4}>No Mutation found.</TableCell>
              </TableRow>
            )}
            {!isLoading && error && (
              <TableRow>
                <TableCell className="text-center" colSpan={4}>{error.message}</TableCell>
              </TableRow>
            )}
            {/*logs?.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell>{/*getFormattedDate(log.createdAt)/}</TableCell>
                <TableCell>{log.reason}</TableCell>
              </TableRow>
            ))*/}
          </TableBody>
        </Table>
      </Modal.Body>
    </Modal>
  )
}

export default MutationLogModal;