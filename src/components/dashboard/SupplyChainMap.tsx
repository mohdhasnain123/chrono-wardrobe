import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Factory,
  Truck,
  Ship,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AlertCard } from "./AlertCard";
import { AlertDetail } from "../alerts/AlertDetail";
import { RealisticWorldMap } from "./RealisticWorldMap";
import { SupplyChainMapMain } from "../SupplyChainMapMain";
import { CapExRecommendations } from "./CapExRecommendations";
import { CostBreakdownChart } from "./CostBreakdownChart";
import { PerformanceMetrics } from "./PerformanceMetrics";

interface SupplyChainNode {
  id: string;
  name: string;
  type: "plant" | "supplier" | "dc" | "port" | "customer";
  location: { x: number; y: number };
  status: "normal" | "warning" | "critical";
  region: string;
  details: {
    capacity?: string;
    utilization?: string;
    inventory?: string;
    issues?: string[];
  };
}

const castrolNodes: SupplyChainNode[] = [
  // Manufacturing Plants
  {
    id: "p1",
    name: "Castrol Silvassa",
    type: "plant",
    location: { x: 72, y: 20 },
    status: "warning",
    region: "India",
    details: {
      capacity: "850K MT/yr",
      utilization: "92%",
      inventory: "65 days",
      issues: ["QA batch contamination"],
    },
  },
  {
    id: "p2",
    name: "Castrol Hamburg",
    type: "plant",
    location: { x: 10, y: 53 },
    status: "critical",
    region: "EMEA",
    details: {
      capacity: "1.2M MT/yr",
      utilization: "78%",
      inventory: "23 days",
      issues: ["Port disruption", "Base oil shortage"],
    },
  },
  {
    id: "p3",
    name: "Castrol Texas",
    type: "plant",
    location: { x: -97, y: 32 },
    status: "normal",
    region: "Americas",
    details: {
      capacity: "950K MT/yr",
      utilization: "87%",
      inventory: "78 days",
      issues: [],
    },
  },
  {
    id: "p4",
    name: "Castrol Singapore",
    type: "plant",
    location: { x: 103, y: 1 },
    status: "normal",
    region: "APAC",
    details: {
      capacity: "750K MT/yr",
      utilization: "94%",
      inventory: "45 days",
      issues: [],
    },
  },

  // Key Suppliers
  {
    id: "s1",
    name: "ExxonMobil Refinery",
    type: "supplier",
    location: { x: -95, y: 29 },
    status: "normal",
    region: "Americas",
    details: {
      capacity: "Base Oils",
      utilization: "85%",
      inventory: "120 days",
      issues: [],
    },
  },
  {
    id: "s2",
    name: "Shell Pernis",
    type: "supplier",
    location: { x: 4, y: 51 },
    status: "warning",
    region: "EMEA",
    details: {
      capacity: "Base Oils",
      utilization: "72%",
      inventory: "35 days",
      issues: ["Audit delays"],
    },
  },
  {
    id: "s3",
    name: "HPCL Mumbai",
    type: "supplier",
    location: { x: 72, y: 19 },
    status: "normal",
    region: "India",
    details: {
      capacity: "Base Oils",
      utilization: "89%",
      inventory: "67 days",
      issues: [],
    },
  },

  // Distribution Centers
  {
    id: "d1",
    name: "Milan DC",
    type: "dc",
    location: { x: 9, y: 45 },
    status: "warning",
    region: "EMEA South",
    details: {
      capacity: "150K MT",
      utilization: "91%",
      inventory: "28 days",
      issues: ["Carrier strike"],
    },
  },
  {
    id: "d2",
    name: "Mumbai DC",
    type: "dc",
    location: { x: 72, y: 19 },
    status: "normal",
    region: "India West",
    details: {
      capacity: "200K MT",
      utilization: "88%",
      inventory: "52 days",
      issues: [],
    },
  },
  {
    id: "d3",
    name: "Shanghai DC",
    type: "dc",
    location: { x: 121, y: 31 },
    status: "normal",
    region: "APAC North",
    details: {
      capacity: "180K MT",
      utilization: "82%",
      inventory: "61 days",
      issues: [],
    },
  },

  // Key Ports
  {
    id: "port1",
    name: "Hamburg Port",
    type: "port",
    location: { x: 10, y: 53 },
    status: "critical",
    region: "EMEA",
    details: {
      capacity: "Container Hub",
      utilization: "45%",
      inventory: "N/A",
      issues: ["Labor disruption", "Vessel delays"],
    },
  },
  {
    id: "port2",
    name: "JNPT Mumbai",
    type: "port",
    location: { x: 72, y: 18 },
    status: "normal",
    region: "India",
    details: {
      capacity: "Container Hub",
      utilization: "87%",
      inventory: "N/A",
      issues: [],
    },
  },
];

const getNodeIcon = (type: string, status: string) => {
  const iconClass = cn(
    "w-4 h-4",
    status === "critical"
      ? "text-critical"
      : status === "warning"
      ? "text-warning"
      : "text-success"
  );

  switch (type) {
    case "plant":
      return <Factory className={iconClass} />;
    case "supplier":
      return <Factory className={iconClass} />;
    case "dc":
      return <Truck className={iconClass} />;
    case "port":
      return <Ship className={iconClass} />;
    default:
      return <MapPin className={iconClass} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "bg-critical/20 border-critical/50";
    case "warning":
      return "bg-warning/20 border-warning/50";
    default:
      return "bg-success/20 border-success/50";
  }
};

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

export function SupplyChainMap() {
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode | null>(
    null
  );
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"global" | "region">("global");
  const [kpiModalOpen, setKpiModalOpen] = useState(false);
  const handleAlertClick = (alertId: string) => {
    setSelectedAlert(alertId);
  };

  const handleBackToDashboard = () => {
    setSelectedAlert(null);
  };

  // If an alert is selected, show the detailed view
  if (selectedAlert) {
    return (
      <AlertDetail alertId={selectedAlert} onBack={handleBackToDashboard} />
    );
  }

  // Convert real coordinates to SVG coordinates (enhanced projection)
  const projectToSvg = (lon: number, lat: number) => {
    const x = ((lon + 180) / 360) * 1000;
    const y = ((90 - lat) / 180) * 500;
    return { x, y };
  };

  return (
    <>
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Castrol Global Supply Chain
          </h3>
          <p className="text-sm text-muted-foreground">
            Real-time network status and risk monitoring
          </p>
      </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "global" ? "default" : "outline"}
            size="sm"
            onClick={() => setKpiModalOpen(true)}
          >
            KPI Dashboard
          </Button>
          
        </div>
      </div>

      <div className="h-[600px]">
          <SupplyChainMapMain />
        </div>
    </Card>

   
       {/* KPI Modal */}
      {kpiModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div
      className="
        bg-white rounded-lg shadow-lg
        w-full max-w-5xl
        max-h-[90vh]
        relative
        flex flex-col
      "
    >
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        onClick={() => setKpiModalOpen(false)}
        aria-label="Close"
      >
        ×
      </button>
      {/* Modal Header */}
      <h2 className="text-xl font-semibold mb-4 px-6 pt-6">KPI Dashboard</h2>
      {/* Modal Content - scrollable if needed */}
      <div className="overflow-y-auto px-6 pb-6" style={{ maxHeight: "70vh" }}>
        <div className="space-y-6">
          <CostBreakdownChart />
          <PerformanceMetrics />
          <CapExRecommendations />
        </div>
      </div>
    </div>
  </div>
)}

    {/* Alerts Inbox - moved outside the Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Critical Alerts */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Critical Alerts Inbox
            </h2>
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
        </div>
      </div>
    </>
  );
}
