
import React from "react";
import { ArrowDownRight, ArrowUpRight, CalendarDays, ChartPie, MessageSquare } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import WastageByMealChart from "@/components/dashboard/WastageByMealChart";
import TopWastedItems from "@/components/dashboard/TopWastedItems";
import DataEntryCard from "@/components/dashboard/DataEntryCard";
import PredictionCard from "@/components/dashboard/PredictionCard";
import CsvImport from "@/components/dashboard/CsvImport";

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total Waste This Month" 
                  value="245.8 kg" 
                  description="vs. last month"
                  change={-12}
                  icon={<ChartPie className="h-6 w-6" />}
                  className="animate-fade-in"
                />
                
                <StatCard 
                  title="Average Daily Waste" 
                  value="8.2 kg" 
                  description="vs. last week"
                  change={5}
                  icon={<ArrowUpRight className="h-6 w-6" />}
                  className="animate-fade-in [animation-delay:200ms]"
                />
                
                <StatCard 
                  title="Feedback Responses" 
                  value="127" 
                  description="last 30 days"
                  icon={<MessageSquare className="h-6 w-6" />}
                  className="animate-fade-in [animation-delay:400ms]"
                />
                
                <StatCard 
                  title="Next Data Collection" 
                  value="Today" 
                  description="Dinner service"
                  icon={<CalendarDays className="h-6 w-6" />}
                  className="animate-fade-in [animation-delay:600ms]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <WastageByMealChart />
              <TopWastedItems />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <DataEntryCard />
              <PredictionCard />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CsvImport />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
