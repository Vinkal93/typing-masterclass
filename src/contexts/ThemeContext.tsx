import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type UIStyle = 'default' | 'glassmorphism' | 'neumorphism' | 'cyberpunk';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
  uiStyle: UIStyle;
  setUIStyle: (style: UIStyle) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const uiStyles: { name: string; value: UIStyle; description: string; descHi: string }[] = [
  { name: 'Default', value: 'default', description: 'Clean modern look', descHi: 'साफ आधुनिक रूप' },
  { name: 'Glassmorphism', value: 'glassmorphism', description: 'Apple-style frosted glass', descHi: 'Apple जैसा ग्लास इफेक्ट' },
  { name: 'Neumorphism', value: 'neumorphism', description: 'Soft 3D embossed UI', descHi: 'सॉफ्ट 3D इम्बॉस्ड UI' },
  { name: 'Cyberpunk', value: 'cyberpunk', description: 'Neon glow futuristic', descHi: 'नियॉन ग्लो फ्यूचरिस्टिक' },
];

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'system';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  
  const [uiStyle, setUIStyleState] = useState<UIStyle>(() => {
    return (localStorage.getItem('uiStyle') as UIStyle) || 'default';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (newTheme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      setActualTheme(newTheme);
    };

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      applyTheme(systemTheme);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('ui-default', 'ui-glassmorphism', 'ui-neumorphism', 'ui-cyberpunk');
    root.classList.add(`ui-${uiStyle}`);
  }, [uiStyle]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setUIStyle = (style: UIStyle) => {
    setUIStyleState(style);
    localStorage.setItem('uiStyle', style);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme, uiStyle, setUIStyle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
