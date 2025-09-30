import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrendChart } from "./TrendChart";
import { TrendingUp, TrendingDown, Target, AlertTriangle, Calendar, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpiTitle: string;
  kpiData: any;
}

const getDetailedData = (kpiTitle: string) => {
  switch (kpiTitle.toLowerCase()) {
    case "revenue":
      return {
        description: "Total revenue across all regions and product lines",
        target: "€2.6B",
        ytdPerformance: "+8.7%",
        forecast: "€2.75B EOY",
        regionalBreakdown: [
          { region: "EMEA", value: "€1.1B", share: "46%", trend: "+15%" },
          { region: "APAC", value: "€0.8B", share: "33%", trend: "+12%" },
          { region: "Americas", value: "€0.5B", share: "21%", trend: "+5%" }
        ],
        productMix: [
          { product: "Automotive Oils", value: "€1.4B", share: "58%" },
          { product: "Industrial Fluids", value: "€0.7B", share: "29%" },
          { product: "Marine Lubricants", value: "€0.3B", share: "13%" }
        ],
        trendData: [
          { label: "Q1", value: 85, target: 90 },
          { label: "Q2", value: 92, target: 90 },
          { label: "Q3", value: 98, target: 95 },
          { label: "Q4", value: 102, target: 100 }
        ],
        risks: [
          "Currency fluctuations in emerging markets",
          "Raw material cost inflation",
          "Geopolitical tensions affecting supply"
        ]
      };
    
    case "volume":
      return {
        description: "Total product volume shipped across all channels",
        target: "2.1M MT",
        ytdPerformance: "+3.2%",
        forecast: "2.2M MT EOY",
        regionalBreakdown: [
          { region: "India", value: "0.9M MT", share: "50%", trend: "+18%" },
          { region: "EMEA", value: "0.5M MT", share: "28%", trend: "-2%" },
          { region: "APAC", value: "0.4M MT", share: "22%", trend: "+8%" }
        ],
        productMix: [
          { product: "Motorcycle Oils", value: "0.8M MT", share: "44%" },
          { product: "Automotive Oils", value: "0.6M MT", share: "33%" },
          { product: "Industrial", value: "0.4M MT", share: "23%" }
        ],
        trendData: [
          { label: "Jan", value: 88, target: 85 },
          { label: "Feb", value: 92, target: 90 },
          { label: "Mar", value: 96, target: 95 },
          { label: "Apr", value: 89, target: 95 }
        ],
        risks: [
          "Seasonal demand fluctuations",
          "Competitor pricing pressure",
          "Supply chain disruptions"
        ]
      };

    case "otif %":
      return {
        description: "On-Time In-Full delivery performance",
        target: "95%",
        ytdPerformance: "-2.1%",
        forecast: "89% EOY",
        regionalBreakdown: [
          { region: "Americas", value: "94%", share: "Best", trend: "+1%" },
          { region: "APAC", value: "89%", share: "Good", trend: "-1%" },
          { region: "EMEA", value: "82%", share: "Risk", trend: "-8%" }
        ],
        rootCauses: [
          { cause: "Hamburg port disruption", impact: "-6%" },
          { cause: "Carrier capacity constraints", impact: "-2%" },
          { cause: "Inventory stockouts", impact: "-3%" }
        ],
        trendData: [
          { label: "EMEA", value: 82, target: 95 },
          { label: "Americas", value: 94, target: 95 },
          { label: "APAC", value: 89, target: 95 },
          { label: "India", value: 85, target: 90 }
        ],
        risks: [
          "Customer penalty clauses activation",
          "Loss of preferred supplier status",
          "Revenue impact from stockouts"
        ]
      };

    default:
      return null;
  }
};

export function KPIDetailModal({ isOpen, onClose, kpiTitle, kpiData }: KPIDetailModalProps) {
  const detailData = getDetailedData(kpiTitle);
  
  if (!detailData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={cn(
              "w-3 h-3 rounded-full",
              `bg-kpi-${kpiData.color}`
            )} />
            {kpiTitle} - Deep Dive Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Current</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {kpiData.value}{kpiData.unit}
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Target</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {detailData.target}
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">YTD</span>
              </div>
              <div className={cn(
                "text-2xl font-bold",
                detailData.ytdPerformance.startsWith("+") ? "text-success" : "text-critical"
              )}>
                {detailData.ytdPerformance}
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Forecast</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {detailData.forecast}
              </div>
            </Card>
          </div>

          <Separator />

          {/* Performance Trend */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Performance Trend</h3>
            <TrendChart
              title={`${kpiTitle} vs Target`}
              data={detailData.trendData}
              color={`bg-kpi-${kpiData.color}`}
            />
          </div>

          <Separator />

          {/* Regional/Product Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {detailData.regionalBreakdown ? "Regional Breakdown" : "Root Causes"}
              </h3>
              <div className="space-y-3">
                {(detailData.regionalBreakdown || detailData.rootCauses)?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">
                        {'region' in item ? item.region : item.cause}
                      </div>
                      {'share' in item && (
                        <div className="text-sm text-muted-foreground">{item.share} share</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">
                        {'value' in item ? item.value : item.impact}
                      </div>
                      {'trend' in item && (
                        <div className={cn(
                          "text-sm flex items-center gap-1",
                          item.trend.startsWith("+") ? "text-success" : "text-critical"
                        )}>
                          {item.trend.startsWith("+") ? 
                            <TrendingUp className="w-3 h-3" /> : 
                            <TrendingDown className="w-3 h-3" />
                          }
                          {item.trend}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {detailData.productMix && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Product Mix</h3>
                <div className="space-y-3">
                  {detailData.productMix.map((product, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div className="font-medium text-foreground">{product.product}</div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">{product.value}</div>
                        <div className="text-sm text-muted-foreground">{product.share} of total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Risks & Actions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Key Risks & Mitigation
            </h3>
            <div className="space-y-2">
              {detailData.risks.map((risk, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-foreground">{risk}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Create Action Plan
            </Button>
            <Button variant="secondary">
              Schedule Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}