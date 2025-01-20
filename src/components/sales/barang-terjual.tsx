"use client";

import { RecentSoldItemsTable } from "./barang-terjual-table";
// import { fetchData } from "@/db/invoices";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dashboardText from "./text-dashboard-sales";
import { useEffect } from "react";
export function RecentSoldItems() {
  // useEffect(() => {
  //   fetchData();
  // }, []);
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
