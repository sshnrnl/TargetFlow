"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CalendarForm() {
  // State untuk menyimpan tanggal mulai dan akhir
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null); // State untuk menyimpan pesan error

  // Fungsi untuk menghandle pengiriman form
  function onSubmit() {
    alert(
      `Tanggal Mulai: ${
        startDate ? format(startDate, "PPP") : "Tidak dipilih"
      }\nTanggal Selesai: ${endDate ? format(endDate, "PPP") : "Tidak dipilih"}`
    );
  }

  // Menghandle pemilihan tanggal selesai dan memastikan itu setelah tanggal mulai
  function handleEndDateSelect(date: Date | undefined) {
    if (date && startDate && date < startDate) {
      setEndDateError("Tanggal selesai harus setelah tanggal mulai.");
      setEndDate(null); // Reset tanggal selesai jika tidak valid
    } else {
      setEndDateError(null); // Menghapus pesan error jika valid
      setEndDate(date || null); // Menyimpan tanggal selesai yang valid
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Kolom Tanggal Mulai */}
      <FormItem className="flex flex-col">
        <FormLabel>Tanggal Mulai</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-[240px] pl-3 text-left font-normal"
            >
              {startDate ? (
                format(startDate, "PPP")
              ) : (
                <span>Pilih tanggal mulai</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate || undefined}
              onSelect={(date: Date | undefined) => setStartDate(date || null)} // Menyimpan tanggal mulai yang dipilih
              disabled={(date: Date | undefined) =>
                date === undefined || date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Pilih tanggal mulai untuk kampanye Anda.
        </FormDescription>
        <FormMessage />
      </FormItem>

      {/* Kolom Tanggal Selesai */}
      <FormItem className="flex flex-col">
        <FormLabel>Tanggal Selesai</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-[240px] pl-3 text-left font-normal"
            >
              {endDate ? (
                format(endDate, "PPP")
              ) : (
                <span>Pilih tanggal selesai</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate || undefined}
              onSelect={handleEndDateSelect} // Menggunakan handler khusus untuk pemilihan tanggal selesai
              disabled={(date: Date | undefined) =>
                date === undefined || date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {endDateError && (
          <FormMessage className="text-red-500">{endDateError}</FormMessage>
        )}
        <FormDescription>
          Pilih tanggal selesai untuk kampanye Anda.
        </FormDescription>
      </FormItem>

      {/* <Button type="submit">Simpan Perubahan</Button> */}
    </form>
  );
}
