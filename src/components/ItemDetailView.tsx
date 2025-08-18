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
    wearCount: 12,
    aiTags: ['Professional', 'Versatile', 'Climate-Smart'],
    image: smartBlazer,
    description: 'A revolutionary blazer with integrated temperature regulation and smart fabric technology.',
    stylingTips: [
      'Perfect for important meetings and formal events',
      'Pairs excellently with smart trousers',
      'The climate-smart fabric adapts to ambient temperature'
    ],
    careInstructions: 'Machine wash cold, hang dry. Smart fabric maintains its properties.',
    sustainabilityScore: 95,
    price: '$299'
  },
  '2': {
    id: '2',
    name: 'Neural T-Shirt',
    brand: 'TechWear',
    category: 'Casual',
    color: 'Charcoal',
    size: 'L',
    material: 'Bio-Responsive Cotton',
    purchaseDate: '2035-02-20',
    lastWorn: '1 day ago',
    wearCount: 8,
    aiTags: ['Comfortable', 'Tech-Enhanced', 'Casual'],
    image: neuralTshirt,
    description: 'A cutting-edge t-shirt with neural pattern design and bio-responsive fabric.',
    stylingTips: [
      'Great for casual outings and creative work',
      'Layering piece for smart-casual looks',
      'Bio-responsive fabric adjusts to your body temperature'
    ],
    careInstructions: 'Gentle machine wash, air dry to preserve neural patterns.',
    sustainabilityScore: 88,
    price: '$89'
  },
  '3': {
    id: '3',
    name: 'Holographic Sneakers',
    brand: 'FutureStep',
    category: 'Footwear',
    color: 'Holographic',
    size: '10',
    material: 'Quantum Mesh',
    purchaseDate: '2035-01-10',
    lastWorn: '3 days ago',
    wearCount: 15,
    aiTags: ['Futuristic', 'Comfortable', 'Statement'],
    image: holographicSneakers,
    description: 'Next-generation sneakers with holographic finish and quantum mesh technology.',
    stylingTips: [
      'Perfect statement piece for tech-forward outfits',
      'Ideal for casual and street style looks',
      'Holographic finish changes color with light'
    ],
    careInstructions: 'Wipe clean with damp cloth. Avoid direct sunlight for extended periods.',
    sustainabilityScore: 92,
    price: '$199'
  },
  '4': {
    id: '4',
    name: 'Cyber Jacket',
    brand: 'QuantumStyle',
    category: 'Outerwear',
    color: 'Electric Blue',
    size: 'M',
    material: 'Nano-Fiber',
    purchaseDate: '2035-04-05',
    lastWorn: '1 week ago',
    wearCount: 5,
    aiTags: ['Weather-Resistant', 'Stylish', 'High-Tech'],
    image: null,
    description: 'Advanced jacket with integrated weather protection and style-forward design.',
    stylingTips: [
      'Perfect for outdoor activities and urban exploration',
      'Great layering piece for transitional weather',
      'Nano-fiber technology provides superior protection'
    ],
    careInstructions: 'Professional cleaning recommended to maintain nano-fiber properties.',
    sustainabilityScore: 90,
    price: '$399'
  },
  '5': {
    id: '5',
    name: 'Adaptive Pants',
    brand: 'FlexWear',
    category: 'Bottoms',
    color: 'Graphite',
    size: 'L',
    material: 'Memory Fabric',
    purchaseDate: '2035-03-01',
    lastWorn: '4 days ago',
    wearCount: 10,
    aiTags: ['Comfortable', 'Adaptive', 'Professional'],
    image: null,
    description: 'Revolutionary pants with memory fabric that adapts to your body and movement.',
    stylingTips: [
      'Versatile for both professional and casual settings',
      'Memory fabric provides comfort throughout the day',
      'Perfect for travel and long work days'
    ],
    careInstructions: 'Machine wash warm, tumble dry low to maintain fabric memory.',
    sustainabilityScore: 87,
    price: '$159'
  }
};

export const ItemDetailView: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  
  const item = itemId ? mockItemDetails[itemId] : null;

  const getColorHex = (colorName: string): string => {
    const colorMap: { [key: string]: string } = {
      'navy blue': '#1E40AF',
      'charcoal': '#374151',
      'holographic': '#8B5CF6',
      'electric blue': '#3B82F6',
      'graphite': '#4B5563',
      'blue': '#3B82F6',
      'navy': '#1E40AF',
      'black': '#1F2937',
      'white': '#F9FAFB',
      'grey': '#6B7280',
      'gray': '#6B7280',
      'red': '#EF4444',
      'green': '#10B981',
      'purple': '#8B5CF6',
      'yellow': '#F59E0B',
      'orange': '#F97316',
      'pink': '#EC4899',
    };
    return colorMap[colorName?.toLowerCase()] || '#8B5CF6';
  };

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
          <p className="text-muted-foreground mb-6">The item you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Wardrobe
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="default" size="sm">
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
              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">👕</div>
                  <p className="text-lg font-medium">No image available</p>
                  <p className="text-sm opacity-70">{item.name}</p>
                </div>
              </div>
            )}
            
            <div className="absolute top-4 right-4 z-10">
              <div className="w-4 h-4 rounded-full bg-success animate-pulse" />
            </div>
            <div className="absolute bottom-4 left-4 z-10">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-accent" />
                <span className="text-sm text-white font-medium backdrop-blur-sm bg-black/20 px-2 py-1 rounded">AI Score: {item.sustainabilityScore}/100</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              Quick Wear
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Zap className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{item.brand}</p>
            <p className="text-muted-foreground">{item.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <p className="text-muted-foreground">{item.category}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Color</h3>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: getColorHex(item.color) }}
                  />
                  <span className="text-muted-foreground">{item.color}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Size</h3>
                <p className="text-muted-foreground">{item.size}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Material</h3>
                <p className="text-muted-foreground">{item.material}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Last Worn</h3>
                <p className="text-muted-foreground">{item.lastWorn}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Times Worn</h3>
                <p className="text-muted-foreground">{item.wearCount}</p>
              </div>
            </div>
          </div>

          {/* AI Tags */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              AI Analysis
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.aiTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm"
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Styling Tips */}
          <div>
            <h3 className="font-semibold mb-3">Styling Tips</h3>
            <ul className="space-y-2">
              {item.stylingTips.map((tip, index) => (
                <li key={index} className="text-muted-foreground flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Care Instructions */}
          <div>
            <h3 className="font-semibold mb-2">Care Instructions</h3>
            <p className="text-muted-foreground">{item.careInstructions}</p>
          </div>

          {/* Price */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Original Price</span>
              <span className="text-2xl font-bold text-primary">{item.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};