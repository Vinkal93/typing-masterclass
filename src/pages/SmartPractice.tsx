import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, Target, TrendingUp, AlertTriangle, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  getMissedKeysStats, 
  generateDrillText, 
  trackMissedKeys,
  clearMissedKeysData,
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

          {/* Missed Keys Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHindi ? "कुल गलतियाँ" : "Total Misses"}
                  </p>
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
                  <p className="text-sm text-muted-foreground">
                    {isHindi ? "समस्याग्रस्त Keys" : "Problem Keys"}
                  </p>
                  <p className="text-2xl font-bold text-foreground">{missedStats.uniqueKeys}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-500/10">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHindi ? "फोकस क्षेत्र" : "Focus Areas"}
                  </p>
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
              <h3 className="font-semibold text-foreground mb-4">
                {isHindi ? "सबसे ज्यादा मिस की गई Keys" : "Most Missed Keys"}
              </h3>
              <div className="space-y-3">
                {missedStats.topMissed.slice(0, 5).map((keyData, index) => (
                  <div key={keyData.key} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-mono text-xl font-bold">
                      {keyData.key === ' ' ? '␣' : keyData.key.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          {isHindi ? `${keyData.count} बार मिस` : `Missed ${keyData.count} times`}
                        </span>
                        <span className="text-sm font-medium">
                          {Math.round((keyData.count / missedStats.totalMisses) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(keyData.count / missedStats.topMissed[0].count) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      {isHindi ? "डेटा साफ़ करें" : "Clear Data"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {isHindi ? "डेटा साफ़ करें?" : "Clear missed keys data?"}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {isHindi 
                          ? "यह आपके सभी missed keys डेटा को हटा देगा। यह क्रिया पूर्ववत नहीं की जा सकती।"
                          : "This will remove all your tracked missed keys. This action cannot be undone."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{isHindi ? "रद्द करें" : "Cancel"}</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearData}>
                        {isHindi ? "साफ़ करें" : "Clear"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          )}

          {/* Drill Area */}
          {!drillText ? (
            <Card className="p-8 text-center">
              <Target className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {isHindi ? "स्मार्ट ड्रिल शुरू करें" : "Start Smart Drill"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {missedStats.topMissed.length > 0
                  ? (isHindi 
                      ? `आपके ${missedStats.topMissed.slice(0, 3).map(k => k.key.toUpperCase()).join(', ')} keys पर फोकस करेगा`
                      : `Will focus on your ${missedStats.topMissed.slice(0, 3).map(k => k.key.toUpperCase()).join(', ')} keys`)
                  : (isHindi
                      ? "सामान्य टाइपिंग प्रैक्टिस से शुरू करें"
                      : "Start with general typing practice")}
              </p>
              <Button onClick={startDrill} size="lg">
                <Zap className="h-5 w-5 mr-2" />
                {isHindi ? "ड्रिल शुरू करें" : "Start Drill"}
              </Button>
            </Card>
          ) : (
            <>
              {/* Live Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">WPM</p>
                  <p className="text-2xl font-bold text-foreground">{stats.wpm}</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-green-500">{stats.accuracy}%</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Errors</p>
                  <p className="text-2xl font-bold text-destructive">{stats.errors}</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Time</p>
                  <p className="text-2xl font-bold text-foreground">{stats.timeSpent}s</p>
                </Card>
              </div>

              {/* Typing Area */}
              <Card className="p-8 mb-6">
                {isFinished ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {isHindi ? "ड्रिल पूरी!" : "Drill Complete!"}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {isHindi 
                        ? `${stats.wpm} WPM, ${stats.accuracy}% accuracy के साथ`
                        : `Finished with ${stats.wpm} WPM and ${stats.accuracy}% accuracy`}
                    </p>
                    <Button onClick={startDrill} size="lg">
                      <RotateCcw className="h-5 w-5 mr-2" />
                      {isHindi ? "नई ड्रिल" : "New Drill"}
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-xl leading-relaxed font-mono mb-6 select-none">
                      {drillText.split("").map((char, index) => (
                        <span key={index} className={getCharacterClass(index)}>
                          {char}
                        </span>
                      ))}
                    </div>
                    
                    <textarea
                      ref={inputRef}
                      value={userInput}
                      onChange={handleInputChange}
                      className="w-full p-4 text-xl font-mono border-2 border-border rounded-lg focus:outline-none focus:border-primary resize-none bg-background text-foreground"
                      placeholder={isHindi ? "यहां टाइप करें..." : "Type here..."}
                      rows={4}
                      autoFocus
                      spellCheck={false}
                    />

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {userInput.length} / {drillText.length} characters
                      </span>
                      <Button onClick={startDrill} variant="outline">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        {isHindi ? "नई ड्रिल" : "New Drill"}
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SmartPractice;
