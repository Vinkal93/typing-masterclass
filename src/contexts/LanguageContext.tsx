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
  
  // Games page translations
  funTypingGames: { en: "Fun Typing Games", hi: "मजेदार टाइपिंग गेम्स" },
  gameTagline: { en: "Learn typing while having fun - improve speed with games", hi: "खेल खेल में टाइपिंग सीखें - मज़े के साथ स्पीड बढ़ाएं" },
  fallingWords: { en: "Falling Words", hi: "गिरते शब्द" },
  fallingWordsDesc: { en: "Words fall from the top - type quickly!", hi: "शब्द ऊपर से गिरते हैं - जल्दी टाइप करें!" },
  fallingWordsInfo: { en: "Words fall from the top. Type them before they reach the bottom. Speed increases with each level!", hi: "शब्द ऊपर से गिरते हैं। नीचे पहुंचने से पहले उन्हें टाइप करें। हर लेवल के साथ स्पीड बढ़ती है!" },
  speedRace: { en: "Speed Race", hi: "स्पीड रेस" },
  speedRaceDesc: { en: "Type fast to move your car forward", hi: "तेज़ी से टाइप करके अपनी कार आगे बढ़ाएं" },
  speedRaceInfo: { en: "Type sentences to move your car forward. Complete laps and beat your best time!", hi: "वाक्य टाइप करके अपनी कार आगे बढ़ाएं। लैप पूरे करें और अपना सर्वश्रेष्ठ समय हराएं!" },
  wordShooter: { en: "Word Shooter", hi: "वर्ड शूटर" },
  wordShooterDesc: { en: "Type words to shoot them", hi: "शब्दों को टाइप करके शूट करें" },
  wordShooterInfo: { en: "Words appear in bubbles. Type to shoot them down!", hi: "शब्द बुलबुले में दिखाई देते हैं। उन्हें शूट करने के लिए टाइप करें!" },
  spaceTyping: { en: "Space Typing", hi: "स्पेस टाइपिंग" },
  spaceTypingDesc: { en: "Words on alien ships - defend!", hi: "एलियन जहाजों पर शब्द - रक्षा करें!" },
  spaceTypingInfo: { en: "Defend Earth by typing words on alien ships before they attack!", hi: "हमला करने से पहले एलियन जहाजों पर शब्द टाइप करके पृथ्वी की रक्षा करें!" },
  comingSoon: { en: "Coming Soon", hi: "जल्द आ रहा है" },
  playNow: { en: "Play Now", hi: "अभी खेलें" },
  
  // Game UI translations
  score: { en: "Score", hi: "स्कोर" },
  level: { en: "Level", hi: "लेवल" },
  words: { en: "Words", hi: "शब्द" },
  bubbles: { en: "Bubbles", hi: "बुलबुले" },
  lives: { en: "Lives", hi: "जीवन" },
  time: { en: "Time", hi: "समय" },
  lap: { en: "Lap", hi: "लैप" },
  speed: { en: "Speed", hi: "स्पीड" },
  distance: { en: "Distance", hi: "दूरी" },
  startGame: { en: "Start Game", hi: "गेम शुरू करें" },
  gameOver: { en: "Game Over!", hi: "गेम खत्म!" },
  finalScore: { en: "Final Score", hi: "अंतिम स्कोर" },
  levelReached: { en: "Level Reached", hi: "लेवल पहुंचा" },
  playAgain: { en: "Play Again", hi: "फिर से खेलें" },
  backToGames: { en: "Back to Games", hi: "गेम्स पर वापस" },
  typeFallingWords: { en: "Type the falling words...", hi: "गिरते शब्दों को टाइप करें..." },
  typeToShoot: { en: "Type to shoot the bubbles...", hi: "बुलबुले शूट करने के लिए टाइप करें..." },
  typeToRace: { en: "Type the sentence to race...", hi: "रेस के लिए वाक्य टाइप करें..." },
  fallingWordsGame: { en: "Falling Words Game", hi: "गिरते शब्द गेम" },
  fallingWordsInstruction: { en: "Type the falling words before they reach the bottom!", hi: "नीचे पहुंचने से पहले गिरते शब्दों को टाइप करें!" },
  wordShooterGame: { en: "Word Shooter", hi: "वर्ड शूटर" },
  wordShooterInstruction: { en: "Bubbles will appear with words. Type the words to shoot them! Don't let too many bubbles fill the screen!", hi: "शब्दों के साथ बुलबुले दिखाई देंगे। उन्हें शूट करने के लिए शब्द टाइप करें! बहुत सारे बुलबुले स्क्रीन को न भरने दें!" },
  speedRaceGame: { en: "Speed Race", hi: "स्पीड रेस" },
  speedRaceInstruction: { en: "Type sentences to move your car forward. Complete 3 laps as fast as you can!", hi: "अपनी कार को आगे बढ़ाने के लिए वाक्य टाइप करें। जितनी जल्दी हो सके 3 लैप पूरे करें!" },
  lapTime: { en: "Lap Time", hi: "लैप समय" },
  bestTime: { en: "Best Time", hi: "सर्वश्रेष्ठ समय" },
  currentLap: { en: "Current Lap", hi: "वर्तमान लैप" },
  raceFinished: { en: "Race Finished!", hi: "रेस पूरी हुई!" },
  totalTime: { en: "Total Time", hi: "कुल समय" },
  typeWords: { en: "Type words...", hi: "शब्द टाइप करें..." },
  shootBubbles: { en: "Type to shoot bubbles...", hi: "बुलबुले शूट करने के लिए टाइप करें..." },
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
