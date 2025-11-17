import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Keyboard, Clock, Target, TrendingUp, Play, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Today's Tests", value: "0", icon: Clock, color: "text-primary" },
    { label: "Avg WPM", value: "0", icon: TrendingUp, color: "text-secondary" },
    { label: "Accuracy", value: "0%", icon: Target, color: "text-success" },
    { label: "Total Tests", value: "0", icon: BarChart3, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">TypeMaster</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost">Dashboard</Button>
            <Button variant="ghost">Lessons</Button>
            <Button variant="ghost">Games</Button>
            <Button variant="ghost">Progress</Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Master Touch Typing
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Improve your typing speed and accuracy with interactive lessons and real-time feedback
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 gap-2"
            onClick={() => navigate("/typing-test")}
          >
            <Play className="h-5 w-5" />
            Start Typing Test
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => navigate("/typing-test?duration=60")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                1 Minute Test
              </CardTitle>
              <CardDescription>Quick typing speed test</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Perfect for a quick warm-up</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => navigate("/typing-test?duration=120")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                2 Minute Test
              </CardTitle>
              <CardDescription>Standard typing test</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Most popular test duration</p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => navigate("/typing-test?duration=300")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-success" />
                5 Minute Test
              </CardTitle>
              <CardDescription>Extended typing challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Test your endurance</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
