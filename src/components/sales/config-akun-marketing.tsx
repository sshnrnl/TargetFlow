import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import dashboardText from "./text-dashboard-sales";

export function ConfigAkunMarketing() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl leading-none">
            {dashboardText["preferensi-akun"].title}
          </CardTitle>

          <CardDescription>
            {dashboardText["preferensi-akun"].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col">
              <Label className="text-md font-semibold">
                Batasi akses penjualan
              </Label>

              <div className="flex justify-between gap-4">
                <div className=" leading-none text-sm text-muted-foreground">
                  Membatasi sales agar tidak dapat melihat data penjualan sales
                  lain.
                </div>
                <Switch id="airplane-mode" />
              </div>
            </div>
            <div className="flex flex-col">
              <Label className="text-md font-semibold">
                Akses pricelist sales
              </Label>

              <div className="flex justify-between gap-4">
                <div className=" leading-none text-sm text-muted-foreground">
                  Memberikan izin kepada sales untuk melihat daftar harga
                  produk.
                </div>
                <Switch id="airplane-mode" />
              </div>
            </div>
            <div className="flex flex-col">
              <Label className="text-md font-semibold">
                Nyalakan pelacakan lokasi
              </Label>

              <div className="flex justify-between gap-4">
                <div className=" leading-none text-sm text-muted-foreground">
                  Menyalakan fitur pelacakan lokasi untuk semua sales.
                </div>
                <Switch id="airplane-mode" />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Simpan Preferensi
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
