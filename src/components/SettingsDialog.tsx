import { Settings, Sun, Moon, Monitor, Type, Palette, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { fonts, hindiKeyboardFonts, useFont } from "@/contexts/FontContext";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function SettingsDialog() {
  const { theme, setTheme } = useTheme();
  const { currentFont, setFont, fontSize, setFontSize, hindiKeyboardFont, setHindiKeyboardFont } = useFont();
  const { t, isHindi } = useLanguage();
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClearAllData = () => {
    localStorage.clear();
    toast({
      title: isHindi ? "डेटा साफ हो गया" : "Data Cleared",
      description: isHindi ? "सभी डेटा सफलतापूर्वक साफ कर दिया गया है" : "All data has been cleared successfully",
    });
    setShowClearDialog(false);
    setOpen(false);
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Settings className="h-6 w-6" />
              {t('settings')}
            </DialogTitle>
            <DialogDescription>
              {isHindi ? "अपनी प्राथमिकताओं को अनुकूलित करें" : "Customize your preferences"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Theme Settings */}
            <div>
              <Label className="text-base font-semibold flex items-center gap-2 mb-3">
                <Palette className="h-4 w-4" />
                {isHindi ? "थीम" : "Theme"}
              </Label>
              <RadioGroup value={theme} onValueChange={setTheme}>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent/50" onClick={() => setTheme('light')}>
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                      <Sun className="h-4 w-4" />
                      {isHindi ? "लाइट" : "Light"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent/50" onClick={() => setTheme('dark')}>
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                      <Moon className="h-4 w-4" />
                      {isHindi ? "डार्क" : "Dark"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent/50" onClick={() => setTheme('system')}>
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer">
                      <Monitor className="h-4 w-4" />
                      {isHindi ? "सिस्टम" : "System"}
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Font Family */}
            <div>
              <Label className="text-base font-semibold flex items-center gap-2 mb-3">
                <Type className="h-4 w-4" />
                {isHindi ? "फ़ॉन्ट परिवार" : "Font Family"}
              </Label>
              <Select value={currentFont} onValueChange={setFont}>
                <SelectTrigger>
                  <SelectValue placeholder={isHindi ? "फ़ॉन्ट चुनें" : "Select font"} />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                {isHindi ? "फ़ॉन्ट साइज़" : "Font Size"}: {fontSize}px
              </Label>
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  disabled={fontSize <= 12}
                >
                  -
                </Button>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${((fontSize - 12) / 12) * 100}%` }}
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  disabled={fontSize >= 24}
                >
                  +
                </Button>
              </div>
            </div>

            <Separator />

            {/* Hindi Keyboard Font */}
            <div>
              <Label className="text-base font-semibold flex items-center gap-2 mb-3">
                <Type className="h-4 w-4" />
                {isHindi ? "हिंदी कीबोर्ड फ़ॉन्ट" : "Hindi Keyboard Font"}
              </Label>
              <Select value={hindiKeyboardFont} onValueChange={setHindiKeyboardFont}>
                <SelectTrigger>
                  <SelectValue placeholder={isHindi ? "हिंदी फ़ॉन्ट चुनें" : "Select Hindi font"} />
                </SelectTrigger>
                <SelectContent>
                  {hindiKeyboardFonts.map((font) => (
                    <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Reset Data */}
            <div>
              <Label className="text-base font-semibold flex items-center gap-2 mb-3 text-destructive">
                <RotateCcw className="h-4 w-4" />
                {isHindi ? "डेटा साफ़ करें" : "Clear Data"}
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                {isHindi
                  ? "सभी प्रगति, परीक्षण इतिहास और सेटिंग्स हटा दें। यह क्रिया पूर्ववत नहीं की जा सकती।"
                  : "Remove all progress, test history, and settings. This action cannot be undone."}
              </p>
              <Button
                variant="destructive"
                onClick={() => setShowClearDialog(true)}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isHindi ? "सभी डेटा साफ़ करें" : "Clear All Data"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isHindi ? "क्या आप सुनिश्चित हैं?" : "Are you absolutely sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isHindi
                ? "यह क्रिया आपकी सभी प्रगति, परीक्षण इतिहास और सेटिंग्स को स्थायी रूप से हटा देगी। इसे पूर्ववत नहीं किया जा सकता।"
                : "This action will permanently delete all your progress, test history, and settings. This cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{isHindi ? "रद्द करें" : "Cancel"}</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAllData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isHindi ? "हां, सब कुछ साफ़ करें" : "Yes, clear everything"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
