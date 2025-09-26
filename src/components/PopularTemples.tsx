import { temples } from "@/data/temples";
import { MapPin, Clock, Users, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PopularTemplesProps {
  onTempleSelect: (templeId: string) => void;
}

const PopularTemples = ({ onTempleSelect }: PopularTemplesProps) => {
  const popularTemples = temples.slice(0, 6); // Show first 6 temples as popular
  const { toast } = useToast();

  const handleTempleClick = (templeId: string, templeName: string) => {
    toast({
      title: "Loading Temple",
      description: `Getting live information for ${templeName}...`,
    });
    
    // Add a small delay for better UX
    setTimeout(() => {
      onTempleSelect(templeId);
    }, 600);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 animate-peaceful-enter" style={{ animationDelay: '0.3s' }}>
      <div className="text-center mb-12">
        <h3 className="font-display text-3xl font-bold text-foreground mb-4">
          Popular Sacred Destinations
        </h3>
        <p className="text-muted-foreground">
          Most visited temples with live updates and crowd management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularTemples.map((temple) => (
          <div
            key={temple.id}
            onClick={() => handleTempleClick(temple.id, temple.name)}
            className="temple-card cursor-pointer group overflow-hidden relative hover:shadow-sacred"
          >
            <div className="lotus-pattern"></div>
            
            {/* Temple Image */}
            <div className="h-48 bg-gradient-peaceful relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-80 
                           group-hover:scale-110 transition-transform duration-500">
                {temple.icon}
              </div>
              <div className="absolute top-4 right-4">
                <div className={`status-indicator ${
                  temple.crowdStatus === 'Low' ? 'status-low' : 
                  temple.crowdStatus === 'Moderate' ? 'status-moderate' : 'status-high'
                }`}>
                  {temple.crowdStatus}
                </div>
              </div>
            </div>

            {/* Temple Info */}
            <div className="p-6 relative z-10">
              <h4 className="font-display text-xl font-bold text-foreground mb-2 
                           group-hover:text-primary transition-colors">
                {temple.name}
              </h4>
              
              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{temple.location}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{temple.waitTime}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>Live updates</span>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-temple rounded-full 
                           opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTemples;