import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Filter,
  Globe,
  Factory,
  Package,
  Truck,
  AlertCircle,
  Activity,
} from "lucide-react";

import logo from "../../assets/Castrol.png"

export function CommandHeader() {
  return (
    <div className="bg-gradient-card border-b border-border">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src={logo}
                  alt="Castrol Logo"
                  className="h-12 w-13 object-contain"
                />
                {/* <Activity className="h-6 w-6 text-primary" /> */}
                <h1 className="text-2xl font-bold text-foreground">
                  Supply Chain Command Center
                </h1>
              </div>
              <Badge
                variant="secondary"
                className="bg-success/20 text-success border-success/30"
              >
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                LIVE
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Real-time visibility and control across the Castrol supply chain
              network
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="border-critical/30 text-critical"
            >
              <AlertCircle className="h-3 w-3 mr-1" />5 Critical Alerts
            </Badge>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 7 Days
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3 text-sm">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Filters:</span>
          </div>

          <Button variant="ghost" size="sm" className="h-8 px-3">
            <Globe className="h-3 w-3 mr-2" />
            All Regions
          </Button>

          <Button variant="ghost" size="sm" className="h-8 px-3">
            <Factory className="h-3 w-3 mr-2" />
            All Plants
          </Button>

          <Button variant="ghost" size="sm" className="h-8 px-3">
            <Package className="h-3 w-3 mr-2" />
            All SKUs
          </Button>

          <Button variant="ghost" size="sm" className="h-8 px-3">
            <Truck className="h-3 w-3 mr-2" />
            All Suppliers
          </Button>
        </div>
      </div>
    </div>
  );
}
