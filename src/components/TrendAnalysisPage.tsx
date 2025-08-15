import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, BarChart3, PieChart, Activity, Globe } from 'lucide-react';

export const TrendAnalysisPage: React.FC = () => {
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
              <TrendingUp className="w-8 h-8 text-neural-accent" />
              <span>Trend Analysis</span>
            </h1>
            <p className="text-muted-foreground">Global fashion trends and personal style insights</p>
          </div>
        </div>
      </div>

      {/* Global Trends */}
      <div className="grid grid-cols-3 gap-6">
        <div className="futuristic-card">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-primary" />
            <h3 className="font-semibold">Global Trends</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Holographic Fabrics</span>
              <span className="text-primary text-sm">↑ 34%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Smart Textiles</span>
              <span className="text-accent text-sm">↑ 28%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Sustainable Materials</span>
              <span className="text-success text-sm">↑ 45%</span>
            </div>
          </div>
        </div>

        <div className="futuristic-card">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-6 h-6 text-accent" />
            <h3 className="font-semibold">Your Network</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Minimalist Style</span>
              <span className="text-primary text-sm">67%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tech Integration</span>
              <span className="text-accent text-sm">54%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Color Preference</span>
              <span className="text-neural-secondary text-sm">Dark</span>
            </div>
          </div>
        </div>

        <div className="futuristic-card">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-warning" />
            <h3 className="font-semibold">Trend Forecast</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Neural Fabrics</span>
              <span className="text-success text-sm">Rising</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Climate Adaptive</span>
              <span className="text-warning text-sm">Peak</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Bio-Materials</span>
              <span className="text-accent text-sm">Emerging</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="futuristic-card">
        <h3 className="text-xl font-semibold mb-6">Style Trend Analysis</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Seasonal Predictions 2035</h4>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="font-medium text-primary">Summer Dominance</div>
                <div className="text-sm text-muted-foreground">UV-reactive materials leading the market</div>
              </div>
              <div className="p-4 rounded-lg bg-accent/10">
                <div className="font-medium text-accent">Fall Innovation</div>
                <div className="text-sm text-muted-foreground">Self-heating textiles expected surge</div>
              </div>
              <div className="p-4 rounded-lg bg-warning/10">
                <div className="font-medium text-warning">Winter Tech</div>
                <div className="text-sm text-muted-foreground">Advanced insulation technologies</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Personal Style Insights</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                <span>Professional Preference</span>
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-4/5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                <span>Casual Comfort</span>
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full w-3/5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                <span>Tech Integration</span>
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Trends */}
      <div className="futuristic-card">
        <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <PieChart className="w-6 h-6 text-neural-accent" />
          <span>Color Trend Analysis</span>
        </h3>
        <div className="grid grid-cols-6 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Neural Blue</div>
            <div className="text-xs text-success">+23%</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-400 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Holo Purple</div>
            <div className="text-xs text-accent">+18%</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-400 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Bio Green</div>
            <div className="text-xs text-warning">+31%</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Tech Gray</div>
            <div className="text-xs text-muted-foreground">Stable</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-600 to-yellow-400 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Solar Gold</div>
            <div className="text-xs text-success">+15%</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-black to-gray-900 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Void Black</div>
            <div className="text-xs text-primary">+12%</div>
          </div>
        </div>
      </div>
    </div>
  );
};