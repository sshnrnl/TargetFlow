import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dashboardText from "./text-dashboard-customer";
import dynamic from "next/dynamic";
import { Textarea } from "../ui/textarea";

const MapInput = dynamic(() => import("../maps/maps-input"), {
  ssr: false,
});

export function DaftarkanCustomer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kodePos, setKodePos] = useState("");

  const handleLocationChange = (location: { lat: number; lng: number }) => {
    setLocation(location);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl leading-none">
            {dashboardText["buat-pelanggan"].title}
          </CardTitle>

          <CardDescription>
            {dashboardText["buat-pelanggan"].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="perusahaan">Nama Perusahaan</Label>
                <Input
                  id="perusahaan"
                  type="text"
                  placeholder="PT. MKS"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <Label htmlFor="nama">Nama</Label>
                  <Label htmlFor="nomor">WhatsApp</Label>
                  <Input id="nama" type="text" placeholder="Vinny" required />
                  <Input
                    id="nomor"
                    type="text"
                    placeholder="08123456789"
                    required
                  />
                </div>
              </div>

              {/* Address Form */}
              <div className="grid gap-2">
                <Label htmlFor="provinsi">Provinsi</Label>
                <Input
                  id="provinsi"
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  required
                />
              </div>
              <div className="grid gap-2 grid-cols-2">
                <Label htmlFor="kota">Kota</Label>
                <Label htmlFor="kecamatan">Kecamatan</Label>

                <Input
                  id="kota"
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  required
                />
                <Input
                  id="kecamatan"
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  required
                />
              </div>

              <div className="grid gap-2 grid-cols-2">
                <Label htmlFor="kelurahan">Kelurahan</Label>
                <Label htmlFor="kodePos">Kode Pos</Label>

                <Input
                  id="kelurahan"
                  type="text"
                  placeholder="Masukkan kelurahan"
                  value={kelurahan}
                  onChange={(e) => setKelurahan(e.target.value)}
                  required
                />
                <Input
                  id="kodePos"
                  type="text"
                  placeholder="Masukkan kode pos"
                  value={kodePos}
                  onChange={(e) => setKodePos(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="provinsi">Alamat Lengkap</Label>
                <Textarea
                  id="alamat"
                  placeholder="Masukkan alamat lengkap"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Pilih Lokasi</Label>
                <MapInput onLocationChange={handleLocationChange} />

                {/* {location && (
                  <p className="text-sm md:text-md lg:text-lg mt-2">
                    Lokasi Terpilih: Latitude {location.lat}, Longitude{" "}
                    {location.lng}
                  </p>
                )} */}
              </div>

              <Button type="submit" className="w-full">
                Daftarkan Customer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
