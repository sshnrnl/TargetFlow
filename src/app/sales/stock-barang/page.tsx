"use client";
import { OmzetMarketing } from "@/components/sales/omzet-marketing";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SalesTable } from "@/components/sales/akun-marketing";
import { ComponentCard } from "@/components/card/card";
import { KinerjaSales } from "@/components/sales/kinerja-sales";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { TotalBarangSaya } from "@/components/sales/total-barang-saya";
import { TotalOmzetSales } from "@/components/sales/total-omzet-sales";
import { PerformaSales } from "@/components/sales/performa-sales";
import { InvoiceSales } from "@/components/sales/invoice-sales";
import { RecentInvoice } from "@/components/sales/invoice-terbaru";
import { RecentSoldItems } from "@/components/sales/barang-terjual";
import { BuatSalesOrder } from "@/components/sales/buat-sales-order";
import { SalesDashboardDriver } from "@/components/driverjs/sales-dashboard";

import { fetchWithAuth } from "@/lib/get_api";
import { useEffect, useState } from "react";
import { StockMenipis } from "@/components/sales/stock-menipis";
import { StockHabis } from "@/components/sales/stock-habis";
import { StockBarang } from "@/components/sales/stock-barang";
import { BarangDipantau } from "@/components/sales/barang-dipantau";

export type MonthlySalesInfo = {
  omzet: number;
  jumlah_invoice: number;
  jumlah_customer: number;
};

export type StockInfo = {
  emergency_stock: number;
  items: [string, string, string, string, number, string][];
  items_count: number;
  stock_critical: number;
};

const fetchData = async (): Promise<StockInfo> => {
  try {
    const rawData = await fetchWithAuth<StockInfo>("/api/v1/sales/get_stock");

    const salesInfo: StockInfo = {
      emergency_stock: rawData.emergency_stock,
      items: rawData.items,
      items_count: rawData.items_count,
      stock_critical: rawData.stock_critical,
    };

    console.log("Transformed data:", salesInfo);
    return salesInfo;
  } catch (error) {
    console.error("Error fetching or transforming data:", error);
    throw error;
  }
};

export default function Page() {
  const [StockInfo, setStockInfo] = useState<StockInfo>({
    emergency_stock: 0,
    items: [],
    items_count: 0,
    stock_critical: 0,
  });
  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData();
      console.log(result);
      setStockInfo(result);
    };
    fetchDataAsync();
  }, []);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Overview</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Sales</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {/* UNCOMMENT TO OPEN TUTORIAL  */}
      {/* <SalesDashboardDriver /> */}
      <div className="flex p-4 flex-col mb-2">
        <h1 className="text-3xl font-bold tracking-tight">Stock</h1>
        <p className="text-base text-muted-foreground">
          Anda dapat mengetahui stock barang yang ada di gudang saat ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 pt-0">
        <div className="grid col-span-3 grid-cols-1 lg:grid-cols-3 gap-4">
          <div id="omzet-sales">
            <TotalBarangSaya FetchedItemsCount={StockInfo.items_count} />
          </div>
          <div id="invoice-sales">
            <StockMenipis FetchedItemsCount={StockInfo.emergency_stock} />

            {/* <InvoiceSales FetchedInvoice={monthlySalesInfo.jumlah_invoice} /> */}
          </div>
          <div id="performa-sales">
            <StockHabis FetchedItemsCount={StockInfo.stock_critical} />
          </div>
        </div>
        <div className="grid col-span-3 grid-cols-1 lg:grid-cols-2 gap-4">
          <div id="recent-invoice">
            <StockBarang FetchedItems={StockInfo.items} />
          </div>
          <div className="flex flex-col gap-4">
            <div id="recent-sold">
              <BarangDipantau />
            </div>
            <div id="buat-so">{/* <BuatSalesOrder /> */}</div>
          </div>
        </div>
      </div>
    </>
  );
}
