import { Button } from "@/components/ui/button";
import { Keyboard, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fonts, useFont } from "@/contexts/FontContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage, t } = useLanguage();
  const { currentFont, setFont, fontSize, setFontSize } = useFont();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Keyboard className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">TypeMaster</h1>
        </div>
        
        <nav className="hidden md:flex gap-4 items-center">
          <Button variant="ghost" onClick={() => navigate("/")}>{t('dashboard')}</Button>
          <Button variant="ghost" onClick={() => navigate("/lessons")}>{t('lessons')}</Button>
          <Button variant="ghost" onClick={() => navigate("/games")}>{t('games')}</Button>
          <Button variant="ghost" onClick={() => navigate("/progress")}>{t('progress')}</Button>
          <Button variant="ghost" onClick={() => navigate("/keyboard-guide")}>{t('keyboardGuide')}</Button>
          <Button variant="ghost" onClick={() => navigate("/about-developer")}>{t('about')}</Button>
          
          <div className="flex items-center gap-2 ml-4 border-l pl-4 border-border">
            <Label htmlFor="hindi-mode" className="text-sm">EN</Label>
            <Switch
              id="hindi-mode"
              checked={isHindi}
              onCheckedChange={toggleLanguage}
            />
            <Label htmlFor="hindi-mode" className="text-sm">HI</Label>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Font Family</p>
                {fonts.map((font) => (
                  <DropdownMenuItem 
                    key={font.value}
                    onClick={() => setFont(font.value)}
                    className={currentFont === font.value ? "bg-accent" : ""}
                  >
                    <span style={{ fontFamily: font.value }}>{font.name}</span>
                  </DropdownMenuItem>
                ))}
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Font Size: {fontSize}px</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setFontSize(Math.max(12, fontSize - 2))}>-</Button>
                    <Button size="sm" variant="outline" onClick={() => setFontSize(Math.min(24, fontSize + 2))}>+</Button>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
