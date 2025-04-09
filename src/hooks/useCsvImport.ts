
import { useState } from "react";
import { toast } from "sonner";
import { convertCsvFormat } from "@/utils/csvUtils";

export const useCsvImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConversionDialog, setShowConversionDialog] = useState(false);
  const [convertedCsvContent, setConvertedCsvContent] = useState<string>("");
  const [originalCsvContent, setOriginalCsvContent] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);
    setIsSuccess(false);
    
    if (!selectedFile) return;
    
    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }
    
    setFile(selectedFile);
  };

  const tryConvertCsvFormat = (csvData: string) => {
    const result = convertCsvFormat(csvData);
    setOriginalCsvContent(csvData);
    
    if (result.success) {
      setConvertedCsvContent(result.convertedCsv);
      setShowConversionDialog(true);
      return true;
    } else {
      setError(result.message);
      toast.error(result.message);
      return false;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const csvData = event.target?.result as string;
          
          // Basic validation to ensure it's a proper CSV
          const lines = csvData.split('\n');
          if (lines.length < 2) {
            throw new Error('CSV file is empty or has invalid format');
          }
          
          const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
          const requiredHeaders = ['date', 'meal_type', 'weight'];
          
          const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
          
          if (missingHeaders.length > 0) {
            // If headers don't match, try to convert the file format
            if (!tryConvertCsvFormat(csvData)) {
              throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
            }
          } else {
            // If headers match, check for valid meal types
            const allowedMealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];
            let hasInvalidMealType = false;
            
            for (let i = 1; i < lines.length; i++) {
              if (!lines[i].trim()) continue; // Skip empty lines
              
              const values = lines[i].split(',');
              const mealTypeIndex = headers.indexOf('meal_type');
              
              if (mealTypeIndex >= 0 && values.length > mealTypeIndex) {
                const mealType = values[mealTypeIndex].toLowerCase().trim();
                if (!allowedMealTypes.includes(mealType)) {
                  hasInvalidMealType = true;
                  break;
                }
              }
            }
            
            if (hasInvalidMealType) {
              // If meal types are invalid, try to convert the file
              if (!tryConvertCsvFormat(csvData)) {
                throw new Error('Invalid meal type found. Allowed types: breakfast, lunch, dinner, snacks');
              }
            } else {
              // Everything is valid
              setIsSuccess(true);
              toast.success("CSV file imported successfully!");
              console.log(`Imported historical data from ${file.name} with ${lines.length - 1} records`);
            }
          }
        } catch (err) {
          setError((err as Error).message);
          toast.error("Error processing CSV file");
        } finally {
          setIsLoading(false);
        }
      };
      
      reader.onerror = () => {
        setError('Error reading file');
        setIsLoading(false);
        toast.error("Error reading file");
      };
      
      reader.readAsText(file);
      
    } catch (err) {
      setError('Upload failed');
      setIsLoading(false);
      toast.error("Upload failed");
    }
  };

  const handleUseConvertedData = () => {
    setShowConversionDialog(false);
    setIsSuccess(true);
    toast.success("Converted CSV file imported successfully!");
    
    // Here you would normally process the converted data
    const lines = convertedCsvContent.split('\n');
    console.log(`Imported converted data with ${lines.length - 1} records`);
  };

  const handleDownloadConvertedCsv = () => {
    const blob = new Blob([convertedCsvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", "converted_" + (file?.name || "data.csv"));
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    file,
    isLoading,
    isSuccess,
    error,
    showConversionDialog,
    convertedCsvContent,
    originalCsvContent,
    handleFileChange,
    handleUpload,
    handleUseConvertedData,
    handleDownloadConvertedCsv,
    setShowConversionDialog
  };
};
