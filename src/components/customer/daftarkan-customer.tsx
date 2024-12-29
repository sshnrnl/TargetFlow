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

// Dynamically import MapInput with no SSR (Server-Side Rendering)
const MapInput = dynamic(() => import("../maps/maps-input"), {
  ssr: false, // Disable SSR for this component
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
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
                <Label htmlFor="username">Email</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="username"
                    type="username"
                    placeholder="example"
                    required
                  />
                  <Input value={"@mitraku.com"} disabled />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>

              {/* Address Form */}
              <div className="grid gap-2">
                <Label htmlFor="fullAddress">Alamat Lengkap</Label>
                <Input
                  id="fullAddress"
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="kecamatan">Kecamatan</Label>
                <Input
                  id="kecamatan"
                  type="text"
                  placeholder="Masukkan kecamatan"
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="kelurahan">Kelurahan</Label>
                <Input
                  id="kelurahan"
                  type="text"
                  placeholder="Masukkan kelurahan"
                  value={kelurahan}
                  onChange={(e) => setKelurahan(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="kodePos">Kode Pos</Label>
                <Input
                  id="kodePos"
                  type="text"
                  placeholder="Masukkan kode pos"
                  value={kodePos}
                  onChange={(e) => setKodePos(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Pilih Lokasi</Label>
                <MapInput onLocationChange={handleLocationChange} />

                {location && (
                  <p className="text-sm md:text-md lg:text-lg mt-2">
                    Lokasi Terpilih: Latitude {location.lat}, Longitude{" "}
                    {location.lng}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Buat Akun
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
