"use client";
import React, { useMemo } from "react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type Payment = {
  lastName: string;
  firstName: string;
  reference: string;
  status: string;
  amount: number;
  sendAmount: number;
  date: string;
};

const columnHelper = createColumnHelper<Payment>();

const PaymentsTable: React.FC<{ data: Payment[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<Payment>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },

      {
        accessorKey: "reference",
        header: "Reference",
        size: 80,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => (info.getValue() as number).toFixed(2),
      },
      {
        accessorKey: "sendAmount",
        header: "Send Amount",
        cell: (info) => (info.getValue() as number).toFixed(2),
      },

      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "date",
        header: "Created At",
        cell: (info) => info.getValue<Date>().toLocaleString(),
        size: 200,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 p-2 font-medium text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-white even:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border border-gray-300 p-2 text-gray-600"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
