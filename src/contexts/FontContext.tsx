import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type HindiKeyboardLayout = 'inscript' | 'remington';

export const hindiKeyboardLayouts = [
  { name: 'InScript (Standard)', value: 'inscript' as HindiKeyboardLayout },
  { name: 'Remington GAIL', value: 'remington' as HindiKeyboardLayout },
];

interface FontContextType {
  currentFont: string;
  setFont: (font: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  hindiKeyboardFont: string;
  setHindiKeyboardFont: (font: string) => void;
  hindiKeyboardLayout: HindiKeyboardLayout;
  setHindiKeyboardLayout: (layout: HindiKeyboardLayout) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const fonts = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Ubuntu', value: 'Ubuntu, sans-serif' },
  { name: 'Noto Sans', value: 'Noto Sans, sans-serif' },
];

export const hindiKeyboardFonts = [
  { name: 'Mangal', value: 'Mangal, "Noto Sans Devanagari", sans-serif' },
  { name: 'Kruti Dev', value: '"Kruti Dev 010", "Noto Sans Devanagari", sans-serif' },
  { name: 'DevLys', value: '"DevLys 010", "Noto Sans Devanagari", sans-serif' },
  { name: 'Noto Sans Devanagari', value: '"Noto Sans Devanagari", sans-serif' },
];

export const FontProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentFont, setCurrentFont] = useState(localStorage.getItem('selectedFont') || 'Inter, sans-serif');
  const [fontSize, setFontSizeState] = useState(parseInt(localStorage.getItem('fontSize') || '16'));
  const [hindiKeyboardFont, setHindiKeyboardFontState] = useState(
    localStorage.getItem('hindiKeyboardFont') || 'Mangal, "Noto Sans Devanagari", sans-serif'
  );
  const [hindiKeyboardLayout, setHindiKeyboardLayoutState] = useState<HindiKeyboardLayout>(
    (localStorage.getItem('hindiKeyboardLayout') as HindiKeyboardLayout) || 'inscript'
  );

  const setFont = (font: string) => {
    setCurrentFont(font);
    localStorage.setItem('selectedFont', font);
    document.documentElement.style.setProperty('--selected-font', font);
  };

  const setFontSize = (size: number) => {
    setFontSizeState(size);
    localStorage.setItem('fontSize', size.toString());
    document.documentElement.style.fontSize = `${size}px`;
  };

  const setHindiKeyboardFont = (font: string) => {
    setHindiKeyboardFontState(font);
    localStorage.setItem('hindiKeyboardFont', font);
    document.documentElement.style.setProperty('--hindi-keyboard-font', font);
  };

  const setHindiKeyboardLayout = (layout: HindiKeyboardLayout) => {
    setHindiKeyboardLayoutState(layout);
    localStorage.setItem('hindiKeyboardLayout', layout);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--selected-font', currentFont);
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.style.setProperty('--hindi-keyboard-font', hindiKeyboardFont);
  }, []);

  return (
    <FontContext.Provider value={{ currentFont, setFont, fontSize, setFontSize, hindiKeyboardFont, setHindiKeyboardFont, hindiKeyboardLayout, setHindiKeyboardLayout }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
