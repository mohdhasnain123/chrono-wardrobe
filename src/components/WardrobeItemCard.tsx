import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import smartBlazer from '@/assets/smart-blazer.jpg';
import neuralTshirt from '@/assets/neural-tshirt.jpg';
import holographicSneakers from '@/assets/holographic-sneakers.jpg';

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  lastWorn: string;
  image: string;
  color: string;
  aiTags: string[];
}

interface WardrobeItemCardProps {
  item: WardrobeItem;
}

export const WardrobeItemCard: React.FC<WardrobeItemCardProps> = ({ item }) => {
  // Map item IDs to images
  const getItemImage = (id: string) => {
    switch (id) {
      case '1': return smartBlazer;
      case '2': return neuralTshirt;
      case '4': return holographicSneakers;
      default: return null;
    }
  };

  const itemImage = getItemImage(item.id);

  return (
    <Link to={`/item/${item.id}`} className="wardrobe-item-card block">
      <div className="relative">
        {/* Item Image */}
        <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          <div className="absolute bottom-2 left-2 z-20">
            <span className="text-xs text-primary font-medium">{item.category}</span>
          </div>
          <div className="absolute top-2 right-2 z-20">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
          {/* Actual futuristic image */}
          {itemImage ? (
            <img 
              src={itemImage} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-xs">3D Model</span>
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm truncate">{item.name}</h4>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{item.lastWorn}</span>
          </div>

          <div className="flex items-center space-x-1 text-xs">
            <span className="px-2 py-1 bg-primary/20 text-primary rounded">
              {item.color}
            </span>
          </div>

          {/* AI Tags */}
          <div className="flex flex-wrap gap-1">
            {item.aiTags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 px-1.5 py-0.5 bg-accent/20 text-accent rounded text-xs"
              >
                <Tag className="w-2 h-2" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};