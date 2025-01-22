"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dashboardText from "@/components/sales/text-dashboard-sales";
import { useEffect } from "react";
import { X, Banknote } from "lucide-react";
import { InputCounter, ReadOnlyInputCounter } from "../ui/input-counter";

type Item = [string, string | null, number, string, number];

export function SalesOrderDetailItems({ data }: { data: Item[] | undefined }) {
  const formSchema = z.object({
    target: z.string().min(1, "Please select a target."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { target: "" },
  });

  useEffect(() => {
    console.log("items", data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dashboardText["detail-sales-order"].title}</CardTitle>
        <CardDescription>
          {dashboardText["detail-sales-order"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {!data || data.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul className="flex flex-col gap-[1px] bg-border px-[1px] py-[1px] rounded-lg">
              {data.map((item) => (
                <li
                  key={item[0]} // Assuming the first element (string) is unique
                  className="flex flex-col bg-white rounded-lg"
                >
                  <div className="flex p-2">
                    {/* Placeholder for image */}
                    <div className="w-[5rem] aspect-square rounded-md bg-gray-200" />
                    <div className="flex flex-col justify-between flex-1 p-2">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                          <label
                            className="text-sm font-medium leading-none"
                            style={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                            }}
                          >
                            {item[1]}{" "}
                            {/* Assuming the 4th element is the name */}
                          </label>
                          <label
                            className="text-[0.8rem] text-muted-foreground"
                            style={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                            }}
                          >
                            {"Satuan " + item[3] || "No description"}{" "}
                            {/* 2nd element */}
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                          <label className="text-sm font-bold text-muted-foreground leading-none">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(item[4])}{" "}
                            {/* 3rd element: price */}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t px-2 py-2 flex justify-between items-center">
                    <label className="text-md font-bold flex gap-2 items-center">
                      <Banknote />
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(item[4] * item[2])}{" "}
                      {/* 5th element: total */}
                    </label>
                    <ReadOnlyInputCounter
                      value={item[2]}

                      // onChange={(qty) => updateQuantity(item.id, qty)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
