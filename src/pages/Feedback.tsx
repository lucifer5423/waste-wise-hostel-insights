
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const Feedback = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Feedback</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-4">
                  This section allows students and staff to provide feedback on meals, service, and overall dining experience.
                </p>

                <div className="grid grid-cols-1 gap-6">
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">Coming Soon</h3>
                    <p className="text-sm text-gray-500">
                      Our feedback collection system is currently being updated. The new version will be available soon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;
