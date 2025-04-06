
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const predictions = [
  { 
    day: "Tomorrow", 
    meal: "Breakfast", 
    predictedWaste: "10.5kg", 
    confidence: "High", 
    trend: "Decreasing"
  },
  { 
    day: "Tomorrow", 
    meal: "Lunch", 
    predictedWaste: "18.2kg", 
    confidence: "Medium", 
    trend: "Stable"
  },
  { 
    day: "Tomorrow", 
    meal: "Dinner", 
    predictedWaste: "15.7kg", 
    confidence: "High", 
    trend: "Increasing"
  },
];

const PredictionCard = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>AI Predictions</CardTitle>
        <CardDescription>Machine learning-based food waste predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {predictions.map((prediction, index) => (
            <div key={index} className="flex justify-between items-center pb-3 border-b last:border-b-0 last:pb-0">
              <div>
                <h4 className="font-medium">{prediction.day} - {prediction.meal}</h4>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-muted-foreground mr-2">
                    Predicted: <span className="font-medium text-foreground">{prediction.predictedWaste}</span>
                  </span>
                  <Badge variant={
                    prediction.trend === "Decreasing" 
                      ? "outline" 
                      : prediction.trend === "Increasing" 
                        ? "destructive" 
                        : "secondary"
                  }>
                    {prediction.trend}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  prediction.confidence === "High" 
                    ? "bg-wastewise-apricot/20 text-wastewise-salmon" 
                    : "bg-wastewise-melon/20 text-wastewise-salmon"
                }`}>
                  {prediction.confidence} confidence
                </span>
              </div>
            </div>
          ))}
          
          <div className="mt-4 bg-muted/50 p-3 rounded-md">
            <h4 className="font-medium mb-1">Recommendation</h4>
            <p className="text-sm text-muted-foreground">
              Consider reducing breakfast portions by 15% tomorrow based on predicted lower consumption patterns.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionCard;
