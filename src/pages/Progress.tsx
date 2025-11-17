import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, TrendingUp, Target, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Progress = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Progress Report</h1>
          <Button variant="ghost" onClick={() => navigate("/")}>
            <Home className="h-5 w-5 mr-2" />
            Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Your Progress Dashboard
            </h2>
            <p className="text-xl text-muted-foreground">
              अपनी improvement को track करें
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Total Tests</CardTitle>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground mt-1">Tests completed</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Avg Speed</CardTitle>
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground mt-1">WPM average</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Avg Accuracy</CardTitle>
                  <Target className="h-5 w-5 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">0%</p>
                <p className="text-sm text-muted-foreground mt-1">Accuracy rate</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Achievements</CardTitle>
                  <Award className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground mt-1">Badges earned</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border mb-8">
            <CardHeader>
              <CardTitle>Speed Progress</CardTitle>
              <CardDescription>आपकी typing speed की growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>कोई data नहीं है</p>
                  <p className="text-sm mt-2">Tests complete करें to see your progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Achievements & Badges</CardTitle>
              <CardDescription>अपने milestones celebrate करें</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "First Test", desc: "Complete 1st test", icon: "🎯" },
                  { name: "Speed Demon", desc: "Reach 40 WPM", icon: "⚡" },
                  { name: "Accuracy King", desc: "95% accuracy", icon: "🎪" },
                  { name: "Practice Master", desc: "10 lessons done", icon: "📚" },
                  { name: "Game Champion", desc: "Win 5 games", icon: "🏆" },
                  { name: "Streak Legend", desc: "7 day streak", icon: "🔥" },
                  { name: "Fast Fingers", desc: "Reach 60 WPM", icon: "💨" },
                  { name: "Perfect Score", desc: "100% accuracy", icon: "💯" },
                ].map((badge, index) => (
                  <Card key={index} className="border-border opacity-40 text-center p-4">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <p className="font-semibold text-sm mb-1">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.desc}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              अभी तक कोई progress नहीं है। Tests और lessons complete करें!
            </p>
            <Button onClick={() => navigate("/typing-test")} size="lg">
              Start Your First Test
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;
