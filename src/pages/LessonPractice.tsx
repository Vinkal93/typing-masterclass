import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, ArrowRight, CheckCircle2, XCircle, Zap, Target, Clock, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getLessonById, getNextLesson, CurriculumLesson } from "@/lib/curriculumData";
import { useStudent } from "@/contexts/StudentContext";
import { saveTestRecord } from "@/lib/progressTracker";

const KEYBOARD_ROWS = [
  ['`','1','2','3','4','5','6','7','8','9','0','-','='],
  ['Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],
  ['A','S','D','F','G','H','J','K','L',';','\''],
  ['Z','X','C','V','B','N','M',',','.','/'],
  [' '],
];

const FINGER_MAP: Record<string, string> = {
  '`':'left-pinky','1':'left-pinky','2':'left-ring','3':'left-middle','4':'left-index','5':'left-index',
  '6':'right-index','7':'right-index','8':'right-middle','9':'right-ring','0':'right-pinky',
  'Q':'left-pinky','W':'left-ring','E':'left-middle','R':'left-index','T':'left-index',
  'Y':'right-index','U':'right-index','I':'right-middle','O':'right-ring','P':'right-pinky',
  'A':'left-pinky','S':'left-ring','D':'left-middle','F':'left-index','G':'left-index',
  'H':'right-index','J':'right-index','K':'right-middle','L':'right-ring',';':'right-pinky','\'':'right-pinky',
  'Z':'left-pinky','X':'left-ring','C':'left-middle','V':'left-index','B':'left-index',
  'N':'right-index','M':'right-index',',':'right-middle','.':'right-ring','/':'right-pinky',
  ' ':'thumb',
};

const FINGER_COLORS: Record<string, string> = {
  'left-pinky': 'bg-red-400/30 border-red-400',
  'left-ring': 'bg-orange-400/30 border-orange-400',
  'left-middle': 'bg-yellow-400/30 border-yellow-400',
  'left-index': 'bg-green-400/30 border-green-400',
  'right-index': 'bg-cyan-400/30 border-cyan-400',
  'right-middle': 'bg-blue-400/30 border-blue-400',
  'right-ring': 'bg-purple-400/30 border-purple-400',
  'right-pinky': 'bg-pink-400/30 border-pink-400',
  'thumb': 'bg-gray-400/30 border-gray-400',
};

const LessonPractice = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { profile, completeLesson, isPremium } = useStudent();
  const lesson = lessonId ? getLessonById(lessonId) : undefined;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [charStates, setCharStates] = useState<('pending' | 'correct' | 'wrong')[]>([]);
  const [lastWrong, setLastWrong] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const text = lesson?.practiceText || '';

  useEffect(() => {
    setCharStates(new Array(text.length).fill('pending'));
    setCurrentIndex(0);
    setErrors(0);
    setCorrectChars(0);
    setStartTime(null);
    setEndTime(null);
    setIsComplete(false);
    setLastWrong(false);
  }, [text]);

  useEffect(() => {
    containerRef.current?.focus();
  }, [lesson]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (isComplete || !text) return;
    if (e.key === 'Tab' || e.key === 'Escape') return;
    e.preventDefault();

    if (!startTime) setStartTime(Date.now());

    if (e.key === 'Backspace') {
      // Don't allow backspace
      return;
    }

    const expected = text[currentIndex];
    const typed = e.key;

    if (typed.length !== 1 && typed !== ' ') return;

    const newStates = [...charStates];

    if (typed === expected) {
      newStates[currentIndex] = 'correct';
      setCharStates(newStates);
      setCorrectChars(prev => prev + 1);
      setCurrentIndex(prev => prev + 1);
      setLastWrong(false);

      if (currentIndex + 1 >= text.length) {
        const end = Date.now();
        setEndTime(end);
        setIsComplete(true);
      }
    } else {
      newStates[currentIndex] = 'wrong';
      setCharStates(newStates);
      setErrors(prev => prev + 1);
      setLastWrong(true);
      // Move forward even on wrong
      setCurrentIndex(prev => prev + 1);

      if (currentIndex + 1 >= text.length) {
        const end = Date.now();
        setEndTime(end);
        setIsComplete(true);
      }
    }
  }, [currentIndex, charStates, text, startTime, isComplete]);

  const elapsed = startTime ? ((endTime || Date.now()) - startTime) / 1000 : 0;
  const minutes = elapsed / 60;
  const wpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;
  const accuracy = currentIndex > 0 ? Math.round((correctChars / currentIndex) * 100) : 100;
  const progressPercent = text.length > 0 ? Math.round((currentIndex / text.length) * 100) : 0;
  const passed = accuracy >= (lesson?.minAccuracy || 85);

  // Live timer
  const [, setTick] = useState(0);
  useEffect(() => {
    if (startTime && !endTime) {
      const interval = setInterval(() => setTick(t => t + 1), 200);
      return () => clearInterval(interval);
    }
  }, [startTime, endTime]);

  const nextChar = currentIndex < text.length ? text[currentIndex].toUpperCase() : '';
  const nextFinger = nextChar ? FINGER_MAP[nextChar] || FINGER_MAP[nextChar.toLowerCase()] || '' : '';

  const handleComplete = () => {
    if (passed && lesson && profile) {
      completeLesson(lesson.id);
      saveTestRecord({
        type: 'lesson',
        wpm,
        accuracy,
        errors,
        timeSpent: Math.round(elapsed),
        title: lesson.title,
        testName: `Lesson ${lesson.lessonNumber}`,
      });
    }
  };

  useEffect(() => {
    if (isComplete) handleComplete();
  }, [isComplete]);

  const retry = () => {
    setCharStates(new Array(text.length).fill('pending'));
    setCurrentIndex(0);
    setErrors(0);
    setCorrectChars(0);
    setStartTime(null);
    setEndTime(null);
    setIsComplete(false);
    setLastWrong(false);
    containerRef.current?.focus();
  };

  const nextLessonData = lesson ? getNextLesson(lesson.id) : undefined;

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground">Lesson not found</h2>
            <Button className="mt-4" onClick={() => navigate('/course')}>Back to Course</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/course')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Lesson {lesson.lessonNumber}: {lesson.title}</h1>
                <p className="text-sm text-muted-foreground">Keys: {lesson.keys} • Min Accuracy: {lesson.minAccuracy}%</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={retry}>
              <RotateCcw className="h-4 w-4 mr-1" /> Retry
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-4 gap-3">
            <Card className="border-border">
              <CardContent className="pt-3 pb-3 text-center">
                <Zap className="h-4 w-4 text-primary mx-auto mb-1" />
                <p className="text-xl font-bold text-foreground">{wpm}</p>
                <p className="text-[10px] text-muted-foreground">WPM</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-3 pb-3 text-center">
                <Target className="h-4 w-4 text-success mx-auto mb-1" />
                <p className="text-xl font-bold text-foreground">{accuracy}%</p>
                <p className="text-[10px] text-muted-foreground">Accuracy</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-3 pb-3 text-center">
                <XCircle className="h-4 w-4 text-destructive mx-auto mb-1" />
                <p className="text-xl font-bold text-foreground">{errors}</p>
                <p className="text-[10px] text-muted-foreground">Errors</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-3 pb-3 text-center">
                <Clock className="h-4 w-4 text-secondary mx-auto mb-1" />
                <p className="text-xl font-bold text-foreground">{Math.floor(elapsed)}s</p>
                <p className="text-[10px] text-muted-foreground">Time</p>
              </CardContent>
            </Card>
          </div>

          {/* Progress */}
          <Progress value={progressPercent} className="h-2" />

          {/* Typing Area */}
          {!isComplete ? (
            <div
              ref={containerRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="bg-card border border-border rounded-xl p-6 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-text min-h-[120px]"
            >
              <p className="text-xs text-muted-foreground mb-3">Click here and start typing...</p>
              <div className="font-mono text-lg leading-relaxed tracking-wide flex flex-wrap">
                {text.split('').map((char, i) => {
                  const state = charStates[i];
                  const isCurrent = i === currentIndex;
                  return (
                    <span
                      key={i}
                      className={`relative ${
                        state === 'correct' ? 'text-primary' :
                        state === 'wrong' ? 'text-destructive bg-destructive/10' :
                        isCurrent ? 'text-foreground' : 'text-muted-foreground/50'
                      } ${isCurrent ? 'border-l-2 border-primary animate-pulse' : ''}`}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <Card className="border-border">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                {passed ? (
                  <>
                    <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
                    <h2 className="text-2xl font-bold text-foreground">Lesson Complete! 🎉</h2>
                  </>
                ) : (
                  <>
                    <XCircle className="h-16 w-16 text-destructive mx-auto" />
                    <h2 className="text-2xl font-bold text-foreground">Try Again</h2>
                    <p className="text-muted-foreground">You need at least {lesson.minAccuracy}% accuracy to pass</p>
                  </>
                )}
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                  <div>
                    <p className="text-2xl font-bold text-primary">{wpm}</p>
                    <p className="text-xs text-muted-foreground">WPM</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${passed ? 'text-primary' : 'text-destructive'}`}>{accuracy}%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{errors}</p>
                    <p className="text-xs text-muted-foreground">Errors</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{Math.round(elapsed)}s</p>
                    <p className="text-xs text-muted-foreground">Time</p>
                  </div>
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  <Button variant="outline" onClick={retry}>
                    <RotateCcw className="h-4 w-4 mr-1" /> Retry
                  </Button>
                  {passed && nextLessonData && (
                    <Button onClick={() => navigate(`/lesson/${nextLessonData.id}`)}>
                      Next Lesson <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                  {passed && !nextLessonData && (
                    <Button onClick={() => navigate('/course')}>
                      Back to Course
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Virtual Keyboard */}
          {!isComplete && (
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="space-y-1.5 max-w-2xl mx-auto">
                {KEYBOARD_ROWS.map((row, ri) => (
                  <div key={ri} className={`flex gap-1 justify-center ${ri === 1 ? 'ml-4' : ri === 2 ? 'ml-8' : ri === 3 ? 'ml-12' : ''}`}>
                    {row.map((key) => {
                      const isNext = key.toUpperCase() === nextChar || (key === ' ' && nextChar === ' ');
                      const finger = FINGER_MAP[key.toUpperCase()] || FINGER_MAP[key] || '';
                      const fingerColor = FINGER_COLORS[finger] || '';
                      const isSpace = key === ' ';

                      return (
                        <div
                          key={key}
                          className={`
                            ${isSpace ? 'w-48 h-8' : 'w-8 h-8'} 
                            rounded border text-xs font-mono flex items-center justify-center transition-all
                            ${isNext 
                              ? `${fingerColor} border-2 scale-110 shadow-md font-bold text-foreground` 
                              : 'bg-muted/30 border-border text-muted-foreground'
                            }
                            ${lastWrong && isNext ? 'animate-pulse' : ''}
                          `}
                        >
                          {isSpace ? 'Space' : key.toUpperCase()}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Finger hint */}
              {nextFinger && (
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Use your <span className="font-medium text-foreground">{nextFinger.replace('-', ' ')}</span> finger for <span className="font-bold text-primary">{nextChar === ' ' ? 'Space' : nextChar}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LessonPractice;
