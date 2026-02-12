import { useState, useEffect, useCallback } from "react";

export interface TypingSettings {
  caretStyle: 'line' | 'block' | 'underline' | 'none';
  highlightMode: 'letter' | 'word' | 'off';
  smoothCaret: boolean;
  stopOnError: boolean;
  soundEnabled: boolean;
  showLiveWpm: boolean;
}

export function useTypingSettings(): TypingSettings {
  const [settings, setSettings] = useState<TypingSettings>(() => ({
    caretStyle: (localStorage.getItem('caretStyle') as TypingSettings['caretStyle']) || 'line',
    highlightMode: (localStorage.getItem('highlightMode') as TypingSettings['highlightMode']) || 'letter',
    smoothCaret: localStorage.getItem('smoothCaret') !== 'false',
    stopOnError: localStorage.getItem('stopOnError') === 'true',
    soundEnabled: localStorage.getItem('soundEnabled') === 'true',
    showLiveWpm: localStorage.getItem('showLiveWpm') !== 'false',
  }));

  useEffect(() => {
    const handleStorage = () => {
      setSettings({
        caretStyle: (localStorage.getItem('caretStyle') as TypingSettings['caretStyle']) || 'line',
        highlightMode: (localStorage.getItem('highlightMode') as TypingSettings['highlightMode']) || 'letter',
        smoothCaret: localStorage.getItem('smoothCaret') !== 'false',
        stopOnError: localStorage.getItem('stopOnError') === 'true',
        soundEnabled: localStorage.getItem('soundEnabled') === 'true',
        showLiveWpm: localStorage.getItem('showLiveWpm') !== 'false',
      });
    };
    window.addEventListener('storage', handleStorage);
    // Also listen for custom event for same-tab changes
    window.addEventListener('typingSettingsChanged', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('typingSettingsChanged', handleStorage);
    };
  }, []);

  return settings;
}

export function getCaretClassName(caretStyle: string, smoothCaret: boolean, isCurrentChar: boolean): string {
  if (!isCurrentChar) return '';
  
  const smooth = smoothCaret ? 'transition-all duration-150' : '';
  
  switch (caretStyle) {
    case 'line':
      return `border-l-2 border-primary ${smooth}`;
    case 'block':
      return `bg-primary/30 text-primary-foreground ${smooth}`;
    case 'underline':
      return `border-b-2 border-primary ${smooth}`;
    case 'none':
      return '';
    default:
      return `border-l-2 border-primary ${smooth}`;
  }
}

export function getHighlightClassName(
  highlightMode: string,
  index: number,
  currentIndex: number,
  text: string,
  userInput: string
): string {
  // Already typed characters
  if (index < userInput.length) {
    if (userInput[index] === text[index]) return "text-primary";
    return "text-destructive bg-destructive/10";
  }
  
  // Upcoming characters based on highlight mode
  if (highlightMode === 'off') return "text-muted-foreground";
  
  if (highlightMode === 'word' && index >= currentIndex) {
    // Find current word boundaries
    let wordStart = currentIndex;
    while (wordStart > 0 && text[wordStart - 1] !== ' ') wordStart--;
    let wordEnd = currentIndex;
    while (wordEnd < text.length && text[wordEnd] !== ' ') wordEnd++;
    
    if (index >= wordStart && index < wordEnd) {
      return "text-foreground bg-accent/40 rounded-sm";
    }
    return "text-muted-foreground";
  }
  
  if (highlightMode === 'letter' && index === currentIndex) {
    return "text-foreground bg-accent/50 rounded-sm";
  }
  
  return "text-muted-foreground";
}
