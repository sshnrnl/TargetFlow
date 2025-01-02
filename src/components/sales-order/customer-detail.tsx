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
import { CustomerTableData, Customer } from "@/db/customer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
export function DetailOrder() {
  const defaultCustomer: Customer = {
    perusahaan: "Default Perusahaan",
    nama: "Default Nama",
    whatsapp: "0000000000",
    provinsi: "Default Provinsi",
    kota: "Default Kota",
    kecamatan: "Default Kecamatan",
    kelurahan: "Default Kelurahan",
    kode_pos: "00000",
    alamat_lengkap: "Default Alamat Lengkap",
    value: "default-value",
  };
  const [customerData, setCustomer] = useState<Customer>(defaultCustomer);

  const formSchema = z.object({
    target: z.string().min(1, "Please select a target."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { target: "" },
  });

  useEffect(() => {
    if (customerData) {
      console.log("Customer data (updated):", customerData);
    }
  }, [customerData]);

  const onChange = (value: string) => {
    const selectedCustomer = CustomerTableData.find(
      (customer) => customer.value === value
    );

    if (selectedCustomer) {
      setCustomer(selectedCustomer); // Update state
    }

    form.setValue("target", value); // Update form field
  };

  const selectedCustomer = CustomerTableData.find(
    (customer) => customer.value === form.watch("target")
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["customer-detail"].title}
        </CardTitle>
        <CardDescription>
          {dashboardText["customer-detail"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Pelanggan</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {selectedCustomer
                                ? selectedCustomer.perusahaan
                                : "Pilih Pelanggan"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search target..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No target found.</CommandEmpty>
                            <CommandGroup>
                              {CustomerTableData.map((customer) => (
                                <CommandItem
                                  value={customer.value}
                                  key={customer.value}
                                  onSelect={() => onChange(customer.value)}
                                >
                                  {customer.perusahaan}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      customer.value === form.watch("target")
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the target that will be used in the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem className="flex flex-col">
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    id="nama"
                    type="text"
                    placeholder="-"
                    value={customerData?.nama}
                    readOnly
                  />
                </div>
              </FormControl>

              <FormDescription>
                This is the province information for the customer.
              </FormDescription>
              <FormMessage />
            </FormItem>

            <FormItem className="flex flex-col">
              <FormLabel>WhatsApp</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    id="whatsapp"
                    type="text"
                    placeholder="-"
                    value={customerData?.whatsapp}
                    readOnly
                  />
                </div>
              </FormControl>

              <FormDescription>
                This is the city information for the customer.
              </FormDescription>
              <FormMessage />
            </FormItem>

            <FormItem className="flex flex-col col-span-2">
              <FormLabel>Alamat Lengkap</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Textarea
                    id="alamat"
                    placeholder="Masukkan alamat lengkap"
                    value={customerData?.alamat_lengkap}
                    readOnly
                  />
                </div>
              </FormControl>

              <FormDescription>
                This is the full address of the customer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
