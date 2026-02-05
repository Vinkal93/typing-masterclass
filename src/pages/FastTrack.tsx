import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Zap, Timer, Target, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackMissedKeys } from "@/lib/missedKeysTracker";
import { saveTestRecord } from "@/lib/progressTracker";

// Word pools by difficulty - extensive collection for variety
const englishSentences = [
  // Famous quotes
  "The only way to do great work is to love what you do.",
  "In the middle of difficulty lies opportunity.",
  "Success is not final failure is not fatal it is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It does not matter how slowly you go as long as you do not stop.",
  "The greatest glory in living lies not in never falling but in rising every time we fall.",
  "The way to get started is to quit talking and begin doing.",
  "Your time is limited so do not waste it living someone elses life.",
  "If life were predictable it would cease to be life and be without flavor.",
  "Life is what happens when you are busy making other plans.",
  "The purpose of our lives is to be happy.",
  "You only live once but if you do it right once is enough.",
  "Many of lifes failures are people who did not realize how close they were to success when they gave up.",
  "If you want to live a happy life tie it to a goal not to people or things.",
  "Never let the fear of striking out keep you from playing the game.",
  "Money and success dont change people they merely amplify what is already there.",
  "Not how long but how well you have lived is the main thing.",
  "In three words I can sum up everything I have learned about life it goes on.",
  "Life is really simple but we insist on making it complicated.",
  "The best time to plant a tree was twenty years ago the second best time is now.",
  // Common sentences
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump.",
  "The five boxing wizards jump quickly.",
  "Sphinx of black quartz judge my vow.",
  "Two driven jocks help fax my big quiz.",
  "The job requires extra pluck and zeal from every young wage earner.",
  "A mad boxer shot a quick gloved jab to the jaw of his dizzy opponent.",
  "Crazy Frederick bought many very exquisite opal jewels.",
  "We promptly judged antique ivory buckles for the next prize.",
  // Professional sentences
  "Please schedule a meeting for next Monday at ten in the morning.",
  "The quarterly report shows significant improvement in all departments.",
  "Could you please review the attached documents and provide feedback.",
  "We appreciate your continued support and look forward to working together.",
  "The deadline for the project submission has been extended by two weeks.",
  "Please ensure all team members have access to the shared drive.",
  "The new software update will be deployed during the maintenance window.",
  "Customer satisfaction remains our top priority across all service areas.",
  "The annual budget review meeting will be held in the main conference room.",
  "Please submit your expense reports by the end of this business day.",
  // Tech related
  "The algorithm processes data efficiently using parallel computing techniques.",
  "Version control helps teams collaborate on software development projects.",
  "Cloud computing enables scalable and flexible infrastructure solutions.",
  "Machine learning models require large datasets for accurate predictions.",
  "The database query returned over one million records in seconds.",
  "Responsive design ensures websites work well on all device sizes.",
  "The API endpoint accepts JSON formatted requests and responses.",
  "Encryption protects sensitive data during transmission and storage.",
  "The load balancer distributes traffic across multiple server instances.",
  "Continuous integration automates the testing and deployment process.",
];

const hindiSentences = [
  // Famous Hindi quotes and proverbs
  "करत करत अभ्यास के जड़मति होत सुजान।",
  "जहां चाह वहां राह।",
  "परिश्रम ही सफलता की कुंजी है।",
  "धीरे धीरे रे मना धीरे सब कुछ होय।",
  "अभ्यास से ही सिद्धि प्राप्त होती है।",
  "समय बहुत बलवान है।",
  "जो बीत गई सो बात गई।",
  "आज का काम कल पर मत छोड़ो।",
  "सच्चा मित्र वही है जो विपत्ति में साथ दे।",
  "ज्ञान से बड़ा कोई धन नहीं होता।",
  "मेहनत का फल मीठा होता है।",
  "सब्र का फल मीठा होता है।",
  "एकता में शक्ति है।",
  "अच्छी शुरुआत आधी जीत है।",
  "हार मानना सबसे बड़ी हार है।",
  // Common sentences
  "भारत एक महान देश है जहां विविधता में एकता है।",
  "हिंदी हमारी राष्ट्रभाषा है और हमें इस पर गर्व है।",
  "शिक्षा जीवन का सबसे महत्वपूर्ण भाग है।",
  "प्रौद्योगिकी ने हमारे जीवन को बहुत आसान बना दिया है।",
  "स्वास्थ्य ही सबसे बड़ा धन है इसे संभाल कर रखो।",
  "किताबें हमारी सबसे अच्छी मित्र होती हैं।",
  "प्रकृति की रक्षा करना हमारा कर्तव्य है।",
  "परिवार के साथ समय बिताना बहुत जरूरी है।",
  "सकारात्मक सोच से जीवन में बदलाव आता है।",
  "हमें अपने लक्ष्य पर केंद्रित रहना चाहिए।",
  // Professional Hindi sentences
  "कृपया अपना काम समय पर पूरा करें।",
  "बैठक कल सुबह दस बजे होगी।",
  "आपका सहयोग हमारे लिए बहुत महत्वपूर्ण है।",
  "नई परियोजना अगले महीने शुरू होगी।",
  "कृपया सभी दस्तावेज़ जमा करें।",
];

const englishWords = {
  easy: [
    "the", "and", "for", "are", "but", "not", "you", "all", "can", "had",
    "her", "was", "one", "our", "out", "day", "get", "has", "him", "his",
    "how", "its", "may", "new", "now", "old", "see", "two", "way", "who",
    "boy", "did", "let", "put", "say", "she", "too", "use", "big", "ask",
    "run", "sit", "eat", "red", "blue", "top", "low", "end", "own", "set",
    "try", "why", "man", "few", "act", "add", "age", "ago", "air", "also",
    "any", "arm", "art", "bad", "bag", "bed", "bit", "box", "bus", "car",
    "cat", "cup", "cut", "dog", "ear", "eye", "far", "fat", "fit", "fly",
    "fun", "gas", "god", "got", "gun", "guy", "hat", "hit", "hot", "ice",
    "job", "key", "kid", "law", "leg", "lie", "lot", "map", "mix", "mom",
    "net", "oil", "pay", "pen", "pet", "pop", "pot", "raw", "row", "sea",
    "sit", "six", "sky", "son", "sun", "tax", "tea", "ten", "tie", "tip",
    "top", "toy", "war", "web", "win", "won", "yes", "yet", "zoo", "bar"
  ],
  medium: [
    "about", "after", "again", "being", "below", "between", "both", "come",
    "could", "down", "each", "find", "first", "from", "give", "good", "great",
    "have", "here", "high", "home", "house", "into", "just", "know", "last",
    "life", "little", "long", "made", "make", "more", "most", "much", "must",
    "name", "never", "next", "only", "other", "over", "part", "place", "right",
    "small", "start", "state", "still", "story", "study", "style", "table",
    "teach", "thank", "there", "these", "thing", "think", "those", "three",
    "today", "under", "until", "using", "value", "voice", "water", "watch",
    "week", "where", "which", "while", "white", "whole", "woman", "women",
    "world", "would", "write", "wrong", "years", "young", "yield", "zonal",
    "above", "accept", "across", "action", "active", "actual", "advice", "affect",
    "agency", "almost", "always", "amount", "animal", "answer", "anyone", "appear",
    "around", "attack", "author", "become", "before", "behind", "better", "beyond",
    "black", "blood", "board", "bring", "brown", "build", "buyer", "carry",
    "catch", "cause", "center", "change", "charge", "check", "child", "choice",
    "civil", "claim", "class", "clean", "clear", "close", "coach", "color",
    "coming", "common", "corner", "couple", "course", "cover", "create", "cross",
    "death", "design", "detail", "direct", "doctor", "drive", "early", "earth"
  ],
  hard: [
    "absolutely", "accomplish", "achievement", "acknowledge", "administration",
    "approximately", "background", "beautiful", "beginning", "believe",
    "breakthrough", "calculation", "certificate", "characteristic", "communication",
    "comprehensive", "concentration", "consideration", "contemporary", "contribution",
    "development", "difference", "difficulty", "disappointment", "discrimination",
    "effectiveness", "environment", "established", "examination", "extraordinary",
    "fundamental", "furthermore", "government", "immediately", "implementation",
    "improvement", "independent", "information", "infrastructure", "international",
    "investigation", "manufacturing", "nevertheless", "opportunities", "organization",
    "participation", "particularly", "performance", "philosophical", "possibilities",
    "professional", "psychological", "qualification", "recommendation", "relationship",
    "representative", "responsibility", "significantly", "sophisticated", "specification",
    "straightforward", "substantially", "technological", "transformation", "understanding",
    "unfortunately", "unprecedented", "visualization", "vulnerability", "accomplishment",
    "accountability", "acknowledgement", "administrative", "advantageous", "alternatively",
    "announcement", "appreciation", "architectural", "automatically", "characteristics",
    "circumstances", "collaboration", "communicative", "complementary", "comprehensive",
    "concentration", "configuration", "consequently", "consolidation", "constitutional",
    "controversial", "conventional", "coordination", "corresponding", "counterproductive",
    "demonstration", "determination", "disadvantage", "disappointment", "distinguished",
    "documentation", "effectiveness", "encyclopedia", "entertainment", "entrepreneurial",
    "environmental", "establishment", "experimental", "extraordinary", "functionality"
  ]
};

const hindiWords = {
  easy: [
    "और", "का", "है", "में", "को", "से", "के", "पर", "यह", "था",
    "हम", "वह", "जो", "तो", "भी", "ने", "या", "कि", "एक", "हो",
    "अब", "जब", "कब", "क्या", "कौन", "कहां", "यहां", "वहां", "कैसे", "क्यों",
    "मैं", "तुम", "आप", "उस", "इस", "अपना", "सब", "कुछ", "ज़रा", "बस",
    "आज", "कल", "पहले", "बाद", "ऊपर", "नीचे", "अंदर", "बाहर", "साथ", "बीच",
    "घर", "काम", "दिन", "रात", "समय", "बात", "आदमी", "औरत", "बच्चा", "लोग"
  ],
  medium: [
    "करना", "होना", "जाना", "आना", "देना", "लेना", "कहना", "रहना", "बनना", "चलना",
    "सकता", "चाहिए", "लगता", "मिलना", "पाना", "रखना", "देखना", "सोचना", "समझना", "पहुँचना",
    "बताना", "सुनना", "पढ़ना", "लिखना", "खाना", "पीना", "सोना", "उठना", "बैठना", "खड़ा",
    "अच्छा", "बुरा", "बड़ा", "छोटा", "नया", "पुराना", "सही", "गलत", "आसान", "मुश्किल",
    "ज़रूरी", "खास", "अलग", "एक", "दूसरा", "पहला", "आखिरी", "पूरा", "आधा", "थोड़ा",
    "ज़्यादा", "कम", "सभी", "कोई", "कुछ", "कई", "हर", "किसी", "जैसे", "तरह",
    "शुरू", "खत्म", "पास", "दूर", "सामने", "पीछे", "दाएं", "बाएं", "बीच", "किनारा",
    "जीवन", "दुनिया", "देश", "शहर", "गांव", "स्कूल", "किताब", "पानी", "खाना", "कपड़ा"
  ],
  hard: [
    "प्रशासन", "सम्मान", "व्यवस्था", "अभिव्यक्ति", "प्रतिनिधित्व", "सुविधाजनक",
    "अनुभव", "स्थापित", "संस्थान", "विकास", "सम्बन्ध", "प्रभावशाली",
    "सरकार", "संविधान", "लोकतंत्र", "अधिकार", "स्वतंत्रता", "समानता", "न्याय", "कानून",
    "शिक्षा", "स्वास्थ्य", "अर्थव्यवस्था", "उद्योग", "प्रौद्योगिकी", "विज्ञान", "अनुसंधान", "आविष्कार",
    "पर्यावरण", "प्रदूषण", "जलवायु", "परिवर्तन", "संरक्षण", "सतत", "ऊर्जा", "संसाधन",
    "संस्कृति", "परंपरा", "विरासत", "कला", "साहित्य", "संगीत", "नृत्य", "त्योहार",
    "राजनीति", "चुनाव", "सांसद", "मंत्री", "नीति", "योजना", "बजट", "कर",
    "व्यापार", "निवेश", "उत्पादन", "निर्यात", "आयात", "बाज़ार", "उपभोक्ता", "प्रतिस्पर्धा",
    "प्रौद्योगिकी", "डिजिटल", "इंटरनेट", "सॉफ्टवेयर", "हार्डवेयर", "नेटवर्क", "सुरक्षा", "गोपनीयता"
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
    // 30% chance to use a sentence instead of random words
    if (Math.random() < 0.3) {
      const sentences = isHindi ? hindiSentences : englishSentences;
      // Pick 2-3 random sentences and join them
      const numSentences = Math.floor(Math.random() * 2) + 2;
      const shuffled = [...sentences].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, numSentences).join(' ');
    }
    
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
