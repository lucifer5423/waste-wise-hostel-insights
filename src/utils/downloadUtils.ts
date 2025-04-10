
import { toast } from "sonner";
import { sampleHistoricalData } from "./mlUtils";

export const downloadCsvTemplate = () => {
  // Create CSV content with headers and sample data for historical data
  const headers = "date,meal_type,weight\n";
  
  // Convert sample data to CSV rows - use a representative subset for template
  const sampledData = [];
  
  // Get unique months in the data
  const uniqueMonths = new Set();
  sampleHistoricalData.forEach(entry => {
    const month = entry.date.substring(0, 7); // YYYY-MM
    uniqueMonths.add(month);
  });
  
  // For each month, sample a few entries
  Array.from(uniqueMonths).forEach(month => {
    const monthData = sampleHistoricalData.filter(entry => entry.date.startsWith(month as string));
    
    // Take first 2 entries from each month if available
    for (let i = 0; i < Math.min(2, monthData.length); i++) {
      sampledData.push(monthData[i]);
    }
  });
  
  // Convert sample data to CSV rows
  const sampleRows = sampledData.map(entry => 
    `${entry.date},${entry.meal_type},${entry.weight}`
  ).join("\n");
  
  const csvContent = headers + sampleRows;
  
  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
  // Create a download link and trigger click
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", "food_wastage_template.csv");
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast.success("Template downloaded successfully");
};
