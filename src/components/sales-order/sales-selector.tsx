"use client";
import { useEffect, useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchWithAuth } from "@/lib/get_api";
import dashboardText from "./text-dashboard-sales-order";
import { Button } from "../ui/button";

export type SalesInfo = {
  id: string;
  role: string;
  username: string;
};

const fetchData = async (): Promise<SalesInfo[]> => {
  try {
    const rawData = await fetchWithAuth<SalesInfo[]>("/api/v1/sales/get_sales");
    return rawData;
  } catch (error) {
    console.error("Error fetching or transforming data:", error);
    throw error;
  }
};

const formSchema = z.object({
  sales: z.array(z.string()).min(1, "Pilih minimal satu sales"),
});

export function SalesSelector() {
  const [salesList, setSalesList] = useState<SalesInfo[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      sales: [],
    },
  });

  const watchedSales = useWatch({ control: form.control, name: "sales" });

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData();
      setSalesList(result);
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    const event = new CustomEvent("add-sales", {
      detail: watchedSales,
    });
    window.dispatchEvent(event);

    const selectedSalesNames = salesList
      .filter((sales) => watchedSales.includes(sales.id))
      .map((sales) =>
        sales.username
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")
      );

    const events = new CustomEvent("sales-list", {
      detail: selectedSalesNames,
    });
    window.dispatchEvent(events);
  }, [watchedSales, salesList]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["sales-selector"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["sales-selector"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-4">
            <FormField
              control={form.control}
              name="sales"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {salesList.map((sales) => (
                      <FormField
                        key={sales.id}
                        control={form.control}
                        name="sales"
                        render={({ field }) => (
                          <FormItem className="flex items-center">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(sales.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, sales.id]
                                    : field.value.filter((v) => v !== sales.id);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <div className="font-normal">
                              {sales.username
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1).toLowerCase()
                                )
                                .join(" ")}
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button" // prevents default submit behavior
              onClick={() => {
                const allIds = salesList.map((s) => s.id);
                const selected = watchedSales;
                const isAllSelected = allIds.every((id) =>
                  selected.includes(id)
                );
                form.setValue("sales", isAllSelected ? [] : allIds);
              }}
            >
              {salesList.length > 0 &&
              salesList.every((s) => watchedSales.includes(s.id))
                ? "Deselect All"
                : "Select All"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
