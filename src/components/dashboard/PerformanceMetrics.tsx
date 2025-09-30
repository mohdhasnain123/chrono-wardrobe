import { Card } from '@/components/ui/card';

interface Metric {
  label: string;
  value: string;
  target: string;
  status: 'on-track' | 'at-risk' | 'achieved';
}

const metrics: Metric[] = [
  { label: 'Inventory Reduction', value: '38%', target: '35%', status: 'achieved' },
  { label: 'Lead Time Improvement', value: '22%', target: '25%', status: 'on-track' },
  { label: 'Cost Reduction', value: '€12.4M', target: '€15M', status: 'on-track' },
  { label: 'Service Level', value: '94.5%', target: '95%', status: 'at-risk' },
  { label: 'Network Efficiency', value: '87%', target: '85%', status: 'achieved' },
  { label: 'Carbon Footprint', value: '-18%', target: '-20%', status: 'on-track' },
];

export const PerformanceMetrics = () => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Risk-Adjusted Performance Metrics</h3>
        <p className="text-sm text-muted-foreground">Key performance indicators vs targets</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const statusStyles = {
            'achieved': 'bg-success/10 text-success border-success/20',
            'on-track': 'bg-primary/10 text-primary border-primary/20',
            'at-risk': 'bg-warning/10 text-warning border-warning/20',
          };
          
          return (
            <div 
              key={metric.label}
              className={`p-4 rounded-lg border-2 ${statusStyles[metric.status]} transition-all hover:scale-[1.02]`}
            >
              <p className="text-xs font-medium mb-1 opacity-80">{metric.label}</p>
              <p className="text-2xl font-bold mb-2">{metric.value}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="opacity-60">Target: {metric.target}</span>
                <span className="font-semibold capitalize">{metric.status.replace('-', ' ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
