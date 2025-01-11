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

export function BuatSalesOrder() {
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
          <form>
            <div className="flex flex-col gap-6">
              <Button type="submit" className="w-full">
                Buat Sales Order
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
