import { Card } from '@/components/ui/card';
import { Building2, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';

interface Recommendation {
  title: string;
  description: string;
  investment: string;
  roi: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
}

const recommendations: Recommendation[] = [
  {
    title: 'Warsaw DC Expansion',
    description: 'Increase capacity by 50% to serve growing Eastern European demand',
    investment: '€8.5M',
    roi: '18 months',
    priority: 'high',
    impact: '€3.2M annual savings',
  },
  {
    title: 'Manchester DC Automation',
    description: 'Implement automated sorting and storage systems',
    investment: '€4.2M',
    roi: '24 months',
    priority: 'medium',
    impact: '€1.8M annual savings',
  },
  {
    title: 'Consolidate French Operations',
    description: 'Merge Paris DC with Toulouse satellite for efficiency',
    investment: '€2.1M',
    roi: '14 months',
    priority: 'high',
    impact: '€1.5M annual savings',
  },
  {
    title: 'Cross-Docking Network',
    description: 'Establish rapid transfer hubs in key locations',
    investment: '€5.8M',
    roi: '22 months',
    priority: 'medium',
    impact: '€2.6M annual savings',
  },
];

export const CapExRecommendations = () => {
  const priorityStyles = {
    high: 'border-destructive bg-destructive/5',
    medium: 'border-warning bg-warning/5',
    low: 'border-muted bg-muted/50',
  };

  const priorityIcons = {
    high: AlertTriangle,
    medium: TrendingUp,
    low: TrendingDown,
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">CapEx Recommendations</h3>
        <p className="text-sm text-muted-foreground">Strategic investments for DC consolidation and expansion</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recommendations.map((rec) => {
          const Icon = priorityIcons[rec.priority];
          
          return (
            <div
              key={rec.title}
              className={`p-5 rounded-lg border-2 transition-all hover:shadow-md ${priorityStyles[rec.priority]}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">{rec.title}</h4>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold capitalize px-2 py-1 rounded">
                  <Icon className="w-3 h-3" />
                  {rec.priority}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
              
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground mb-1">Investment</p>
                  <p className="font-bold text-sm">{rec.investment}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">ROI Period</p>
                  <p className="font-bold text-sm">{rec.roi}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Impact</p>
                  <p className="font-bold text-sm text-success">{rec.impact}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
