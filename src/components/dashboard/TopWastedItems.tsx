
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
import { calculateTopWastedItems } from "@/utils/mlUtils";
import { useWastageData } from "@/context/DataContext";

const TopWastedItems = () => {
  // Use the real data from our context
  const { wastageData } = useWastageData();
  
  // Use the ML utility to calculate top wasted items from real data
  const data = calculateTopWastedItems(wastageData);
  
  // Updated color palette
  const COLORS = ['#FFCDB2', '#FFB4A2', '#E5989B', '#A27CB8', '#816EC7', '#B689C0', '#D946EF', '#9E77ED'];

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Top Wasted Food Items</CardTitle>
        <CardDescription>Most commonly wasted food items this year</CardDescription>
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
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
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
