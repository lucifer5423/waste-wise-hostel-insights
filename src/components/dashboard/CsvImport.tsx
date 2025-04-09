
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Upload, CheckCircle, AlertCircle, Download, FileWarning } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { convertCsvFormat } from "@/utils/csvUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const CsvImport = () => {
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

  const handleDownloadTemplate = () => {
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

  return (
    <>
      <Card className="dashboard-card animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Import Historical Data
          </CardTitle>
          <CardDescription>
            Upload CSV files with historical meal-type wastage data from the past year
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
            <div className="flex justify-center mb-4">
              {isSuccess ? (
                <CheckCircle className="h-12 w-12 text-green-500" />
              ) : (
                <Upload className="h-12 w-12 text-gray-400" />
              )}
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Upload a CSV file with columns: date, meal_type, weight (kg)
              <br />
              <span className="text-xs text-primary">Don't have the right format? We'll try to convert it for you!</span>
            </p>
            
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="max-w-sm mx-auto"
            />
            
            {file && (
              <p className="mt-2 text-sm font-medium">Selected: {file.name}</p>
            )}
            
            {error && (
              <div className="mt-2 flex items-center justify-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleUpload}
            disabled={!file || isLoading}
            className={`w-full py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 transition-colors
              ${!file || isLoading ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload Historical Data
              </>
            )}
          </button>
        </CardContent>
        <CardFooter className="text-sm text-gray-500 border-t pt-4">
          <Button 
            variant="link" 
            className="p-0 h-auto gap-1 flex items-center text-primary" 
            onClick={handleDownloadTemplate}
          >
            <Download className="h-4 w-4" />
            Download CSV template
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showConversionDialog} onOpenChange={setShowConversionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileWarning className="h-5 w-5 text-amber-500" />
              CSV Format Conversion
            </DialogTitle>
            <DialogDescription>
              Your CSV file doesn't match the required format. We've converted it for you.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4">
            <div className="bg-muted p-3 rounded-md text-sm overflow-x-auto max-h-40">
              <p className="font-medium text-xs mb-1">Converted format:</p>
              <pre className="whitespace-pre-wrap text-xs">
                {convertedCsvContent.split('\n').slice(0, 7).join('\n')}
                {convertedCsvContent.split('\n').length > 7 ? '\n...' : ''}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground">
              The data has been reformatted to match the required structure with date, meal_type, and weight columns.
            </p>
          </div>
          
          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <Button
              variant="outline"
              onClick={handleDownloadConvertedCsv}
              className="gap-1"
            >
              <Download className="h-4 w-4" />
              Download converted
            </Button>
            <Button onClick={handleUseConvertedData}>Use converted data</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CsvImport;
