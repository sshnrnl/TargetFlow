"use client";

import { CustomerTable } from "./customer-table";
import dashboardText from "./text-dashboard-customer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function KelolaCustomer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["kelola-pelanggan"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["kelola-pelanggan"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomerTable/>
      </CardContent>
    </Card>
  );
}
