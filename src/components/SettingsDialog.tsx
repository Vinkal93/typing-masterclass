import { Settings, Sun, Moon, Monitor, Type, Palette, RotateCcw, Trash2, Sparkles, Volume2, Eye, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme, uiStyles } from "@/contexts/ThemeContext";
import { fonts, hindiKeyboardFonts, useFont } from "@/contexts/FontContext";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function SettingsDialog() {
  const { theme, setTheme, uiStyle, setUIStyle } = useTheme();
  const { currentFont, setFont, fontSize, setFontSize, hindiKeyboardFont, setHindiKeyboardFont } = useFont();
  const { t, isHindi } = useLanguage();
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [open, setOpen] = useState(false);
  
  // Extra settings with localStorage
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('soundEnabled') === 'true');
  const [showLiveWpm, setShowLiveWpm] = useState(() => localStorage.getItem('showLiveWpm') !== 'false');
  const [smoothCaret, setSmoothCaret] = useState(() => localStorage.getItem('smoothCaret') !== 'false');
  const [caretStyle, setCaretStyle] = useState(() => localStorage.getItem('caretStyle') || 'line');
  const [highlightMode, setHighlightMode] = useState(() => localStorage.getItem('highlightMode') || 'letter');
  const [stopOnError, setStopOnError] = useState(() => localStorage.getItem('stopOnError') === 'true');
  
  const handleToggle = (key: string, value: boolean, setter: (v: boolean) => void) => {
    setter(value);
    localStorage.setItem(key, String(value));
  };

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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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

            {/* UI Style */}
            <div>
              <Label className="text-base font-semibold flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4" />
                {isHindi ? "UI स्टाइल" : "UI Style"}
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {uiStyles.map((style) => (
                  <div
                    key={style.value}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${uiStyle === style.value ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'hover:bg-accent/50'}`}
                    onClick={() => setUIStyle(style.value)}
                  >
                    <p className="font-medium text-sm text-foreground">{style.name}</p>
                    <p className="text-xs text-muted-foreground">{isHindi ? style.descHi : style.description}</p>
                  </div>
                ))}
              </div>
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
                <Button size="sm" variant="outline" onClick={() => setFontSize(Math.max(12, fontSize - 2))} disabled={fontSize <= 12}>-</Button>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((fontSize - 12) / 12) * 100}%` }} />
                </div>
                <Button size="sm" variant="outline" onClick={() => setFontSize(Math.min(24, fontSize + 2))} disabled={fontSize >= 24}>+</Button>
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

            {/* Typing Preferences */}
            <div>
              <Label className="text-base font-semibold flex items-center gap-2 mb-3">
                <Gauge className="h-4 w-4" />
                {isHindi ? "टाइपिंग प्राथमिकताएं" : "Typing Preferences"}
              </Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{isHindi ? "लाइव WPM दिखाएं" : "Show Live WPM"}</p>
                    <p className="text-xs text-muted-foreground">{isHindi ? "टाइपिंग करते समय WPM दिखाएं" : "Display WPM while typing"}</p>
                  </div>
                  <Switch checked={showLiveWpm} onCheckedChange={(v) => handleToggle('showLiveWpm', v, setShowLiveWpm)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{isHindi ? "स्मूथ कैरेट" : "Smooth Caret"}</p>
                    <p className="text-xs text-muted-foreground">{isHindi ? "कैरेट को स्मूथ एनिमेट करें" : "Animate caret smoothly"}</p>
                  </div>
                  <Switch checked={smoothCaret} onCheckedChange={(v) => handleToggle('smoothCaret', v, setSmoothCaret)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{isHindi ? "ध्वनि प्रभाव" : "Sound Effects"}</p>
                    <p className="text-xs text-muted-foreground">{isHindi ? "कीस्ट्रोक ध्वनि चालू करें" : "Enable keystroke sounds"}</p>
                  </div>
                  <Switch checked={soundEnabled} onCheckedChange={(v) => handleToggle('soundEnabled', v, setSoundEnabled)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{isHindi ? "गलती पर रुकें" : "Stop on Error"}</p>
                    <p className="text-xs text-muted-foreground">{isHindi ? "गलत कुंजी पर आगे न बढ़ें" : "Don't advance on wrong key"}</p>
                  </div>
                  <Switch checked={stopOnError} onCheckedChange={(v) => handleToggle('stopOnError', v, setStopOnError)} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Caret Style */}
            <div>
              <Label className="text-base font-semibold flex items-center gap-2 mb-3">
                <Eye className="h-4 w-4" />
                {isHindi ? "कैरेट स्टाइल" : "Caret Style"}
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'line', label: '│', name: isHindi ? 'लाइन' : 'Line' },
                  { value: 'block', label: '█', name: isHindi ? 'ब्लॉक' : 'Block' },
                  { value: 'underline', label: '▁', name: isHindi ? 'अंडरलाइन' : 'Underline' },
                  { value: 'none', label: '○', name: isHindi ? 'कोई नहीं' : 'None' },
                ].map((style) => (
                  <div
                    key={style.value}
                    className={`border rounded-lg p-2 cursor-pointer text-center transition-all ${caretStyle === style.value ? 'border-primary bg-primary/10' : 'hover:bg-accent/50'}`}
                    onClick={() => { setCaretStyle(style.value); localStorage.setItem('caretStyle', style.value); }}
                  >
                    <p className="text-2xl font-mono">{style.label}</p>
                    <p className="text-xs text-muted-foreground">{style.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Highlight Mode */}
            <div>
              <Label className="text-base font-semibold flex items-center gap-2 mb-3">
                <Volume2 className="h-4 w-4" />
                {isHindi ? "हाइलाइट मोड" : "Highlight Mode"}
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'letter', name: isHindi ? 'अक्षर' : 'Letter' },
                  { value: 'word', name: isHindi ? 'शब्द' : 'Word' },
                  { value: 'off', name: isHindi ? 'बंद' : 'Off' },
                ].map((mode) => (
                  <div
                    key={mode.value}
                    className={`border rounded-lg p-2 cursor-pointer text-center transition-all ${highlightMode === mode.value ? 'border-primary bg-primary/10' : 'hover:bg-accent/50'}`}
                    onClick={() => { setHighlightMode(mode.value); localStorage.setItem('highlightMode', mode.value); }}
                  >
                    <p className="text-sm font-medium">{mode.name}</p>
                  </div>
                ))}
              </div>
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
              <Button variant="destructive" onClick={() => setShowClearDialog(true)} className="w-full">
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
