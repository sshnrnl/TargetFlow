"use client";

import { RecentSoldItemsTable } from "./barang-terjual-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dashboardText from "./text-dashboard-sales";
export function RecentSoldItems() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["barang-terjual"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["barang-terjual"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecentSoldItemsTable />
      </CardContent>
    </Card>
  );
}
