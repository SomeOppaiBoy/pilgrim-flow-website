import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Loader2 } from "lucide-react";
import { temples } from "@/data/temples";
import { useToast } from "@/hooks/use-toast";

interface SearchSectionProps {
  onTempleSelect: (templeId: string) => void;
}

const SearchSection = ({ onTempleSelect }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof temples>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 1) {
      setIsSearching(true);
      
      // Simulate search delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const filtered = temples.filter(temple => 
        temple.name.toLowerCase().includes(query.toLowerCase()) ||
        temple.location.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      setIsSearching(false);
      
      if (filtered.length === 0) {
        toast({
          title: "No temples found",
          description: `No temples match "${query}". Try searching by city or temple name.`,
          variant: "destructive",
        });
      }
    } else {
      setShowSuggestions(false);
      setIsSearching(false);
    }
  };

  const handleTempleSelect = (templeId: string) => {
    const temple = temples.find(t => t.id === templeId);
    if (temple) {
      setSearchQuery(temple.name);
      setShowSuggestions(false);
      
      toast({
        title: "Temple Selected",
        description: `Loading information for ${temple.name}`,
      });
      
      // Small delay for better UX
      setTimeout(() => {
        onTempleSelect(templeId);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleTempleSelect(suggestions[0].id);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-peaceful-enter">
      <div className="text-center mb-8">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Find Your Sacred Journey
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Discover temples, check crowd status, and plan your peaceful darshan with real-time updates
        </p>
      </div>

      <div className="relative">
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            isSearching ? 'text-primary' : 'text-muted-foreground'
          }`} />
          {isSearching && (
            <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
          )}
          <Input
            type="text"
            placeholder="Search for a temple or location..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`pl-12 pr-12 py-6 text-lg border-2 rounded-xl shadow-gentle 
                     transition-all duration-300 bg-white/90 backdrop-blur-sm
                     ${isSearching ? 'border-primary' : 'border-border'}
                     focus:border-primary focus:shadow-temple`}
          />
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-card rounded-xl shadow-sacred border border-border 
                        backdrop-blur-sm bg-white/95 z-50 overflow-hidden animate-peaceful-enter">
            {suggestions.map((temple) => (
              <div
                key={temple.id}
                onClick={() => handleTempleSelect(temple.id)}
                className="p-4 hover:bg-muted/50 cursor-pointer border-b border-border/50 last:border-0 
                         transition-colors duration-200 group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-peaceful flex items-center justify-center
                               group-hover:animate-lotus-bloom">
                    <span className="text-lg">{temple.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-foreground group-hover:text-primary 
                                 transition-colors">
                      {temple.name}
                    </h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {temple.location}
                    </div>
                  </div>
                  <div className={`status-indicator ${
                    temple.crowdStatus === 'Low' ? 'status-low' : 
                    temple.crowdStatus === 'Moderate' ? 'status-moderate' : 'status-high'
                  }`}>
                    {temple.crowdStatus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSection;