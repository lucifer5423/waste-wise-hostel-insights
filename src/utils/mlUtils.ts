
/**
 * ML utilities for food waste prediction using linear regression
 */

// Comprehensive historical dataset for training the model - full year of data
export const sampleHistoricalData = [
  // January data
  { date: '2024-01-01', meal_type: 'breakfast', weight: 12.5 },
  { date: '2024-01-01', meal_type: 'lunch', weight: 18.2 },
  { date: '2024-01-01', meal_type: 'dinner', weight: 15.7 },
  { date: '2024-01-01', meal_type: 'snacks', weight: 5.3 },
  { date: '2024-01-02', meal_type: 'breakfast', weight: 11.8 },
  { date: '2024-01-02', meal_type: 'lunch', weight: 17.9 },
  { date: '2024-01-02', meal_type: 'dinner', weight: 16.1 },
  { date: '2024-01-02', meal_type: 'snacks', weight: 4.8 },
  { date: '2024-01-15', meal_type: 'breakfast', weight: 11.4 },
  { date: '2024-01-15', meal_type: 'lunch', weight: 17.5 },
  { date: '2024-01-15', meal_type: 'dinner', weight: 15.2 },
  { date: '2024-01-15', meal_type: 'snacks', weight: 5.1 },
  { date: '2024-01-30', meal_type: 'breakfast', weight: 10.9 },
  { date: '2024-01-30', meal_type: 'lunch', weight: 16.8 },
  { date: '2024-01-30', meal_type: 'dinner', weight: 14.7 },
  { date: '2024-01-30', meal_type: 'snacks', weight: 4.7 },
  
  // February data
  { date: '2024-02-01', meal_type: 'breakfast', weight: 10.9 },
  { date: '2024-02-01', meal_type: 'lunch', weight: 16.8 },
  { date: '2024-02-01', meal_type: 'dinner', weight: 14.7 },
  { date: '2024-02-01', meal_type: 'snacks', weight: 4.6 },
  { date: '2024-02-15', meal_type: 'breakfast', weight: 10.5 },
  { date: '2024-02-15', meal_type: 'lunch', weight: 16.2 },
  { date: '2024-02-15', meal_type: 'dinner', weight: 14.1 },
  { date: '2024-02-15', meal_type: 'snacks', weight: 4.2 },
  { date: '2024-02-28', meal_type: 'breakfast', weight: 10.2 },
  { date: '2024-02-28', meal_type: 'lunch', weight: 16.5 },
  { date: '2024-02-28', meal_type: 'dinner', weight: 14.3 },
  { date: '2024-02-28', meal_type: 'snacks', weight: 4.0 },
  
  // March data (Spring Break - notable decrease in waste)
  { date: '2024-03-01', meal_type: 'breakfast', weight: 9.8 },
  { date: '2024-03-01', meal_type: 'lunch', weight: 15.9 },
  { date: '2024-03-01', meal_type: 'dinner', weight: 14.0 },
  { date: '2024-03-01', meal_type: 'snacks', weight: 3.8 },
  { date: '2024-03-15', meal_type: 'breakfast', weight: 6.5 },
  { date: '2024-03-15', meal_type: 'lunch', weight: 10.2 },
  { date: '2024-03-15', meal_type: 'dinner', weight: 8.3 },
  { date: '2024-03-15', meal_type: 'snacks', weight: 2.2 },
  { date: '2024-03-30', meal_type: 'breakfast', weight: 9.5 },
  { date: '2024-03-30', meal_type: 'lunch', weight: 15.7 },
  { date: '2024-03-30', meal_type: 'dinner', weight: 13.8 },
  { date: '2024-03-30', meal_type: 'snacks', weight: 3.7 },
  
  // April data
  { date: '2024-04-01', meal_type: 'breakfast', weight: 10.5 },
  { date: '2024-04-01', meal_type: 'lunch', weight: 15.2 },
  { date: '2024-04-01', meal_type: 'dinner', weight: 12.8 },
  { date: '2024-04-01', meal_type: 'snacks', weight: 3.9 },
  { date: '2024-04-15', meal_type: 'breakfast', weight: 10.1 },
  { date: '2024-04-15', meal_type: 'lunch', weight: 15.0 },
  { date: '2024-04-15', meal_type: 'dinner', weight: 12.5 },
  { date: '2024-04-15', meal_type: 'snacks', weight: 3.8 },
  { date: '2024-04-30', meal_type: 'breakfast', weight: 9.8 },
  { date: '2024-04-30', meal_type: 'lunch', weight: 14.6 },
  { date: '2024-04-30', meal_type: 'dinner', weight: 13.1 },
  { date: '2024-04-30', meal_type: 'snacks', weight: 3.7 },
  
  // May data (End of semester - increase due to move-outs)
  { date: '2024-05-01', meal_type: 'breakfast', weight: 10.2 },
  { date: '2024-05-01', meal_type: 'lunch', weight: 14.9 },
  { date: '2024-05-01', meal_type: 'dinner', weight: 13.5 },
  { date: '2024-05-01', meal_type: 'snacks', weight: 4.0 },
  { date: '2024-05-15', meal_type: 'breakfast', weight: 11.8 },
  { date: '2024-05-15', meal_type: 'lunch', weight: 16.5 },
  { date: '2024-05-15', meal_type: 'dinner', weight: 15.0 },
  { date: '2024-05-15', meal_type: 'snacks', weight: 4.8 },
  { date: '2024-05-30', meal_type: 'breakfast', weight: 7.2 },
  { date: '2024-05-30', meal_type: 'lunch', weight: 10.8 },
  { date: '2024-05-30', meal_type: 'dinner', weight: 9.1 },
  { date: '2024-05-30', meal_type: 'snacks', weight: 2.7 },
  
  // June data (Summer - much lower occupancy)
  { date: '2024-06-01', meal_type: 'breakfast', weight: 6.8 },
  { date: '2024-06-01', meal_type: 'lunch', weight: 10.5 },
  { date: '2024-06-01', meal_type: 'dinner', weight: 8.7 },
  { date: '2024-06-01', meal_type: 'snacks', weight: 2.5 },
  { date: '2024-06-15', meal_type: 'breakfast', weight: 7.0 },
  { date: '2024-06-15', meal_type: 'lunch', weight: 10.2 },
  { date: '2024-06-15', meal_type: 'dinner', weight: 8.5 },
  { date: '2024-06-15', meal_type: 'snacks', weight: 2.3 },
  { date: '2024-06-30', meal_type: 'breakfast', weight: 6.5 },
  { date: '2024-06-30', meal_type: 'lunch', weight: 9.8 },
  { date: '2024-06-30', meal_type: 'dinner', weight: 8.2 },
  { date: '2024-06-30', meal_type: 'snacks', weight: 2.2 },
  
  // July data (Summer continues)
  { date: '2024-07-01', meal_type: 'breakfast', weight: 6.3 },
  { date: '2024-07-01', meal_type: 'lunch', weight: 9.5 },
  { date: '2024-07-01', meal_type: 'dinner', weight: 8.0 },
  { date: '2024-07-01', meal_type: 'snacks', weight: 2.1 },
  { date: '2024-07-15', meal_type: 'breakfast', weight: 6.5 },
  { date: '2024-07-15', meal_type: 'lunch', weight: 9.8 },
  { date: '2024-07-15', meal_type: 'dinner', weight: 8.3 },
  { date: '2024-07-15', meal_type: 'snacks', weight: 2.2 },
  { date: '2024-07-30', meal_type: 'breakfast', weight: 6.8 },
  { date: '2024-07-30', meal_type: 'lunch', weight: 10.0 },
  { date: '2024-07-30', meal_type: 'dinner', weight: 8.5 },
  { date: '2024-07-30', meal_type: 'snacks', weight: 2.4 },
  
  // August data (Pre-semester preparation)
  { date: '2024-08-01', meal_type: 'breakfast', weight: 7.2 },
  { date: '2024-08-01', meal_type: 'lunch', weight: 10.5 },
  { date: '2024-08-01', meal_type: 'dinner', weight: 9.0 },
  { date: '2024-08-01', meal_type: 'snacks', weight: 2.6 },
  { date: '2024-08-15', meal_type: 'breakfast', weight: 8.5 },
  { date: '2024-08-15', meal_type: 'lunch', weight: 12.8 },
  { date: '2024-08-15', meal_type: 'dinner', weight: 11.5 },
  { date: '2024-08-15', meal_type: 'snacks', weight: 3.2 },
  { date: '2024-08-30', meal_type: 'breakfast', weight: 10.0 },
  { date: '2024-08-30', meal_type: 'lunch', weight: 15.0 },
  { date: '2024-08-30', meal_type: 'dinner', weight: 13.5 },
  { date: '2024-08-30', meal_type: 'snacks', weight: 3.9 },
  
  // September data (Fall semester begins)
  { date: '2024-09-01', meal_type: 'breakfast', weight: 11.0 },
  { date: '2024-09-01', meal_type: 'lunch', weight: 16.5 },
  { date: '2024-09-01', meal_type: 'dinner', weight: 14.0 },
  { date: '2024-09-01', meal_type: 'snacks', weight: 4.2 },
  { date: '2024-09-15', meal_type: 'breakfast', weight: 10.8 },
  { date: '2024-09-15', meal_type: 'lunch', weight: 16.2 },
  { date: '2024-09-15', meal_type: 'dinner', weight: 13.8 },
  { date: '2024-09-15', meal_type: 'snacks', weight: 4.0 },
  { date: '2024-09-30', meal_type: 'breakfast', weight: 10.5 },
  { date: '2024-09-30', meal_type: 'lunch', weight: 15.8 },
  { date: '2024-09-30', meal_type: 'dinner', weight: 13.5 },
  { date: '2024-09-30', meal_type: 'snacks', weight: 3.8 },
  
  // October data
  { date: '2024-10-01', meal_type: 'breakfast', weight: 10.2 },
  { date: '2024-10-01', meal_type: 'lunch', weight: 15.5 },
  { date: '2024-10-01', meal_type: 'dinner', weight: 13.2 },
  { date: '2024-10-01', meal_type: 'snacks', weight: 3.7 },
  { date: '2024-10-15', meal_type: 'breakfast', weight: 10.0 },
  { date: '2024-10-15', meal_type: 'lunch', weight: 15.0 },
  { date: '2024-10-15', meal_type: 'dinner', weight: 12.8 },
  { date: '2024-10-15', meal_type: 'snacks', weight: 3.5 },
  { date: '2024-10-30', meal_type: 'breakfast', weight: 10.5 },
  { date: '2024-10-30', meal_type: 'lunch', weight: 15.8 },
  { date: '2024-10-30', meal_type: 'dinner', weight: 13.5 },
  { date: '2024-10-30', meal_type: 'snacks', weight: 3.9 },
  
  // November data (Thanksgiving - temporary drop)
  { date: '2024-11-01', meal_type: 'breakfast', weight: 10.8 },
  { date: '2024-11-01', meal_type: 'lunch', weight: 16.0 },
  { date: '2024-11-01', meal_type: 'dinner', weight: 13.8 },
  { date: '2024-11-01', meal_type: 'snacks', weight: 4.0 },
  { date: '2024-11-15', meal_type: 'breakfast', weight: 10.5 },
  { date: '2024-11-15', meal_type: 'lunch', weight: 15.8 },
  { date: '2024-11-15', meal_type: 'dinner', weight: 13.5 },
  { date: '2024-11-15', meal_type: 'snacks', weight: 3.8 },
  { date: '2024-11-25', meal_type: 'breakfast', weight: 7.0 },
  { date: '2024-11-25', meal_type: 'lunch', weight: 10.5 },
  { date: '2024-11-25', meal_type: 'dinner', weight: 8.0 },
  { date: '2024-11-25', meal_type: 'snacks', weight: 2.5 },
  
  // December data (End of semester and winter break)
  { date: '2024-12-01', meal_type: 'breakfast', weight: 11.0 },
  { date: '2024-12-01', meal_type: 'lunch', weight: 16.5 },
  { date: '2024-12-01', meal_type: 'dinner', weight: 14.0 },
  { date: '2024-12-01', meal_type: 'snacks', weight: 4.2 },
  { date: '2024-12-15', meal_type: 'breakfast', weight: 12.0 },
  { date: '2024-12-15', meal_type: 'lunch', weight: 18.0 },
  { date: '2024-12-15', meal_type: 'dinner', weight: 15.5 },
  { date: '2024-12-15', meal_type: 'snacks', weight: 4.5 },
  { date: '2024-12-20', meal_type: 'breakfast', weight: 8.0 },
  { date: '2024-12-20', meal_type: 'lunch', weight: 12.0 },
  { date: '2024-12-20', meal_type: 'dinner', weight: 10.0 },
  { date: '2024-12-20', meal_type: 'snacks', weight: 3.0 },
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
  const mealTypes = ["breakfast", "lunch", "dinner", "snacks"];
  
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

/**
 * Calculate monthly waste averages from historical data
 */
export function calculateMonthlyAverages(historicalData: WasteDataPoint[]): { month: string, breakfast: number, lunch: number, dinner: number, snacks: number }[] {
  // Group data by month
  const monthlyGroups: Record<string, WasteDataPoint[]> = {};
  
  historicalData.forEach(dataPoint => {
    const date = new Date(dataPoint.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyGroups[monthKey]) {
      monthlyGroups[monthKey] = [];
    }
    
    monthlyGroups[monthKey].push(dataPoint);
  });
  
  // Calculate averages for each month
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const results = Object.entries(monthlyGroups).map(([monthKey, dataPoints]) => {
    const date = new Date(`${monthKey}-01`);
    const monthName = monthNames[date.getMonth()];
    
    // Calculate averages by meal type
    const mealTypes = ["breakfast", "lunch", "dinner", "snacks"];
    const averages: Record<string, number> = {};
    
    mealTypes.forEach(mealType => {
      const mealDataPoints = dataPoints.filter(d => d.meal_type === mealType);
      if (mealDataPoints.length > 0) {
        const sum = mealDataPoints.reduce((acc, d) => acc + d.weight, 0);
        averages[mealType] = Math.round((sum / mealDataPoints.length) * 10) / 10; // Round to 1 decimal
      } else {
        averages[mealType] = 0;
      }
    });
    
    return {
      month: monthName,
      breakfast: averages.breakfast,
      lunch: averages.lunch,
      dinner: averages.dinner,
      snacks: averages.snacks
    };
  });
  
  return results;
}

/**
 * Calculate top wasted items based on historical data
 * Note: This is a simulation since the actual data doesn't contain item details
 */
export function calculateTopWastedItems(historicalData: WasteDataPoint[]): { name: string, value: number }[] {
  // Calculate total waste per meal type
  const mealTotals: Record<string, number> = {};
  
  historicalData.forEach(dataPoint => {
    if (!mealTotals[dataPoint.meal_type]) {
      mealTotals[dataPoint.meal_type] = 0;
    }
    mealTotals[dataPoint.meal_type] += dataPoint.weight;
  });
  
  // Calculate total waste
  const totalWaste = Object.values(mealTotals).reduce((sum, val) => sum + val, 0);
  
  // Simulate item-specific waste based on meal type waste proportions
  const items = [
    { name: "Rice", proportion: 0.23, mealTypes: ["lunch", "dinner"] },
    { name: "Vegetables", proportion: 0.18, mealTypes: ["breakfast", "lunch", "dinner"] },
    { name: "Bread", proportion: 0.15, mealTypes: ["breakfast", "lunch"] },
    { name: "Meat", proportion: 0.14, mealTypes: ["lunch", "dinner"] },
    { name: "Fruits", proportion: 0.12, mealTypes: ["breakfast", "snacks"] },
    { name: "Soup", proportion: 0.08, mealTypes: ["lunch", "dinner"] },
    { name: "Dairy", proportion: 0.06, mealTypes: ["breakfast", "snacks"] },
    { name: "Other", proportion: 0.04, mealTypes: ["breakfast", "lunch", "dinner", "snacks"] }
  ];
  
  const itemWaste = items.map(item => {
    // Calculate waste for this item based on relevant meal types
    let itemTotal = 0;
    item.mealTypes.forEach(mealType => {
      if (mealTotals[mealType]) {
        itemTotal += mealTotals[mealType] * item.proportion;
      }
    });
    
    return {
      name: item.name,
      value: Math.round(itemTotal)
    };
  });
  
  // Sort by waste amount (descending)
  return itemWaste.sort((a, b) => b.value - a.value);
}

/**
 * Generate weekly waste data
 */
export function generateWeeklyWasteData(historicalData: WasteDataPoint[]): { day: string, amount: number, breakfast: number, lunch: number, dinner: number, snacks: number }[] {
  // Get data for the last 7 days
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = [];
  
  // Generate data for each day of the week
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const dayOfWeek = date.getDay();
    const dayName = dayNames[dayOfWeek];
    
    // Find historical data points closest to this day of week and current month
    const relevantData = historicalData.filter(dataPoint => {
      const dpDate = new Date(dataPoint.date);
      return dpDate.getDay() === dayOfWeek;
    });
    
    // Calculate averages by meal type
    const mealTypes = ["breakfast", "lunch", "dinner", "snacks"];
    const averages: Record<string, number> = {};
    
    mealTypes.forEach(mealType => {
      const mealDataPoints = relevantData.filter(d => d.meal_type === mealType);
      if (mealDataPoints.length > 0) {
        const sum = mealDataPoints.reduce((acc, d) => acc + d.weight, 0);
        averages[mealType] = +(sum / mealDataPoints.length).toFixed(1);
      } else {
        averages[mealType] = 0;
      }
    });
    
    // Add small random variation to make data look more realistic
    const addVariation = (value: number): number => {
      const variation = (Math.random() * 0.4) - 0.2; // +/- 20%
      return +(value * (1 + variation)).toFixed(1);
    };
    
    const breakfast = addVariation(averages.breakfast);
    const lunch = addVariation(averages.lunch);
    const dinner = addVariation(averages.dinner);
    const snacks = addVariation(averages.snacks);
    
    result.push({
      day: dayName,
      amount: +(breakfast + lunch + dinner + snacks).toFixed(1),
      breakfast,
      lunch,
      dinner,
      snacks
    });
  }
  
  return result;
}
