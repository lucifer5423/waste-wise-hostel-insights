
import React from "react";
import { ChartPie, MessageSquare, CalendarDays } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import WastageByMealChart from "@/components/dashboard/WastageByMealChart";
import TopWastedItems from "@/components/dashboard/TopWastedItems";

const Index = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-secondary/30">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gradient">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                  title="Total Waste This Month" 
                  value="245.8 kg" 
                  description="vs. last month"
                  change={-12}
                  icon={<ChartPie className="h-6 w-6" />}
                  className="animate-fade-in glass-card"
                />
                
                <StatCard 
                  title="Feedback Responses" 
                  value="127" 
                  description="last 30 days"
                  icon={<MessageSquare className="h-6 w-6" />}
                  className="animate-fade-in glass-card [animation-delay:400ms]"
                />
                
                <StatCard 
                  title="Next Data Collection" 
                  value="Today" 
                  description="Dinner service"
                  icon={<CalendarDays className="h-6 w-6" />}
                  className="animate-fade-in glass-card [animation-delay:600ms]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <WastageByMealChart />
              <TopWastedItems />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
