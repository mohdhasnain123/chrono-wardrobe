import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List, Search } from 'lucide-react';
import { WardrobeItemCard } from '@/components/WardrobeItemCard';
import { Button } from '@/components/ui/button';

// Mock data for category items
const mockCategoryItems = {
  'last-used': [
    { id: '1', name: 'Smart Blazer Pro', category: 'Formal', lastWorn: '2 days ago', image: '', color: 'Navy Blue', aiTags: ['Professional', 'Climate-Smart'] },
    { id: '2', name: 'Neural Fabric T-Shirt', category: 'Casual', lastWorn: '1 week ago', image: '', color: 'Charcoal', aiTags: ['Moisture-Wicking', 'Self-Cleaning'] },
    { id: '3', name: 'Adaptive Joggers', category: 'Activewear', lastWorn: '3 days ago', image: '', color: 'Space Gray', aiTags: ['Temperature-Regulating', 'Stretch-Tech'] },
    { id: '4', name: 'Holographic Sneakers', category: 'Footwear', lastWorn: '5 days ago', image: '', color: 'Prismatic', aiTags: ['Color-Changing', 'Anti-Gravity Sole'] },
  ],
  'favorites': [
    { id: '5', name: 'Quantum Leather Jacket', category: 'Outerwear', lastWorn: '1 week ago', image: '', color: 'Midnight Black', aiTags: ['Self-Repair', 'Weather-Adaptive'] },
    { id: '6', name: 'Holographic Dress', category: 'Formal', lastWorn: '2 weeks ago', image: '', color: 'Iridescent', aiTags: ['Color-Morphing', 'Wrinkle-Free'] },
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