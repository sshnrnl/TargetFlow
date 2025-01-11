"use client";

import { RecentInvoiceTable } from "./invoice-terbaru-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dashboardText from "./text-dashboard-sales";
export function RecentInvoice() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["invoice-terbaru"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["invoice-terbaru"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecentInvoiceTable />
      </CardContent>
    </Card>
  );
}
