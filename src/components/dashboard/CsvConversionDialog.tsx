
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileWarning } from "lucide-react";

interface CsvConversionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  convertedCsvContent: string;
  onUseConvertedData: () => void;
  onDownloadConvertedCsv: () => void;
}

const CsvConversionDialog = ({
  open,
  onOpenChange,
  convertedCsvContent,
  onUseConvertedData,
  onDownloadConvertedCsv
}: CsvConversionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={onDownloadConvertedCsv}
            className="gap-1"
          >
            <Download className="h-4 w-4" />
            Download converted
          </Button>
          <Button onClick={onUseConvertedData}>Use converted data</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CsvConversionDialog;
