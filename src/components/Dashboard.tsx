import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  TrendingUp, 
  Zap, 
  Heart, 
  ShoppingBag, 
  Calendar,
  Sparkles,
  Brain
} from 'lucide-react';
import { AIRecommendations } from '@/components/AIRecommendations';
import { WardrobeItemCard } from '@/components/WardrobeItemCard';
import { StatsCard } from '@/components/StatsCard';

interface DashboardProps {
  searchQuery: string;
}

// Mock data for demonstration
const recentItems = [
  { 
    id: '1', 
    name: 'Smart Blazer Pro', 
    category: 'Formal', 
    lastWorn: '2 days ago',
    image: '/api/placeholder/200/300',
    color: 'Navy Blue',
    aiTags: ['Professional', 'Climate-Smart']
  },
  { 
    id: '2', 
    name: 'Neural Fabric T-Shirt', 
    category: 'Casual', 
    lastWorn: '1 week ago',
    image: '/api/placeholder/200/300',
    color: 'Charcoal',
    aiTags: ['Moisture-Wicking', 'Self-Cleaning']
  },
  { 
    id: '3', 
    name: 'Adaptive Joggers', 
    category: 'Activewear', 
    lastWorn: '3 days ago',
    image: '/api/placeholder/200/300',
    color: 'Space Gray',
    aiTags: ['Temperature-Regulating', 'Stretch-Tech']
  },
  { 
    id: '4', 
    name: 'Holographic Sneakers', 
    category: 'Footwear', 
    lastWorn: '5 days ago',
    image: '/api/placeholder/200/300',
    color: 'Prismatic',
    aiTags: ['Color-Changing', 'Anti-Gravity Sole']
  }
];

const stats = [
  { 
    label: 'Items Worn This Month', 
    value: '47', 
    icon: Clock, 
    trend: '+12%',
    color: 'text-primary' 
  },
  { 
    label: 'Wardrobe Efficiency', 
    value: '89%', 
    icon: TrendingUp, 
    trend: '+5%',
    color: 'text-success' 
  },
  { 
    label: 'AI Recommendations', 
    value: '23', 
    icon: Zap, 
    trend: 'New',
    color: 'text-accent' 
  },
  { 
    label: 'Favorite Outfits', 
    value: '14', 
    icon: Heart, 
    trend: '+3',
    color: 'text-destructive' 
  }
];

export const Dashboard: React.FC<DashboardProps> = ({ searchQuery }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="futuristic-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, Alex!</h2>
            <p className="text-muted-foreground">
              Your AI wardrobe assistant has curated today's recommendations
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-primary neural-animation" />
            <div className="text-right">
              <div className="text-sm font-medium text-primary">AI Status</div>
              <div className="text-xs text-success">Learning Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Recently Worn Items */}
        <div className="col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Recently Worn</span>
            </h3>
            <Link 
              to="/category/last-used" 
              className="text-sm text-primary hover:text-accent transition-colors"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {recentItems.map((item) => (
              <WardrobeItemCard key={item.id} item={item} />
            ))}
          </div>

          {/* Quick Access Categories */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Access</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Last Purchased', icon: ShoppingBag, path: '/category/last-purchased', color: 'text-accent' },
                { name: 'This Month', icon: Calendar, path: '/category/last-month', color: 'text-neural-secondary' },
                { name: 'Favorites', icon: Heart, path: '/category/favorites', color: 'text-destructive' }
              ].map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="futuristic-card flex items-center space-x-3 hover:scale-105 transition-transform"
                >
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                  <span className="font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations Sidebar */}
        <div className="col-span-1">
          <AIRecommendations />
        </div>
      </div>

      {/* Seasonal Collections Preview */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <span>Seasonal Collections 2035</span>
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <Link 
            to="/category/summer-2035"
            className="futuristic-card relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warning/20 to-accent/20 opacity-50"></div>
            <div className="relative z-10">
              <h4 className="text-lg font-semibold mb-2">Summer 2035</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Climate-adaptive fabrics and UV-responsive materials
              </p>
              <div className="flex items-center space-x-2 text-warning">
                <span className="text-xs">View Collection</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          <Link 
            to="/category/winter-2035"
            className="futuristic-card relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-neural-secondary/20 opacity-50"></div>
            <div className="relative z-10">
              <h4 className="text-lg font-semibold mb-2">Winter 2035</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Self-heating textiles and storm-resistant smart materials
              </p>
              <div className="flex items-center space-x-2 text-primary">
                <span className="text-xs">View Collection</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};