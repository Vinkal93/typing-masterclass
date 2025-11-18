import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FontContextType {
  currentFont: string;
  setFont: (font: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
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

export const FontProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentFont, setCurrentFont] = useState(localStorage.getItem('selectedFont') || 'Inter, sans-serif');
  const [fontSize, setFontSizeState] = useState(parseInt(localStorage.getItem('fontSize') || '16'));

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

  useEffect(() => {
    document.documentElement.style.setProperty('--selected-font', currentFont);
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, []);

  return (
    <FontContext.Provider value={{ currentFont, setFont, fontSize, setFontSize }}>
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
