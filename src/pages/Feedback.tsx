
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import DataEntryCard from "@/components/dashboard/DataEntryCard";
import PredictionCard from "@/components/dashboard/PredictionCard";
import CsvImport from "@/components/dashboard/CsvImport";

const Feedback = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Feedback & Data Entry</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <DataEntryCard />
                <PredictionCard />
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Historical Data Import</h3>
                <p className="text-gray-600 mb-4">
                  Import historical data from the past year to analyze waste patterns by meal type.
                  <span className="block text-sm text-primary mt-1">
                    New: We can now automatically convert various CSV formats to match our system requirements!
                  </span>
                </p>
                <CsvImport />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;
