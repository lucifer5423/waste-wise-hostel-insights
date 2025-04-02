
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from "recharts";

const data = [
  { name: "Rice", value: 35 },
  { name: "Vegetables", value: 25 },
  { name: "Bread", value: 15 },
  { name: "Meat", value: 12 },
  { name: "Fruits", value: 8 },
  { name: "Other", value: 5 }
];

const COLORS = ['#0EA5E9', '#F97316', '#8B5CF6', '#D946EF', '#22c55e', '#eab308'];

const TopWastedItems = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Top Wasted Food Items</CardTitle>
        <CardDescription>Most commonly wasted food items this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} kg`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopWastedItems;
