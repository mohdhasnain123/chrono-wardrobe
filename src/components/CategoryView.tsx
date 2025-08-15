import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List, Search } from 'lucide-react';
import { WardrobeItemCard } from '@/components/WardrobeItemCard';
import { Button } from '@/components/ui/button';

// Mock data for all category items
const mockCategoryItems = {
  'last-used': [
    { id: '1', name: 'Smart Blazer Pro', category: 'Formal', lastWorn: '2 days ago', image: '', color: 'Navy Blue', aiTags: ['Professional', 'Climate-Smart'] },
    { id: '2', name: 'Neural Fabric T-Shirt', category: 'Casual', lastWorn: '1 week ago', image: '', color: 'Charcoal', aiTags: ['Moisture-Wicking', 'Self-Cleaning'] },
    { id: '3', name: 'Adaptive Joggers', category: 'Activewear', lastWorn: '3 days ago', image: '', color: 'Space Gray', aiTags: ['Temperature-Regulating', 'Stretch-Tech'] },
    { id: '4', name: 'Holographic Sneakers', category: 'Footwear', lastWorn: '5 days ago', image: '', color: 'Prismatic', aiTags: ['Color-Changing', 'Anti-Gravity Sole'] },
  ],
  'last-month': [
    { id: '11', name: 'Quantum Suit', category: 'Formal', lastWorn: '2 weeks ago', image: '', color: 'Midnight Black', aiTags: ['Wrinkle-Free', 'Auto-Fit'] },
    { id: '12', name: 'Bio-Leather Jacket', category: 'Outerwear', lastWorn: '3 weeks ago', image: '', color: 'Cognac', aiTags: ['Self-Healing', 'Weather-Adaptive'] },
    { id: '13', name: 'Memory Foam Dress', category: 'Formal', lastWorn: '1 week ago', image: '', color: 'Deep Purple', aiTags: ['Shape-Memory', 'Stain-Resistant'] },
    { id: '14', name: 'Smart Denim', category: 'Casual', lastWorn: '4 days ago', image: '', color: 'Indigo', aiTags: ['Stretch-Tech', 'Moisture-Control'] },
  ],
  'last-purchased': [
    { id: '21', name: 'Nano-Fiber Coat', category: 'Outerwear', lastWorn: 'Never', image: '', color: 'Arctic White', aiTags: ['Insulation-Tech', 'Self-Cleaning'] },
    { id: '22', name: 'Holographic Tie', category: 'Accessories', lastWorn: 'Never', image: '', color: 'Rainbow', aiTags: ['Color-Shift', 'Professional'] },
    { id: '23', name: 'Smart Watch Pro', category: 'Accessories', lastWorn: 'Never', image: '', color: 'Titanium', aiTags: ['Health-Monitor', 'AI-Assistant'] },
    { id: '24', name: 'Carbon Fiber Belt', category: 'Accessories', lastWorn: 'Never', image: '', color: 'Matte Black', aiTags: ['Ultra-Light', 'Adjustable'] },
  ],
  'summer-2035': [
    { id: '31', name: 'UV-Reactive Tank Top', category: 'Casual', lastWorn: '1 day ago', image: '', color: 'Solar Yellow', aiTags: ['UV-Protection', 'Color-Change'] },
    { id: '32', name: 'Cooling Shorts', category: 'Activewear', lastWorn: '3 days ago', image: '', color: 'Ice Blue', aiTags: ['Temperature-Control', 'Quick-Dry'] },
    { id: '33', name: 'Breathable Dress', category: 'Formal', lastWorn: '1 week ago', image: '', color: 'Coral Pink', aiTags: ['Air-Flow', 'Wrinkle-Free'] },
    { id: '34', name: 'Solar Sandals', category: 'Footwear', lastWorn: '2 days ago', image: '', color: 'Golden', aiTags: ['Energy-Harvest', 'Cooling-Sole'] },
    { id: '35', name: 'Climate Vest', category: 'Outerwear', lastWorn: '5 days ago', image: '', color: 'Sky Blue', aiTags: ['Personal-AC', 'Lightweight'] },
    { id: '36', name: 'Smart Sunglasses', category: 'Accessories', lastWorn: '1 day ago', image: '', color: 'Mirror Silver', aiTags: ['Auto-Tint', 'AR-Display'] },
  ],
  'winter-2035': [
    { id: '41', name: 'Thermal Parka', category: 'Outerwear', lastWorn: 'Not in season', image: '', color: 'Arctic Navy', aiTags: ['Self-Heating', 'Storm-Proof'] },
    { id: '42', name: 'Smart Wool Sweater', category: 'Casual', lastWorn: 'Not in season', image: '', color: 'Charcoal Gray', aiTags: ['Temperature-Adapt', 'Odor-Resist'] },
    { id: '43', name: 'Heated Gloves', category: 'Accessories', lastWorn: 'Not in season', image: '', color: 'Midnight Black', aiTags: ['Wireless-Heat', 'Touch-Compatible'] },
    { id: '44', name: 'Insulated Boots', category: 'Footwear', lastWorn: 'Not in season', image: '', color: 'Titanium', aiTags: ['Anti-Slip', 'Heat-Core'] },
  ],
  'formal': [
    { id: '1', name: 'Smart Blazer Pro', category: 'Formal', lastWorn: '2 days ago', image: '', color: 'Navy Blue', aiTags: ['Professional', 'Climate-Smart'] },
    { id: '11', name: 'Quantum Suit', category: 'Formal', lastWorn: '2 weeks ago', image: '', color: 'Midnight Black', aiTags: ['Wrinkle-Free', 'Auto-Fit'] },
    { id: '13', name: 'Memory Foam Dress', category: 'Formal', lastWorn: '1 week ago', image: '', color: 'Deep Purple', aiTags: ['Shape-Memory', 'Stain-Resistant'] },
    { id: '33', name: 'Breathable Dress', category: 'Formal', lastWorn: '1 week ago', image: '', color: 'Coral Pink', aiTags: ['Air-Flow', 'Wrinkle-Free'] },
    { id: '51', name: 'Digital Tie', category: 'Accessories', lastWorn: '1 week ago', image: '', color: 'Electric Blue', aiTags: ['LED-Pattern', 'Professional'] },
  ],
  'casual': [
    { id: '2', name: 'Neural Fabric T-Shirt', category: 'Casual', lastWorn: '1 week ago', image: '', color: 'Charcoal', aiTags: ['Moisture-Wicking', 'Self-Cleaning'] },
    { id: '14', name: 'Smart Denim', category: 'Casual', lastWorn: '4 days ago', image: '', color: 'Indigo', aiTags: ['Stretch-Tech', 'Moisture-Control'] },
    { id: '31', name: 'UV-Reactive Tank Top', category: 'Casual', lastWorn: '1 day ago', image: '', color: 'Solar Yellow', aiTags: ['UV-Protection', 'Color-Change'] },
    { id: '42', name: 'Smart Wool Sweater', category: 'Casual', lastWorn: 'Not in season', image: '', color: 'Charcoal Gray', aiTags: ['Temperature-Adapt', 'Odor-Resist'] },
  ],
  'accessories': [
    { id: '22', name: 'Holographic Tie', category: 'Accessories', lastWorn: 'Never', image: '', color: 'Rainbow', aiTags: ['Color-Shift', 'Professional'] },
    { id: '23', name: 'Smart Watch Pro', category: 'Accessories', lastWorn: 'Never', image: '', color: 'Titanium', aiTags: ['Health-Monitor', 'AI-Assistant'] },
    { id: '24', name: 'Carbon Fiber Belt', category: 'Accessories', lastWorn: 'Never', image: '', color: 'Matte Black', aiTags: ['Ultra-Light', 'Adjustable'] },
    { id: '36', name: 'Smart Sunglasses', category: 'Accessories', lastWorn: '1 day ago', image: '', color: 'Mirror Silver', aiTags: ['Auto-Tint', 'AR-Display'] },
    { id: '43', name: 'Heated Gloves', category: 'Accessories', lastWorn: 'Not in season', image: '', color: 'Midnight Black', aiTags: ['Wireless-Heat', 'Touch-Compatible'] },
    { id: '51', name: 'Digital Tie', category: 'Accessories', lastWorn: '1 week ago', image: '', color: 'Electric Blue', aiTags: ['LED-Pattern', 'Professional'] },
  ],
  'favorites': [
    { id: '5', name: 'Quantum Leather Jacket', category: 'Outerwear', lastWorn: '1 week ago', image: '', color: 'Midnight Black', aiTags: ['Self-Repair', 'Weather-Adaptive'] },
    { id: '6', name: 'Holographic Dress', category: 'Formal', lastWorn: '2 weeks ago', image: '', color: 'Iridescent', aiTags: ['Color-Morphing', 'Wrinkle-Free'] },
    { id: '1', name: 'Smart Blazer Pro', category: 'Formal', lastWorn: '2 days ago', image: '', color: 'Navy Blue', aiTags: ['Professional', 'Climate-Smart'] },
    { id: '4', name: 'Holographic Sneakers', category: 'Footwear', lastWorn: '5 days ago', image: '', color: 'Prismatic', aiTags: ['Color-Changing', 'Anti-Gravity Sole'] },
  ],
  'archived': [
    { id: '61', name: 'Vintage Smart Shirt', category: 'Casual', lastWorn: '3 months ago', image: '', color: 'Faded Blue', aiTags: ['Retro-Tech', 'Classic-Fit'] },
    { id: '62', name: 'Old Denim Jacket', category: 'Outerwear', lastWorn: '6 months ago', image: '', color: 'Worn Indigo', aiTags: ['Vintage', 'Comfort-Fit'] },
  ]
};

const categoryTitles = {
  'last-used': 'Last Used Items',
  'last-month': 'Last Month\'s Favorites',
  'last-purchased': 'Recently Purchased',
  'summer-2035': 'Summer 2035 Collection',
  'winter-2035': 'Winter 2035 Collection',
  'formal': 'Formal Wear',
  'casual': 'Casual Wear',
  'accessories': 'Accessories',
  'favorites': 'Your Favorites',
  'archived': 'Archived Items'
};

export const CategoryView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const items = mockCategoryItems[categoryId as keyof typeof mockCategoryItems] || [];
  const title = categoryTitles[categoryId as keyof typeof categoryTitles] || 'Category';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{items.length} items</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="glass-effect">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <div className="flex items-center space-x-1 glass-effect rounded-lg p-1">
            <Button variant="ghost" size="sm" className="p-2">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search items in this category..."
            className="w-full pl-10 pr-4 py-2 glass-effect rounded-lg border border-border focus:border-primary outline-none"
          />
        </div>
        <select className="glass-effect border border-border rounded-lg px-4 py-2 outline-none focus:border-primary">
          <option>Sort by Last Worn</option>
          <option>Sort by Name</option>
          <option>Sort by Color</option>
          <option>Sort by AI Rating</option>
        </select>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-4 gap-6">
        {items.map((item) => (
          <WardrobeItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No items found</h3>
          <p className="text-muted-foreground">
            This category is empty or doesn't exist yet.
          </p>
        </div>
      )}
    </div>
  );
};