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
export function Targetlist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["target-list"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["target-list"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PricelistTable />
      </CardContent>
    </Card>
  );
}
