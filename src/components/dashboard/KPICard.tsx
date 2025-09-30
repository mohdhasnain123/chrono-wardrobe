import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  unit?: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  color: "revenue" | "volume" | "otif" | "inventory" | "forecast" | "health" | "risk";
  className?: string;
  onClick?: () => void;
}

export function KPICard({ title, value, unit, trend, trendValue, color, className, onClick }: KPICardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4" />;
      case "down":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-critical";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden bg-gradient-card border-border shadow-card hover:shadow-command transition-all duration-300 group cursor-pointer hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
          <div className={cn(
            "w-2 h-2 rounded-full opacity-80 group-hover:opacity-100 transition-opacity",
            `bg-kpi-${color}`
          )} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-foreground">
              {value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground">
                {unit}
              </span>
            )}
          </div>
          
          <div className={cn(
            "flex items-center space-x-1 text-sm font-medium",
            getTrendColor()
          )}>
            {getTrendIcon()}
            <span>{trendValue}</span>
          </div>
        </div>
      </div>
      
      {/* Accent border */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity",
        `bg-kpi-${color}`
      )} />
    </Card>
  );
}