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
  fetchCustomerDetails,
  CustomerDetails,
} from "@/db/customer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
export function DetailOrder() {
  const defaultCustomer: CustomerDetails = {
    perusahaan: "Default Perusahaan",
    nama: "Default Nama",
    whatsapp: "0000000000",
    alamat_lengkap: "Default Alamat Lengkap",
    value: "default-value",
  };
  const [customerData, setCustomer] =
    useState<CustomerDetails>(defaultCustomer);

  const formSchema = z.object({
    target: z.string().min(1, "Please select a target."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { target: "" },
  });

  const [customerListData, setCustomerList] = useState<CustomerList[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchCustomer();
      setCustomerList(result);
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (customerData) {
      console.log("Customer data (updated):", customerData);
    }

    const event = new CustomEvent("add-customer", {
      detail: customerData.value,
    });
    window.dispatchEvent(event);
  }, [customerData]);

  const [customerCache, setCustomerCache] = useState(new Map());
  //Debug customer details
  useEffect(() => {
    if (customerCache.get(form.getValues("target"))) {
      setCustomer(customerCache.get(form.getValues("target")));
    }
  }, [customerCache]);
  ////////////////////////////
  const onChange = async (value: string) => {
    form.setValue("target", value);
    try {
      if (customerCache.has(value)) {
        // Use cached data if available
        setCustomer(customerCache.get(value));
        console.log("cached data", customerCache.get(value));
      } else {
        // Fetch customer details if not cached
        const fetchedCustomer = await fetchCustomerDetails(value);
        // console.log(fetchedCustomer);
        if (fetchedCustomer) {
          // setCustomer(fetchedCustomer);
          setCustomerCache((prev) => new Map(prev).set(value, fetchedCustomer)); // Add to cache
        } else {
          console.warn(`No customer found for value: ${value}`);
        }
      }

      // Update the form with the selected value
    } catch (error) {
      console.error("Error in onChange function:", error);
    }
  };

  const selectedCustomer = customerListData.find(
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
                              className={cn(
                                "w-full justify-between ",
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
                      <PopoverContent
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        align="start"
                        className="w-[200px] p-0"
                      >
                        <Command>
                          <CommandInput
                            placeholder="Search target..."
                            className="h-9 "
                          />
                          <CommandList>
                            <CommandEmpty>No target found.</CommandEmpty>
                            <CommandGroup>
                              {customerListData.map((customer) => (
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
