import { DetailOrder } from "@/components/sales-order/customer-detail";
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
import dashboardText from "@/components/sales-order/text-dashboard-sales-order";
import { Pricelist } from "@/components/sales-order/pricelist";
import { ItemSO } from "@/components/sales-order/item-so";
import { PaymentSummary } from "@/components/sales-order/payment-summary";
import { TargetDetail } from "@/components/sales-order/target-detail";
import { Targetlist } from "@/components/sales-order/target-list";
import { ItemTarget } from "@/components/sales-order/target-item";
import { SalesSelector } from "@/components/sales-order/sales-selector";
import { TargetSummary } from "@/components/sales-order/target-summary";

export default function BuatTarget() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Sales</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {dashboardText["buat-target"].title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex p-4 flex-col mb-2 ">
        <h1 className="text-3xl font-bold tracking-tight">
          {dashboardText["buat-target"].title}
        </h1>
        <p className="text-base text-muted-foreground">
          {dashboardText["buat-target"].description}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 p-4 pt-0 ">
        <div className="col-span-1 flex flex-col gap-4">
          <TargetDetail />
          <Targetlist />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <ItemTarget />
          <SalesSelector />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <TargetSummary />
        </div>
      </div>
    </>
  );
}
