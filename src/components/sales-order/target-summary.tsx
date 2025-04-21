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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PricelistTable } from "./PricelistTable/pricelist-table";
import { ProductTable } from "./ProdukSO/product-table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { postWithAuth } from "@/lib/post_api";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function TargetSummary() {
  const router = useRouter();

  const [subtotal, setSubtotal] = useState<number>(0);
  const [salesList, setSalesList] = useState<string[]>([]);
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
    assigned_to: string[];
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
    console.log("TARGET", submitFormData);
    console.log(salesList);
  }, [submitFormData, salesList]);

  useEffect(() => {
    const handleAddItems = (event: Event) => {
      const customEvent = event as CustomEvent<Record<string, number>>;
      setSubmitFormData((prevData) => ({
        ...prevData,
        items: customEvent.detail,
      }));
    };

    const handleAddSubtotal = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      setSubtotal(customEvent.detail);
    };

    const handleAddCustomer = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setSubmitFormData((prevData) => ({
        ...prevData,
        customer_id: customEvent.detail,
      }));
    };

    const handleAddTarget = (event: Event) => {
      const customEvent = event as CustomEvent<TargetDetails>;
      setSubmitFormData((prevData) => ({
        ...prevData,
        name: customEvent.detail.targetName,
        description: customEvent.detail.targetDesc,
        prize: customEvent.detail.prize,
        start_date: customEvent.detail.startDate,
        end_date: customEvent.detail.endDate,
      }));
    };

    const handleAddSales = (event: Event) => {
      const customEvent = event as CustomEvent<string[]>;
      setSubmitFormData((prevData) => ({
        ...prevData,
        assigned_to: customEvent.detail,
      }));
    };

    const handleAddSalesName = (event: Event) => {
      const customEvent = event as CustomEvent<string[]>;
      setSalesList(customEvent.detail);
    };

    window.addEventListener("add-items", handleAddItems);
    window.addEventListener("add-sales", handleAddSales);
    window.addEventListener("sales-list", handleAddSalesName);
    window.addEventListener("update-subtotal", handleAddSubtotal);
    window.addEventListener("add-target", handleAddTarget);
    window.addEventListener("add-customer", handleAddCustomer); // if needed

    return () => {
      window.removeEventListener("add-items", handleAddItems);
      window.removeEventListener("add-sales", handleAddSales);
      window.removeEventListener("sales-list", handleAddSalesName);
      window.removeEventListener("update-subtotal", handleAddSubtotal);
      window.removeEventListener("add-target", handleAddTarget);
      window.removeEventListener("add-customer", handleAddCustomer); // if added
    };
  }, []);

  const formSchema = z
    .object({
      nama: z.string().min(1, "Nama wajib diisi"),
      hadiah: z.string().min(1, "Hadiah wajib diisi"),
      deskripsi: z.string().optional(),
      startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
      endDate: z.string().min(1, "Tanggal berakhir wajib diisi"),
    })
    .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
      message: "Tanggal berakhir tidak boleh lebih awal dari tanggal mulai",
      path: ["endDate"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit", // ✅ validate on input change
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["target-summary"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["target-summary"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input value={submitFormData.name} readOnly />
                  </FormControl>
                  <FormDescription>Tulis nama target disini.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hadiah"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Hadiah</FormLabel>
                  <FormControl>
                    <Input value={submitFormData.prize} readOnly />
                  </FormControl>
                  <FormDescription>
                    Berikan hadiah untuk target ini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Mulai</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        submitFormData.start_date.toISOString().split("T")[0]
                      } // format: YYYY-MM-DD
                      readOnly
                    />
                  </FormControl>
                  <FormDescription>
                    Pilih tanggal mulai target ini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Berakhir</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        submitFormData.end_date.toISOString().split("T")[0]
                      } // format: YYYY-MM-DD
                      readOnly
                    />
                  </FormControl>
                  <FormDescription>
                    Pilih tanggal berakhir target ini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="flex flex-col col-span-2">
                  <FormLabel>Diberikan Kepada</FormLabel>

                  <div className="flex flex-wrap gap-2">
                    {salesList?.map((name: string, index: number) => (
                      <div
                        key={index}
                        className="text-sm bg-gray-100 px-3 py-1 rounded-md"
                      >
                        {name}
                      </div>
                    ))}
                  </div>

                  <FormDescription>
                    Daftar sales yang ditugaskan untuk target ini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem className="flex flex-col col-span-2">
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea value={submitFormData.description} readOnly />
                  </FormControl>
                  <FormDescription>
                    Berikut adalah deskripsi target yang akan ditampilkan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="col-span-2"
              onClick={async () => {
                const payload = {
                  "target-name": submitFormData.name,
                  "target-desc": submitFormData.description,
                  prize: Number(submitFormData.prize),
                  "start-date": submitFormData.start_date
                    .toISOString()
                    .split("T")[0],
                  "end-date": submitFormData.end_date
                    .toISOString()
                    .split("T")[0],
                  "assigned-to": submitFormData.assigned_to.map((id) =>
                    String(id)
                  ),
                  "target-items": submitFormData.items,
                };

                const result = await postWithAuth<SalesOrderResponse>(
                  "/api/v1/admin/create-target",
                  payload
                );

                if (result.status === 200) {
                  alert("Target berhasil dibuat!");
                  router.push("/"); // or wherever you want to redirect
                } else {
                  alert("Gagal membuat target: " + result.message);
                }
              }}
            >
              Submit Target
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
