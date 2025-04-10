
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
import { calculateMonthlyAverages } from "@/utils/mlUtils";
import { useWastageData } from "@/context/DataContext";

const WastageByMealChart = () => {
  // Use the real data from our context
  const { wastageData } = useWastageData();
  
  // Use the ML utility to calculate monthly averages from the real data
  const data = calculateMonthlyAverages(wastageData);
  
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Wastage by Meal Type</CardTitle>
        <CardDescription>Monthly breakdown of food waste by meal period (kg)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: 'Waste (kg)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `${value} kg`} />
              <Legend />
              <Bar dataKey="breakfast" name="Breakfast" fill="#FFCDB2" /> {/* Apricot */}
              <Bar dataKey="lunch" name="Lunch" fill="#FFB4A2" /> {/* Melon */}
              <Bar dataKey="dinner" name="Dinner" fill="#E5989B" /> {/* Salmon */}
              <Bar dataKey="snacks" name="Snacks" fill="#A27CB8" /> {/* Violet */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WastageByMealChart;
