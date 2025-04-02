
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend
} from "recharts";

const data = [
  { day: "Mon", amount: 12, breakfast: 3, lunch: 4, dinner: 3, snacks: 2 },
  { day: "Tue", amount: 15, breakfast: 4, lunch: 5, dinner: 4, snacks: 2 },
  { day: "Wed", amount: 18, breakfast: 5, lunch: 6, dinner: 5, snacks: 2 },
  { day: "Thu", amount: 14, breakfast: 3, lunch: 5, dinner: 4, snacks: 2 },
  { day: "Fri", amount: 19, breakfast: 4, lunch: 7, dinner: 5, snacks: 3 },
  { day: "Sat", amount: 22, breakfast: 5, lunch: 8, dinner: 6, snacks: 3 },
  { day: "Sun", amount: 17, breakfast: 4, lunch: 6, dinner: 5, snacks: 2 }
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
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amount" 
                name="Total"
                stroke="#0EA5E9" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="breakfast" 
                name="Breakfast"
                stroke="#8B5CF6" 
                strokeWidth={1}
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="lunch" 
                name="Lunch"
                stroke="#F97316" 
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <Line 
                type="monotone" 
                dataKey="dinner" 
                name="Dinner"
                stroke="#D946EF" 
                strokeWidth={1}
                strokeDasharray="2 2"
              />
              <Line 
                type="monotone" 
                dataKey="snacks" 
                name="Snacks"
                stroke="#22c55e" 
                strokeWidth={1}
                strokeDasharray="1 1"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteTrend;
