import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, User, Bell, Shield, Palette, Brain, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SettingsPage: React.FC = () => {
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
              <Settings className="w-8 h-8 text-muted-foreground" />
              <span>Settings</span>
            </h1>
            <p className="text-muted-foreground">Customize your Wardrobe.AI experience</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="space-y-6">
          <div className="futuristic-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <User className="w-6 h-6 text-primary" />
              <span>Profile</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Display Name</label>
                <input 
                  type="text" 
                  value="Alex Chen"
                  className="w-full mt-1 p-3 glass-effect rounded-lg border border-border focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Style Preference</label>
                <select className="w-full mt-1 p-3 glass-effect rounded-lg border border-border focus:border-primary outline-none">
                  <option>Minimalist Tech</option>
                  <option>Bold Futuristic</option>
                  <option>Sustainable Chic</option>
                  <option>Professional Edge</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Size Preferences</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <input type="text" placeholder="Tops: M" className="p-2 glass-effect rounded border border-border" />
                  <input type="text" placeholder="Bottoms: L" className="p-2 glass-effect rounded border border-border" />
                  <input type="text" placeholder="Shoes: 10" className="p-2 glass-effect rounded border border-border" />
                </div>
              </div>
            </div>
          </div>

          <div className="futuristic-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <Brain className="w-6 h-6 text-neural-secondary" />
              <span>AI Preferences</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Smart Recommendations</div>
                  <div className="text-sm text-muted-foreground">Get AI-powered outfit suggestions</div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weather Integration</div>
                  <div className="text-sm text-muted-foreground">Factor weather into recommendations</div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Learning Mode</div>
                  <div className="text-sm text-muted-foreground">Allow AI to learn from your choices</div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Trend Predictions</div>
                  <div className="text-sm text-muted-foreground">Receive future trend insights</div>
                </div>
                <div className="w-12 h-6 bg-muted rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="space-y-6">
          <div className="futuristic-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <Bell className="w-6 h-6 text-accent" />
              <span>Notifications</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Outfit Reminders</div>
                  <div className="text-sm text-muted-foreground">Daily styling notifications</div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">New Arrivals</div>
                  <div className="text-sm text-muted-foreground">Get notified about new items</div>
                </div>
                <div className="w-12 h-6 bg-muted rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Care Reminders</div>
                  <div className="text-sm text-muted-foreground">Maintenance notifications</div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="futuristic-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <Palette className="w-6 h-6 text-warning" />
              <span>Appearance</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Theme</label>
                <select className="w-full mt-1 p-3 glass-effect rounded-lg border border-border focus:border-primary outline-none">
                  <option>Dark Cyberpunk (Current)</option>
                  <option>Light Minimalist</option>
                  <option>Neon Synthwave</option>
                  <option>Holographic</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Accent Color</label>
                <div className="flex space-x-2 mt-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-primary"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                  <div className="w-8 h-8 rounded-full bg-pink-500"></div>
                  <div className="w-8 h-8 rounded-full bg-green-500"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Animation Effects</div>
                  <div className="text-sm text-muted-foreground">Neural animations and transitions</div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="futuristic-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <Shield className="w-6 h-6 text-success" />
              <span>Privacy & Security</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Data Encryption</div>
                  <div className="text-sm text-muted-foreground">End-to-end encryption enabled</div>
                </div>
                <div className="w-4 h-4 rounded-full bg-success"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Anonymous Analytics</div>
                  <div className="text-sm text-muted-foreground">Help improve AI without personal data</div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full"></div>
              </div>
              <Button variant="outline" className="w-full glass-effect">
                <Shield className="w-4 h-4 mr-2" />
                Export Personal Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <div className="flex space-x-4">
          <Button variant="outline" className="glass-effect">
            <Globe className="w-4 h-4 mr-2" />
            Sync with Cloud
          </Button>
          <Button variant="outline" className="glass-effect">
            Reset AI Learning
          </Button>
        </div>
        <Button className="ai-button">
          Save Changes
        </Button>
      </div>
    </div>
  );
};