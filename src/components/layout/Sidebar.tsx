
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChartPie, Home, MessageSquare, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

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
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div 
      className={cn(
        "h-screen bg-gradient-to-b from-wastewise-apricot to-wastewise-melon/90 border-r border-border transition-all duration-300 shadow-lg",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <div className="text-xl font-bold text-gradient">
              WasteWise
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto hover:bg-white/10"
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
                "flex items-center p-3 rounded-md transition-all duration-300 hover-lift group",
                location.pathname === item.path 
                  ? "bg-white/10 text-wastewise-violet backdrop-blur-sm" 
                  : "text-sidebar-foreground hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5", 
                location.pathname === item.path 
                  ? "text-wastewise-violet" 
                  : "text-sidebar-foreground group-hover:text-wastewise-violet"
              )} />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-wastewise-violet to-wastewise-amethyst flex items-center justify-center text-white font-semibold">
                A
              </div>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-sidebar-foreground/60">Hostel Manager</p>
                </div>
              )}
            </div>
            
            {!collapsed && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="text-wastewise-salmon hover:bg-wastewise-salmon/10 hover:text-wastewise-violet"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          {collapsed && (
            <Button 
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="mt-2 w-full text-wastewise-salmon hover:bg-wastewise-salmon/10 hover:text-wastewise-violet"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
