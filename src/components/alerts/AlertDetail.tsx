import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  AlertTriangle, 
  TrendingDown, 
  MapPin, 
  Factory, 
  Clock,
  DollarSign,
  Users,
  Truck,
  Package,
  Zap,
  CheckCircle,
  PlayCircle,
  Calendar,
  Target
} from "lucide-react";

interface AlertDetailProps {
  alertId: string;
  onBack: () => void;
}

export function AlertDetail({ alertId, onBack }: AlertDetailProps) {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  // Mock data for Base Oil Shortage scenario
  const alertData = {
    id: alertId,
    title: "Base Oil & Additive Shortage - Critical Supply Risk",
    severity: "critical" as const,
    timeDetected: "2 hours ago",
    impact: "€6M penalties + OTIF drop to 87%",
    region: "EMEA North",
    affectedAssets: ["Hamburg DC", "Rotterdam Plant", "Base Oil X", "Additive A-VMX320"],
    
    rootCause: {
      primary: "Hamburg Port Disruption",
      contributing: [
        "Supplier X quality audit delays (3-week hold)",
        "Summer demand surge +12% above forecast",
        "Limited alternate supplier capacity",
        "Logistics bottleneck at North Sea terminals"
      ],
      timeline: [
        { time: "72h ago", event: "Hamburg port labor strike begins" },
        { time: "48h ago", event: "Supplier X audit findings trigger quality hold" },
        { time: "24h ago", event: "Demand surge detected in POS data" },
        { time: "2h ago", event: "Inventory health algorithm triggers critical alert" }
      ]
    },

    impactData: {
      financial: {
        immediate: "€2.3M revenue at risk",
        penalties: "€6M OEM contract penalties",
        total: "€8.3M total exposure"
      },
      operational: {
        otif: "87% (target: 95%)",
        stockout: "N.Africa in 3 weeks",
        production: "4 plants affected"
      },
      customers: [
        { name: "BMW Group", impact: "Premium grade shortfall 15%", severity: "critical" },
        { name: "Mercedes-Benz", impact: "Delayed shipments 2-3 days", severity: "high" },
        { name: "North Africa Distributors", impact: "Stockout risk 3 weeks", severity: "critical" }
      ]
    },

    recommendations: [
      {
        id: "1",
        action: "Emergency Procurement - Base Oil X",
        description: "Activate emergency procurement from Supplier Y (Malaysia) with expedited shipping",
        impact: "Cover 60% of shortfall, +5 days lead time",
        cost: "€450K premium",
        confidence: 85,
        owner: "Procurement Team",
        timeline: "24-48 hours"
      },
      {
        id: "2", 
        action: "Intra-Regional Stock Transfer",
        description: "Transfer 2,400 MT Base Oil from APAC surplus to EMEA via expedited shipping",
        impact: "Cover 35% of shortfall, restore OTIF to 92%",
        cost: "€280K logistics premium",
        confidence: 90,
        owner: "Supply Planning",
        timeline: "3-5 days"
      },
      {
        id: "3",
        action: "Customer Communication & Prioritization", 
        description: "Proactive OEM communication with premium customer priority allocation",
        impact: "Reduce penalty exposure by 70%",
        cost: "€0",
        confidence: 75,
        owner: "Customer Service",
        timeline: "Immediate"
      },
      {
        id: "4",
        action: "Local Supplier Activation",
        description: "Accelerate qualification of European additive suppliers with temporary approval",
        impact: "15% shortfall coverage, long-term resilience",
        cost: "€120K qualification costs",
        confidence: 65,
        owner: "Technical Team",
        timeline: "1-2 weeks"
      }
    ]
  };

  const triggerWorkflow = (actionId: string) => {
    setActiveWorkflow(actionId);
    // In real app, this would trigger actual workflow systems
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-card border-b border-border p-6 animate-slide-in-right">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Command Center
          </Button>
          
          <Badge variant="secondary" className="bg-gradient-critical text-critical-foreground">
            <AlertTriangle className="h-3 w-3 mr-1" />
            CRITICAL
          </Badge>
          
          <div className="text-xs text-muted-foreground flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Detected {alertData.timeDetected}</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          {alertData.title}
        </h1>
        
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{alertData.region}</span>
          </div>
          <div className="flex items-center space-x-1 text-critical font-semibold">
            <DollarSign className="h-4 w-4" />
            <span>{alertData.impact}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Tabs defaultValue="understand" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="understand">Understand Alert</TabsTrigger>
            <TabsTrigger value="actions">Recommended Actions</TabsTrigger>
            <TabsTrigger value="workflow">Trigger Workflow</TabsTrigger>
            <TabsTrigger value="track">Track Impact</TabsTrigger>
          </TabsList>

          {/* Understand Alert Tab */}
          <TabsContent value="understand" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Root Cause Analysis */}
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Root Cause Analysis</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Primary Cause</h4>
                      <div className="bg-critical/10 border border-critical/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-critical" />
                          <span className="text-foreground font-medium">{alertData.rootCause.primary}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Contributing Factors</h4>
                      <div className="space-y-2">
                        {alertData.rootCause.contributing.map((factor, index) => (
                          <div key={index} className="flex items-start space-x-2 text-sm">
                            <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Impact Simulation */}
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Impact Simulation</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Financial Impact</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Immediate Revenue Risk</span>
                          <span className="text-critical font-medium">{alertData.impactData.financial.immediate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">OEM Penalties</span>
                          <span className="text-critical font-medium">{alertData.impactData.financial.penalties}</span>
                        </div>
                        <div className="border-t border-border pt-2">
                          <div className="flex justify-between font-semibold">
                            <span className="text-foreground">Total Exposure</span>
                            <span className="text-critical">{alertData.impactData.financial.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Operational Impact</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">OTIF Performance</span>
                            <span className="text-warning font-medium">{alertData.impactData.operational.otif}</span>
                          </div>
                          <Progress value={87} className="h-2" />
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Stockout Risk: </span>
                          <span className="text-critical font-medium">{alertData.impactData.operational.stockout}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Timeline */}
            <Card className="bg-gradient-card border-border shadow-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Event Timeline</h3>
                <div className="space-y-4">
                  {alertData.rootCause.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0" />
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-foreground">{event.time}</div>
                        <div className="text-sm text-muted-foreground">{event.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Affected Customers */}
            <Card className="bg-gradient-card border-border shadow-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Customer Impact Assessment</h3>
                <div className="space-y-3">
                  {alertData.impactData.customers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.impact}</div>
                      </div>
                      <Badge variant={customer.severity === "critical" ? "destructive" : "secondary"}>
                        {customer.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Recommended Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <div className="space-y-4">
              {alertData.recommendations.map((action) => (
                <Card key={action.id} className="bg-gradient-card border-border shadow-card hover:shadow-command transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">{action.action}</h3>
                        <p className="text-muted-foreground">{action.description}</p>
                      </div>
                      <Badge variant="outline" className={cn(
                        "ml-4",
                        action.confidence >= 80 && "border-success text-success",
                        action.confidence >= 60 && action.confidence < 80 && "border-warning text-warning",
                        action.confidence < 60 && "border-critical text-critical"
                      )}>
                        {action.confidence}% confidence
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Impact</div>
                        <div className="text-sm font-medium text-foreground">{action.impact}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Cost</div>
                        <div className="text-sm font-medium text-warning">{action.cost}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Owner</div>
                        <div className="text-sm font-medium text-foreground flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {action.owner}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Timeline</div>
                        <div className="text-sm font-medium text-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {action.timeline}
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => triggerWorkflow(action.id)}
                    >
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Execute Action Plan
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trigger Workflow Tab */}
          <TabsContent value="workflow" className="space-y-6">
            {activeWorkflow ? (
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-success" />
                    <h3 className="text-lg font-semibold text-foreground">Workflow Initiated</h3>
                  </div>
                  
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
                    <p className="text-foreground">
                      Action plan "{alertData.recommendations.find(r => r.id === activeWorkflow)?.action}" has been triggered.
                      Teams notifications sent and case created in Castrol Workflow Management System.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-secondary/20 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-1">Case ID</div>
                        <div className="font-mono text-foreground">SC-{Date.now().toString().slice(-6)}</div>
                      </div>
                      <div className="bg-secondary/20 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-1">SLA Timer</div>
                        <div className="font-medium text-warning">23h 45m remaining</div>
                      </div>
                      <div className="bg-secondary/20 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-1">Status</div>
                        <div className="font-medium text-primary">In Progress</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">RACI Matrix</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div className="bg-primary/20 text-primary rounded px-2 py-1">R: Procurement Lead</div>
                        <div className="bg-warning/20 text-warning rounded px-2 py-1">A: Supply Director</div>
                        <div className="bg-muted text-muted-foreground rounded px-2 py-1">C: Legal, Finance</div>
                        <div className="bg-secondary text-secondary-foreground rounded px-2 py-1">I: Sales, Ops</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6 text-center">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Active Workflow</h3>
                  <p className="text-muted-foreground">
                    Select an action from the "Recommended Actions" tab to trigger a workflow.
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Track Impact Tab */}
          <TabsContent value="track" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Real-time KPI Impact</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">OTIF Recovery</span>
                        <span className="text-foreground">87% → 92% (target)</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">Progress: 78% complete</div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Financial Recovery</span>
                        <span className="text-foreground">€2.1M of €8.3M recovered</span>
                      </div>
                      <Progress value={25} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">Actions initiated, impact pending</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Action Effectiveness</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                      <span className="text-sm text-foreground">Customer Communication</span>
                      <Badge variant="outline" className="border-success text-success">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <span className="text-sm text-foreground">Emergency Procurement</span>
                      <Badge variant="outline" className="border-warning text-warning">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm text-foreground">Stock Transfer</span>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="bg-gradient-card border-border shadow-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Lessons Learned & Playbook Update</h3>
                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">Key Insights</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Hamburg port dependency requires diversification strategy</li>
                      <li>• Summer demand models need +15% buffer for festival seasons</li>
                      <li>• Pre-qualified alternate suppliers reduced response time by 40%</li>
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Target className="h-4 w-4 mr-2" />
                    Update Supply Chain Playbook
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}