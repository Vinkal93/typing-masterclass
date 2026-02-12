import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProgressData } from "@/lib/progressTracker";
import { Trophy, Star, Zap, Target, Flame, Award, Shield, Crown } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descHi: string;
  icon: React.ReactNode;
  check: (data: ReturnType<typeof getProgressData>) => boolean;
  color: string;
}

const badges: Badge[] = [
  { id: 'first_test', name: 'First Step', nameHi: 'पहला कदम', description: 'Complete your first test', descHi: 'अपना पहला टेस्ट पूरा करो', icon: <Star className="h-8 w-8" />, check: (d) => d.totalTests >= 1, color: 'text-yellow-500' },
  { id: 'ten_tests', name: '10 Tests Done', nameHi: '10 टेस्ट पूरे', description: 'Complete 10 tests', descHi: '10 टेस्ट पूरे करो', icon: <Target className="h-8 w-8" />, check: (d) => d.totalTests >= 10, color: 'text-blue-500' },
  { id: 'fifty_tests', name: 'Dedicated Typist', nameHi: 'समर्पित टाइपिस्ट', description: 'Complete 50 tests', descHi: '50 टेस्ट पूरे करो', icon: <Shield className="h-8 w-8" />, check: (d) => d.totalTests >= 50, color: 'text-purple-500' },
  { id: 'hundred_tests', name: 'Century Club', nameHi: 'शतक क्लब', description: 'Complete 100 tests', descHi: '100 टेस्ट पूरे करो', icon: <Crown className="h-8 w-8" />, check: (d) => d.totalTests >= 100, color: 'text-amber-600' },
  { id: 'wpm_30', name: 'Speed Starter', nameHi: 'स्पीड स्टार्टर', description: 'Reach 30 WPM', descHi: '30 WPM तक पहुँचो', icon: <Zap className="h-8 w-8" />, check: (d) => d.bestWpm >= 30, color: 'text-green-500' },
  { id: 'wpm_50', name: 'Speed Racer', nameHi: 'स्पीड रेसर', description: 'Reach 50 WPM', descHi: '50 WPM तक पहुँचो', icon: <Zap className="h-8 w-8" />, check: (d) => d.bestWpm >= 50, color: 'text-blue-600' },
  { id: 'wpm_80', name: 'Speed Demon', nameHi: 'स्पीड डेमन', description: 'Reach 80 WPM', descHi: '80 WPM तक पहुँचो', icon: <Zap className="h-8 w-8" />, check: (d) => d.bestWpm >= 80, color: 'text-orange-500' },
  { id: 'wpm_100', name: '100 WPM Club', nameHi: '100 WPM क्लब', description: 'Reach 100 WPM', descHi: '100 WPM तक पहुँचो', icon: <Trophy className="h-8 w-8" />, check: (d) => d.bestWpm >= 100, color: 'text-red-500' },
  { id: 'accuracy_90', name: 'Accuracy Pro', nameHi: 'एक्यूरेसी प्रो', description: '90% accuracy', descHi: '90% सटीकता', icon: <Target className="h-8 w-8" />, check: (d) => d.bestAccuracy >= 90, color: 'text-cyan-500' },
  { id: 'accuracy_95', name: 'Sharp Shooter', nameHi: 'शार्प शूटर', description: '95% accuracy', descHi: '95% सटीकता', icon: <Target className="h-8 w-8" />, check: (d) => d.bestAccuracy >= 95, color: 'text-emerald-500' },
  { id: 'accuracy_100', name: 'Zero Error Master', nameHi: 'ज़ीरो एरर मास्टर', description: '100% accuracy', descHi: '100% सटीकता', icon: <Award className="h-8 w-8" />, check: (d) => d.bestAccuracy >= 100, color: 'text-yellow-400' },
  { id: 'streak_3', name: '3-Day Streak', nameHi: '3 दिन स्ट्रीक', description: 'Practice 3 days in a row', descHi: 'लगातार 3 दिन अभ्यास', icon: <Flame className="h-8 w-8" />, check: (d) => getStreak(d.tests) >= 3, color: 'text-orange-400' },
  { id: 'streak_7', name: '7-Day Streak', nameHi: '7 दिन स्ट्रीक', description: 'Practice 7 days in a row', descHi: 'लगातार 7 दिन अभ्यास', icon: <Flame className="h-8 w-8" />, check: (d) => getStreak(d.tests) >= 7, color: 'text-red-400' },
  { id: 'streak_30', name: 'Monthly Warrior', nameHi: 'मासिक योद्धा', description: '30-day streak', descHi: '30 दिन स्ट्रीक', icon: <Flame className="h-8 w-8" />, check: (d) => getStreak(d.tests) >= 30, color: 'text-red-600' },
];

function getStreak(tests: { timestamp: number }[]): number {
  if (!tests.length) return 0;
  const days = new Set(tests.map(t => new Date(t.timestamp).toDateString()));
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (days.has(d.toDateString())) streak++;
    else if (i > 0) break;
  }
  return streak;
}

const Achievements = () => {
  const { isHindi } = useLanguage();
  const progress = getProgressData();

  const earned = useMemo(() => badges.filter(b => b.check(progress)), [progress]);
  const locked = useMemo(() => badges.filter(b => !b.check(progress)), [progress]);
  const streak = useMemo(() => getStreak(progress.tests), [progress]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
          🏆 {isHindi ? "उपलब्धियाँ" : "Achievements"}
        </h1>
        <p className="text-muted-foreground text-center mb-2">
          {isHindi ? `${earned.length}/${badges.length} बैज अर्जित` : `${earned.length}/${badges.length} badges earned`}
        </p>
        <p className="text-center mb-8">
          <span className="inline-flex items-center gap-1 bg-accent/50 rounded-full px-4 py-1 text-sm">
            <Flame className="h-4 w-4 text-orange-500" />
            {isHindi ? `${streak} दिन स्ट्रीक` : `${streak} day streak`}
          </span>
        </p>

        {earned.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4">{isHindi ? "✅ अर्जित" : "✅ Earned"}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {earned.map(badge => (
                <Card key={badge.id} className="p-4 text-center border-primary/30 bg-primary/5">
                  <div className={`${badge.color} mb-2 flex justify-center`}>{badge.icon}</div>
                  <p className="font-bold text-sm">{isHindi ? badge.nameHi : badge.name}</p>
                  <p className="text-xs text-muted-foreground">{isHindi ? badge.descHi : badge.description}</p>
                </Card>
              ))}
            </div>
          </>
        )}

        <h2 className="text-xl font-semibold mb-4">{isHindi ? "🔒 बाकी" : "🔒 Locked"}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {locked.map(badge => (
            <Card key={badge.id} className="p-4 text-center opacity-50 grayscale">
              <div className="text-muted-foreground mb-2 flex justify-center">{badge.icon}</div>
              <p className="font-bold text-sm">{isHindi ? badge.nameHi : badge.name}</p>
              <p className="text-xs text-muted-foreground">{isHindi ? badge.descHi : badge.description}</p>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Achievements;
