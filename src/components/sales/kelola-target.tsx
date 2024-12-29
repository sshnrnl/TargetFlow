"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dashboardText from "./text-dashboard-sales";
import { CalendarForm } from "./ranged-day-selector";
import { CampaignForm } from "./campaign-items-selector";
const TargetPenjualan = [
  {
    value: "penjualan-sendok",
    label: "Penjualan Sendok",
  },
  {
    value: "penjualan-piring",
    label: "Penjualan Piring",
  },
  {
    value: "penjualan-gelas",
    label: "Penjualan Gelas",
  },
  {
    value: "penjualan-mangkuk",
    label: "Penjualan Mangkuk",
  },
  {
    value: "penjualan-ember",
    label: "Penjualan Ember",
  },
];
const Pengulangan = [
  {
    value: "harian",
    label: "Harian",
  },
  {
    value: "mingguan",
    label: "Mingguan",
  },
  {
    value: "bulanan",
    label: "Bulanan",
  },
  {
    value: "tahunan",
    label: "Tahunan",
  },
];

const FormSchema = z.object({
  target: z.string({
    required_error: "Please select a target.",
  }),
});

export function KelolaTarget() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["kelola-target"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["kelola-target"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="flex flex-col gap-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Target</FormLabel>
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
                              {field.value
                                ? TargetPenjualan.find(
                                    (target) => target.value === field.value
                                  )?.label
                                : "Select target"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                            {/* <Button type="submit">Kelola Kampanye</Button> */}
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search target..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No target found.</CommandEmpty>
                            <CommandGroup>
                              {TargetPenjualan.map((target) => (
                                <CommandItem
                                  value={target.label}
                                  key={target.value}
                                  onSelect={() => {
                                    form.setValue("target", target.value);
                                  }}
                                >
                                  {target.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      target.value === field.value
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
            </form>

            <CalendarForm></CalendarForm>
            <CampaignForm />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
