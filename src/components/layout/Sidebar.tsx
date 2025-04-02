
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ChartPie, Home, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarItem = {
  name: string;
  icon: React.ElementType;
  path: string;
};

const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    name: "Analytics",
    icon: ChartPie,
    path: "/analytics",
  },
  {
    name: "Feedback",
    icon: MessageSquare,
    path: "/feedback",
  },
  {
    name: "Schedule",
    icon: Calendar,
    path: "/schedule",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  
  return (
    <div 
      className={cn(
        "h-screen bg-sidebar border-r border-border transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <div className="text-xl font-bold text-wastewise-green-600">
              WasteWise
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? "→" : "←"}
          </Button>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center p-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors group",
                item.path === "/" && "bg-sidebar-accent text-wastewise-green-600"
              )}
            >
              <item.icon className={cn("h-5 w-5", item.path === "/" && "text-wastewise-green-600")} />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-wastewise-green-200 flex items-center justify-center text-wastewise-green-700 font-semibold">
              A
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-sidebar-foreground/60">Hostel Manager</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
