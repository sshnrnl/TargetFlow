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
import ProductTable from "./ProdukSO/product-table";
export function ItemSO() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["list-so"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["list-so"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductTable />
      </CardContent>
    </Card>
  );
}
