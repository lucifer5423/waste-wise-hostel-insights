
import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-border p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Food Wastage Tracker</h1>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-wastewise-green-200 flex items-center justify-center text-wastewise-green-700 font-semibold">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
