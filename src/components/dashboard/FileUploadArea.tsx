
import React from "react";
import { Input } from "@/components/ui/input";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

interface FileUploadAreaProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSuccess: boolean;
  error: string | null;
  isLoading: boolean;
}

const FileUploadArea = ({ 
  file, 
  onFileChange, 
  isSuccess, 
  error, 
  isLoading 
}: FileUploadAreaProps) => {
  return (
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
        onChange={onFileChange}
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
  );
};

export default FileUploadArea;
