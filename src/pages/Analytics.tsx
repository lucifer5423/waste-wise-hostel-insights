
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import WasteTrend from "@/components/dashboard/WasteTrend";
import FeedbackSentiment from "@/components/dashboard/FeedbackSentiment";

const Analytics = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <WasteTrend />
                <FeedbackSentiment />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
