import { useState } from "react";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import PopularTemples from "@/components/PopularTemples";
import TempleLanding from "@/components/TempleLanding";
import templeHeroImage from "@/assets/temple-hero.jpg";

const Index = () => {
  const [selectedTemple, setSelectedTemple] = useState<string | null>(null);

  const handleTempleSelect = (templeId: string) => {
    setSelectedTemple(templeId);
  };

  const handleBackToSearch = () => {
    setSelectedTemple(null);
  };

  if (selectedTemple) {
    return (
      <TempleLanding 
        templeId={selectedTemple} 
        onBack={handleBackToSearch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dawn">
      <Header />
      
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${templeHeroImage})` }}
        />
        <div className="lotus-pattern"></div>
        <div className="relative z-10 w-full container mx-auto px-4 py-16">
          <SearchSection onTempleSelect={handleTempleSelect} />
        </div>
      </div>

      {/* Popular Temples */}
      <div className="container mx-auto px-4 pb-16">
        <PopularTemples onTempleSelect={handleTempleSelect} />
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-border/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Sacred Journey - Enhancing your spiritual experience with modern technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
