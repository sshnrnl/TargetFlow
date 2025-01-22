"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import dashboardText from "@/components/sales/text-dashboard-sales";
import { fetchWithAuth } from "@/lib/get_api";
import { NomorSO } from "@/components/sales-order-detail/nomor-so";
import { IdSO } from "@/components/sales-order-detail/id-so";
import { SalesOrderDetailItems } from "@/components/sales-order-detail/items";

function SalesOrderDetailsPage() {
  const searchParams = useSearchParams();
  const sales_order_id = searchParams?.get("so_id");
  type Item = [string, string | null, number, string, number];
  type SalesOrderData = {
    jtempo: number;
    jumlah: number;
    kocus: string;
    namcus: string;
    net: number;
    nobuk: string;
    tgl: string;
  };

  const [TempSO, setSO] = useState<SalesOrderData | undefined>(undefined);
  const [TempItems, setItems] = useState<Item[]>([]);

  const fetchSalesOrder = async () => {
    try {
      if (!sales_order_id) throw new Error("Sales order ID is undefined");
      const rawData = (
        await fetchWithAuth<{ result: any }>(
          "/api/v1/sales/sales-order-details?so_id=" + sales_order_id
        )
      ).result;
      console.log("Raw Data:", rawData);
      setSO({ ...rawData.sales_order, tgl: new Date(rawData.sales_order.tgl) });
      setItems(rawData.items);
    } catch (error) {
      console.error("Error fetching sales order data:", error);
    }
  };

  useEffect(() => {
    if (sales_order_id) fetchSalesOrder();
  }, [sales_order_id]);

  return (
    <>
      <header className="flex h-16 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Sales</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {dashboardText["detail-sales-order"].title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-4 grid lg:grid-cols-3 gap-4">
        <div className="grid gap-4">
          <IdSO data={TempSO} />
          <NomorSO data={TempSO} />
        </div>
        <div className="grid gap-4">
          <SalesOrderDetailItems data={TempItems} />
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SalesOrderDetailsPage />
    </Suspense>
  );
}
