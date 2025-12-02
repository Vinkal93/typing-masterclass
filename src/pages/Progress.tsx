import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Clock, Award, Trophy, Zap, Flame, Trash2, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProgressData, getAverageWpm, getAverageAccuracy, getRecentTests } from "@/lib/progressTracker";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Progress = () => {
  const navigate = useNavigate();
  const { isHindi } = useLanguage();
  const progress = getProgressData();
  const avgWpm = getAverageWpm();
  const avgAccuracy = getAverageAccuracy();
  const recentTests = getRecentTests(10);
  const [showClearDialog, setShowClearDialog] = useState(false);

  // Calculate streak
  const calculateStreak = () => {
    if (progress.tests.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const testDates = progress.tests.map(test => {
      const date = new Date(test.timestamp);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    });
    
    const uniqueDates = [...new Set(testDates)].sort((a, b) => b - a);
    
    let streak = 0;
    let currentDate = today.getTime();
    
    for (const date of uniqueDates) {
      if (date === currentDate) {
        streak++;
        currentDate -= 24 * 60 * 60 * 1000;
      } else if (date === currentDate) {
        continue;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const streak = calculateStreak();

  // Prepare chart data
  const chartData = progress.tests.slice(-20).map((test, index) => ({
    name: `#${index + 1}`,
    WPM: test.wpm,
    Accuracy: test.accuracy,
    date: new Date(test.timestamp).toLocaleDateString(),
  }));

  const handleClearHistory = () => {
    localStorage.removeItem('typing_progress');
    toast({
      title: isHindi ? "इतिहास साफ हो गया" : "History Cleared",
      description: isHindi ? "आपका सभी प्रगति डेटा साफ कर दिया गया है" : "All your progress data has been cleared",
    });
    setShowClearDialog(false);
    window.location.reload();
  };

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
      icon: "🎯",
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
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {isHindi ? "आपका प्रगति डैशबोर्ड" : "Your Progress Dashboard"}
              </h2>
              <p className="text-xl text-muted-foreground">
                {isHindi ? "अपनी सुधार को ट्रैक करें" : "Track your improvement"}
              </p>
            </div>
            {progress.totalTests > 0 && (
              <Button variant="destructive" onClick={() => setShowClearDialog(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                {isHindi ? "इतिहास साफ करें" : "Clear History"}
              </Button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">
                    {isHindi ? "कुल टेस्ट" : "Total Tests"}
                  </CardTitle>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{progress.totalTests}</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">
                    {isHindi ? "औसत WPM" : "Avg WPM"}
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{avgWpm}</p>
                {progress.bestWpm > 0 && (
                  <p className="text-xs text-primary mt-1">
                    {isHindi ? "सर्वश्रेष्ठ" : "Best"}: {progress.bestWpm}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">
                    {isHindi ? "औसत सटीकता" : "Avg Accuracy"}
                  </CardTitle>
                  <Target className="h-5 w-5 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{avgAccuracy}%</p>
                {progress.bestAccuracy > 0 && (
                  <p className="text-xs text-success mt-1">
                    {isHindi ? "सर्वश्रेष्ठ" : "Best"}: {progress.bestAccuracy}%
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">
                    {isHindi ? "उपलब्धियां" : "Achievements"}
                  </CardTitle>
                  <Award className="h-5 w-5 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {progress.achievements.length}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">
                    {isHindi ? "दिन की स्ट्रीक" : "Day Streak"}
                  </CardTitle>
                  <Flame className="h-5 w-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{streak} 🔥</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isHindi ? "दिन" : "days"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          {chartData.length > 0 && (
            <Card className="border-border mb-8">
              <CardHeader>
                <CardTitle>{isHindi ? "प्रदर्शन रुझान" : "Performance Trends"}</CardTitle>
                <CardDescription>
                  {isHindi ? "पिछले 20 टेस्ट" : "Last 20 tests"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))' 
                        }}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="WPM" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))' }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="Accuracy" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--success))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Tests */}
          {recentTests.length > 0 && (
            <Card className="border-border mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{isHindi ? "हाल के टेस्ट" : "Recent Tests"}</CardTitle>
                    <CardDescription>
                      {isHindi ? "आपके हाल के प्रदर्शन" : "Your recent performances"}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate("/full-history")}>
                    <Calendar className="h-4 w-4 mr-2" />
                    {isHindi ? "पूरा इतिहास" : "Full History"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTests.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          {test.type === 'exam' ? <Trophy className="h-5 w-5 text-secondary" /> : <Zap className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <p className="font-semibold">{test.title || (isHindi ? "टाइपिंग टेस्ट" : "Typing Test")}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(test.timestamp).toLocaleDateString(isHindi ? 'hi-IN' : 'en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

      {/* Clear History Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isHindi ? "क्या आप सुनिश्चित हैं?" : "Are you absolutely sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isHindi
                ? "यह क्रिया आपके सभी टेस्ट इतिहास, उपलब्धियों और प्रगति को स्थायी रूप से हटा देगी। इसे पूर्ववत नहीं किया जा सकता।"
                : "This action will permanently delete all your test history, achievements, and progress. This cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{isHindi ? "रद्द करें" : "Cancel"}</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearHistory} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isHindi ? "हां, साफ करें" : "Yes, clear it"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Progress;
