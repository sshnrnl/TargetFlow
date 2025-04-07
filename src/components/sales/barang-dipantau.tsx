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
export function BarangDipantau() {
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["barang-dipantau"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["barang-dipantau"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        None
        {/* <RecentSoldItemsTable /> */}
      </CardContent>
    </Card>
  );
}
