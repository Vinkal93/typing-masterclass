import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Target, TrendingUp, AlertTriangle, Zap, Languages } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  getMissedKeysStats, 
  generateDrillText, 
  trackMissedKeys,
  clearMissedKeysData,
  generateRemingtonDrill,
  remingtonGailDrills,
  MissedKeyData
} from "@/lib/missedKeysTracker";
import { saveTestRecord } from "@/lib/progressTracker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DrillStats {
  wpm: number;
  accuracy: number;
  errors: number;
  timeSpent: number;
}

const SmartPractice = () => {
  const { isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState("smart");
  const [remingtonCategory, setRemingtonCategory] = useState<keyof typeof remingtonGailDrills>('homeRow');
  const [drillText, setDrillText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState<DrillStats>({
    wpm: 0,
    accuracy: 100,
    errors: 0,
    timeSpent: 0,
  });
  const [missedStats, setMissedStats] = useState<{
    totalMisses: number;
    uniqueKeys: number;
    topMissed: MissedKeyData[];
  }>({
    totalMisses: 0,
    uniqueKeys: 0,
    topMissed: [],
  });
  
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadMissedStats();
  }, []);

  const loadMissedStats = () => {
    const stats = getMissedKeysStats();
    setMissedStats({
      totalMisses: stats.totalMisses,
      uniqueKeys: stats.uniqueKeys,
      topMissed: stats.topMissed,
    });
  };

  useEffect(() => {
    if (userInput.length > 0 && !startTime) {
      setStartTime(Date.now());
      setIsActive(true);
    }

    if (userInput.length > 0 && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      
      let errors = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] !== drillText[i]) {
          errors++;
        }
      }
      
      const accuracy = userInput.length > 0 
        ? Math.max(0, ((userInput.length - errors) / userInput.length) * 100)
        : 100;

      setStats({
        wpm: timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0,
        accuracy: Math.round(accuracy),
        errors,
        timeSpent: Math.round((Date.now() - startTime) / 1000),
      });
    }
  }, [userInput, startTime, drillText]);

  const startDrill = () => {
    const text = generateDrillText(150);
    setDrillText(text);
    setUserInput("");
    setStartTime(null);
    setIsActive(false);
    setIsFinished(false);
    setStats({ wpm: 0, accuracy: 100, errors: 0, timeSpent: 0 });
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const startRemingtonDrill = (category?: keyof typeof remingtonGailDrills) => {
    const cat = category || remingtonCategory;
    setRemingtonCategory(cat);
    const text = generateRemingtonDrill(cat, 4);
    setDrillText(text);
    setUserInput("");
    setStartTime(null);
    setIsActive(false);
    setIsFinished(false);
    setStats({ wpm: 0, accuracy: 100, errors: 0, timeSpent: 0 });
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (value.length <= drillText.length) {
      setUserInput(value);
    }

    if (value.length === drillText.length) {
      finishDrill();
    }
  };

  const finishDrill = () => {
    setIsFinished(true);
    setIsActive(false);
    
    // Track missed keys
    trackMissedKeys(drillText, userInput);
    loadMissedStats();
    
    // Save to progress
    saveTestRecord({
      type: 'drill',
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      errors: stats.errors,
      timeSpent: stats.timeSpent,
      title: 'Smart Practice Drill'
    });
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return "text-muted-foreground";
    if (userInput[index] === drillText[index]) return "text-green-500";
    return "text-red-500 bg-red-500/10";
  };

  const handleClearData = () => {
    clearMissedKeysData();
    loadMissedStats();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              <Target className="h-8 w-8 text-primary" />
              {isHindi ? "स्मार्ट प्रैक्टिस" : "Smart Practice"}
            </h1>
            <p className="text-muted-foreground">
              {isHindi 
                ? "आपके सबसे कठिन keys पर आधारित कस्टम ड्रिल"
                : "Custom drills based on your most challenging keys"}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setDrillText(""); }} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="smart" className="gap-2">
                <Target className="h-4 w-4" />
                {isHindi ? "स्मार्ट ड्रिल" : "Smart Drill"}
              </TabsTrigger>
              <TabsTrigger value="remington" className="gap-2">
                <Languages className="h-4 w-4" />
                {isHindi ? "रेमिंगटन GAIL" : "Remington GAIL"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="smart">
              {/* Missed Keys Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-destructive/10">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isHindi ? "कुल गलतियाँ" : "Total Misses"}</p>
                      <p className="text-2xl font-bold text-foreground">{missedStats.totalMisses}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isHindi ? "समस्याग्रस्त Keys" : "Problem Keys"}</p>
                      <p className="text-2xl font-bold text-foreground">{missedStats.uniqueKeys}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-success/10">
                      <TrendingUp className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isHindi ? "फोकस क्षेत्र" : "Focus Areas"}</p>
                      <p className="text-lg font-bold text-foreground">
                        {missedStats.topMissed.slice(0, 3).map(k => k.key.toUpperCase()).join(', ') || 'None'}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Top Missed Keys */}
              {missedStats.topMissed.length > 0 && (
                <Card className="p-6 mb-8">
                  <h3 className="font-semibold text-foreground mb-4">{isHindi ? "सबसे ज्यादा मिस की गई Keys" : "Most Missed Keys"}</h3>
                  <div className="space-y-3">
                    {missedStats.topMissed.slice(0, 5).map((keyData) => (
                      <div key={keyData.key} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-mono text-xl font-bold">
                          {keyData.key === ' ' ? '␣' : keyData.key.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-muted-foreground">{isHindi ? `${keyData.count} बार मिस` : `Missed ${keyData.count} times`}</span>
                            <span className="text-sm font-medium">{Math.round((keyData.count / missedStats.totalMisses) * 100)}%</span>
                          </div>
                          <Progress value={(keyData.count / missedStats.topMissed[0].count) * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">{isHindi ? "डेटा साफ़ करें" : "Clear Data"}</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{isHindi ? "डेटा साफ़ करें?" : "Clear missed keys data?"}</AlertDialogTitle>
                          <AlertDialogDescription>{isHindi ? "यह आपके सभी missed keys डेटा को हटा देगा।" : "This will remove all your tracked missed keys. This cannot be undone."}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{isHindi ? "रद्द करें" : "Cancel"}</AlertDialogCancel>
                          <AlertDialogAction onClick={handleClearData}>{isHindi ? "साफ़ करें" : "Clear"}</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
              )}

              {/* Smart Drill Area */}
              {!drillText ? (
                <Card className="p-8 text-center">
                  <Target className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">{isHindi ? "स्मार्ट ड्रिल शुरू करें" : "Start Smart Drill"}</h2>
                  <p className="text-muted-foreground mb-6">
                    {missedStats.topMissed.length > 0
                      ? (isHindi ? `आपके ${missedStats.topMissed.slice(0, 3).map(k => k.key.toUpperCase()).join(', ')} keys पर फोकस करेगा` : `Will focus on your ${missedStats.topMissed.slice(0, 3).map(k => k.key.toUpperCase()).join(', ')} keys`)
                      : (isHindi ? "सामान्य टाइपिंग प्रैक्टिस से शुरू करें" : "Start with general typing practice")}
                  </p>
                  <Button onClick={startDrill} size="lg">
                    <Zap className="h-5 w-5 mr-2" />
                    {isHindi ? "ड्रिल शुरू करें" : "Start Drill"}
                  </Button>
                </Card>
              ) : (
                <DrillTypingArea stats={stats} isFinished={isFinished} drillText={drillText} userInput={userInput} onInputChange={handleInputChange} onRestart={startDrill} inputRef={inputRef} getCharacterClass={getCharacterClass} isHindi={isHindi} />
              )}
            </TabsContent>

            <TabsContent value="remington">
              {/* Remington GAIL Categories */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {([
                  { key: 'homeRow', label: isHindi ? 'होम रो' : 'Home Row', emoji: '🏠' },
                  { key: 'topRow', label: isHindi ? 'टॉप रो' : 'Top Row', emoji: '⬆️' },
                  { key: 'bottomRow', label: isHindi ? 'बॉटम रो' : 'Bottom Row', emoji: '⬇️' },
                  { key: 'matras', label: isHindi ? 'मात्राएं' : 'Matras', emoji: '🔤' },
                  { key: 'conjuncts', label: isHindi ? 'संयुक्त अक्षर' : 'Conjuncts', emoji: '🔗' },
                  { key: 'numbers', label: isHindi ? 'अंक' : 'Numbers', emoji: '🔢' },
                  { key: 'sentences', label: isHindi ? 'वाक्य' : 'Sentences', emoji: '📝' },
                ] as { key: keyof typeof remingtonGailDrills; label: string; emoji: string }[]).map((cat) => (
                  <Card
                    key={cat.key}
                    className={`p-4 cursor-pointer transition-all hover:scale-105 text-center ${remingtonCategory === cat.key && drillText ? 'border-primary bg-primary/10' : ''}`}
                    onClick={() => startRemingtonDrill(cat.key)}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <p className="text-sm font-medium mt-1">{cat.label}</p>
                  </Card>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isHindi 
                    ? "रेमिंगटन GAIL लेआउट सरकारी परीक्षाओं (SSC, CPCT, RSCIT) में उपयोग होता है। ऊपर किसी भी श्रेणी पर क्लिक करके अभ्यास शुरू करें।"
                    : "Remington GAIL layout is used in government exams (SSC, CPCT, RSCIT). Click any category above to start practicing."}
                </p>
              </div>

              {drillText ? (
                <DrillTypingArea stats={stats} isFinished={isFinished} drillText={drillText} userInput={userInput} onInputChange={handleInputChange} onRestart={() => startRemingtonDrill()} inputRef={inputRef} getCharacterClass={getCharacterClass} isHindi={isHindi} />
              ) : (
                <Card className="p-8 text-center">
                  <Languages className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">{isHindi ? "रेमिंगटन GAIL अभ्यास" : "Remington GAIL Practice"}</h2>
                  <p className="text-muted-foreground mb-6">{isHindi ? "ऊपर किसी भी श्रेणी पर क्लिक करके शुरू करें" : "Click any category above to begin"}</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Shared Drill Typing Area component
const DrillTypingArea = ({ stats, isFinished, drillText, userInput, onInputChange, onRestart, inputRef, getCharacterClass, isHindi }: {
  stats: DrillStats; isFinished: boolean; drillText: string; userInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRestart: () => void; inputRef: React.RefObject<HTMLTextAreaElement>;
  getCharacterClass: (i: number) => string; isHindi: boolean;
}) => (
  <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground mb-1">WPM</p>
        <p className="text-2xl font-bold text-foreground">{stats.wpm}</p>
      </Card>
      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground mb-1">{isHindi ? "सटीकता" : "Accuracy"}</p>
        <p className="text-2xl font-bold text-success">{stats.accuracy}%</p>
      </Card>
      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground mb-1">{isHindi ? "गलतियाँ" : "Errors"}</p>
        <p className="text-2xl font-bold text-destructive">{stats.errors}</p>
      </Card>
      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground mb-1">{isHindi ? "समय" : "Time"}</p>
        <p className="text-2xl font-bold text-foreground">{stats.timeSpent}s</p>
      </Card>
    </div>
    <Card className="p-8 mb-6">
      {isFinished ? (
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{isHindi ? "ड्रिल पूरी!" : "Drill Complete!"}</h2>
          <p className="text-muted-foreground mb-6">{isHindi ? `${stats.wpm} WPM, ${stats.accuracy}% accuracy के साथ` : `Finished with ${stats.wpm} WPM and ${stats.accuracy}% accuracy`}</p>
          <Button onClick={onRestart} size="lg">
            <RotateCcw className="h-5 w-5 mr-2" />
            {isHindi ? "नई ड्रिल" : "New Drill"}
          </Button>
        </div>
      ) : (
        <>
          <div className="text-xl leading-relaxed font-mono mb-6 select-none" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            {drillText.split("").map((char, index) => (
              <span key={index} className={getCharacterClass(index)}>{char}</span>
            ))}
          </div>
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={onInputChange}
            className="w-full p-4 text-xl font-mono border-2 border-border rounded-lg focus:outline-none focus:border-primary resize-none bg-background text-foreground"
            placeholder={isHindi ? "यहां टाइप करें..." : "Type here..."}
            rows={4}
            autoFocus
            spellCheck={false}
          />
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{userInput.length} / {drillText.length} {isHindi ? "अक्षर" : "characters"}</span>
            <Button onClick={onRestart} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              {isHindi ? "नई ड्रिल" : "New Drill"}
            </Button>
          </div>
        </>
      )}
    </Card>
  </>
);

export default SmartPractice;
