"use client";
import { OmzetMarketing } from "@/components/sales/omzet-marketing";
import { AppSidebar } from "@/components/app-sidebar";
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
import { TotalTransaksi } from "@/components/customer/total-transaksi";
import { DaftarkanCustomer } from "@/components/customer/daftarkan-customer";

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
      <div className="flex p-4 flex-col mb-2">
        <h1 className="text-3xl font-bold tracking-tight">Customer</h1>
        <p className="text-base text-muted-foreground">
          Kelola semua pengaturan akun pelanggan dengan mudah untuk meningkatkan
          pengalaman dan kepuasan mereka.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 p-4 pt-0">
        <div className="grid grid-cols-1 gap-4 col-span-1 md:col-span-10 md:grid-cols-3 ">
          <OmzetMarketing />
          <TotalCustomer />
          <TotalTransaksi />
        </div>
        <div className="grid grid-cols-3 col-span-10 gap-4">
          <div className="col-span-1">
            <DaftarkanCustomer />
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </>
  );
}
