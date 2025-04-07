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
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { postWithAuth } from "@/lib/post_api";
import { useRouter } from "next/navigation";

export function TargetSummary() {
  const router = useRouter();

  const [subtotal, setSubtotal] = useState<number>(0);
  const [submitFormData, setSubmitFormData] = useState<SubmitFormType>({
    name: "",
    description: "",
    prize: "",
    start_date: new Date(),
    end_date: new Date(),
    assigned_to: [],
    items: {},
  });
  type SalesOrderResponse = {
    status: number;
    message: string;
  };
  type SubmitFormType = {
    name: string;
    description: string;
    prize: string;
    start_date: Date;
    end_date: Date;
    assigned_to: number[];
    items: Record<string, number>;
  };
  type TargetDetails = {
    targetName: string;
    targetDesc: string;
    prize: string;
    startDate: Date;
    endDate: Date;
  };
  type SalesID = {
    id: string;
  };

  const handleSubmitForm = async (): Promise<SalesOrderResponse> => {
    return await postWithAuth<SalesOrderResponse>("/api/v1/sales/post-so", {
      ...submitFormData,
    });
  };

  useEffect(() => {
    console.log("SUBMIT", submitFormData);
  }, [submitFormData]);

  useEffect(() => {
    const handleAddItems = (event: Event) => {
      const customEvent = event as CustomEvent<Record<string, number>>;
      setSubmitFormData((prevData) => ({
        ...prevData, // Preserve the rest of the state
        items: customEvent.detail as Record<string, number>, // Assign new items
      }));
    };
    const handleAddSubtotal = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      setSubtotal(customEvent.detail);
    };
    const handleAddCustomer = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setSubmitFormData((prevData) => ({
        ...prevData, // Spread the previous state to retain other fields
        customer_id: customEvent.detail, // Update the `customer_id` field
      }));
    };
    const handleAddTarget = (event: Event) => {
      const customEvent = event as CustomEvent<TargetDetails>;
      setSubmitFormData((prevData) => ({
        ...prevData, // Spread the previous state to retain other fields
        name: customEvent.detail.targetName,
        description: customEvent.detail.targetDesc,
        prize: customEvent.detail.prize,
        start_date: customEvent.detail.startDate,
        end_date: customEvent.detail.endDate,
      }));
    };
    const handleAddSales = (event: Event) => {
      const customEvent = event as CustomEvent<SalesID[]>;
      setSubmitFormData((prevData) => ({
        ...prevData, // Spread the previous state to retain other fields
        assigned_to: customEvent.detail.map((item) => parseInt(item.id)), // Update the `customer_id` field}));
      }));
      window.addEventListener("add-items", handleAddItems);
      window.addEventListener("add-sales", handleAddSales);
      window.addEventListener("update-subtotal", handleAddSubtotal);
      window.addEventListener("add-target", handleAddTarget);

      return () => {
        window.removeEventListener("add-target", handleAddTarget);
        window.removeEventListener("add-sales", handleAddSales);
        window.removeEventListener("add-items", handleAddItems);
        window.removeEventListener("update-subtotal", handleAddSubtotal);
      };
    };
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["payment-summary"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["payment-summary"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col ">
          <div className="flex justify-between">
            <p className="text-sm font-">Subtotal untuk Produk</p>
            <p className="text-sm text-muted-foreground">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(subtotal)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-">Jumlah PPN</p>
            <p className="text-sm text-muted-foreground">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format((subtotal / 100) * 11)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-">Biaya Layanan</p>
            <p className="text-sm text-muted-foreground">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(0)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-">Voucher Diskon</p>
            <p className="text-sm text-muted-foreground">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(0)}
            </p>
          </div>
          <div className="flex justify-between pt-1">
            <p className="text-lg font-bold">Total Pembayaran</p>
            <p className="text-lg  font-bold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format((subtotal * 111) / 100)}
            </p>
          </div>
        </div>
        <Button
          onClick={() => {
            handleSubmitForm();
            router.push("/sales");
          }}
          variant={"default"}
          className="w-full mt-6 font-bold"
        >
          Buat Sales Order
        </Button>
      </CardContent>
    </Card>
  );
}
