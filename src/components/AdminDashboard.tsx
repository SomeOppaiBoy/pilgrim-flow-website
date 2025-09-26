import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LogOut, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Send,
  BarChart3,
  Settings,
  Bell,
  Eye,
  Calendar
} from "lucide-react";
import { temples } from "@/data/temples";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  templeId: string;
  onLogout: () => void;
}

const AdminDashboard = ({ templeId, onLogout }: AdminDashboardProps) => {
  const temple = temples.find(t => t.id === templeId);
  const [newAlert, setNewAlert] = useState("");
  const [crowdCount, setCrowdCount] = useState(245);
  const [waitTime, setWaitTime] = useState("45 mins");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  if (!temple) return null;

  const handlePublishAlert = async () => {
    if (!newAlert.trim()) {
      toast({
        title: "Alert Required",
        description: "Please enter an alert message before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Alert Published",
      description: "New alert has been sent to all temple visitors.",
    });
    
    setNewAlert("");
    setIsUpdating(false);
  };

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Status Updated",
      description: "Live temple status has been updated successfully.",
    });
    
    setIsUpdating(false);
  };

  const stats = [
    { label: "Current Visitors", value: crowdCount, icon: Users, color: "text-primary" },
    { label: "Average Wait", value: waitTime, icon: Clock, color: "text-warning" },
    { label: "Daily Visitors", value: "1,247", icon: TrendingUp, color: "text-success" },
    { label: "Active Alerts", value: temple.alerts.length, icon: AlertTriangle, color: "text-destructive" }
  ];

  return (
    <div className="min-h-screen bg-gradient-dawn">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-gentle sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{temple.icon}</div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Admin Dashboard: {temple.name}
              </h1>
              <p className="text-sm text-muted-foreground">Temple Management System</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-peaceful-enter">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="temple-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Status Management */}
          <div className="space-y-6 animate-peaceful-enter" style={{ animationDelay: '0.2s' }}>
            <Card className="temple-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Live Status Management
                </CardTitle>
                <CardDescription>
                  Update real-time crowd and wait time information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Current Crowd Count
                    </label>
                    <Input
                      type="number"
                      value={crowdCount}
                      onChange={(e) => setCrowdCount(Number(e.target.value))}
                      className="border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Wait Time
                    </label>
                    <Input
                      type="text"
                      value={waitTime}
                      onChange={(e) => setWaitTime(e.target.value)}
                      placeholder="e.g., 45 mins"
                      className="border-border"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleUpdateStatus}
                  className="w-full sacred-button"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Live Status"}
                </Button>
              </CardContent>
            </Card>

            {/* Alert Management */}
            <Card className="temple-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Bell className="w-5 h-5 mr-2 text-warning" />
                  Alert Management
                </CardTitle>
                <CardDescription>
                  Send important announcements to temple visitors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter important announcement or alert message..."
                  value={newAlert}
                  onChange={(e) => setNewAlert(e.target.value)}
                  className="border-border resize-none"
                  rows={3}
                />
                <Button 
                  onClick={handlePublishAlert}
                  className="w-full sacred-button"
                  disabled={isUpdating}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isUpdating ? "Publishing..." : "Publish Alert"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Analytics & Management */}
          <div className="space-y-6 animate-peaceful-enter" style={{ animationDelay: '0.3s' }}>
            {/* Current Alerts */}
            <Card className="temple-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Eye className="w-5 h-5 mr-2 text-secondary" />
                  Active Alerts
                </CardTitle>
                <CardDescription>
                  Currently published temple announcements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {temple.alerts.map((alert, index) => (
                    <div key={index} className="flex items-start justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <p className="text-sm text-foreground flex-1">{alert}</p>
                      <Badge variant="outline" className="ml-2 text-warning border-warning/50">
                        Active
                      </Badge>
                    </div>
                  ))}
                  {temple.alerts.length === 0 && (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      No active alerts at this time
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="temple-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Settings className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Manage Special Events
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Staff Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Temple Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;