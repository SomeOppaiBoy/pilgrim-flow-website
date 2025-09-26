import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
const Header = () => {
  return <header className="w-full bg-gradient-dawn shadow-gentle relative">
      <div className="lotus-pattern"></div>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-temple rounded-full flex items-center justify-center animate-sacred-glow">
            <span className="text-primary-foreground font-display font-bold text-lg">🕉</span>
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Pilgrim Flow</h1>
            <p className="text-muted-foreground text-sm">Smart Temple Management</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="en">
            <SelectTrigger className="w-32 border-0 bg-white/80 backdrop-blur-sm shadow-gentle">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
              <SelectItem value="mr">मराठी</SelectItem>
              <SelectItem value="gu">ગુજરાતી</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>;
};
export default Header;