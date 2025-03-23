
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

// Sample ECG data for demonstration
const generateSampleData = (dataPoints: number, baseValue = 70, variability = 10) => {
  return Array.from({ length: dataPoints }, (_, i) => {
    // Create a realistic heart rhythm pattern with spikes
    const base = baseValue + Math.sin(i / 5) * variability;
    const spike = i % 15 === 0 ? 50 : i % 15 === 1 ? 20 : 0;
    return {
      time: i,
      value: base + spike + Math.random() * 5,
    };
  });
};

const timeRanges = {
  "24h": { label: "Today", dataPoints: 48 },
  "7d": { label: "This Week", dataPoints: 42 },
  "30d": { label: "This Month", dataPoints: 30 },
  "90d": { label: "3 Months", dataPoints: 90 },
};

const ECGChart = () => {
  const [activeRange, setActiveRange] = useState<keyof typeof timeRanges>("24h");
  const [data, setData] = useState(generateSampleData(timeRanges[activeRange].dataPoints));
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading new data when the time range changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(generateSampleData(timeRanges[activeRange].dataPoints));
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [activeRange]);

  const formatXAxis = (value: number) => {
    switch (activeRange) {
      case "24h":
        return `${value % 24}:00`;
      case "7d":
        return `Day ${Math.floor(value / 6) + 1}`;
      case "30d":
      case "90d":
        return `Day ${value + 1}`;
      default:
        return value;
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">ECG Patterns</CardTitle>
        <Tabs
          defaultValue={activeRange}
          value={activeRange}
          onValueChange={(value) => setActiveRange(value as keyof typeof timeRanges)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-4 sm:w-auto">
            {Object.entries(timeRanges).map(([key, { label }]) => (
              <TabsTrigger
                key={key}
                value={key}
                className={cn(
                  "text-xs px-2 py-1",
                  isLoading && activeRange === key && "animate-pulse"
                )}
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <div className={cn("w-full h-[300px] transition-opacity duration-300", isLoading && "opacity-60")}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" vertical={false} />
              <XAxis
                dataKey="time"
                tickFormatter={formatXAxis}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickMargin={10}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickMargin={10}
                domain={["dataMin - 10", "dataMax + 10"]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass rounded-lg p-2 shadow-sm text-sm">
                        <p className="font-medium">{`${formatXAxis(payload[0].payload.time)}`}</p>
                        <p className="text-primary">{`Value: ${payload[0].value.toFixed(1)} bpm`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ECGChart;
