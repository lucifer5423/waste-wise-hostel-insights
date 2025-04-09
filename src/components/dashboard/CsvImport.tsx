
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download } from "lucide-react";
import { useCsvImport } from "@/hooks/useCsvImport";
import FileUploadArea from "./FileUploadArea";
import CsvConversionDialog from "./CsvConversionDialog";
import { downloadCsvTemplate } from "@/utils/downloadUtils";

const CsvImport = () => {
  const {
    file,
    isLoading,
    isSuccess,
    error,
    showConversionDialog,
    convertedCsvContent,
    handleFileChange,
    handleUpload,
    handleUseConvertedData,
    handleDownloadConvertedCsv,
    setShowConversionDialog
  } = useCsvImport();

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
          <FileUploadArea 
            file={file}
            onFileChange={handleFileChange}
            isSuccess={isSuccess}
            error={error}
            isLoading={isLoading}
          />
          
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
            onClick={downloadCsvTemplate}
          >
            <Download className="h-4 w-4" />
            Download CSV template
          </Button>
        </CardFooter>
      </Card>

      <CsvConversionDialog
        open={showConversionDialog}
        onOpenChange={setShowConversionDialog}
        convertedCsvContent={convertedCsvContent}
        onUseConvertedData={handleUseConvertedData}
        onDownloadConvertedCsv={handleDownloadConvertedCsv}
      />
    </>
  );
};

export default CsvImport;
