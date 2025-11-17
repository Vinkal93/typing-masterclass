import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home, TrendingUp, Target, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TestStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  timeSpent: number;
}

interface TestResultProps {
  stats: TestStats;
  onRestart: () => void;
  duration: number;
}

const TestResult = ({ stats, onRestart, duration }: TestResultProps) => {
  const navigate = useNavigate();

  const getPerformanceMessage = () => {
    if (stats.wpm >= 60 && stats.accuracy >= 95) {
      return { message: "Excellent! Professional Level", color: "text-success" };
    } else if (stats.wpm >= 40 && stats.accuracy >= 90) {
      return { message: "Great! Above Average", color: "text-primary" };
    } else if (stats.wpm >= 25 && stats.accuracy >= 80) {
      return { message: "Good! Keep Practicing", color: "text-secondary" };
    } else {
      return { message: "Keep Going! Practice Makes Perfect", color: "text-muted-foreground" };
    }
  };

  const performance = getPerformanceMessage();

  const statCards = [
    {
      title: "Words Per Minute",
      value: stats.wpm,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Characters Per Minute",
      value: stats.cpm,
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Accuracy",
      value: `${stats.accuracy}%`,
      icon: Target,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Total Errors",
      value: stats.errors,
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Test Results</h1>
          <Button variant="ghost" onClick={() => navigate("/")}>
            <Home className="h-5 w-5 mr-2" />
            Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Performance Message */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-2">Test Complete!</h2>
            <p className={`text-2xl font-semibold ${performance.color}`}>
              {performance.message}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {statCards.map((stat) => (
              <Card key={stat.title} className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{stat.title}</CardTitle>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="mb-8 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Test Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Test Duration</p>
                  <p className="text-2xl font-semibold text-foreground">{duration}s</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Time Used</p>
                  <p className="text-2xl font-semibold text-foreground">{stats.timeSpent}s</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Tips */}
          <Card className="mb-8 border-border bg-card/50">
            <CardHeader>
              <CardTitle>Tips to Improve</CardTitle>
              <CardDescription>Here are some suggestions based on your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                {stats.accuracy < 90 && (
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Focus on accuracy first. Slow down and make fewer mistakes.</span>
                  </li>
                )}
                {stats.wpm < 40 && (
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Practice daily for 15-20 minutes to build muscle memory.</span>
                  </li>
                )}
                {stats.errors > 10 && (
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span>Take your time with each keystroke to reduce errors.</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-success">•</span>
                  <span>Maintain proper finger positioning on the home row keys.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onRestart} size="lg" className="gap-2">
              <RotateCcw className="h-5 w-5" />
              Try Again
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" size="lg" className="gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestResult;
