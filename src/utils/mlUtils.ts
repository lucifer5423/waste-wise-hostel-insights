
/**
 * Simple ML utilities for food waste prediction
 * Using linear regression for time series forecasting
 */

// Sample historical dataset for training the model
export const sampleHistoricalData = [
  // January data
  { date: '2024-01-01', meal_type: 'breakfast', weight: 12.5 },
  { date: '2024-01-01', meal_type: 'lunch', weight: 18.2 },
  { date: '2024-01-01', meal_type: 'dinner', weight: 15.7 },
  { date: '2024-01-02', meal_type: 'breakfast', weight: 11.8 },
  { date: '2024-01-02', meal_type: 'lunch', weight: 17.9 },
  { date: '2024-01-02', meal_type: 'dinner', weight: 16.1 },
  // February data
  { date: '2024-02-01', meal_type: 'breakfast', weight: 10.9 },
  { date: '2024-02-01', meal_type: 'lunch', weight: 16.8 },
  { date: '2024-02-01', meal_type: 'dinner', weight: 14.7 },
  { date: '2024-02-02', meal_type: 'breakfast', weight: 10.2 },
  { date: '2024-02-02', meal_type: 'lunch', weight: 16.5 },
  { date: '2024-02-02', meal_type: 'dinner', weight: 14.3 },
  // March data
  { date: '2024-03-01', meal_type: 'breakfast', weight: 9.8 },
  { date: '2024-03-01', meal_type: 'lunch', weight: 15.9 },
  { date: '2024-03-01', meal_type: 'dinner', weight: 14.0 },
  { date: '2024-03-02', meal_type: 'breakfast', weight: 9.5 },
  { date: '2024-03-02', meal_type: 'lunch', weight: 15.7 },
  { date: '2024-03-02', meal_type: 'dinner', weight: 13.8 },
  // April data
  { date: '2024-04-01', meal_type: 'breakfast', weight: 10.5 },
  { date: '2024-04-01', meal_type: 'lunch', weight: 15.2 },
  { date: '2024-04-01', meal_type: 'dinner', weight: 12.8 },
  { date: '2024-04-02', meal_type: 'breakfast', weight: 9.8 },
  { date: '2024-04-02', meal_type: 'lunch', weight: 14.6 },
  { date: '2024-04-02', meal_type: 'dinner', weight: 13.1 },
];

export type WasteDataPoint = {
  date: string;
  meal_type: string;
  weight: number;
};

export type Prediction = {
  day: string;
  meal: string;
  predictedWaste: string;
  confidence: "Low" | "Medium" | "High";
  trend: "Decreasing" | "Stable" | "Increasing";
};

/**
 * Simple linear regression function
 * y = mx + b
 */
function linearRegression(data: number[]): { slope: number; intercept: number; r2: number } {
  const n = data.length;
  
  // X values will be the indices (0, 1, 2, etc.)
  const xValues = Array.from({ length: n }, (_, i) => i);
  const yValues = data;
  
  // Calculate means
  const xMean = xValues.reduce((sum, x) => sum + x, 0) / n;
  const yMean = yValues.reduce((sum, y) => sum + y, 0) / n;
  
  // Calculate coefficients
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    const x = xValues[i];
    const y = yValues[i];
    
    numerator += (x - xMean) * (y - yMean);
    denominator += (x - xMean) * (x - xMean);
  }
  
  const slope = denominator !== 0 ? numerator / denominator : 0;
  const intercept = yMean - slope * xMean;
  
  // Calculate R-squared (coefficient of determination)
  const yPredicted = xValues.map(x => slope * x + intercept);
  const ssResidual = yValues.reduce((sum, y, i) => sum + Math.pow(y - yPredicted[i], 2), 0);
  const ssTotal = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
  const r2 = 1 - (ssResidual / (ssTotal || 1)); // Avoid division by zero
  
  return { slope, intercept, r2 };
}

/**
 * Get the confidence level based on R-squared value and data points count
 */
function getConfidenceLevel(r2: number, dataPointsCount: number): "Low" | "Medium" | "High" {
  if (dataPointsCount < 5) return "Low";
  if (r2 > 0.7) return "High";
  if (r2 > 0.4) return "Medium";
  return "Low";
}

/**
 * Get trend direction based on slope
 */
function getTrendDirection(slope: number): "Decreasing" | "Stable" | "Increasing" {
  if (slope < -0.1) return "Decreasing";
  if (slope > 0.1) return "Increasing";
  return "Stable";
}

/**
 * Train model using historical data and make predictions
 */
export function predictFoodWaste(
  historicalData: WasteDataPoint[],
  daysToPredict: number = 1
): Prediction[] {
  const predictions: Prediction[] = [];
  const mealTypes = ["breakfast", "lunch", "dinner"];
  
  // Get tomorrow's date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Format date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  for (const mealType of mealTypes) {
    // Filter data for this meal type
    const mealData = historicalData.filter(data => data.meal_type === mealType);
    
    if (mealData.length === 0) {
      // No data for this meal type
      predictions.push({
        day: "Tomorrow",
        meal: mealType.charAt(0).toUpperCase() + mealType.slice(1),
        predictedWaste: "Unknown",
        confidence: "Low",
        trend: "Stable"
      });
      continue;
    }
    
    // Sort by date
    mealData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Extract weights for regression
    const weights = mealData.map(data => data.weight);
    
    // Perform linear regression
    const { slope, intercept, r2 } = linearRegression(weights);
    
    // Predict next value
    const nextIndex = weights.length;
    const predictedWeight = slope * nextIndex + intercept;
    
    // Add seasonal and weekday adjustments (simplified)
    const dayOfWeek = tomorrow.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const seasonalAdjustment = isWeekend ? 1.1 : 1.0; // 10% more waste on weekends
    
    const finalPrediction = predictedWeight * seasonalAdjustment;
    const confidence = getConfidenceLevel(r2, weights.length);
    const trend = getTrendDirection(slope);
    
    predictions.push({
      day: "Tomorrow",
      meal: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      predictedWaste: `${finalPrediction.toFixed(1)}kg`,
      confidence,
      trend
    });
  }
  
  return predictions;
}

/**
 * Generate a recommendation based on predictions
 */
export function generateRecommendation(predictions: Prediction[]): string {
  const sortedPredictions = [...predictions].sort((a, b) => {
    const aValue = parseFloat(a.predictedWaste);
    const bValue = parseFloat(b.predictedWaste);
    return bValue - aValue; // Sort descending
  });
  
  if (sortedPredictions.length === 0) return "No recommendations available due to insufficient data.";
  
  const highestWaste = sortedPredictions[0];
  
  if (highestWaste.trend === "Increasing") {
    return `Consider reducing ${highestWaste.meal.toLowerCase()} portions by 15-20% tomorrow to minimize waste based on increasing trend.`;
  } else if (highestWaste.trend === "Decreasing") {
    return `Monitor ${highestWaste.meal.toLowerCase()} consumption closely. Recent improvements noticed but still the highest waste producer.`;
  } else {
    return `Consider reducing ${highestWaste.meal.toLowerCase()} portions by 10% tomorrow based on consistent waste patterns.`;
  }
}
