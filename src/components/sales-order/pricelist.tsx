"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dashboardText from "./text-dashboard-sales-order";
import { PricelistTable } from "./PricelistTable/pricelist-table";
export function Pricelist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["pricelist-produk"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["pricelist-produk"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PricelistTable />
      </CardContent>
    </Card>
  );
}
