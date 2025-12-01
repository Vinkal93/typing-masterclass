import { Button } from "@/components/ui/button";
import { Keyboard, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SettingsDialog } from "@/components/SettingsDialog";

const Navbar = () => {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage, t } = useLanguage();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="lg:hidden" />
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Keyboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-foreground">TypeMaster</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="hindi-mode" className="text-sm hidden sm:inline">EN</Label>
            <Switch
              id="hindi-mode"
              checked={isHindi}
              onCheckedChange={toggleLanguage}
            />
            <Label htmlFor="hindi-mode" className="text-sm hidden sm:inline">HI</Label>
          </div>

          <SettingsDialog />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
