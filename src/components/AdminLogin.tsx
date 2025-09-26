import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  templeId: string;
  templeName: string;
  onBack: () => void;
  onLoginSuccess: () => void;
}

// Temporary admin credentials
const TEMP_CREDENTIALS = {
  username: "admin",
  password: "temple123"
};

const AdminLogin = ({ templeId, templeName, onBack, onLoginSuccess }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === TEMP_CREDENTIALS.username && password === TEMP_CREDENTIALS.password) {
      toast({
        title: "Login Successful",
        description: `Welcome to ${templeName} Admin Dashboard`,
      });
      onLoginSuccess();
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Try: admin / temple123",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-dawn flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-peaceful-enter">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="mb-6 hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Temple
        </Button>

        <Card className="temple-card shadow-sacred">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-temple rounded-full flex items-center justify-center mx-auto mb-4 animate-sacred-glow">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl text-foreground">
              Admin Login
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {templeName} - Administrative Access
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-border focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-border focus:border-primary pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full sacred-button"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login to Dashboard"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground text-center mb-2">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="text-xs text-muted-foreground text-center">
                Username: <code className="bg-muted px-1 rounded">admin</code><br />
                Password: <code className="bg-muted px-1 rounded">temple123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;