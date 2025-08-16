import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import { ClothingModel3D } from '@/components/3D/ClothingModel3D';
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
  const [show3D, setShow3D] = useState(false);
  
  // Map item IDs to images
  const getItemImage = (id: string) => {
    switch (id) {
      case '1': return smartBlazer;
      case '2': return neuralTshirt;
      case '4': return holographicSneakers;
      default: return null;
    }
  };

  const getItemType = (category: string): 'shirt' | 'pants' | 'shoes' | 'blazer' | 'sneakers' | 'tshirt' | 'jacket' | 'accessory' => {
    switch (category.toLowerCase()) {
      case 'blazer':
      case 'blazers': return 'blazer';
      case 't-shirt':
      case 'tshirt':
      case 't-shirts': return 'tshirt';
      case 'shirt':
      case 'shirts': return 'shirt';
      case 'pants':
      case 'trousers': return 'pants';
      case 'shoes': return 'shoes';
      case 'sneakers': return 'sneakers';
      case 'jacket':
      case 'jackets': return 'jacket';
      default: return 'accessory';
    }
  };

  const getColorHex = (colorName: string): string => {
    const colorMap: { [key: string]: string } = {
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
    return colorMap[colorName.toLowerCase()] || '#8B5CF6';
  };

  const itemImage = getItemImage(item.id);

  return (
    <Link to={`/item/${item.id}`} className="wardrobe-item-card block">
      <div className="relative group">
        {/* Item Image */}
        <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          <div className="absolute bottom-2 left-2 z-20">
            <span className="text-xs text-primary font-medium">{item.category}</span>
          </div>
          <div className="absolute top-2 right-2 z-20">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
          
          {/* 3D Toggle Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShow3D(!show3D);
            }}
            className="absolute top-2 left-2 z-30 w-8 h-8 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 backdrop-blur-sm group-hover:scale-110"
          >
            3D
          </button>
          
          {/* Content */}
          {show3D ? (
            <div className="w-full h-full">
              <ClothingModel3D 
                type={getItemType(item.category)}
                color={getColorHex(item.color)}
                animated={true}
              />
            </div>
          ) : itemImage ? (
            <img 
              src={itemImage} 
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-primary/10 to-accent/10">
              <ClothingModel3D 
                type={getItemType(item.category)}
                color={getColorHex(item.color)}
                animated={true}
              />
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