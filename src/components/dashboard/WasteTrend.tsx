
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";

const data = [
  { day: "Mon", amount: 12 },
  { day: "Tue", amount: 15 },
  { day: "Wed", amount: 18 },
  { day: "Thu", amount: 14 },
  { day: "Fri", amount: 19 },
  { day: "Sat", amount: 22 },
  { day: "Sun", amount: 17 }
];

const WasteTrend = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Weekly Waste Trend</CardTitle>
        <CardDescription>Daily food waste for the current week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis label={{ value: 'Waste (kg)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `${value} kg`} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#22c55e" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteTrend;
