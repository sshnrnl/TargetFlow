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
import { ProductTable } from "./ProdukSO/product-table";
import { TargetTable } from "./target-table";
export function ItemTarget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["target-item"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["target-item"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TargetTable />
      </CardContent>
    </Card>
  );
}
