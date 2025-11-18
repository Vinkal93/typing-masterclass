import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  isHindi: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, { en: string; hi: string }> = {
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  lessons: { en: "Lessons", hi: "पाठ" },
  games: { en: "Games", hi: "खेल" },
  progress: { en: "Progress", hi: "प्रगति" },
  keyboardGuide: { en: "Keyboard Guide", hi: "कीबोर्ड गाइड" },
  about: { en: "About Developer", hi: "डेवलपर के बारे में" },
  settings: { en: "Settings", hi: "सेटिंग्स" },
  startTypingTest: { en: "Start Typing Test", hi: "टाइपिंग टेस्ट शुरू करें" },
  masterTouchTyping: { en: "Master Touch Typing", hi: "टच टाइपिंग में महारत हासिल करें" },
  improveTyping: { en: "Improve your typing speed and accuracy with interactive lessons and real-time feedback", hi: "इंटरैक्टिव पाठों और रियल-टाइम फीडबैक के साथ अपनी टाइपिंग स्पीड और सटीकता में सुधार करें" },
  todaysTests: { en: "Today's Tests", hi: "आज के टेस्ट" },
  avgWPM: { en: "Avg WPM", hi: "औसत WPM" },
  accuracy: { en: "Accuracy", hi: "सटीकता" },
  totalTests: { en: "Total Tests", hi: "कुल टेस्ट" },
  minuteTest: { en: "Minute Test", hi: "मिनट टेस्ट" },
  quickTest: { en: "Quick typing speed test", hi: "त्वरित टाइपिंग स्पीड टेस्ट" },
  standardTest: { en: "Standard typing test", hi: "मानक टाइपिंग टेस्ट" },
  extendedTest: { en: "Extended typing challenge", hi: "विस्तारित टाइपिंग चैलेंज" },
  customText: { en: "Custom Text", hi: "कस्टम टेक्स्ट" },
  pasteYourText: { en: "Paste your own text", hi: "अपना टेक्स्ट पेस्ट करें" },
  practiceWithOwn: { en: "Practice with your own text", hi: "अपने टेक्स्ट के साथ अभ्यास करें" },
  typingLessons: { en: "Typing Lessons", hi: "टाइपिंग पाठ" },
  structuredLessons: { en: "Structured lessons for all levels", hi: "सभी स्तरों के लिए संरचित पाठ" },
  learnEverything: { en: "Home row, top row, bottom row, numbers, symbols - learn everything", hi: "होम रो, टॉप रो, बॉटम रो, नंबर, सिंबल - सब कुछ सीखें" },
  startLearning: { en: "Start Learning", hi: "सीखना शुरू करें" },
  typingGames: { en: "Typing Games", hi: "टाइपिंग खेल" },
  funGames: { en: "Fun games to improve speed", hi: "स्पीड बढ़ाने के लिए मजेदार खेल" },
  gamesDescription: { en: "Falling words, speed race and much more", hi: "गिरते शब्द, स्पीड रेस और भी बहुत कुछ" },
  playGames: { en: "Play Games", hi: "गेम्स खेलें" },
  progressReport: { en: "Progress Report", hi: "प्रगति रिपोर्ट" },
  trackImprovement: { en: "Track your improvement", hi: "अपनी प्रगति ट्रैक करें" },
  statsGraphs: { en: "Stats, graphs, achievements and certificates", hi: "आंकड़े, ग्राफ, उपलब्धियां और सर्टिफिकेट" },
  viewProgress: { en: "View Progress", hi: "प्रगति देखें" },
  perfectWarmup: { en: "Perfect for a quick warm-up", hi: "त्वरित वार्म-अप के लिए बिल्कुल सही" },
  popularDuration: { en: "Most popular test duration", hi: "सबसे लोकप्रिय टेस्ट अवधि" },
  testEndurance: { en: "Test your endurance", hi: "अपनी सहनशक्ति का परीक्षण करें" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHindi, setIsHindi] = useState(false);

  const toggleLanguage = () => setIsHindi(!isHindi);

  const t = (key: string): string => {
    return translations[key]?.[isHindi ? 'hi' : 'en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ isHindi, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
