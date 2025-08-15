import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Zap, TrendingUp, Star, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AIRecommendationsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              <Brain className="w-8 h-8 text-primary neural-animation" />
              <span>AI Smart Picks</span>
            </h1>
            <p className="text-muted-foreground">Personalized recommendations powered by advanced AI</p>
          </div>
        </div>
      </div>

      {/* AI Status */}
      <div className="futuristic-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">AI Analysis Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
            <span className="text-success text-sm">Active Learning</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">2,847</div>
            <div className="text-sm text-muted-foreground">Style Data Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">97%</div>
            <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">34</div>
            <div className="text-sm text-muted-foreground">Active Recommendations</div>
          </div>
        </div>
      </div>

      {/* Today's Recommendations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center space-x-2">
          <Zap className="w-6 h-6 text-primary" />
          <span>Today's Top Picks</span>
        </h2>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Outfit Recommendation */}
          <div className="ai-recommendation">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Perfect Monday Outfit</h4>
              <span className="text-success text-sm">96% confidence</span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
                <div>
                  <div className="font-medium">Smart Blazer Pro</div>
                  <div className="text-xs text-muted-foreground">Professional meeting attire</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neural-secondary to-muted"></div>
                <div>
                  <div className="font-medium">Adaptive Chinos</div>
                  <div className="text-xs text-muted-foreground">Comfort meets style</div>
                </div>
              </div>
            </div>
            <Button className="w-full ai-button">
              <Target className="w-4 h-4 mr-2" />
              Apply Outfit
            </Button>
          </div>

          {/* Weather-based Recommendation */}
          <div className="ai-recommendation">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Weather-Optimized</h4>
              <span className="text-warning text-sm">89% confidence</span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-warning to-accent"></div>
                <div>
                  <div className="font-medium">UV-Reactive Tank</div>
                  <div className="text-xs text-muted-foreground">Perfect for today's sun</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-neural-accent"></div>
                <div>
                  <div className="font-medium">Cooling Shorts</div>
                  <div className="text-xs text-muted-foreground">Temperature regulation</div>
                </div>
              </div>
            </div>
            <Button className="w-full ai-button">
              <Calendar className="w-4 h-4 mr-2" />
              Save for Later
            </Button>
          </div>
        </div>
      </div>

      {/* Style Evolution */}
      <div className="futuristic-card">
        <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-neural-secondary" />
          <span>Your Style Evolution</span>
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-muted/20">
            <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="font-semibold">Minimalist</div>
            <div className="text-xs text-muted-foreground">+15% this month</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted/20">
            <Star className="w-8 h-8 mx-auto mb-2 text-accent" />
            <div className="font-semibold">Tech-Forward</div>
            <div className="text-xs text-muted-foreground">+8% this month</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted/20">
            <Star className="w-8 h-8 mx-auto mb-2 text-warning" />
            <div className="font-semibold">Professional</div>
            <div className="text-xs text-muted-foreground">Stable</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted/20">
            <Star className="w-8 h-8 mx-auto mb-2 text-success" />
            <div className="font-semibold">Sustainable</div>
            <div className="text-xs text-muted-foreground">+22% this month</div>
          </div>
        </div>
      </div>

      {/* AI Learning Preferences */}
      <div className="futuristic-card">
        <h3 className="text-xl font-semibold mb-4">AI Learning Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Weather-based recommendations</span>
            <div className="w-12 h-6 bg-primary rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <span>Calendar event styling</span>
            <div className="w-12 h-6 bg-primary rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <span>Seasonal trend integration</span>
            <div className="w-12 h-6 bg-muted rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <span>Sustainability scoring</span>
            <div className="w-12 h-6 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};