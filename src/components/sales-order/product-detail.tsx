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
export function ProductDetail() {
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
      <CardContent></CardContent>
    </Card>
  );
}
