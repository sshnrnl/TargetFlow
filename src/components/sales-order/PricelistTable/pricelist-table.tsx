"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { items, Items } from "@/db/items";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Items[] = items;
function handleAddToCart(id: string) {
  const event = new CustomEvent("add-to-cart", { detail: id });
  window.dispatchEvent(event);
}
export const columns: ColumnDef<Items>[] = [
  {
    accessorKey: "imgs",
    header: "Image",
    cell: ({ row }) => (
      <div
        className="w-[6rem] rounded-md  aspect-square bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${row.getValue("imgs")}')` }}
      ></div>
    ),
  },

  {
    accessorKey: "name",
    header: "Barang",
    cell: ({ row }) => (
      <label
        className="overflow-hidden text-ellipsis text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {row.getValue("name")}
      </label>
    ),
  },

  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => (
      <label className=" text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(row.getValue("price"))}
      </label>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <label
        className="overflow-hidden text-ellipsis text-[0.8rem] text-muted-foreground"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {row.getValue("description")}
      </label>
    ),
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      return (
        <Button
          onClick={() => handleAddToCart(row.getValue("value"))}
          variant="outline"
        >
          Tambahkan
        </Button>
      );
    },
  },
];

export function PricelistTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      name: true,
      stock: true,
    });
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageIndex, setPageIndex] = React.useState(0);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter barang..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button className="flex-1" variant="outline">
          Reload
        </Button>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div className="rounded-md border bg-border">
        <div>
          {/* <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader> */}
          <div className="flex flex-col gap-[1px]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <div
                  className="bg-white p-2"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {/* {row.getVisibleCells().map((cell) => (
                    <div key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}   */}
                  <div className="flex w-full">
                    <div key={row.getVisibleCells()[0].id}>
                      {flexRender(
                        row.getVisibleCells()[0].column.columnDef.cell,
                        row.getVisibleCells()[0].getContext()
                      )}
                    </div>
                    <div className="flex w-full flex-col justify-between p-2">
                      <div>
                        <div key={row.getVisibleCells()[1].id}>
                          {flexRender(
                            row.getVisibleCells()[1].column.columnDef.cell,
                            row.getVisibleCells()[1].getContext()
                          )}
                        </div>
                        <div key={row.getVisibleCells()[2].id}>
                          {flexRender(
                            row.getVisibleCells()[3].column.columnDef.cell,
                            row.getVisibleCells()[3].getContext()
                          )}
                        </div>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <div key={row.getVisibleCells()[3].id}>
                          {flexRender(
                            row.getVisibleCells()[2].column.columnDef.cell,
                            row.getVisibleCells()[2].getContext()
                          )}
                        </div>
                        <div className="" key={row.getVisibleCells()[4].id}>
                          {flexRender(
                            row.getVisibleCells()[4].column.columnDef.cell,
                            row.getVisibleCells()[4].getContext()
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          Showing {table.getFilteredRowModel().rows.length} item(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((old) => Math.max(old - 1, 0))} // Go to previous page
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPageIndex((old) => Math.min(old + 1, table.getPageCount() - 1))
            } // Go to next page
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
