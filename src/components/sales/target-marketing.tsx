import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dashboardText from "./text-dashboard-sales";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function TargetMarketing() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl leading-none">
            {dashboardText["buat-target"].title}
          </CardTitle>

          <CardDescription>
            {dashboardText["buat-target"].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="target-name">Nama Target</Label>
                </div>
                <Input
                  id="target-name"
                  type="text"
                  placeholder="Penjualan Bento"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Buat Target
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
