
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const sentimentData = [
  { label: "Positive", value: 65, color: "bg-emerald-500" }, // Changed from wastewise-green to emerald
  { label: "Neutral", value: 25, color: "bg-indigo-500" }, // Changed from blue to indigo
  { label: "Negative", value: 10, color: "bg-pink-500" } // Changed from red to pink
];

const FeedbackSentiment = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Feedback Sentiment Analysis</CardTitle>
        <CardDescription>Student feedback sentiment distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sentimentData.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
              <Progress value={item.value} className={item.color} />
            </div>
          ))}
          
          <div className="border-t pt-4 mt-6">
            <h4 className="font-semibold mb-2">Common Feedback Topics</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">Food Quality</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">Taste</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">Variety</span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Serving Size</span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Menu Options</span>
              <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">Temperature</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSentiment;
