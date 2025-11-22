import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Target, TrendingUp, Play, BarChart3, Keyboard, Award, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProgressData, getAverageWpm, getAverageAccuracy, getRecentTests } from "@/lib/progressTracker";
import { useMemo } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const progress = getProgressData();
  const avgWpm = getAverageWpm();
  const avgAccuracy = getAverageAccuracy();
  const recentTests = getRecentTests(3);

  // Calculate today's tests
  const todaysTests = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return progress.tests.filter(test => {
      const testDate = new Date(test.timestamp);
      testDate.setHours(0, 0, 0, 0);
      return testDate.getTime() === today.getTime();
    }).length;
  }, [progress.tests]);

  // Calculate current streak
  const currentStreak = useMemo(() => {
    if (progress.tests.length === 0) return 0;

    const sortedTests = [...progress.tests].sort((a, b) => b.timestamp - a.timestamp);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let checkDate = new Date(today);

    for (let i = 0; i < 30; i++) {
      const hasTestOnDate = sortedTests.some(test => {
        const testDate = new Date(test.timestamp);
        testDate.setHours(0, 0, 0, 0);
        return testDate.getTime() === checkDate.getTime();
      });

      if (hasTestOnDate) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (i === 0 && checkDate.getTime() === today.getTime()) {
        checkDate.setDate(checkDate.getDate() - 1);
        continue;
      } else {
        break;
      }
    }

    return streak;
  }, [progress.tests]);

  const stats = [
    { label: t('todaysTests'), value: todaysTests.toString(), icon: Clock, color: "text-primary" },
    { label: t('avgWPM'), value: avgWpm.toString(), icon: TrendingUp, color: "text-secondary" },
    { label: t('accuracy'), value: `${avgAccuracy}%`, icon: Target, color: "text-success" },
    { label: t('totalTests'), value: progress.totalTests.toString(), icon: BarChart3, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            {t('masterTouchTyping')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('improveTyping')}
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 gap-2"
            onClick={() => navigate("/typing-test")}
          >
            <Play className="h-5 w-5" />
            {t('startTypingTest')}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-sm">{stat.label}</CardDescription>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => navigate("/typing-test?duration=60")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                1 {t('minuteTest')}
              </CardTitle>
              <CardDescription>{t('quickTest')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('perfectWarmup')}</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => navigate("/typing-test?duration=120")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                2 {t('minuteTest')}
              </CardTitle>
              <CardDescription>{t('standardTest')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('popularDuration')}</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => navigate("/typing-test?duration=300")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-success" />
                5 {t('minuteTest')}
              </CardTitle>
              <CardDescription>{t('extendedTest')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('testEndurance')}</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer bg-accent/5" onClick={() => navigate("/practice?mode=custom")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-accent" />
                {t('customText')}
              </CardTitle>
              <CardDescription>{t('pasteYourText')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('practiceWithOwn')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Streak and Achievements Section */}
        {progress.totalTests > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  {t('currentStreak') || 'Current Streak'}
                </CardTitle>
                <CardDescription>
                  {t('daysInARow') || 'Days practicing in a row'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <p className="text-5xl font-bold text-foreground">{currentStreak}</p>
                  <div className="text-sm text-muted-foreground">
                    {currentStreak === 0 ? (
                      <p>{t('startStreakToday') || 'Complete a test today to start your streak!'}</p>
                    ) : currentStreak === 1 ? (
                      <p>{t('dayStreak') || 'day streak'}</p>
                    ) : (
                      <p>{t('daysStreak') || 'days streak'}</p>
                    )}
                  </div>
                </div>
                {currentStreak > 0 && (
                  <p className="text-xs text-muted-foreground mt-4">
                    {t('keepGoing') || 'Keep practicing daily to maintain your streak!'}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  {t('achievements') || 'Achievements'}
                </CardTitle>
                <CardDescription>
                  {t('unlockedBadges') || 'Your unlocked badges'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <p className="text-5xl font-bold text-foreground">{progress.achievements.length}</p>
                  <div className="text-sm text-muted-foreground">
                    <p>{t('of8Badges') || 'of 8 badges'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/progress")}
                  >
                    {t('viewAllAchievements') || 'View All Achievements'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Activity */}
        {recentTests.length > 0 && (
          <Card className="border-border mb-12">
            <CardHeader>
              <CardTitle>{t('recentActivity') || 'Recent Activity'}</CardTitle>
              <CardDescription>
                {t('yourLatestTests') || 'Your latest typing tests'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{test.title || t('typingTest')}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(test.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="text-right">
                        <p className="font-bold">{test.wpm}</p>
                        <p className="text-xs text-muted-foreground">WPM</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-success">{test.accuracy}%</p>
                        <p className="text-xs text-muted-foreground">{t('accuracy')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4"
                onClick={() => navigate("/progress")}
              >
                {t('viewFullHistory') || 'View Full History'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => navigate("/lessons")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                📚 {t('typingLessons')}
              </CardTitle>
              <CardDescription>{t('structuredLessons')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{t('learnEverything')}</p>
              <Button variant="outline" className="w-full">{t('startLearning')}</Button>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => navigate("/games")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                🎮 {t('typingGames')}
              </CardTitle>
              <CardDescription>{t('funGames')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{t('gamesDescription')}</p>
              <Button variant="outline" className="w-full">{t('playGames')}</Button>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => navigate("/progress")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                📊 {t('progressReport')}
              </CardTitle>
              <CardDescription>{t('trackImprovement')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{t('statsGraphs')}</p>
              <Button variant="outline" className="w-full">{t('viewProgress')}</Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
