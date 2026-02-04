import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Zap, Timer, Target, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackMissedKeys } from "@/lib/missedKeysTracker";
import { saveTestRecord } from "@/lib/progressTracker";

// Word pools by difficulty
const englishWords = {
  easy: [
    "the", "and", "for", "are", "but", "not", "you", "all", "can", "had",
    "her", "was", "one", "our", "out", "day", "get", "has", "him", "his",
    "how", "its", "may", "new", "now", "old", "see", "two", "way", "who",
    "boy", "did", "let", "put", "say", "she", "too", "use", "big", "ask"
  ],
  medium: [
    "about", "after", "again", "being", "below", "between", "both", "come",
    "could", "down", "each", "find", "first", "from", "give", "good", "great",
    "have", "here", "high", "home", "house", "into", "just", "know", "last",
    "life", "little", "long", "made", "make", "more", "most", "much", "must",
    "name", "never", "next", "only", "other", "over", "part", "place", "right"
  ],
  hard: [
    "absolutely", "accomplish", "achievement", "acknowledge", "administration",
    "approximately", "background", "beautiful", "beginning", "believe",
    "breakthrough", "calculation", "certificate", "characteristic", "communication",
    "comprehensive", "concentration", "consideration", "contemporary", "contribution",
    "development", "difference", "difficulty", "disappointment", "discrimination",
    "effectiveness", "environment", "established", "examination", "extraordinary"
  ]
};

const hindiWords = {
  easy: [
    "और", "का", "है", "में", "को", "से", "के", "पर", "यह", "था",
    "हम", "वह", "जो", "तो", "भी", "ने", "या", "कि", "एक", "हो"
  ],
  medium: [
    "करना", "होना", "जाना", "आना", "देना", "लेना", "कहना", "रहना", "बनना", "चलना",
    "सकता", "चाहिए", "लगता", "मिलना", "पाना", "रखना", "देखना", "सोचना", "समझना", "पहुँचना"
  ],
  hard: [
    "प्रशासन", "सम्मान", "व्यवस्था", "अभिव्यक्ति", "प्रतिनिधित्व", "सुविधाजनक",
    "अनुभव", "स्थापित", "संस्थान", "विकास", "सम्बन्ध", "प्रभावशाली"
  ]
};

interface TestStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  timeSpent: number;
}

const FastTrack = () => {
  const { isHindi } = useLanguage();
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const [bestWpm, setBestWpm] = useState(0);
  const [avgWpm, setAvgWpm] = useState(0);
  const [totalWpmSum, setTotalWpmSum] = useState(0);
  const [stats, setStats] = useState<TestStats>({
    wpm: 0,
    cpm: 0,
    accuracy: 100,
    errors: 0,
    timeSpent: 0,
  });
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const generateParagraph = useCallback((wordCount: number = 30) => {
    const words = isHindi ? hindiWords : englishWords;
    const pool = [...words.easy, ...(difficulty !== 'easy' ? words.medium : []), ...(difficulty === 'hard' ? words.hard : [])];
    
    const result: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      const randomWord = pool[Math.floor(Math.random() * pool.length)];
      result.push(randomWord);
    }
    return result.join(' ');
  }, [isHindi, difficulty]);

  const startNewTest = useCallback(() => {
    const newText = generateParagraph(35);
    setText(newText);
    setUserInput("");
    setStartTime(null);
    setIsActive(false);
    setStats({
      wpm: 0,
      cpm: 0,
      accuracy: 100,
      errors: 0,
      timeSpent: 0,
    });
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [generateParagraph]);

  useEffect(() => {
    startNewTest();
  }, [difficulty, isHindi]);

  useEffect(() => {
    if (userInput.length > 0 && !startTime) {
      setStartTime(Date.now());
      setIsActive(true);
    }

    if (userInput.length > 0 && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      const charsTyped = userInput.length;
      
      let errors = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] !== text[i]) {
          errors++;
        }
      }
      
      const accuracy = userInput.length > 0 
        ? Math.max(0, ((userInput.length - errors) / userInput.length) * 100)
        : 100;

      const currentWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;

      setStats({
        wpm: currentWpm,
        cpm: timeElapsed > 0 ? Math.round(charsTyped / timeElapsed) : 0,
        accuracy: Math.round(accuracy),
        errors,
        timeSpent: Math.round((Date.now() - startTime) / 1000),
      });
    }
  }, [userInput, startTime, text]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (value.length <= text.length) {
      setUserInput(value);
    }

    // Auto-complete when finished
    if (value.length === text.length) {
      finishTest();
    }
  };

  const finishTest = () => {
    // Track missed keys
    trackMissedKeys(text, userInput);
    
    // Update stats
    const newTestCount = testCount + 1;
    setTestCount(newTestCount);
    
    const newTotalWpm = totalWpmSum + stats.wpm;
    setTotalWpmSum(newTotalWpm);
    setAvgWpm(Math.round(newTotalWpm / newTestCount));
    
    if (stats.wpm > bestWpm) {
      setBestWpm(stats.wpm);
    }
    
    // Save progress
    saveTestRecord({
      type: 'test',
      wpm: stats.wpm,
      cpm: stats.cpm,
      accuracy: stats.accuracy,
      errors: stats.errors,
      timeSpent: stats.timeSpent,
      title: 'Fast Track'
    });
    
    // Auto-progress difficulty
    if (stats.accuracy >= 95 && stats.wpm >= 40 && difficulty === 'easy') {
      setDifficulty('medium');
    } else if (stats.accuracy >= 90 && stats.wpm >= 50 && difficulty === 'medium') {
      setDifficulty('hard');
    }
    
    // Start new test immediately
    setTimeout(startNewTest, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      startNewTest();
    }
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return "text-muted-foreground";
    if (userInput[index] === text[index]) return "text-primary";
    return "text-destructive bg-destructive/10";
  };

  // Get current character for cursor effect
  const currentIndex = userInput.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              <Zap className="h-8 w-8 text-primary" />
              Fast Track
            </h1>
            <p className="text-muted-foreground">
              {isHindi 
                ? "Tab दबाएं नया paragraph पाने के लिए • बस टाइप करते रहें"
                : "Press Tab for new paragraph • Just keep typing"}
            </p>
          </div>

          {/* Session Stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <Card className="p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Target className="h-4 w-4" />
                <span className="text-xs">{isHindi ? "टेस्ट" : "Tests"}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{testCount}</p>
            </Card>
            <Card className="p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">{isHindi ? "सर्वश्रेष्ठ" : "Best"}</span>
              </div>
              <p className="text-xl font-bold text-primary">{bestWpm}</p>
            </Card>
            <Card className="p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Timer className="h-4 w-4" />
                <span className="text-xs">{isHindi ? "औसत" : "Avg"}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{avgWpm}</p>
            </Card>
            <Card className="p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Zap className="h-4 w-4" />
                <span className="text-xs">{isHindi ? "स्तर" : "Level"}</span>
              </div>
              <p className="text-xl font-bold capitalize text-foreground">
                {difficulty === 'easy' ? '🟢' : difficulty === 'medium' ? '🟡' : '🔴'}
              </p>
            </Card>
          </div>

          {/* Difficulty Selector */}
          <div className="flex justify-center gap-2 mb-6">
            {(['easy', 'medium', 'hard'] as const).map((d) => (
              <Button
                key={d}
                variant={difficulty === d ? "default" : "outline"}
                size="sm"
                onClick={() => setDifficulty(d)}
              >
                {d === 'easy' ? (isHindi ? 'आसान' : 'Easy') : 
                 d === 'medium' ? (isHindi ? 'मध्यम' : 'Medium') : 
                 (isHindi ? 'कठिन' : 'Hard')}
              </Button>
            ))}
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">WPM</p>
              <p className="text-3xl font-bold text-foreground">{stats.wpm}</p>
            </Card>
            <Card className="p-4 text-center bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">CPM</p>
              <p className="text-3xl font-bold text-foreground">{stats.cpm}</p>
            </Card>
            <Card className="p-4 text-center bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
              <p className="text-3xl font-bold text-primary">{stats.accuracy}%</p>
            </Card>
            <Card className="p-4 text-center bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">Time</p>
              <p className="text-3xl font-bold text-foreground">{stats.timeSpent}s</p>
            </Card>
          </div>

          {/* Typing Area - Monkeytype Style */}
          <Card className="p-8 mb-6 bg-card">
            <div 
              className="text-2xl md:text-3xl leading-relaxed font-mono select-none mb-8 tracking-wide"
              style={{ wordSpacing: '0.3em' }}
            >
              {text.split("").map((char, index) => (
                <span 
                  key={index} 
                  className={`${getCharacterClass(index)} ${index === currentIndex ? 'border-l-2 border-primary animate-pulse' : ''}`}
                >
                  {char}
                </span>
              ))}
            </div>
            
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full p-4 text-xl font-mono border-2 border-border rounded-lg focus:outline-none focus:border-primary resize-none bg-background text-foreground opacity-0 absolute"
              style={{ height: 0, overflow: 'hidden' }}
              autoFocus
              spellCheck={false}
            />

            {/* Click to focus hint */}
            {!isActive && userInput.length === 0 && (
              <div 
                className="text-center text-muted-foreground cursor-pointer py-4"
                onClick={() => inputRef.current?.focus()}
              >
                {isHindi ? "टाइप करना शुरू करें..." : "Click here or start typing..."}
              </div>
            )}
          </Card>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button onClick={startNewTest} variant="outline" size="lg">
              <RotateCcw className="h-5 w-5 mr-2" />
              {isHindi ? "नया (Tab)" : "New (Tab)"}
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {userInput.length} / {text.length} • {Math.round((userInput.length / text.length) * 100)}%
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FastTrack;
