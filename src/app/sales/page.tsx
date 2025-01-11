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
import { TotalCustomer } from "@/components/sales/total-customer";
import { LoginForm } from "@/components/sales/buat-akun";
import { LokasiMarketing } from "@/components/sales/lokasi-marketing";
import { ConfigAkunMarketing } from "@/components/sales/config-akun-marketing";
import { TargetMarketing } from "@/components/sales/target-marketing";
import { KelolaTarget } from "@/components/sales/kelola-target";
import { TotalOmzetSales } from "@/components/sales/total-omzet-sales";
import { PerformaSales } from "@/components/sales/performa-sales";
import { InvoiceSales } from "@/components/sales/invoice-sales";
import { RecentInvoice } from "@/components/sales/invoice-terbaru";
import { RecentSoldItems } from "@/components/sales/barang-terjual";
import { BuatSalesOrder } from "@/components/sales/buat-sales-order";
import { SalesDashboardDriver } from "@/components/driverjs/sales-dashboard";
export default function Page() {
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
      <SalesDashboardDriver />
      <div className="flex p-4 flex-col mb-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-base text-muted-foreground">
          Anda dapat melacak progress bulan ini beserta dengan target-target
          penjualan yang harus dicapai.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 pt-0">
        <div className="grid col-span-3 grid-cols-1 lg:grid-cols-3 gap-4">
          <div id="omzet-sales">
            <TotalOmzetSales />
          </div>
          <div id="invoice-sales">
            <InvoiceSales />
          </div>
          <div id="performa-sales">
            <PerformaSales />
          </div>
        </div>
        <div className="grid col-span-3 grid-cols-1 lg:grid-cols-2 gap-4">
          <div id="recent-invoice">
            <RecentInvoice />
          </div>
          <div className="flex flex-col gap-4">
            <div id="recent-sold">
              <RecentSoldItems />
            </div>
            <div id="buat-so">
              <BuatSalesOrder />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
