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
  const features = [
    {
      label: "Batasi akses penjualan",
      description:
        "Membatasi sales agar tidak dapat melihat data penjualan sales lain.",
    },
    {
      label: "Akses pricelist sales",
      description:
        "Memberikan izin kepada sales untuk melihat daftar harga produk.",
    },
    {
      label: "Nyalakan pelacakan lokasi",
      description: "Menyalakan fitur pelacakan lokasi untuk semua sales.",
    },
    {
      label: "Aktifkan Notifikasi Penjualan",
      description:
        "Memberikan pemberitahuan real-time saat terjadi penjualan baru.",
    },
    {
      label: "Batasi Akses Laporan",
      description:
        "Membatasi akses ke laporan keuangan untuk pengguna tertentu.",
    },
    {
      label: "Atur Target Penjualan",
      description:
        "Memungkinkan administrator untuk menetapkan target penjualan harian atau bulanan.",
    },
  ];

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
            {features.map((feature, index) => (
              <div className="flex flex-col" key={index}>
                <Label className="text-md font-semibold">{feature.label}</Label>
                <div className="flex justify-between gap-4">
                  <div className="leading-none text-sm text-muted-foreground">
                    {feature.description}
                  </div>
                  <Switch id={`feature-${index}`} />
                </div>
              </div>
            ))}
            <Button type="submit" className="w-full">
              Simpan Preferensi
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
