import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Clock, Award, Trophy, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProgressData, getAverageWpm, getAverageAccuracy, getRecentTests } from "@/lib/progressTracker";

const Progress = () => {
  const navigate = useNavigate();
  const { isHindi } = useLanguage();
  const progress = getProgressData();
  const avgWpm = getAverageWpm();
  const avgAccuracy = getAverageAccuracy();
  const recentTests = getRecentTests(5);

  const badges = [
    { 
      id: "first_test",
      name: isHindi ? "पहला टेस्ट" : "First Test", 
      desc: isHindi ? "1 टेस्ट पूरा करें" : "Complete 1st test", 
      icon: "🎯",
      unlocked: progress.achievements.includes('first_test')
    },
    { 
      id: "speed_demon",
      name: isHindi ? "स्पीड डेमन" : "Speed Demon", 
      desc: isHindi ? "40 WPM तक पहुंचें" : "Reach 40 WPM", 
      icon: "⚡",
      unlocked: progress.achievements.includes('speed_demon')
    },
    { 
      id: "accuracy_king",
      name: isHindi ? "सटीकता राजा" : "Accuracy King", 
      desc: isHindi ? "95% सटीकता" : "95% accuracy", 
      icon: "🎪",
      unlocked: progress.achievements.includes('accuracy_king')
    },
    { 
      id: "practice_master",
      name: isHindi ? "अभ्यास मास्टर" : "Practice Master", 
      desc: isHindi ? "10 पाठ पूरे करें" : "10 lessons done", 
      icon: "📚",
      unlocked: progress.achievements.includes('practice_master')
    },
    { 
      id: "game_champion",
      name: isHindi ? "गेम चैंपियन" : "Game Champion", 
      desc: isHindi ? "5 गेम जीतें" : "Win 5 games", 
      icon: "🏆",
      unlocked: false // Not tracking game wins yet
    },
    { 
      id: "streak_legend",
      name: isHindi ? "स्ट्रीक लीजेंड" : "Streak Legend", 
      desc: isHindi ? "7 दिन की स्ट्रीक" : "7 day streak", 
      icon: "🔥",
      unlocked: false // Not tracking streaks yet
    },
    { 
      id: "fast_fingers",
      name: isHindi ? "तेज़ उंगलियां" : "Fast Fingers", 
      desc: isHindi ? "60 WPM तक पहुंचें" : "Reach 60 WPM", 
      icon: "💨",
      unlocked: progress.achievements.includes('fast_fingers')
    },
    { 
      id: "perfect_score",
      name: isHindi ? "परफेक्ट स्कोर" : "Perfect Score", 
      desc: isHindi ? "100% सटीकता" : "100% accuracy", 
      icon: "💯",
      unlocked: progress.achievements.includes('perfect_score')
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {isHindi ? "आपका प्रगति डैशबोर्ड" : "Your Progress Dashboard"}
            </h2>
            <p className="text-xl text-muted-foreground">
              {isHindi ? "अपनी सुधार को ट्रैक करें" : "Track your improvement"}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">
                    {isHindi ? "कुल टेस्ट" : "Total Tests"}
                  </CardTitle>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{progress.totalTests}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isHindi ? "टेस्ट पूरे हुए" : "Tests completed"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">
                    {isHindi ? "औसत गति" : "Avg Speed"}
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{avgWpm}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isHindi ? "WPM औसत" : "WPM average"}
                </p>
                {progress.bestWpm > 0 && (
                  <p className="text-xs text-primary mt-1">
                    {isHindi ? "सर्वश्रेष्ठ" : "Best"}: {progress.bestWpm} WPM
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">
                    {isHindi ? "औसत सटीकता" : "Avg Accuracy"}
                  </CardTitle>
                  <Target className="h-5 w-5 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{avgAccuracy}%</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isHindi ? "सटीकता दर" : "Accuracy rate"}
                </p>
                {progress.bestAccuracy > 0 && (
                  <p className="text-xs text-success mt-1">
                    {isHindi ? "सर्वश्रेष्ठ" : "Best"}: {progress.bestAccuracy}%
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">
                    {isHindi ? "उपलब्धियां" : "Achievements"}
                  </CardTitle>
                  <Award className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {progress.achievements.length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isHindi ? "बैज अर्जित किए" : "Badges earned"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tests */}
          {recentTests.length > 0 && (
            <Card className="border-border mb-8">
              <CardHeader>
                <CardTitle>{isHindi ? "हाल के टेस्ट" : "Recent Tests"}</CardTitle>
                <CardDescription>
                  {isHindi ? "आपके हाल के प्रदर्शन" : "Your recent performances"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTests.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          {test.type === 'test' ? <Zap className="h-5 w-5 text-primary" /> : <Trophy className="h-5 w-5 text-secondary" />}
                        </div>
                        <div>
                          <p className="font-semibold">{test.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(test.timestamp).toLocaleDateString(isHindi ? 'hi-IN' : 'en-US')}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-bold text-lg">{test.wpm}</p>
                          <p className="text-muted-foreground">WPM</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-lg text-success">{test.accuracy}%</p>
                          <p className="text-muted-foreground">
                            {isHindi ? "सटीकता" : "Accuracy"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Achievements & Badges */}
          <Card className="border-border mb-8">
            <CardHeader>
              <CardTitle>{isHindi ? "उपलब्धियां और बैज" : "Achievements & Badges"}</CardTitle>
              <CardDescription>
                {isHindi ? "अपने मील के पत्थर मनाएं" : "Celebrate your milestones"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <Card
                    key={badge.id}
                    className={`border-border text-center p-4 transition-all ${
                      badge.unlocked 
                        ? "opacity-100 scale-100 hover:scale-105 shadow-lg" 
                        : "opacity-40 grayscale"
                    }`}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <p className="font-semibold text-sm mb-1">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.desc}</p>
                    {badge.unlocked && (
                      <div className="mt-2">
                        <span className="text-xs text-success font-semibold">
                          ✓ {isHindi ? "अनलॉक" : "Unlocked"}
                        </span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/typing-test")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  {isHindi ? "टाइपिंग टेस्ट" : "Typing Test"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {isHindi ? "अपनी गति और सटीकता का परीक्षण करें" : "Test your speed and accuracy"}
                </p>
                <Button className="w-full">{isHindi ? "शुरू करें" : "Start"}</Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/lessons")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-secondary" />
                  {isHindi ? "पाठ" : "Lessons"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {isHindi ? "संरचित पाठों के साथ सीखें" : "Learn with structured lessons"}
                </p>
                <Button className="w-full" variant="secondary">{isHindi ? "सीखें" : "Learn"}</Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/games")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-success" />
                  {isHindi ? "गेम्स" : "Games"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {isHindi ? "मज़ेदार गेम खेलें और अभ्यास करें" : "Play fun games and practice"}
                </p>
                <Button className="w-full" variant="outline">{isHindi ? "खेलें" : "Play"}</Button>
              </CardContent>
            </Card>
          </div>

          {progress.totalTests === 0 && (
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                {isHindi ? "अभी तक कोई प्रगति नहीं है। टेस्ट और पाठ पूरे करें!" : "No progress yet. Complete tests and lessons!"}
              </p>
              <Button onClick={() => navigate("/typing-test")} size="lg">
                {isHindi ? "अपना पहला टेस्ट शुरू करें" : "Start Your First Test"}
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Progress;