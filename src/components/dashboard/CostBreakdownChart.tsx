import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { region: 'UK', transport: 2.4, warehousing: 1.8, inventory: 1.2, total: 5.4 },
  { region: 'Germany', transport: 2.1, warehousing: 1.6, inventory: 1.0, total: 4.7 },
  { region: 'France', transport: 2.3, warehousing: 1.7, inventory: 1.1, total: 5.1 },
  { region: 'Italy', transport: 2.6, warehousing: 1.9, inventory: 1.3, total: 5.8 },
  { region: 'Poland', transport: 1.8, warehousing: 1.2, inventory: 0.8, total: 3.8 },
];

export const CostBreakdownChart = () => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Cost-to-Serve Breakdown by Region</h3>
        <p className="text-sm text-muted-foreground">Analysis of supply chain costs across European markets (€M)</p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="region" 
            tick={{ fontSize: 12 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="hsl(var(--muted-foreground))"
            label={{ value: 'Cost (€M)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="transport" fill="#3b82f6" name="Transport" />    {/* Tailwind blue-500 */}
          <Bar dataKey="warehousing" fill="#f59e42" name="Warehousing" /> {/* Custom orange or Tailwind orange-400 */}
          <Bar dataKey="inventory" fill="#22c55e" name="Inventory" />     {/* Tailwind green-500 */}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
