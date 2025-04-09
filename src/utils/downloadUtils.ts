
import { toast } from "sonner";
import { sampleHistoricalData } from "./mlUtils";

export const downloadCsvTemplate = () => {
  // Create CSV content with headers and sample data for historical data
  const headers = "date,meal_type,weight\n";
  
  // Convert sample data to CSV rows
  const sampleRows = sampleHistoricalData.map(entry => 
    `${entry.date},${entry.meal_type},${entry.weight}`
  ).join("\n");
  
  const csvContent = headers + sampleRows;
  
  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
  // Create a download link and trigger click
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", "historical_food_wastage_template.csv");
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast.success("Template downloaded successfully");
};
