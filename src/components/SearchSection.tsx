import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { temples } from "@/data/temples";

interface SearchSectionProps {
  onTempleSelect: (templeId: string) => void;
}

const SearchSection = ({ onTempleSelect }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof temples>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 1) {
      const filtered = temples.filter(temple => 
        temple.name.toLowerCase().includes(query.toLowerCase()) ||
        temple.location.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleTempleSelect = (templeId: string) => {
    const temple = temples.find(t => t.id === templeId);
    if (temple) {
      setSearchQuery(temple.name);
      setShowSuggestions(false);
      onTempleSelect(templeId);
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
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for a temple or location..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 pr-4 py-6 text-lg border-2 border-border rounded-xl shadow-gentle 
                     focus:border-primary focus:shadow-temple transition-all duration-300
                     bg-white/90 backdrop-blur-sm"
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