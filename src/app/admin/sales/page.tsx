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
        <h1 className="text-3xl font-bold tracking-tight">Marketing</h1>
        <p className="text-base text-muted-foreground">
          Kelola semua pengaturan akun marketing dengan mudah untuk mendukung
          efisiensi tim Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 p-4 pt-0">
        <div className="grid-cols-1 lg:col-span-6 grid md:grid-cols-2 gap-4 h-min">
          <div className="grid grid-cols-1 gap-4 col-span-1 md:col-span-2 md:grid-cols-2 ">
            <OmzetMarketing />
            <TotalCustomer />
          </div>
          <div className="flex flex-col gap-4">
            <TargetMarketing />
            <KelolaTarget />
          </div>
          <div className="flex flex-col gap-4">
            <KinerjaSales />
            <ConfigAkunMarketing />
          </div>
        </div>
        <div className="grid-cols-1 lg:col-span-4 grid gap-4 h-min">
          <div className="col-span-2 h-min">
            <LokasiMarketing></LokasiMarketing>
          </div>
          <div className="col-span-2 h-min">
            <LoginForm />
          </div>
          <div className="col-span-2 h-min">
            <SalesTable />
          </div>
          <div className="col-span-2 h-min"></div>
        </div>
      </div>
    </>
  );
}
