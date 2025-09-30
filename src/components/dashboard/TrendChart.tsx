import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TrendChartProps {
  title: string;
  data: Array<{ label: string; value: number; target?: number }>;
  color: string;
  className?: string;
}

export function TrendChart({ title, data, color, className }: TrendChartProps) {
  const maxValue = Math.max(...data.map(d => Math.max(d.value, d.target || 0)));
  
  return (
    <Card className={cn(
      "bg-gradient-card border-border shadow-card hover:shadow-command transition-all duration-300",
      className
    )}>
      <div className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          {title}
        </h3>
        
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{item.label}</span>
                <span className="text-foreground font-medium">{item.value}%</span>
              </div>
              
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn("h-full rounded-full transition-all duration-500", color)}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
                {item.target && (
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-foreground/40"
                    style={{ left: `${(item.target / maxValue) * 100}%` }}
                  />
                )}
              </div>
              
              {item.target && (
                <div className="text-xs text-muted-foreground">
                  Target: {item.target}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}