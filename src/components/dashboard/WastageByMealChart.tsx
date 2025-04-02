
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

const data = [
  {
    name: "Week 1",
    breakfast: 42,
    lunch: 78,
    dinner: 56,
    snacks: 25
  },
  {
    name: "Week 2",
    breakfast: 38,
    lunch: 65,
    dinner: 48,
    snacks: 22
  },
  {
    name: "Week 3",
    breakfast: 35,
    lunch: 70,
    dinner: 52,
    snacks: 28
  },
  {
    name: "Week 4",
    breakfast: 30,
    lunch: 58,
    dinner: 45,
    snacks: 20
  }
];

const WastageByMealChart = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Wastage by Meal Type</CardTitle>
        <CardDescription>Monthly breakdown of food waste by meal period</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Waste (kg)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="breakfast" name="Breakfast" fill="#22c55e" />
              <Bar dataKey="lunch" name="Lunch" fill="#3b82f6" />
              <Bar dataKey="dinner" name="Dinner" fill="#f97316" />
              <Bar dataKey="snacks" name="Snacks" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WastageByMealChart;
