
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
import { generateWeeklyWasteData, sampleHistoricalData } from "@/utils/mlUtils";

const WasteTrend = () => {
  // Use the ML utility to generate weekly waste data
  const data = generateWeeklyWasteData(sampleHistoricalData);

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
                stroke="#816EC7" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="breakfast" 
                name="Breakfast"
                stroke="#FFCDB2" 
                strokeWidth={1}
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="lunch" 
                name="Lunch"
                stroke="#FFB4A2" 
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <Line 
                type="monotone" 
                dataKey="dinner" 
                name="Dinner"
                stroke="#E5989B" 
                strokeWidth={1}
                strokeDasharray="2 2"
              />
              <Line 
                type="monotone" 
                dataKey="snacks" 
                name="Snacks"
                stroke="#A27CB8" 
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
