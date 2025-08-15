import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AISearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

export const AISearchBar: React.FC<AISearchBarProps> = ({
  query,
  setQuery,
  isActive,
  setIsActive,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [noResults, setNoResults] = useState(false);

  // Mock AI suggestions
  const aiSuggestions = [
    "Black leather jacket",
    "Summer dress 2035",
    "Formal shoes",
    "Workout gear",
    "Winter coat",
    "Smart accessories",
    "Evening wear",
    "Casual Friday outfit"
  ];

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      setIsActive(true);
      
      const timeout = setTimeout(() => {
        const filtered = aiSuggestions.filter(item => 
          item.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filtered.length === 0 && query.length > 3) {
          setNoResults(true);
          setSuggestions(["No exact matches found", "Try: 'smart jacket'", "Try: 'formal wear'"]);
        } else {
          setNoResults(false);
          setSuggestions(filtered.slice(0, 5));
        }
        
        setIsSearching(false);
      }, 800);

      return () => clearTimeout(timeout);
    } else {
      setIsActive(false);
      setSuggestions([]);
      setNoResults(false);
    }
  }, [query, setIsActive]);

  const handleClear = () => {
    setQuery('');
    setIsActive(false);
    setSuggestions([]);
    setNoResults(false);
  };

  return (
    <div className="relative w-96">
      <div className={`relative ${isActive ? 'ai-search-active' : ''}`}>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {isSearching ? (
            <Brain className="w-4 h-4 text-primary neural-animation" />
          ) : (
            <Search className="w-4 h-4 text-muted-foreground" />
          )}
          {isActive && <Sparkles className="w-3 h-3 text-accent animate-pulse" />}
        </div>
        
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI to find anything..."
          className="pl-12 pr-10 py-3 glass-effect border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground"
        />
        
        {query && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* AI Search Results Dropdown */}
      {isActive && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-effect rounded-xl border border-primary/30 z-50 overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {noResults ? 'AI Suggestions' : 'AI Found'}
              </span>
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`px-4 py-3 cursor-pointer transition-colors hover:bg-primary/10 ${
                  noResults && index === 0 ? 'text-muted-foreground italic' : 'text-foreground'
                }`}
                onClick={() => {
                  if (!noResults || index > 0) {
                    setQuery(suggestion);
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  {noResults && index === 0 ? (
                    <X className="w-4 h-4 text-destructive" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-accent" />
                  )}
                  <span className="text-sm">{suggestion}</span>
                </div>
              </div>
            ))}
          </div>

          {noResults && (
            <div className="p-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                💡 AI Tip: Try broader terms or check similar categories
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};