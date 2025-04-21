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
import { useRouter } from "next/navigation";

export function BuatSalesOrder() {
  const router = useRouter();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl leading-none">
            {dashboardText["buat-sales-order"].title}
          </CardTitle>

          <CardDescription>
            {dashboardText["buat-sales-order"].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Button
              onClick={() => router.push("/sales/sales-order")}
              className="w-full"
            >
              Buat Sales Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
