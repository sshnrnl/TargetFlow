"use client";

import { RecentInvoiceTable } from "./invoice-terbaru-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dashboardText from "./text-dashboard-sales";
import { StockBarangTable } from "./stock-barang-table";
import { useEffect, useState } from "react";

export type Stock = {
  kobar: string;
  nambar: string;
  kokel: string;
  namkel: string;
  qty: number;
  kosat: string;
};

interface Items {
  FetchedItems?: any[][]; // Allow optional to prevent errors
}
export function StockBarang({ FetchedItems }: Items) {
  const [Items, setItems] = useState<Stock[]>([]);

  useEffect(() => {
    if (
      !FetchedItems ||
      !Array.isArray(FetchedItems) ||
      FetchedItems.length === 0
    ) {
      return;
    }

    const extractedStock: Stock[] = FetchedItems.map((row) => {
      if (!Array.isArray(row) || row.length < 6) return null; // Ensure valid row
      const [kobar, nambar, kokel, namkel, qty, kosat] = row;

      return {
        kobar: String(kobar),
        nambar: String(nambar),
        kokel: String(kokel),
        namkel: String(namkel),
        qty: Number(qty),
        kosat: String(kosat),
      };
    }).filter(Boolean) as Stock[];
    setItems(extractedStock);
  }, [FetchedItems]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["stock-barang"].title}
        </CardTitle>
        <CardDescription>
          {dashboardText["stock-barang"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StockBarangTable FetchedItems={Items} />
      </CardContent>
    </Card>
  );
}
