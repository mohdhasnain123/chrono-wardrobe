import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Calendar, Tag, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ItemDetailView: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();

  // Mock item data
  const item = {
    id: itemId,
    name: 'Smart Blazer Pro',
    brand: 'NeoFashion',
    category: 'Formal Wear',
    color: 'Navy Blue',
    size: 'M',
    material: 'Climate-Smart Fabric',
    purchaseDate: '2035-03-15',
    lastWorn: '2 days ago',
    timesWorn: 12,
    aiTags: ['Professional', 'Climate-Smart', 'Wrinkle-Resistant', 'Moisture-Wicking'],
    price: '$299',
    sustainability: 'A+',
    care: 'Self-Cleaning, Occasional AI Refresh',
    description: 'Revolutionary smart blazer with integrated climate control and professional styling. Features adaptive temperature regulation and automatic wrinkle resistance.'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{item.name}</h1>
            <p className="text-muted-foreground">{item.brand} • {item.category}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="glass-effect">
            <Heart className="w-4 h-4 mr-2" />
            Favorite
          </Button>
          <Button variant="outline" size="sm" className="glass-effect">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Item Visual */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded-2xl relative overflow-hidden glass-effect">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">👔</span>
                </div>
                <p className="text-sm">3D Model View</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <div className="w-4 h-4 rounded-full bg-success animate-pulse" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="ai-button">
              <Zap className="w-4 h-4 mr-2" />
              Quick Wear
            </Button>
            <Button variant="outline" className="glass-effect">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="futuristic-card">
            <h3 className="font-semibold mb-4">Item Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Color:</span>
                <span className="ml-2 font-medium">{item.color}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Size:</span>
                <span className="ml-2 font-medium">{item.size}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Material:</span>
                <span className="ml-2 font-medium">{item.material}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Sustainability:</span>
                <span className="ml-2 font-medium text-success">{item.sustainability}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Purchase Date:</span>
                <span className="ml-2 font-medium">{item.purchaseDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Times Worn:</span>
                <span className="ml-2 font-medium">{item.timesWorn}</span>
              </div>
            </div>
          </div>

          {/* AI Tags */}
          <div className="futuristic-card">
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Brain className="w-4 h-4 text-primary" />
              <span>AI Features</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.aiTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Care Instructions */}
          <div className="futuristic-card">
            <h3 className="font-semibold mb-3">Care Instructions</h3>
            <p className="text-sm text-muted-foreground">{item.care}</p>
          </div>

          {/* AI Recommendations */}
          <div className="ai-recommendation">
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Brain className="w-4 h-4 text-primary neural-animation" />
              <span>AI Styling Suggestions</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent"></div>
                  <span className="text-sm">Pair with Adaptive Chinos</span>
                </div>
                <span className="text-xs text-success">95% match</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-accent to-warning"></div>
                  <span className="text-sm">Add Neural Fabric Tie</span>
                </div>
                <span className="text-xs text-success">89% match</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};