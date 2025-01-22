"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import dashboardText from "@/components/sales/text-dashboard-sales";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
type SalesOrderData = {
  jtempo: number;
  jumlah: number;
  kocus: string;
  namcus: string;
  net: number;
  nobuk: string;
  tgl: string;
};
export function NomorSO({ data }: { data: SalesOrderData | undefined }) {
  //   if (!data) return <p>Loading Sales Order Details...</p>;
  const formSchema = z.object({
    target: z.string().min(1, "Please select a target."),
  });

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()); // Get the day as a number
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()]; // Get the full month name
    const year = date.getFullYear(); // Get the full year
    return `${day} ${month} ${year}`;
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { target: "" },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dashboardText["detail-sales-order"].title}</CardTitle>
        <CardDescription>
          {dashboardText["detail-sales-order"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="flex flex-col gap-6">
            <FormItem>
              <FormLabel>Kode Customer</FormLabel>
              <FormControl>
                <Input
                  id="so_id"
                  type="text"
                  placeholder="-"
                  value={data?.kocus || "Undefined"}
                  readOnly
                />
              </FormControl>
              <FormDescription>
                This is the province information for the customer.
              </FormDescription>
            </FormItem>
            <FormItem>
              <FormLabel>Nama Customer</FormLabel>
              <FormControl>
                <Input
                  id="so_id"
                  type="text"
                  placeholder="-"
                  value={data?.namcus || "Undefined"}
                  readOnly
                />
              </FormControl>
              <FormDescription>
                This is the province information for the customer.
              </FormDescription>
            </FormItem>
            <FormItem>
              <FormLabel>Tanggal SO Dibuat</FormLabel>
              <FormControl>
                <Input
                  id="so_id"
                  type="text"
                  placeholder="-"
                  value={
                    data?.tgl ? formatDate(new Date(data.tgl)) : "Undefined"
                  }
                  readOnly
                />
              </FormControl>
              <FormDescription>
                This is the province information for the customer.
              </FormDescription>
            </FormItem>
            <FormItem>
              <FormLabel>Tanggal Jatuh Tempo</FormLabel>
              <FormControl>
                <Input
                  id="so_due_date"
                  type="text"
                  placeholder="-"
                  value={
                    data?.tgl && data?.jtempo
                      ? formatDate(addDays(new Date(data.tgl), data.jtempo)) +
                        " | " +
                        `(${data?.jtempo}) Hari`
                      : "Undefined"
                  }
                  readOnly
                />
              </FormControl>
              <FormDescription>
                This is the due date for the sales order.
              </FormDescription>
            </FormItem>
            <FormItem>
              <FormLabel>NETT</FormLabel>
              <FormControl>
                <Input
                  id="so_id"
                  type="text"
                  placeholder="-"
                  value={data?.net || 0}
                  readOnly
                />
              </FormControl>
              <FormDescription>
                This is the province information for the customer.
              </FormDescription>
            </FormItem>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
