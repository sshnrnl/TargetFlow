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
export function IdSO({ data }: { data: SalesOrderData | undefined }) {
  //   if (!data) return <p>Loading Sales Order Details...</p>;
  const formSchema = z.object({
    target: z.string().min(1, "Please select a target."),
  });

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
          <FormItem>
            <FormLabel>Sales Order ID</FormLabel>
            <FormControl>
              <Input
                id="so_id"
                type="text"
                placeholder="-"
                value={data?.nobuk || "Undefined"}
                readOnly
              />
            </FormControl>
            <FormDescription>
              This is the province information for the customer.
            </FormDescription>
          </FormItem>
        </Form>
      </CardContent>
    </Card>
  );
}
