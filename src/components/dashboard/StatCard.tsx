
import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: number;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  change,
  className,
}: StatCardProps) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        {icon && <div className="text-wastewise-salmon">{icon}</div>}
      </div>
      
      {(description || change !== undefined) && (
        <div className="flex items-center space-x-2">
          {change !== undefined && (
            <span className={cn(
              "text-xs font-medium",
              change > 0 ? "text-wastewise-salmon" : "text-wastewise-violet"
            )}>
              {change > 0 ? "↑" : "↓"} {Math.abs(change)}%
            </span>
          )}
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
