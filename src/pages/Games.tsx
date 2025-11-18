import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FallingWord {
  id: number;
  word: string;
  x: number;
  y: number;
  speed: number;
}

interface Bubble {
  id: number;
  word: string;
  x: number;
  y: number;
  color: string;
  exploding: boolean;
}

const Games = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Falling Words Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [words, setWords] = useState<FallingWord[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [level, setLevel] = useState(1);
  const gameRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Word Shooter Game State
  const [shooterGameStarted, setShooterGameStarted] = useState(false);
  const [shooterScore, setShooterScore] = useState(0);
  const [shooterGameOver, setShooterGameOver] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [shooterInput, setShooterInput] = useState("");
  const [shooterLevel, setShooterLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const shooterInputRef = useRef<HTMLInputElement>(null);

  const wordsList = [
    "cat", "dog", "run", "jump", "fast", "slow", "blue", "red", "green", "happy",
    "type", "word", "game", "play", "quick", "speed", "time", "moon", "star", "sun",
    "code", "learn", "skill", "power", "focus", "think", "smart", "brain", "idea",
  ];

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameLoop = setInterval(() => {
        setWords((prevWords) => {
          const updatedWords = prevWords.map((word) => ({
            ...word,
            y: word.y + word.speed,
          }));

          // Check if any word reached bottom
          const reachedBottom = updatedWords.some((word) => word.y > 400);
          if (reachedBottom) {
            setGameOver(true);
            return updatedWords;
          }

          return updatedWords;
        });
      }, 50);

      return () => clearInterval(gameLoop);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const spawnInterval = setInterval(
        () => {
          const newWord: FallingWord = {
            id: Date.now(),
            word: wordsList[Math.floor(Math.random() * wordsList.length)],
            x: Math.random() * 80 + 10,
            y: 0,
            speed: 1 + level * 0.3,
          };
          setWords((prev) => [...prev, newWord]);
        },
        Math.max(2000 - level * 200, 800)
      );

      return () => clearInterval(spawnInterval);
    }
  }, [gameStarted, level, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setWords([]);
    setCurrentInput("");
    setLevel(1);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);

    // Check if typed word matches any falling word
    const matchedWord = words.find((word) => word.word === value.trim());
    if (matchedWord) {
      setWords((prev) => prev.filter((w) => w.id !== matchedWord.id));
      setScore((prev) => prev + value.length * 10);
      setCurrentInput("");
      
      // Level up every 5 words
      if ((score + value.length * 10) % 50 === 0) {
        setLevel((prev) => prev + 1);
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setWords([]);
    setCurrentInput("");
    setLevel(1);
  };

  // Word Shooter Game Functions
  const bubbleColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"];

  const startShooterGame = () => {
    setShooterGameStarted(true);
    setShooterGameOver(false);
    setShooterScore(0);
    setBubbles([]);
    setShooterInput("");
    setShooterLevel(1);
    setLives(3);
    setTimeout(() => shooterInputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (shooterGameStarted && !shooterGameOver && lives > 0) {
      const spawnInterval = setInterval(
        () => {
          const newBubble: Bubble = {
            id: Date.now() + Math.random(),
            word: wordsList[Math.floor(Math.random() * wordsList.length)],
            x: Math.random() * 70 + 10,
            y: Math.random() * 60 + 10,
            color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
            exploding: false,
          };
          setBubbles((prev) => {
            if (prev.length < 8) {
              return [...prev, newBubble];
            }
            return prev;
          });
        },
        Math.max(3000 - shooterLevel * 300, 1500)
      );

      return () => clearInterval(spawnInterval);
    }
  }, [shooterGameStarted, shooterLevel, shooterGameOver, lives]);

  useEffect(() => {
    if (shooterGameStarted && !shooterGameOver && bubbles.length > 10) {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setShooterGameOver(true);
        }
        return newLives;
      });
      setBubbles((prev) => prev.slice(0, 8));
    }
  }, [bubbles.length, shooterGameStarted, shooterGameOver]);

  const handleShooterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShooterInput(value);

    const matchedBubble = bubbles.find((bubble) => !bubble.exploding && bubble.word === value.trim());
    if (matchedBubble) {
      setBubbles((prev) =>
        prev.map((b) => (b.id === matchedBubble.id ? { ...b, exploding: true } : b))
      );
      
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== matchedBubble.id));
      }, 500);

      setShooterScore((prev) => prev + value.length * 15);
      setShooterInput("");

      if ((shooterScore + value.length * 15) % 100 === 0) {
        setShooterLevel((prev) => prev + 1);
      }
    }
  };

  const resetShooterGame = () => {
    setShooterGameStarted(false);
    setShooterGameOver(false);
    setShooterScore(0);
    setBubbles([]);
    setShooterInput("");
    setShooterLevel(1);
    setLives(3);
  };

  if (selectedGame === "falling-words") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        <main className="container mx-auto px-4 py-8 flex-1">
          <div className="max-w-3xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Score</p>
                <p className="text-3xl font-bold text-primary">{score}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Level</p>
                <p className="text-3xl font-bold text-secondary">{level}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Words</p>
                <p className="text-3xl font-bold text-success">{Math.floor(score / 50)}</p>
              </Card>
            </div>

            {/* Game Area */}
            <Card className="relative overflow-hidden" style={{ height: "450px" }}>
              <div
                ref={gameRef}
                className="absolute inset-0 bg-gradient-to-b from-background to-muted/30"
              >
                {!gameStarted && !gameOver && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      Falling Words Game
                    </h2>
                    <p className="text-muted-foreground mb-8 text-center max-w-md">
                      Type the falling words before they reach the bottom!
                    </p>
                    <Button onClick={startGame} size="lg" className="gap-2">
                      <Play className="h-5 w-5" />
                      Start Game
                    </Button>
                  </div>
                )}

                {gameOver && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="text-3xl font-bold text-destructive mb-4">Game Over!</h2>
                    <p className="text-2xl text-foreground mb-2">Final Score: {score}</p>
                    <p className="text-lg text-muted-foreground mb-8">
                      Level Reached: {level}
                    </p>
                    <Button onClick={resetGame} size="lg" className="gap-2">
                      <RotateCcw className="h-5 w-5" />
                      Play Again
                    </Button>
                  </div>
                )}

                {gameStarted && !gameOver && (
                  <>
                    {words.map((word) => (
                      <div
                        key={word.id}
                        className="absolute text-2xl font-bold text-primary transition-all"
                        style={{
                          left: `${word.x}%`,
                          top: `${word.y}px`,
                        }}
                      >
                        {word.word}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </Card>

            {/* Input Area */}
            {gameStarted && !gameOver && (
              <Card className="mt-6 p-6">
                <Input
                  ref={inputRef}
                  value={currentInput}
                  onChange={handleInputChange}
                  placeholder="Type the falling words..."
                  className="text-2xl text-center font-mono"
                  autoFocus
                />
              </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (selectedGame === "word-shooter") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        <main className="container mx-auto px-4 py-8 flex-1">
          <div className="max-w-4xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Score</p>
                <p className="text-3xl font-bold text-primary">{shooterScore}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Level</p>
                <p className="text-3xl font-bold text-secondary">{shooterLevel}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Bubbles</p>
                <p className="text-3xl font-bold text-success">{bubbles.length}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Lives</p>
                <p className="text-3xl font-bold text-destructive">{"❤️".repeat(lives)}</p>
              </Card>
            </div>

            {/* Game Area */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950" style={{ height: "500px" }}>
              <div className="relative w-full h-full p-4">
                {!shooterGameStarted && !shooterGameOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold mb-4 text-foreground">Word Shooter</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Bubbles will appear with words. Type the words to shoot them! Don't let too many bubbles fill the screen!
                      </p>
                      <Button onClick={startShooterGame} size="lg" className="gap-2">
                        <Play className="h-5 w-5" />
                        Start Game
                      </Button>
                    </div>
                  </div>
                )}

                {shooterGameOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm z-10">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold mb-4 text-foreground">Game Over!</h3>
                      <p className="text-2xl mb-2 text-primary">Final Score: {shooterScore}</p>
                      <p className="text-lg mb-6 text-muted-foreground">Level Reached: {shooterLevel}</p>
                      <div className="flex gap-4 justify-center">
                        <Button onClick={resetShooterGame} size="lg" className="gap-2">
                          <RotateCcw className="h-5 w-5" />
                          Play Again
                        </Button>
                        <Button onClick={() => setSelectedGame(null)} variant="outline" size="lg">
                          Back to Games
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bubbles */}
                {shooterGameStarted && (
                  <>
                    {bubbles.map((bubble) => (
                      <div
                        key={bubble.id}
                        className={`absolute transition-all duration-500 ${
                          bubble.exploding ? "scale-150 opacity-0" : "scale-100 opacity-100"
                        }`}
                        style={{
                          left: `${bubble.x}%`,
                          top: `${bubble.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className={`relative ${
                            bubble.exploding ? "animate-ping" : ""
                          }`}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            backgroundColor: bubble.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                            border: "3px solid rgba(255,255,255,0.3)",
                          }}
                        >
                          <span className="text-white font-bold text-lg">
                            {bubble.word}
                          </span>
                          {bubble.exploding && (
                            <div className="absolute inset-0 flex items-center justify-center text-4xl">
                              💥
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </Card>

            {/* Input Area */}
            {shooterGameStarted && !shooterGameOver && (
              <Card className="mt-6 p-6">
                <Input
                  ref={shooterInputRef}
                  value={shooterInput}
                  onChange={handleShooterInputChange}
                  placeholder="Type to shoot the bubbles..."
                  className="text-2xl text-center font-mono"
                  autoFocus
                />
              </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Fun Typing Games
            </h2>
            <p className="text-xl text-muted-foreground">
              खेल खेल में typing सीखें - मज़े के साथ speed बढ़ाएं
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
              onClick={() => setSelectedGame("falling-words")}
            >
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  🎯 Falling Words
                </CardTitle>
                <CardDescription className="text-base">
                  शब्द ऊपर से गिरते हैं - जल्दी type करें!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Words fall from the top. Type them before they reach the bottom. Speed increases with each level!
                </p>
                <Button className="w-full gap-2">
                  <Play className="h-5 w-5" />
                  Play Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border opacity-60">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  🚀 Speed Race
                </CardTitle>
                <CardDescription className="text-base">
                  तेज़ी से type करके race जीतें
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Type fast to move your car forward. Race against the clock!
                </p>
                <Button className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card
              className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
              onClick={() => setSelectedGame("word-shooter")}
            >
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  💥 Word Shooter
                </CardTitle>
                <CardDescription className="text-base">
                  शब्दों को type करके shoot करें
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Words appear in bubbles. Type to shoot them down!
                </p>
                <Button className="w-full gap-2">
                  <Play className="h-5 w-5" />
                  Play Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border opacity-60">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  👾 Space Typing
                </CardTitle>
                <CardDescription className="text-base">
                  Alien ships पर words - defend करें!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Defend Earth by typing words on alien ships before they attack!
                </p>
                <Button className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Games;
