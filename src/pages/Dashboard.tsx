import { useState } from "react";
import { CommandHeader } from "@/components/dashboard/CommandHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { AlertDetail } from "@/components/alerts/AlertDetail";
import { SupplyChainMap } from "@/components/dashboard/SupplyChainMap";
import { AIExecutiveBrief } from "@/components/dashboard/AIExecutiveBrief";
import { KPIDetailModal } from "@/components/dashboard/KPIDetailModal";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Map, Bot } from "lucide-react";

const kpiData = [
  {
    title: "Revenue",
    value: "€2.4B",
    trend: "up" as const,
    trendValue: "+12.5%",
    color: "revenue" as const,
  },
  {
    title: "Volume",
    value: "1.8M",
    unit: "MT",
    trend: "up" as const,
    trendValue: "+8.3%",
    color: "volume" as const,
  },
  {
    title: "OTIF %",
    value: "87.2",
    unit: "%",
    trend: "down" as const,
    trendValue: "-4.8%",
    color: "otif" as const,
  },
  {
    title: "Inventory Cover",
    value: "45.2",
    unit: "days",
    trend: "up" as const,
    trendValue: "+2.1 days",
    color: "inventory" as const,
  },
  {
    title: "Forecast Accuracy",
    value: "82.5",
    unit: "% MAPE",
    trend: "down" as const,
    trendValue: "-1.5%",
    color: "forecast" as const,
  },
  {
    title: "Inventory Health",
    value: "73",
    unit: "Index",
    trend: "down" as const,
    trendValue: "-8 pts",
    color: "health" as const,
  },
  {
    title: "Risk Score",
    value: "High",
    trend: "up" as const,
    trendValue: "Critical",
    color: "risk" as const,
  },
];

const alertsData = [
  {
    id: "1",
    title: "Base Oil & Additive Shortage - Critical Supply Risk",
    description:
      "Hamburg port disruption + Supplier X audit delays affecting Base Oil X & Additive A-VMX320 availability. Demand surge +12% for summer season.",
    severity: "critical" as const,
    impact: "€6M penalties",
    region: "EMEA North",
    timeDetected: "2 hrs ago",
  },
  {
    id: "2",
    title: "Motorcycle Oil Demand Surge - India Market",
    description:
      "Festive season demand spike +18% above forecast in motorcycle oils. Competitor stockout driving additional volume to Castrol channels.",
    severity: "high" as const,
    impact: "₹12 Cr revenue",
    region: "India",
    timeDetected: "4 hrs ago",
  },
  {
    id: "3",
    title: "Additive Quality Non-Conformance",
    description:
      "QA batch contamination detected for Additive Z. 3 lots quarantined at Plant Silvassa affecting premium grade blending.",
    severity: "high" as const,
    impact: "OEM SLA risk",
    region: "India West",
    timeDetected: "6 hrs ago",
  },
  {
    id: "4",
    title: "Logistics Strike - Southern Europe",
    description:
      "Carrier labor strike in Italy impacting 40% of outbound shipments. No alternate carriers contracted for backup.",
    severity: "high" as const,
    impact: "€2M penalties",
    region: "Italy",
    timeDetected: "8 hrs ago",
  },
  {
    id: "5",
    title: "Credit Risk Escalation - Distributor",
    description:
      "Alpha Oils distributor exceeded credit limit. AR aging >75 days with ₹8 Cr exposure due to slow sell-out.",
    severity: "medium" as const,
    impact: "₹8 Cr exposure",
    region: "India South",
    timeDetected: "12 hrs ago",
  },
];

const serviceLevelData = [
  { label: "EMEA", value: 92, target: 95 },
  { label: "Americas", value: 89, target: 95 },
  { label: "APAC", value: 87, target: 95 },
  { label: "India", value: 85, target: 90 },
];

const inventoryData = [
  { label: "Base Oils", value: 78, target: 85 },
  { label: "Additives", value: 65, target: 80 },
  { label: "Finished Goods", value: 82, target: 75 },
  { label: "Packaging", value: 91, target: 85 },
];

const forecastAccuracyData = [
  { label: "Premium Grades", value: 88, target: 90 },
  { label: "Motorcycle Oils", value: 75, target: 85 },
  { label: "Industrial", value: 91, target: 88 },
  { label: "Marine", value: 84, target: 85 },
];

export default function Dashboard() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [selectedKPI, setSelectedKPI] = useState<{
    title: string;
    data: any;
  } | null>(null);
  const [showAIBrief, setShowAIBrief] = useState(false);
  const [currentView, setCurrentView] = useState<"overview" | "map" | "ai">(
    "overview"
  );

  const handleAlertClick = (alertId: string) => {
    setSelectedAlert(alertId);
  };

  const handleBackToDashboard = () => {
    setSelectedAlert(null);
  };

  const handleKPIClick = (title: string, data: any) => {
    setSelectedKPI({ title, data });
  };

  const handleViewChange = (view: "overview" | "map" | "ai") => {
    setCurrentView(view);
  };

  // If an alert is selected, show the detailed view
  if (selectedAlert) {
    return (
      <AlertDetail alertId={selectedAlert} onBack={handleBackToDashboard} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CommandHeader />

      {/* View Navigation */}
      <div className="p-6 pb-0">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant={currentView === "overview" ? "default" : "outline"}
            onClick={() => handleViewChange("overview")}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Executive Overview
          </Button>
          <Button
            variant={currentView === "map" ? "default" : "outline"}
            onClick={() => handleViewChange("map")}
            className="flex items-center gap-2"
          >
            <Map className="w-4 h-4" />
            Supply Chain Alerts
          </Button>
          {/* <Button 
            variant={currentView === "ai" ? "default" : "outline"}
            onClick={() => handleViewChange("ai")}
            className="flex items-center gap-2"
          >
            <Bot className="w-4 h-4" />
            AI Executive Brief
          </Button> */}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Conditional Views */}
        {currentView === "overview" && (
          <>
            {/* KPI Scorecard */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Executive KPI Scorecard
                </h2>
                <div className="text-sm text-muted-foreground">
                  Click any KPI for detailed analysis
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {kpiData.map((kpi, index) => (
                  <KPICard
                    key={index}
                    {...kpi}
                    onClick={() => handleKPIClick(kpi.title, kpi)}
                  />
                ))}
              </div>
            </section>

            <div className="h-[calc(100vh-200px)]">
              <AIExecutiveBrief kpiData={kpiData} alertsData={alertsData} />
            </div>

            {/* Main Dashboard Grid */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> */}
            {/* Critical Alerts */}
            {/* <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Critical Alerts Inbox</h2>
                  <Button variant="outline" size="sm">
                    View All Alerts
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {alertsData.map((alert) => (
                    <AlertCard 
                      key={alert.id} 
                      {...alert} 
                      onClick={() => handleAlertClick(alert.id)}
                    />
                  ))}
                </div>
              </div> */}

            {/* AI Executive Assistant */}
            {/* <div className="lg:col-span-1">
                <AIExecutiveBrief kpiData={kpiData} alertsData={alertsData} />
              </div>
            </div> */}
          </>
        )}

        {currentView === "map" && <SupplyChainMap />}

        {/* {currentView === "ai" && (
          <div className="h-[calc(100vh-200px)]">
            <AIExecutiveBrief kpiData={kpiData} alertsData={alertsData} />
          </div>
        )} */}

        {/* KPI Detail Modal */}
        {selectedKPI && (
          <KPIDetailModal
            isOpen={!!selectedKPI}
            onClose={() => setSelectedKPI(null)}
            kpiTitle={selectedKPI.title}
            kpiData={selectedKPI.data}
          />
        )}
      </div>
    </div>
  );
}
