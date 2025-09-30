import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingDown, Clock, MapPin } from "lucide-react";

interface AlertCardProps {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  impact: string;
  region: string;
  timeDetected: string;
  onClick?: () => void;
}

export function AlertCard({ 
  title, 
  description, 
  severity, 
  impact, 
  region, 
  timeDetected,
  onClick 
}: AlertCardProps) {
  const getSeverityColor = () => {
    switch (severity) {
      case "critical":
        return "bg-gradient-critical text-critical-foreground";
      case "high":
        return "bg-gradient-warning text-warning-foreground";
      case "medium":
        return "bg-warning/20 text-warning border-warning/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = () => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-critical animate-pulse" />;
      case "high":
        return <TrendingDown className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden bg-gradient-card border-border shadow-card hover:shadow-alert transition-all duration-300 group cursor-pointer transform hover:scale-[1.02] animate-scale-in",
      severity === "critical" && "border-critical/30 shadow-alert animate-pulse-glow"
    )} onClick={onClick}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getSeverityIcon()}
            <Badge variant="secondary" className={getSeverityColor()}>
              {severity.toUpperCase()}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{timeDetected}</span>
          </div>
        </div>

        <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h4>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{region}</span>
            </div>
            <div className="font-semibold text-critical">
              Impact: {impact}
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <Button variant="outline" size="sm" className="w-full">
            Investigate Alert
          </Button>
        </div>
      </div>

      {/* Severity indicator */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1 opacity-60 group-hover:opacity-100 transition-opacity",
        severity === "critical" && "bg-critical",
        severity === "high" && "bg-warning",
        severity === "medium" && "bg-warning/60",
        severity === "low" && "bg-muted"
      )} />
    </Card>
  );
}