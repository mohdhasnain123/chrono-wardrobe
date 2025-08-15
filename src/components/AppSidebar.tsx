import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Clock,
  Calendar,
  ShoppingBag,
  Sun,
  Snowflake,
  Shirt,
  Coffee,
  Watch,
  Heart,
  Archive,
  Zap,
  TrendingUp,
  Settings
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const mainCategories = [
  { id: 'last-used', title: 'Last Used', icon: Clock, path: '/category/last-used', color: 'text-primary' },
  { id: 'last-month', title: 'Last Month', icon: Calendar, path: '/category/last-month', color: 'text-neural-secondary' },
  { id: 'last-purchased', title: 'Last Purchased', icon: ShoppingBag, path: '/category/last-purchased', color: 'text-accent' },
];

const seasonalCollections = [
  { id: 'summer-2035', title: 'Summer 2035', icon: Sun, path: '/category/summer-2035', color: 'text-warning' },
  { id: 'winter-2035', title: 'Winter 2035', icon: Snowflake, path: '/category/winter-2035', color: 'text-primary' },
];

const wardrobeCategories = [
  { id: 'formal', title: 'Formal Wear', icon: Shirt, path: '/category/formal', color: 'text-neural-secondary' },
  { id: 'casual', title: 'Casual Wear', icon: Coffee, path: '/category/casual', color: 'text-success' },
  { id: 'accessories', title: 'Accessories', icon: Watch, path: '/category/accessories', color: 'text-accent' },
];

const personalCategories = [
  { id: 'favorites', title: 'Favorites', icon: Heart, path: '/category/favorites', color: 'text-destructive' },
  { id: 'archived', title: 'Archived', icon: Archive, path: '/category/archived', color: 'text-muted-foreground' },
];

const aiFeatures = [
  { id: 'smart-recommendations', title: 'Smart Picks', icon: Zap, path: '/ai/recommendations', color: 'text-primary' },
  { id: 'trend-analysis', title: 'Trend Analysis', icon: TrendingUp, path: '/ai/trends', color: 'text-neural-accent' },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  const renderNavGroup = (items: any[], groupLabel: string) => (
    <SidebarGroup key={groupLabel}>
      <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider">
        {!collapsed && groupLabel}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.path}
                  className={`category-nav-item flex items-center space-x-3 ${
                    isActive(item.path) ? 'bg-primary/20 neon-glow' : ''
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.title}</span>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar
      className="transition-all duration-300 glass-effect border-r border-border"
      collapsible="icon"
    >
      <SidebarContent className="p-4 space-y-6">
        {renderNavGroup(mainCategories, 'Recent Activity')}
        {renderNavGroup(seasonalCollections, 'Seasonal')}
        {renderNavGroup(wardrobeCategories, 'Categories')}
        {renderNavGroup(personalCategories, 'Personal')}
        {renderNavGroup(aiFeatures, 'AI Features')}
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/settings"
                    className="category-nav-item flex items-center space-x-3"
                  >
                    <Settings className="w-5 h-5 text-muted-foreground" />
                    {!collapsed && (
                      <span className="text-sm font-medium">Settings</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}