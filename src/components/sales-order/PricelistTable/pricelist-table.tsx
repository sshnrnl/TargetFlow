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
import { fetchItems, FetchItemsType } from "@/db/items";
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

//convert fetched items into map
type CartType = {
  id: string;
  name: string;
  qty: number;
  price: number;
  minprice: number;
  conversion: number;
  img: string;
  total: number;
  description: string;
};
function handleAddToCart(
  id: string,
  price: number,
  description: string,
  conversion: number,
  minprice: number,
  img: string,
  name: string
) {
  const res: CartType = {
    id: id,
    name: name,
    qty: 1,
    price: price,
    img: img,
    minprice: minprice,
    conversion: conversion,
    total: price,
    description: description,
  };

  // console.log(res);

  // const existingItem = items.find((a) => a.id === id);
  const event = new CustomEvent("add-to-cart", { detail: res });
  window.dispatchEvent(event);
}

export const columns: ColumnDef<FetchItemsType>[] = [
  {
    accessorKey: "imgs",
    header: "Image",
    cell: ({ row }) => (
      <div
        className="w-[5rem] rounded-md  aspect-square bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${row.getValue("imgs")}')` }}
      ></div>
    ),
  },

  {
    accessorKey: "name",
    header: "Barang",
    cell: ({ row }) => (
      <label
        className="overflow-hidden text-ellipsis text-sm font-medium leading-none"
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
      <label className="text-sm font-bold">
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
    cell: ({ row }) => (
      <Button
        onClick={() =>
          handleAddToCart(
            row.getValue("value"),
            row.getValue("price"),
            row.getValue("description"),
            row.getValue("conversion"),
            row.getValue("minprice"),
            "https://st2.depositphotos.com/1003272/5280/i/450/depositphotos_52809811-stock-photo-black-box.jpg",
            row.getValue("name")
          )
        }
        variant="outline"
      >
        Tambahkan
      </Button>
    ),
  },

  {
    accessorKey: "conversion",
    header: "Barang",
    cell: ({ row }) => <label></label>,
  },
  {
    accessorKey: "minprice",
    header: "Barang",
    cell: ({ row }) => <label></label>,
  },
];

export function PricelistTable() {
  const [items, setItems] = React.useState<FetchItemsType[]>([]);

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchItems(); // Assuming fetchItems returns the data
        setItems(data); // Set the fetched items to state
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data: items,
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
      </div>
      <div className="rounded-md border bg-border">
        <div>
          <div className="flex flex-col gap-[1px]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <div
                  className="bg-white p-2"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
              <div>No results.</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
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
