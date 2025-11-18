import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Target, TrendingUp, Play, BarChart3, Keyboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const stats = [
    { label: t('todaysTests'), value: "0", icon: Clock, color: "text-primary" },
    { label: t('avgWPM'), value: "0", icon: TrendingUp, color: "text-secondary" },
    { label: t('accuracy'), value: "0%", icon: Target, color: "text-success" },
    { label: t('totalTests'), value: "0", icon: BarChart3, color: "text-accent" },
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
