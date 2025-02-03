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
import { useState, useEffect } from "react";

interface TotalOmzetSalesProps {
  FetchedOmzet: number;
}

export function TotalOmzetSales({ FetchedOmzet }: TotalOmzetSalesProps) {
  const [omzet, setOmzet] = useState<number>(0);

  useEffect(() => {
    setOmzet(FetchedOmzet);
  }, [FetchedOmzet]); // This will update omzet when FetchedOmzet changes

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["total-omzet-sales"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["total-omzet-sales"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl leading-none font-bold">
          Rp. {omzet.toLocaleString("id-ID")}
        </p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Meningkat 5,2% bulan ini <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan total invoice bulan ini.
        </div>
      </CardFooter>
    </Card>
  );
}
