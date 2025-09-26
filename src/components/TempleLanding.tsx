import { useState } from "react";
import { temples } from "@/data/temples";
import { Button } from "@/components/ui/button";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  AlertCircle,
  Navigation,
  Eye,
  Shield,
  Bell,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TempleLandingProps {
  templeId: string;
  onBack: () => void;
}

const TempleLanding = ({ templeId, onBack }: TempleLandingProps) => {
  const temple = temples.find(t => t.id === templeId);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const { toast } = useToast();

  if (!temple) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Temple Not Found</h1>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  // Show admin login if requested
  if (showAdminLogin && !showAdminDashboard) {
    return (
      <AdminLogin
        templeId={templeId}
        templeName={temple.name}
        onBack={() => setShowAdminLogin(false)}
        onLoginSuccess={() => {
          setShowAdminLogin(false);
          setShowAdminDashboard(true);
        }}
      />
    );
  }

  // Show admin dashboard if logged in
  if (showAdminDashboard) {
    return (
      <AdminDashboard
        templeId={templeId}
        onLogout={() => {
          setShowAdminDashboard(false);
          toast({
            title: "Logged Out",
            description: "Successfully logged out of admin dashboard",
          });
        }}
      />
    );
  }

  // Interactive button handlers
  const handleGetDirections = () => {
    const address = encodeURIComponent(`${temple.name}, ${temple.location}`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(googleMapsUrl, '_blank');
    
    toast({
      title: "Opening Directions",
      description: "Redirecting to Google Maps for live navigation",
    });
  };

  const handleViewOnMap = () => {
    toast({
      title: "Map View",
      description: "Opening detailed temple location map",
    });
    // In a real app, this would open an interactive map component
  };

  const handleBookPooja = () => {
    toast({
      title: "Booking System",
      description: "Special pooja booking will be available soon!",
    });
  };

  const handleQueueNotifications = () => {
    setNotifications(!notifications);
    toast({
      title: notifications ? "Notifications Disabled" : "Notifications Enabled",
      description: notifications 
        ? "You'll no longer receive queue updates" 
        : "You'll receive updates when crowd reduces",
    });
  };

  const handleSafetyGuidelines = () => {
    toast({
      title: "Safety Guidelines",
      description: "Opening temple safety and conduct guidelines",
    });
  };

  const getCrowdColor = (status: string) => {
    switch (status) {
      case 'Low': return 'text-success bg-success/10';
      case 'Moderate': return 'text-warning bg-warning/10';
      case 'High': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dawn">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-gentle sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            size="sm"
            className="mr-4 hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{temple.icon}</div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                {temple.name}
              </h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 mr-1" />
                {temple.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Temple Description */}
        <div className="mb-8 animate-peaceful-enter">
          <div className="temple-card p-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              About {temple.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {temple.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Status Column */}
          <div className="space-y-6 animate-peaceful-enter" style={{ animationDelay: '0.1s' }}>
            
            {/* Current Queue Status */}
            <div className="temple-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Live Queue Status
                </h3>
                <div className="animate-temple-pulse">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${getCrowdColor(temple.crowdStatus)}`}>
                  <Users className="w-5 h-5 mr-2" />
                  {temple.crowdStatus} Crowd
                </div>
                
                <div className="flex items-center text-lg text-foreground">
                  <Clock className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <div className="font-semibold">Wait Time: {temple.waitTime}</div>
                    <div className="text-sm text-muted-foreground">
                      Last updated {temple.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="temple-card p-6">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Directions & Navigation
              </h3>
              <div className="space-y-3">
                <Button 
                  className="w-full sacred-button"
                  onClick={handleGetDirections}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Live Directions
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleViewOnMap}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </div>

            {/* Alerts */}
            {temple.alerts.length > 0 && (
              <div className="temple-card p-6 border-l-4 border-l-warning bg-warning/5">
                <div className="flex items-center mb-3">
                  <AlertCircle className="w-5 h-5 text-warning mr-2" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Important Alerts
                  </h3>
                </div>
                <div className="space-y-2">
                  {temple.alerts.map((alert, index) => (
                    <div key={index} className="text-sm text-foreground bg-warning/10 p-3 rounded-lg">
                      {alert}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Timings Column */}
          <div className="space-y-6 animate-peaceful-enter" style={{ animationDelay: '0.2s' }}>
            
            {/* Temple Timings */}
            <div className="temple-card p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Temple Timings
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-muted-foreground">Opening Time</span>
                  <span className="font-semibold text-foreground">{temple.openTime}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-muted-foreground">Closing Time</span>
                  <span className="font-semibold text-foreground">{temple.closeTime}</span>
                </div>
              </div>
            </div>

            {/* Special Darshan Times */}
            <div className="temple-card p-6">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Special Darshan & Pooja
              </h3>
              
              <div className="space-y-3">
                {temple.specialTimings.map((timing, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gradient-peaceful rounded-lg">
                    <span className="font-medium text-foreground">{timing.name}</span>
                    <span className="text-sm text-muted-foreground font-medium">{timing.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-6 animate-peaceful-enter" style={{ animationDelay: '0.3s' }}>
            
            {/* Quick Actions */}
            <div className="temple-card p-6">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Quick Services
              </h3>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleBookPooja}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Special Pooja
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleQueueNotifications}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  {notifications ? "Disable" : "Enable"} Queue Notifications
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSafetyGuidelines}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Safety Guidelines
                </Button>
              </div>
            </div>

            {/* Facilities */}
            <div className="temple-card p-6">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Available Facilities
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Free Drinking Water
                </div>
                <div className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Shoe Keeping Counter
                </div>
                <div className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Rest Rooms Available
                </div>
                <div className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Medical First Aid
                </div>
                <div className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Security & CCTV
                </div>
              </div>
            </div>

            {/* Admin Access */}
            <div className="temple-card p-6 border-t-4 border-t-secondary">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                Temple Administration
              </h3>
                <Button 
                  variant="outline" 
                  className="w-full text-secondary border-secondary hover:bg-secondary/10"
                  onClick={() => setShowAdminLogin(true)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Login
                </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                For authorized temple staff only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleLanding;