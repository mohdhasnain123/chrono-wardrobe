import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, TrendingUp, Zap } from 'lucide-react';

const recommendations = [
  {
    id: 'rec-1',
    type: 'Outfit Combo',
    title: 'Smart Casual Friday',
    items: ['Neural Polo', 'Adaptive Chinos', 'Quantum Loafers'],
    confidence: 94,
    reason: 'Perfect for today\'s weather and your calendar events'
  },
  {
    id: 'rec-2',
    type: 'Missing Item',
    title: 'Summer Blazer',
    items: ['Climate-Smart Blazer'],
    confidence: 87,
    reason: 'Complete your professional summer wardrobe'
  },
  {
    id: 'rec-3',
    type: 'Trending',
    title: 'Holographic Accessories',
    items: ['Color-Shift Watch', 'Prism Glasses'],
    confidence: 78,
    reason: 'Trending in your style network this week'
  }
];

export const AIRecommendations: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* AI Status */}
      <div className="ai-recommendation">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-primary neural-animation" />
          <div>
            <h3 className="font-semibold">AI Wardrobe Assistant</h3>
            <p className="text-xs text-muted-foreground">Analyzing your preferences...</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-muted rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-4/5 animate-pulse" />
          </div>
          <span className="text-xs text-primary">80%</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">Today's Recommendations</h3>
        </div>

        {recommendations.map((rec) => (
          <div key={rec.id} className="ai-recommendation">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {rec.type === 'Outfit Combo' && <Zap className="w-4 h-4 text-primary" />}
                {rec.type === 'Missing Item' && <TrendingUp className="w-4 h-4 text-warning" />}
                {rec.type === 'Trending' && <TrendingUp className="w-4 h-4 text-accent" />}
                <span className="text-xs font-medium text-muted-foreground">{rec.type}</span>
              </div>
              <span className="text-xs text-success">{rec.confidence}%</span>
            </div>

            <h4 className="font-semibold mb-2">{rec.title}</h4>
            
            <div className="space-y-2 mb-3">
              {rec.items.map((item, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  • {item}
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mb-3">{rec.reason}</p>

            <div className="flex space-x-2">
              <button className="flex-1 ai-button text-xs py-2">
                Apply
              </button>
              <button className="px-3 py-2 text-xs border border-border rounded-lg hover:bg-muted/50 transition-colors">
                Save
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="ai-recommendation">
        <h4 className="font-semibold mb-3 flex items-center space-x-2">
          <Brain className="w-4 h-4 text-neural-secondary" />
          <span>Style Insights</span>
        </h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Most worn category:</span>
            <span className="text-primary font-medium">Casual Wear</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Preferred colors:</span>
            <span className="text-accent font-medium">Navy, Black, Gray</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Style evolution:</span>
            <span className="text-success font-medium">+15% Minimalist</span>
          </div>
        </div>
      </div>
    </div>
  );
};