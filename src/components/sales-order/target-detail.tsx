"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import dashboardText from "./text-dashboard-sales-order";
import {
  CustomerTableData,
  Customer,
  fetchCustomer,
  CustomerList,
  TargetDetails,
} from "@/db/customer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
export function TargetDetail() {
  const defaultDetails: TargetDetails = {
    targetName: "Default Perusahaan",
    targetDesc: "Default Perusahaan",
    prize: "0",
    startDate: new Date(),
    endDate: new Date(),
  };
  const [targetData, setTargetData] = useState<TargetDetails>(defaultDetails);
  useEffect(() => {
    const event = new CustomEvent("add-target", {
      detail: targetData,
    });
    window.dispatchEvent(event);
  }, [targetData]);

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

  const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      nama: "",
      hadiah: "",
      deskripsi: "",
      startDate: today,
      endDate: today,
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setTargetData({
        targetName: values.nama ?? "",
        prize: values.hadiah ?? "",
        targetDesc: values.deskripsi ?? "",
        startDate: new Date(values.startDate || ""), // fallback to empty string
        endDate: new Date(values.endDate || ""),
      });
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["target-detail"].title}
        </CardTitle>
        <CardDescription>
          {dashboardText["target-detail"].description}
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
                    <Input placeholder="Nama Target" {...field} />
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
                    <Input placeholder="Hadiah Target" {...field} />
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
                    <Input type="date" {...field} />
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
                    <Input type="date" {...field} />
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
              name="deskripsi"
              render={({ field }) => (
                <FormItem className="flex flex-col col-span-2">
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Deskripsi Target" {...field} />
                  </FormControl>
                  <FormDescription>
                    Berikut adalah deskripsi target yang akan ditampilkan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
