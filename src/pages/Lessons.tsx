import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Lesson {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  isCompleted: boolean;
  isLocked: boolean;
  practiceText: string;
}

const Lessons = () => {
  const navigate = useNavigate();

  const [lessons] = useState<Lesson[]>([
    // Beginner Level
    {
      id: "home-row",
      title: "Home Row Keys (ASDF JKL;)",
      description: "सबसे पहले home row keys सीखें - ASDF JKL;",
      level: "beginner",
      isCompleted: false,
      isLocked: false,
      practiceText: "asdf jkl; asdf jkl; aaa sss ddd fff jjj kkk lll ;;; asdf jkl; fall; jak; lads; flask; salad; fall;"
    },
    {
      id: "top-row",
      title: "Top Row Keys (QWERT YUIOP)",
      description: "Top row keys की practice करें",
      level: "beginner",
      isCompleted: false,
      isLocked: false,
      practiceText: "qwert yuiop qwert yuiop qqq www eee rrr ttt yyy uuu iii ooo ppp query power type writer quote"
    },
    {
      id: "bottom-row",
      title: "Bottom Row Keys (ZXCVBNM)",
      description: "Bottom row keys सीखें",
      level: "beginner",
      isCompleted: false,
      isLocked: false,
      practiceText: "zxcv bnm zxcv bnm zzz xxx ccc vvv bbb nnn mmm zoom box cave mint zone"
    },
    {
      id: "all-letters",
      title: "All Letters Practice",
      description: "सभी letters की combined practice",
      level: "beginner",
      isCompleted: false,
      isLocked: false,
      practiceText: "the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs"
    },
    
    // Intermediate Level
    {
      id: "numbers",
      title: "Number Keys (1234567890)",
      description: "Numbers की practice करें",
      level: "intermediate",
      isCompleted: false,
      isLocked: false,
      practiceText: "123 456 789 0 1234567890 123 456 789 0 12345 67890 room 101 page 25 year 2024"
    },
    {
      id: "symbols",
      title: "Special Symbols (!@#$%^&*)",
      description: "Special characters और symbols",
      level: "intermediate",
      isCompleted: false,
      isLocked: false,
      practiceText: "!@# $%^ &*() !@#$ %^&* () hello! what? yes. no, maybe; okay: good"
    },
    {
      id: "punctuation",
      title: "Punctuation Practice",
      description: "Comma, period, quotes etc.",
      level: "intermediate",
      isCompleted: false,
      isLocked: false,
      practiceText: "Hello, how are you? I am fine. What's your name? My name is John. Nice to meet you!"
    },
    {
      id: "sentences",
      title: "Complete Sentences",
      description: "पूरे sentences की practice",
      level: "intermediate",
      isCompleted: false,
      isLocked: false,
      practiceText: "Practice makes perfect. The early bird catches the worm. Time is money. Knowledge is power. Actions speak louder than words."
    },
    
    // Advanced Level
    {
      id: "paragraphs",
      title: "Long Paragraphs",
      description: "लम्बे paragraphs की practice",
      level: "advanced",
      isCompleted: false,
      isLocked: false,
      practiceText: "Technology has revolutionized the way we communicate and work in the modern world. From smartphones to artificial intelligence, innovation continues to shape our daily lives. Learning to type efficiently is now more important than ever as we spend countless hours on computers and digital devices."
    },
    {
      id: "speed-drill",
      title: "Speed Building Drill",
      description: "Speed बढ़ाने की practice",
      level: "advanced",
      isCompleted: false,
      isLocked: false,
      practiceText: "fast type quick speed rapid swift hasty speedy hurry rush dash sprint race quick fast type speed rapid"
    },
    {
      id: "accuracy-drill",
      title: "Accuracy Challenge",
      description: "Accuracy improve करने की practice",
      level: "advanced",
      isCompleted: false,
      isLocked: false,
      practiceText: "accommodate beginning committee environment government independent maintenance necessary occasion privilege receive separate successful unnecessary"
    },
    {
      id: "blind-typing",
      title: "Blind Typing Mode",
      description: "बिना देखे typing की practice",
      level: "advanced",
      isCompleted: false,
      isLocked: false,
      practiceText: "Type without looking at the keyboard. Focus on the screen and trust your muscle memory. Let your fingers find the keys naturally."
    }
  ]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-success/10 text-success border-success/20";
      case "intermediate":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "advanced":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLevelTitle = (level: string) => {
    switch (level) {
      case "beginner":
        return "Beginner - शुरुआती";
      case "intermediate":
        return "Intermediate - मध्यम";
      case "advanced":
        return "Advanced - उन्नत";
      default:
        return level;
    }
  };

  const startLesson = (lesson: Lesson) => {
    navigate(`/practice?mode=lesson&text=${encodeURIComponent(lesson.practiceText)}&title=${encodeURIComponent(lesson.title)}`);
  };

  const groupedLessons = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.level]) {
      acc[lesson.level] = [];
    }
    acc[lesson.level].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Learn Touch Typing Step by Step
            </h2>
            <p className="text-xl text-muted-foreground">
              शुरुआत से लेकर expert level तक - हर lesson के साथ improve करें
            </p>
          </div>

          {Object.entries(groupedLessons).map(([level, levelLessons]) => (
            <div key={level} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Badge className={`${getLevelColor(level)} px-4 py-2 text-sm font-semibold`}>
                  {getLevelTitle(level)}
                </Badge>
                <div className="h-px bg-border flex-1"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {levelLessons.map((lesson) => (
                  <Card
                    key={lesson.id}
                    className={`border-border hover:shadow-lg transition-all ${
                      lesson.isLocked ? "opacity-60" : "hover:scale-105 cursor-pointer"
                    }`}
                    onClick={() => !lesson.isLocked && startLesson(lesson)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 flex items-center gap-2">
                            {lesson.title}
                            {lesson.isCompleted && (
                              <CheckCircle2 className="h-5 w-5 text-success" />
                            )}
                            {lesson.isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                          </CardTitle>
                          <CardDescription>{lesson.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm text-muted-foreground overflow-hidden">
                        {lesson.practiceText.substring(0, 60)}...
                      </div>
                      {!lesson.isLocked && (
                        <Button className="w-full mt-4" variant="default">
                          Start Practice
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Lessons;
