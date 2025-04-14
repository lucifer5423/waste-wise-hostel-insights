
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import DataEntryCard from "@/components/dashboard/DataEntryCard";

const FoodWastage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Food Wastage Recording</h2>
              
              <div className="max-w-2xl mx-auto">
                <DataEntryCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FoodWastage;
