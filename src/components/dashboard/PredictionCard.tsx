
import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleHistoricalData, predictFoodWaste, generateRecommendation } from "@/utils/mlUtils";

const PredictionCard = () => {
  // Use the ML model to generate predictions based on sample data
  const predictions = useMemo(() => {
    return predictFoodWaste(sampleHistoricalData);
  }, []);

  // Generate a recommendation based on predictions
  const recommendation = useMemo(() => {
    return generateRecommendation(predictions);
  }, [predictions]);

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
              {recommendation}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionCard;
