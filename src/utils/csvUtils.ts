/**
 * CSV conversion utilities for handling differently formatted CSV files
 * and converting them to the application's required format
 */

/**
 * Attempts to intelligently convert various CSV formats to the application's required format
 * The required format has columns: date, meal_type, weight
 */
export const convertCsvFormat = (csvContent: string): { 
  convertedCsv: string; 
  success: boolean;
  message: string;
} => {
  try {
    // Split the CSV content into lines
    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) {
      return { 
        convertedCsv: "", 
        success: false, 
        message: "CSV file is empty or invalid" 
      };
    }

    // Parse headers (lowercase and trim them)
    let headers = lines[0].split(',').map(header => header.toLowerCase().trim());
    
    // Check if the required headers already exist
    const hasDate = headers.some(header => 
      header === 'date' || header.includes('date') || header.includes('day')
    );
    const hasMealType = headers.some(header => 
      header === 'meal_type' || header.includes('meal') || header.includes('type')
    );
    const hasWeight = headers.some(header => 
      header === 'weight' || header.includes('weight') || header.includes('waste') || header.includes('amount') || header.includes('kg')
    );

    if (hasDate && hasMealType && hasWeight) {
      // Map headers to standard format
      const dateIndex = headers.findIndex(header => 
        header === 'date' || header.includes('date') || header.includes('day')
      );
      const mealTypeIndex = headers.findIndex(header => 
        header === 'meal_type' || header.includes('meal') || header.includes('type')
      );
      const weightIndex = headers.findIndex(header => 
        header === 'weight' || header.includes('weight') || header.includes('waste') || header.includes('amount') || header.includes('kg')
      );

      // Create standardized data
      const standardizedLines = [
        "date,meal_type,weight"
      ];

      // Process all data rows
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // Skip empty lines
        
        const values = lines[i].split(',').map(val => val.trim());
        if (values.length <= Math.max(dateIndex, mealTypeIndex, weightIndex)) {
          continue; // Skip if row doesn't have enough columns
        }
        
        let date = values[dateIndex];
        let mealType = values[mealTypeIndex].toLowerCase();
        let weight = values[weightIndex];
        
        // Try to standardize date format if needed
        if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          try {
            // Handle MM/DD/YYYY or DD/MM/YYYY formats
            const dateParts = date.split(/[\/.-]/);
            if (dateParts.length === 3) {
              // Assume MM/DD/YYYY if first number is 12 or less
              if (parseInt(dateParts[0]) <= 12) {
                date = `${dateParts[2].padStart(4, '20')}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
              } else {
                // Otherwise assume DD/MM/YYYY
                date = `${dateParts[2].padStart(4, '20')}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;
              }
            }
          } catch (err) {
            // Keep original if parsing fails
          }
        }
        
        // Standardize meal type
        if (mealType.includes('break') || mealType.includes('morning')) {
          mealType = 'breakfast';
        } else if (mealType.includes('lunch') || mealType.includes('afternoon')) {
          mealType = 'lunch';
        } else if (mealType.includes('dinner') || mealType.includes('evening')) {
          mealType = 'dinner';
        } else if (mealType.includes('snack')) {
          mealType = 'snacks';
        } else {
          // If can't determine meal type, use a default
          mealType = 'breakfast'; // Default
        }
        
        // Standardize weight - remove any non-numeric characters except decimal point
        weight = weight.replace(/[^\d.]/g, '');
        
        standardizedLines.push(`${date},${mealType},${weight}`);
      }

      return {
        convertedCsv: standardizedLines.join('\n'),
        success: true,
        message: "CSV format converted successfully"
      };
    } else {
      // Try to guess the structure if columns don't match expected format
      if (headers.length >= 3) {
        // Assume first column is date, second column is meal_type, third column is weight
        const standardizedLines = [
          "date,meal_type,weight"
        ];
        
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',').map(val => val.trim());
          if (values.length < 3) continue;
          
          let date = values[0];
          let mealType = values[1].toLowerCase();
          let weight = values[2];
          
          // Apply the same standardization as above
          // Try to standardize date format if needed
          if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            try {
              // Handle MM/DD/YYYY or DD/MM/YYYY formats
              const dateParts = date.split(/[\/.-]/);
              if (dateParts.length === 3) {
                // Assume MM/DD/YYYY if first number is 12 or less
                if (parseInt(dateParts[0]) <= 12) {
                  date = `${dateParts[2].padStart(4, '20')}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
                } else {
                  // Otherwise assume DD/MM/YYYY
                  date = `${dateParts[2].padStart(4, '20')}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;
                }
              }
            } catch (err) {
              // Keep original if parsing fails
            }
          }
          
          // Standardize meal type
          if (mealType.includes('break') || mealType.includes('morning')) {
            mealType = 'breakfast';
          } else if (mealType.includes('lunch') || mealType.includes('afternoon')) {
            mealType = 'lunch';
          } else if (mealType.includes('dinner') || mealType.includes('evening')) {
            mealType = 'dinner';
          } else if (mealType.includes('snack')) {
            mealType = 'snacks';
          } else {
            // If can't determine meal type, use a default
            mealType = 'breakfast'; // Default
          }
          
          // Standardize weight - remove any non-numeric characters except decimal point
          weight = weight.replace(/[^\d.]/g, '');
          
          standardizedLines.push(`${date},${mealType},${weight}`);
        }

        return {
          convertedCsv: standardizedLines.join('\n'),
          success: true,
          message: "CSV structure was guessed and converted"
        };
      }
      
      return {
        convertedCsv: "",
        success: false,
        message: "Could not recognize CSV format. Required columns are: date, meal_type, weight"
      };
    }
  } catch (error) {
    console.error("Error converting CSV format:", error);
    return {
      convertedCsv: "",
      success: false,
      message: "Error converting CSV format"
    };
  }
};
