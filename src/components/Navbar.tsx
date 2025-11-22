import { Button } from "@/components/ui/button";
import { Keyboard, Settings, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fonts, useFont } from "@/contexts/FontContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();
  const { isHindi, toggleLanguage, t } = useLanguage();
  const { currentFont, setFont, fontSize, setFontSize } = useFont();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Keyboard className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">TypeMaster</h1>
        </div>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-primary" />
                TypeMaster
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              {/* Language Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <Label htmlFor="mobile-hindi-mode" className="text-sm">
                  {isHindi ? "भाषा" : "Language"}
                </Label>
                <div className="flex items-center gap-2">
                  <Label htmlFor="mobile-hindi-mode" className="text-sm">EN</Label>
                  <Switch
                    id="mobile-hindi-mode"
                    checked={isHindi}
                    onCheckedChange={toggleLanguage}
                  />
                  <Label htmlFor="mobile-hindi-mode" className="text-sm">HI</Label>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/")}
                >
                  {t('dashboard')}
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/lessons")}
                >
                  {t('lessons')}
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/games")}
                >
                  {t('games')}
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/progress")}
                >
                  {t('progress')}
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/keyboard-guide")}
                >
                  {t('keyboardGuide')}
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigate("/about-developer")}
                >
                  {t('about')}
                </Button>
              </div>

              {/* Font Settings */}
              <div className="p-3 rounded-lg border">
                <p className="text-sm font-medium mb-3">{isHindi ? "फ़ॉन्ट सेटिंग्स" : "Font Settings"}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {isHindi ? "फ़ॉन्ट परिवार" : "Font Family"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {fonts.slice(0, 4).map((font) => (
                        <Button
                          key={font.value}
                          variant={currentFont === font.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFont(font.value)}
                          className="text-xs"
                          style={{ fontFamily: font.value }}
                        >
                          {font.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {isHindi ? "फ़ॉन्ट आकार" : "Font Size"}: {fontSize}px
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                        className="flex-1"
                      >
                        -
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                        className="flex-1"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
