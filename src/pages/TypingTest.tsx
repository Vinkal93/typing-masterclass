import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RotateCcw } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TestResult from "@/components/TestResult";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Practice makes perfect when it comes to typing speed and accuracy.",
  "Technology has transformed the way we communicate and work. Every keystroke matters in the digital age. Learning to type efficiently can significantly improve productivity and reduce strain.",
  "Consistent practice is the key to mastering touch typing. Focus on accuracy first, then gradually build up your speed. Remember to maintain proper posture while typing for better results.",
];

interface TestStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  timeSpent: number;
}

const TypingTest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const duration = parseInt(searchParams.get("duration") || "60");

  const [text] = useState(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState<TestStats>({
    wpm: 0,
    cpm: 0,
    accuracy: 100,
    errors: 0,
    timeSpent: 0,
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isStarted) {
      handleFinish();
    }
  }, [isStarted, timeLeft, isFinished]);

  useEffect(() => {
    if (isStarted && !isFinished) {
      const timeElapsed = (duration - timeLeft) / 60;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      const charsTyped = userInput.length;
      
      const errors = calculateErrors();
      const accuracy = userInput.length > 0 
        ? Math.max(0, ((userInput.length - errors) / userInput.length) * 100)
        : 100;

      setStats({
        wpm: timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0,
        cpm: timeElapsed > 0 ? Math.round(charsTyped / timeElapsed) : 0,
        accuracy: Math.round(accuracy),
        errors,
        timeSpent: duration - timeLeft,
      });
    }
  }, [userInput, timeLeft, isStarted, duration]);

  const calculateErrors = () => {
    let errors = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== text[i]) {
        errors++;
      }
    }
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (!isStarted) {
      setIsStarted(true);
    }

    if (value.length <= text.length) {
      setUserInput(value);
    }

    if (value.length === text.length) {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleRestart = () => {
    setUserInput("");
    setTimeLeft(duration);
    setIsStarted(false);
    setIsFinished(false);
    setStats({
      wpm: 0,
      cpm: 0,
      accuracy: 100,
      errors: 0,
      timeSpent: 0,
    });
    inputRef.current?.focus();
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return "text-muted-foreground";
    if (userInput[index] === text[index]) return "text-success";
    return "text-destructive bg-destructive/10";
  };

  if (isFinished) {
    return <TestResult stats={stats} onRestart={handleRestart} duration={duration} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Time Left</p>
            <p className="text-2xl font-bold text-primary">{timeLeft}s</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">WPM</p>
            <p className="text-2xl font-bold text-foreground">{stats.wpm}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">CPM</p>
            <p className="text-2xl font-bold text-foreground">{stats.cpm}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
            <p className="text-2xl font-bold text-success">{stats.accuracy}%</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Errors</p>
            <p className="text-2xl font-bold text-destructive">{stats.errors}</p>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={(userInput.length / text.length) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            {userInput.length} / {text.length} characters
          </p>
        </div>

        {/* Typing Area */}
        <Card className="p-8 mb-6">
          <div className="text-xl leading-relaxed font-mono mb-4 select-none">
            {text.split("").map((char, index) => (
              <span key={index} className={getCharacterClass(index)}>
                {char}
              </span>
            ))}
          </div>
          
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            className="w-full p-4 text-xl font-mono border-2 border-border rounded-lg focus:outline-none focus:border-primary resize-none bg-background"
            placeholder={isStarted ? "" : "Start typing here..."}
            rows={4}
            autoFocus
            spellCheck={false}
          />
        </Card>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button onClick={handleRestart} variant="outline" size="lg">
            <RotateCcw className="h-5 w-5 mr-2" />
            Restart
          </Button>
          {isStarted && (
            <Button onClick={handleFinish} size="lg">
              Finish Test
            </Button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TypingTest;
