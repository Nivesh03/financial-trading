import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "./chart";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export type MonthlyStockData = {
  month: string;
  price: number;
};

export type LineChartProps = {
  data: MonthlyStockData[];
  color?: string;
  label?: string;
};

const chartConfig = (color: string, label: string) => ({
  price: {
    color,
    label,
  },
});

export function LineChart({ data, color = "#3b82f6", label = "Price" }: LineChartProps) {
  return (
    <ChartContainer config={chartConfig(color, label)} className="w-full h-80">
      <ReLineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Line type="monotone" dataKey="price" stroke={color} strokeWidth={2} dot={{ r: 3 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </ReLineChart>
    </ChartContainer>
  );
}
