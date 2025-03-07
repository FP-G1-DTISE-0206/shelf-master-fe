import { FC } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell
} from "flowbite-react";
import { SalesReportResponse } from '@/types/report';
import { PaginationResponse } from '@/types/pagination';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface SalesReportTableProps {
  reports: PaginationResponse<SalesReportResponse> | undefined;
  isLoading: boolean;
  error: unknown;
}

const SalesReportTable: FC<SalesReportTableProps> = ({
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
        <TableHeadCell>Order ID</TableHeadCell>
        <TableHeadCell>Product</TableHeadCell>
        <TableHeadCell>Category</TableHeadCell>
        <TableHeadCell>Quantity</TableHeadCell>
        <TableHeadCell>Total Price</TableHeadCell>
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
        {!isLoading && !!error && (
          <TableRow>
            <TableCell className="text-center" colSpan={6}>
              {(error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                (error instanceof Error && error.message)}
            </TableCell>
          </TableRow>
        )}
        {reports?.data.map((report, idx) => (
          <TableRow key={idx}>
            <TableCell>{report.orderId}</TableCell>
            <TableCell>{report.productName}</TableCell>
            <TableCell>{report.categoryName}</TableCell>
            <TableCell>{report.quantity}</TableCell>
            <TableCell>{report.totalPrice}</TableCell>
            <TableCell>{formatOffsetDateTime(report.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SalesReportTable;