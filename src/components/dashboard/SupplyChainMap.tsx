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

  // Convert real coordinates to SVG coordinates (simplified projection)
  const projectToSvg = (lon: number, lat: number) => {
    const x = ((lon + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 400;
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
            onClick={() => setViewMode("global")}
          >
            Global
          </Button>
          <Button
            variant={viewMode === "region" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("region")}
          >
            Regional
          </Button>
        </div>
      </div>

      <div className="relative">
        {/* World Map SVG */}
        <svg
          viewBox="0 0 800 400"
          className="w-full h-64 bg-secondary/20 rounded-lg border"
        >
          {/* Simple world map outline */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#grid)" />

          {/* Continents (simplified) */}
          <g
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          >
            {/* North America */}
            <path d="M 50 80 L 180 70 L 200 140 L 80 160 Z" opacity="0.6" />
            {/* Europe */}
            <path d="M 350 60 L 420 50 L 430 100 L 340 110 Z" opacity="0.6" />
            {/* Asia */}
            <path d="M 450 40 L 650 30 L 680 120 L 440 130 Z" opacity="0.6" />
            {/* India */}
            <path d="M 550 140 L 590 130 L 600 180 L 540 190 Z" opacity="0.6" />
          </g>

          {/* Supply Chain Links */}
          {castrolNodes.map((node, i) => {
            const pos = projectToSvg(node.location.x, node.location.y);
            return castrolNodes.slice(i + 1).map((otherNode, j) => {
              const otherPos = projectToSvg(
                otherNode.location.x,
                otherNode.location.y
              );
              const hasIssue =
                node.status !== "normal" || otherNode.status !== "normal";

              return (
                <line
                  key={`link-${i}-${j}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2={otherPos.x}
                  y2={otherPos.y}
                  stroke={
                    hasIssue ? "hsl(var(--warning))" : "hsl(var(--success))"
                  }
                  strokeWidth={hasIssue ? "2" : "1"}
                  opacity={hasIssue ? "0.8" : "0.3"}
                  strokeDasharray={hasIssue ? "4,4" : "none"}
                />
              );
            });
          })}

          {/* Supply Chain Nodes */}
          {castrolNodes.map((node) => {
            const pos = projectToSvg(node.location.x, node.location.y);

            return (
              <g key={node.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="12"
                  fill={`hsl(var(--${
                    node.status === "critical"
                      ? "critical"
                      : node.status === "warning"
                      ? "warning"
                      : "success"
                  }))`}
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                  className="cursor-pointer hover:r-14 transition-all"
                  onClick={() => setSelectedNode(node)}
                />
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="6"
                  fill="hsl(var(--background))"
                  className="pointer-events-none"
                />
                {node.status !== "normal" && (
                  <circle
                    cx={pos.x + 8}
                    cy={pos.y - 8}
                    r="4"
                    fill="hsl(var(--critical))"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-xs text-muted-foreground">
              Normal Operations
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-xs text-muted-foreground">Risk Detected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-critical"></div>
            <span className="text-xs text-muted-foreground">
              Critical Issue
            </span>
          </div>
        </div>

        {/* Node Details Panel */}
        {selectedNode && (
          <div className="absolute top-0 right-0 w-80 p-4 bg-card border border-border rounded-lg shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getNodeIcon(selectedNode.type, selectedNode.status)}
                  <h4 className="font-semibold text-foreground">
                    {selectedNode.name}
                  </h4>
                </div>
                <Badge variant="outline" className="text-xs">
                  {selectedNode.region}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedNode(null)}
              >
                ✕
              </Button>
            </div>

            <div
              className={cn(
                "p-3 rounded-md border",
                getStatusColor(selectedNode.status)
              )}
            >
              <div className="space-y-2">
                {selectedNode.details.capacity && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-medium">
                      {selectedNode.details.capacity}
                    </span>
                  </div>
                )}
                {selectedNode.details.utilization && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Utilization:</span>
                    <span className="font-medium">
                      {selectedNode.details.utilization}
                    </span>
                  </div>
                )}
                {selectedNode.details.inventory && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Inventory:</span>
                    <span className="font-medium">
                      {selectedNode.details.inventory}
                    </span>
                  </div>
                )}
              </div>

              {selectedNode.details.issues &&
                selectedNode.details.issues.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-1 mb-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium">Active Issues</span>
                    </div>
                    <ul className="space-y-1">
                      {selectedNode.details.issues.map((issue, index) => (
                        <li
                          key={index}
                          className="text-xs text-muted-foreground"
                        >
                          • {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                View Details
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Create Alert
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>

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
