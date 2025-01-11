"use client";

import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import dashboardText from "./text-dashboard-sales";

const customer = 76;

export function PerformaSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["customer-sales"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["customer-sales"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl leading-none font-bold">{customer}</p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Meningkat 5,2% bulan ini <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan total omzet bulan ini.
        </div>
      </CardFooter>
    </Card>
  );
}
