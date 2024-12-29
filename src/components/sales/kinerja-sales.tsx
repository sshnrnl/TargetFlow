"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import dashboardText from "./text-dashboard-sales";

const chartData = [
  { month: "January", sales1: 500, sales2: 800, sales3: 600 },
  { month: "February", sales1: 400, sales2: 1000, sales3: 450 },
  { month: "March", sales1: 450, sales2: 700, sales3: 200 },
  { month: "April", sales1: 600, sales2: 600, sales3: 350 },
  { month: "May", sales1: 550, sales2: 1000, sales3: 500 },
  { month: "June", sales1: 700, sales2: 600, sales3: 400 },
];

const chartConfig = {
  sales1: {
    label: "Sales 1",
    color: "hsl(var(--chart-1))",
  },
  sales2: {
    label: "Sales 2",
    color: "hsl(var(--chart-2))",
  },
  sales3: {
    label: "Sales 3",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function KinerjaSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl leading-none">
          {dashboardText["kinerja-sales"].title}
        </CardTitle>

        <CardDescription>
          {dashboardText["kinerja-sales"].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="sales1"
              type="monotone"
              stroke="var(--color-sales1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="sales2"
              type="monotone"
              stroke="var(--color-sales2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="sales3"
              type="monotone"
              stroke="var(--color-sales3)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tren meningkat untuk salah satu sales{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Menampilkan total penjualan selama 6 bulan terakhir
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
