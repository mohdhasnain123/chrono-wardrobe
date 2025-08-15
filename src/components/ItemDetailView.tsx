import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Calendar, Tag, Zap, Brain, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import smartBlazer from '@/assets/smart-blazer.jpg';
import neuralTshirt from '@/assets/neural-tshirt.jpg';
import holographicSneakers from '@/assets/holographic-sneakers.jpg';

// Mock detailed item data
const mockItemDetails = {
  '1': {
    id: '1',
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
    description: 'Revolutionary smart blazer with integrated climate control and professional styling. Features adaptive temperature regulation and automatic wrinkle resistance.',
    image: smartBlazer
  },
  '2': {
    id: '2',
    name: 'Neural Fabric T-Shirt',
    brand: 'TechWear Labs',
    category: 'Casual Wear',
    color: 'Charcoal',
    size: 'L',
    material: 'Neural Nano-Fiber',
    purchaseDate: '2035-04-20',
    lastWorn: '1 week ago',
    timesWorn: 8,
    aiTags: ['Moisture-Wicking', 'Self-Cleaning', 'Adaptive-Fit', 'Odor-Resistant'],
    price: '$149',
    sustainability: 'A',
    care: 'Self-Maintaining, No Washing Required',
    description: 'Advanced neural fabric technology that adapts to your body temperature and maintains optimal comfort throughout the day.',
    image: neuralTshirt
  },
  '4': {
    id: '4',
    name: 'Holographic Sneakers',
    brand: 'Quantum Footwear',
    category: 'Footwear',
    color: 'Prismatic',
    size: '10',
    material: 'Holographic Polymer',
    purchaseDate: '2035-02-10',
    lastWorn: '5 days ago',
    timesWorn: 15,
    aiTags: ['Color-Changing', 'Anti-Gravity Sole', 'Energy-Return', 'Personalized-Fit'],
    price: '$399',
    sustainability: 'B+',
    care: 'Auto-Clean Surface, Solar Charging',
    description: 'Revolutionary footwear with color-changing holographic surface and anti-gravity sole technology for ultimate comfort and style.',
    image: holographicSneakers
  },
  '31': {
    id: '31',
    name: 'UV-Reactive Tank Top',
    brand: 'SolarWear',
    category: 'Summer Wear',
    color: 'Solar Yellow',
    size: 'M',
    material: 'UV-Responsive Fiber',
    purchaseDate: '2035-05-01',
    lastWorn: '1 day ago',
    timesWorn: 6,
    aiTags: ['UV-Protection', 'Color-Change', 'Cooling-Effect', 'Energy-Harvest'],
    price: '$89',
    sustainability: 'A+',
    care: 'Solar-Powered Self-Clean',
    description: 'Innovative tank top that changes color based on UV exposure while providing maximum sun protection and cooling comfort.',
    image: null
  },
  '32': {
    id: '32',
    name: 'Cooling Shorts',
    brand: 'ChillTech',
    category: 'Activewear',
    color: 'Ice Blue',
    size: 'L',
    material: 'Thermo-Regulation Mesh',
    purchaseDate: '2035-05-15',
    lastWorn: '3 days ago',
    timesWorn: 4,
    aiTags: ['Temperature-Control', 'Quick-Dry', 'Stretch-Fit', 'Moisture-Wicking'],
    price: '$119',
    sustainability: 'A',
    care: 'Quick-Dry Technology, Minimal Care',
    description: 'Advanced cooling shorts with built-in temperature regulation system for optimal comfort during hot weather and physical activities.',
    image: null
  }
};

export const ItemDetailView: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();

  // Get item details or use default
  const item = mockItemDetails[itemId as keyof typeof mockItemDetails] || {
    id: itemId || 'unknown',
    name: 'Futuristic Garment',
    brand: 'AI Fashion',
    category: 'Unknown',
    color: 'Digital',
    size: 'Auto-Fit',
    material: 'Smart Fabric',
    purchaseDate: '2035-01-01',
    lastWorn: 'Recently',
    timesWorn: 0,
    aiTags: ['Smart-Tech', 'Futuristic'],
    price: '$199',
    sustainability: 'A+',
    care: 'AI-Maintained',
    description: 'A futuristic garment with advanced smart technology and AI-powered features.',
    image: null
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
          <Button variant="outline" size="sm" className="glass-effect">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Buy Similar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Item Visual */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded-2xl relative overflow-hidden glass-effect">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">👔</span>
                  </div>
                  <p className="text-sm">3D Model View</p>
                </div>
              </div>
            )}
            <div className="absolute top-4 right-4 z-10">
              <div className="w-4 h-4 rounded-full bg-success animate-pulse" />
            </div>
            <div className="absolute bottom-4 left-4 z-10">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-warning text-sm font-medium">4.9</span>
              </div>
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

          {/* AI Usage Analytics */}
          <div className="futuristic-card">
            <h4 className="font-semibold mb-3">Usage Analytics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="text-sm font-medium">{Math.floor(item.timesWorn / 3)} times</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Wears</span>
                <span className="text-sm font-medium">{item.timesWorn} times</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Cost per Wear</span>
                <span className="text-sm font-medium text-success">${(parseInt(item.price.replace('$', '')) / Math.max(item.timesWorn, 1)).toFixed(2)}</span>
              </div>
            </div>
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
                <span className="text-muted-foreground">Price:</span>
                <span className="ml-2 font-medium text-accent">{item.price}</span>
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

          {/* Description */}
          <div className="futuristic-card">
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-neural-secondary to-primary"></div>
                  <span className="text-sm">Complete with Smart Loafers</span>
                </div>
                <span className="text-xs text-success">92% match</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};