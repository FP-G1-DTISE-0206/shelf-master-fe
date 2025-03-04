import { FC } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell
} from "flowbite-react";
import { StockReportResponse } from '@/types/report';
import { PaginationResponse } from '@/types/pagination';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface StockReportTableProps {
  reports: PaginationResponse<StockReportResponse> | undefined;
  isLoading: boolean;
  error: unknown;
}

const StockReportTable: FC<StockReportTableProps> = ({
  reports,
  isLoading,
  error,
}) => {
  const formatOffsetDateTime = (offsetDateTime: string): string => {
    const date = new Date(offsetDateTime);
    const zonedDate = toZonedTime(date, 'UTC');
    return format(zonedDate, "EEEE, dd MMMM yyyy 'at' HH.mm 'UTC'X");
  };
  return (
    <Table hoverable className="min-w-max" id="sales">
      <TableHead>
        <TableHeadCell>Mutation ID</TableHeadCell>
        <TableHeadCell>Origin</TableHeadCell>
        <TableHeadCell>Destination</TableHeadCell>
        <TableHeadCell>Product</TableHeadCell>
        <TableHeadCell>Quantity</TableHeadCell>
        <TableHeadCell>Requester</TableHeadCell>
        <TableHeadCell>Processor</TableHeadCell>
        <TableHeadCell>Date</TableHeadCell>
      </TableHead>
      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell className="text-center" colSpan={6}>Loading . . .</TableCell>
          </TableRow>
        )}
        {!isLoading && reports?.data.length === 0 && (
          <TableRow>
            <TableCell className="text-center" colSpan={6}>No Record found.</TableCell>
          </TableRow>
        )}
        {!isLoading && Boolean(error) && (
          <TableRow>
            <TableCell className="text-center" colSpan={6}>
              {(error instanceof Error) && error?.message}
            </TableCell>
          </TableRow>
        )}
        {reports?.data.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.id}</TableCell>
            <TableCell>{report.originName}</TableCell>
            <TableCell>{report.destinationName}</TableCell>
            <TableCell>{report.productName}</TableCell>
            <TableCell>{report.quantity}</TableCell>
            <TableCell>{report.requesterName}</TableCell>
            <TableCell>{report.processorName}</TableCell>
            <TableCell>{formatOffsetDateTime(report.processedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default StockReportTable;