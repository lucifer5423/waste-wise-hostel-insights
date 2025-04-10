
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { sampleHistoricalData } from '@/utils/mlUtils';

// Define the type for our data
export interface WastageData {
  date: string;
  meal_type: string;
  weight: number;
}

interface DataContextType {
  wastageData: WastageData[];
  setWastageData: (data: WastageData[]) => void;
  addWastageData: (data: WastageData) => void;
  resetToSampleData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [wastageData, setWastageData] = useState<WastageData[]>(sampleHistoricalData);

  const addWastageData = (data: WastageData) => {
    setWastageData(prevData => [...prevData, data]);
  };

  const resetToSampleData = () => {
    setWastageData(sampleHistoricalData);
  };

  return (
    <DataContext.Provider value={{ wastageData, setWastageData, addWastageData, resetToSampleData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useWastageData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useWastageData must be used within a DataProvider');
  }
  return context;
};
