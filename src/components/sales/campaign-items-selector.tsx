"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming Input component is already styled and available
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
import items from "@/db/items";

const FormSchema = z
  .object({
    items: z.array(
      z.object({
        itemName: z.string().nonempty("Please select a language."),
        qty: z
          .number({ invalid_type_error: "Qty must be a number." })
          .positive("Qty must be greater than 0.")
          .int("Qty must be an integer."),
      })
    ),
  })
  .refine(
    (data) => {
      const items = data.items.map((item) => item.itemName);
      const hasDuplicates = new Set(items).size !== items.length;
      return !hasDuplicates;
    },
    {
      message: "Languages must be unique.",
      path: ["items"], // Specify the path to show the error at the form level
    }
  );

export function CampaignForm() {
  const [comboboxes, setComboboxes] = useState([{ itemName: "", qty: 1 }]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [{ itemName: "", qty: 1 }],
    },
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

  const addCombobox = (index: number, value: string) => {
    form.setValue(`items.${index}.itemName`, value);
    if (index === comboboxes.length - 1) {
      setComboboxes([...comboboxes, { itemName: "", qty: 1 }]);
    }
  };

  const updateQty = (index: number, qty: number) => {
    form.setValue(`items.${index}.qty`, qty);
  };

  const selectedItems = form.watch("items").map((item) => item.itemName);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-2">
          <FormLabel className="flex-1">Item</FormLabel>
          <FormLabel className="w-[75px]">Qty</FormLabel>
        </div>
        {comboboxes.map((_, index) => (
          <div key={index} className="flex items-start space-x-2">
            <FormField
              control={form.control}
              name={`items.${index}.itemName`}
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  {/* <FormLabel>Item {index + 1}</FormLabel> */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? items.find((item) => item.value === field.value)
                                ?.label
                            : "Select language"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {items.map((item) => (
                              <CommandItem
                                value={item.label}
                                key={item.value}
                                onSelect={() => addCombobox(index, item.value)}
                                disabled={selectedItems.includes(item.value)} // Disable if already selected
                              >
                                {item.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    item.value === field.value
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`items.${index}.qty`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  {/* <FormLabel>Qty</FormLabel> */}
                  <FormControl>
                    <Input
                      required
                      {...field}
                      type="number"
                      min={1}
                      placeholder="Qty"
                      className="w-[75px]"
                      value={field.value || 1}
                      onChange={(e) =>
                        updateQty(index, parseInt(e.target.value, 10) || 1)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        {form.formState.errors.items && (
          <p className="text-red-500">{form.formState.errors.items.message}</p>
        )}
        <Button type="submit" style={{ marginTop: "1.5rem" }}>
          Simpan Perubahan
        </Button>
      </form>
    </Form>
  );
}
