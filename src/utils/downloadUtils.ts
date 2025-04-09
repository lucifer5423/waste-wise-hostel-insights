
import { toast } from "sonner";

export const downloadCsvTemplate = () => {
  // Create CSV content with headers and sample data for historical data
  const headers = "date,meal_type,weight\n";
  const sampleData = [
    "2024-04-01,breakfast,10.5",
    "2024-04-01,lunch,15.2",
    "2024-04-01,dinner,12.8",
    "2024-04-01,snacks,5.3",
    "2024-04-02,breakfast,9.8",
    "2024-04-02,lunch,14.6",
    "2024-04-02,dinner,13.1",
    "2024-04-02,snacks,4.9"
  ].join("\n");
  
  const csvContent = headers + sampleData;
  
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
