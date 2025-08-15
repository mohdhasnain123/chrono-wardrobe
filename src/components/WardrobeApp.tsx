import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { AISearchBar } from '@/components/AISearchBar';
import { Dashboard } from '@/components/Dashboard';
import { CategoryView } from '@/components/CategoryView';
import { ItemDetailView } from '@/components/ItemDetailView';
import { Brain, Sparkles } from 'lucide-react';

export const WardrobeApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiActive, setAiActive] = useState(false);

  return (
    <div className="min-h-screen bg-background" style={{ aspectRatio: '7150/1840' }}>
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          
          <main className="flex-1 flex flex-col">
            {/* Futuristic Header */}
            <header className="glass-effect border-b border-border p-4 z-10">
              <div className="flex items-center justify-between max-w-full">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="p-2 hover:bg-muted/50 rounded-lg transition-colors" />
                  <div className="flex items-center space-x-2">
                    <Brain className="w-8 h-8 text-primary neural-animation" />
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Wardrobe.AI
                    </h1>
                    <span className="text-xs text-muted-foreground">2035</span>
                  </div>
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                
                <AISearchBar 
                  query={searchQuery}
                  setQuery={setSearchQuery}
                  isActive={aiActive}
                  setIsActive={setAiActive}
                />
                
                <div className="flex items-center space-x-3">
                  <div className="text-right text-sm">
                    <div className="text-foreground font-medium">Alex Chen</div>
                    <div className="text-muted-foreground">Premium Member</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <span className="text-primary font-semibold">AC</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard searchQuery={searchQuery} />} />
                <Route path="/category/:categoryId" element={<CategoryView />} />
                <Route path="/item/:itemId" element={<ItemDetailView />} />
              </Routes>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};