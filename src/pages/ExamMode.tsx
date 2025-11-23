import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { saveTestRecord } from "@/lib/progressTracker";
import { Trophy, AlertCircle, Clock } from "lucide-react";

interface ExamConfig {
  name: string;
  nameHindi: string;
  duration: number; // in seconds
  allowBackspace: boolean;
  minimumWPM: number;
  minimumAccuracy: number;
  text: string;
  textHindi: string;
}

const examConfigs: ExamConfig[] = [
  {
    name: "SSC Stenographer",
    nameHindi: "SSC आशुलिपिक",
    duration: 600, // 10 minutes
    allowBackspace: false,
    minimumWPM: 100,
    minimumAccuracy: 95,
    text: "The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the alphabet and is commonly used for typing practice. Speed and accuracy are both important in typing tests. Professional typists can achieve speeds of over 100 words per minute with high accuracy.",
    textHindi: "तेज भूरी लोमड़ी आलसी कुत्ते के ऊपर कूदती है। यह वाक्य वर्णमाला के सभी अक्षरों को शामिल करता है और आम तौर पर टाइपिंग अभ्यास के लिए उपयोग किया जाता है। टाइपिंग परीक्षणों में गति और सटीकता दोनों महत्वपूर्ण हैं। पेशेवर टाइपिस्ट उच्च सटीकता के साथ प्रति मिनट 100 से अधिक शब्दों की गति प्राप्त कर सकते हैं।"
  },
  {
    name: "CRPF Constable",
    nameHindi: "CRPF कांस्टेबल",
    duration: 900, // 15 minutes
    allowBackspace: false,
    minimumWPM: 30,
    minimumAccuracy: 90,
    text: "Government examinations require candidates to demonstrate proficiency in typing. The ability to type quickly and accurately is essential for clerical and data entry positions. Practice regularly to improve your typing skills and increase your chances of success in competitive examinations.",
    textHindi: "सरकारी परीक्षाओं में उम्मीदवारों को टाइपिंग में प्रवीणता प्रदर्शित करने की आवश्यकता होती है। लिपिकीय और डेटा प्रविष्टि पदों के लिए तेजी से और सटीक रूप से टाइप करने की क्षमता आवश्यक है। अपने टाइपिंग कौशल में सुधार करने और प्रतियोगी परीक्षाओं में सफलता की संभावना बढ़ाने के लिए नियमित रूप से अभ्यास करें।"
  },
  {
    name: "RRB Clerk",
    nameHindi: "RRB क्लर्क",
    duration: 600, // 10 minutes
    allowBackspace: false,
    minimumWPM: 30,
    minimumAccuracy: 92,
    text: "Railway recruitment examinations test candidates on various skills including typing speed and accuracy. The typing test is an important component of the selection process. Candidates must practice extensively to meet the required standards and qualify for railway positions.",
    textHindi: "रेलवे भर्ती परीक्षाएं उम्मीदवारों की विभिन्न कौशलों पर परीक्षण करती हैं जिसमें टाइपिंग गति और सटीकता शामिल है। टाइपिंग परीक्षा चयन प्रक्रिया का एक महत्वपूर्ण घटक है। उम्मीदवारों को आवश्यक मानकों को पूरा करने और रेलवे पदों के लिए अर्हता प्राप्त करने के लिए व्यापक अभ्यास करना चाहिए।"
  },
  {
    name: "Court Clerk",
    nameHindi: "कोर्ट क्लर्क",
    duration: 600, // 10 minutes
    allowBackspace: false,
    minimumWPM: 40,
    minimumAccuracy: 95,
    text: "Court clerks must possess excellent typing skills to accurately transcribe legal documents and proceedings. High accuracy is critical in legal environments where errors can have serious consequences. Speed combined with precision makes for an efficient court clerk.",
    textHindi: "कोर्ट क्लर्कों को कानूनी दस्तावेजों और कार्यवाही को सटीक रूप से प्रतिलेखन करने के लिए उत्कृष्ट टाइपिंग कौशल होना चाहिए। कानूनी वातावरण में उच्च सटीकता महत्वपूर्ण है जहां त्रुटियों के गंभीर परिणाम हो सकते हैं। सटीकता के साथ गति एक कुशल कोर्ट क्लर्क बनाती है।"
  },
  {
    name: "Data Entry Operator",
    nameHindi: "डेटा एंट्री ऑपरेटर",
    duration: 300, // 5 minutes
    allowBackspace: true,
    minimumWPM: 35,
    minimumAccuracy: 95,
    text: "Data entry operators process large volumes of information efficiently and accurately. The role requires sustained concentration and consistent typing performance. Organizations rely on data entry operators to maintain accurate records and databases.",
    textHindi: "डेटा एंट्री ऑपरेटर बड़ी मात्रा में जानकारी को कुशलता से और सटीक रूप से संसाधित करते हैं। भूमिका के लिए निरंतर एकाग्रता और सुसंगत टाइपिंग प्रदर्शन की आवश्यकता होती है। संगठन सटीक रिकॉर्ड और डेटाबेस बनाए रखने के लिए डेटा एंट्री ऑपरेटरों पर भरोसा करते हैं।"
  }
];

const ExamMode = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isHindi } = useLanguage();
  const { hindiKeyboardFont } = useFont();
  
  const examId = searchParams.get('examId');
  const exam = examConfigs.find(e => e.name === examId);
  
  const [userInput, setUserInput] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(exam?.duration || 600);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (started && !finished && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [started, finished, timeRemaining]);

  useEffect(() => {
    if (started && inputRef.current) {
      inputRef.current.focus();
    }
  }, [started]);

  useEffect(() => {
    if (!exam) {
      navigate('/lessons');
    }
  }, [exam, navigate]);

  if (!exam) {
    return null;
  }

  const targetText = isHindi ? exam.textHindi : exam.text;

  const calculateStats = () => {
    const correctChars = userInput.split("").filter((char, idx) => char === targetText[idx]).length;
    const totalChars = userInput.length;
    const errorCount = totalChars - correctChars;
    
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    
    const elapsedMinutes = (exam.duration - timeRemaining) / 60;
    const words = correctChars / 5;
    const wpm = elapsedMinutes > 0 ? Math.round(words / elapsedMinutes) : 0;
    
    setErrors(errorCount);
    setAccuracy(accuracy);
    setWpm(wpm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!started) {
      setStarted(true);
    }
    
    const value = e.target.value;
    
    // Prevent backspace if not allowed
    if (!exam.allowBackspace && value.length < userInput.length) {
      return;
    }
    
    // Prevent typing beyond target text
    if (value.length > targetText.length) {
      return;
    }
    
    setUserInput(value);
    calculateStats();
    
    // Auto-finish when completed
    if (value.length === targetText.length) {
      setFinished(true);
      saveTestRecord({
        type: 'exam',
        wpm,
        accuracy,
        duration: exam.duration - timeRemaining,
        title: exam.name
      });
    }
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return "text-muted-foreground";
    if (userInput[index] === targetText[index]) return "text-success";
    return "text-destructive bg-destructive/20";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isPassed = wpm >= exam.minimumWPM && accuracy >= exam.minimumAccuracy;
  const progress = (userInput.length / targetText.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Exam Header */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold">{isHindi ? exam.nameHindi : exam.name}</h1>
                <p className="text-muted-foreground mt-2">
                  {isHindi ? "परीक्षा मोड - नियमों का पालन करें" : "Exam Mode - Follow the rules"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold">
                <Clock className={`h-6 w-6 ${timeRemaining < 60 ? 'text-destructive' : 'text-primary'}`} />
                <span className={timeRemaining < 60 ? 'text-destructive' : ''}>{formatTime(timeRemaining)}</span>
              </div>
            </div>
            
            {/* Exam Rules */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span className="font-semibold">{isHindi ? "परीक्षा नियम:" : "Exam Rules:"}</span>
              </div>
              <ul className="ml-6 space-y-1 text-sm">
                <li>• {isHindi ? `न्यूनतम गति: ${exam.minimumWPM} WPM` : `Minimum Speed: ${exam.minimumWPM} WPM`}</li>
                <li>• {isHindi ? `न्यूनतम सटीकता: ${exam.minimumAccuracy}%` : `Minimum Accuracy: ${exam.minimumAccuracy}%`}</li>
                <li>• {isHindi ? `समय: ${formatTime(exam.duration)}` : `Duration: ${formatTime(exam.duration)}`}</li>
                <li className={!exam.allowBackspace ? 'text-destructive font-semibold' : ''}>
                  • {isHindi 
                    ? (exam.allowBackspace ? "बैकस्पेस: अनुमत" : "बैकस्पेस: अनुमति नहीं ❌")
                    : (exam.allowBackspace ? "Backspace: Allowed" : "Backspace: Not Allowed ❌")}
                </li>
              </ul>
            </div>
          </Card>

          {/* Stats */}
          {started && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{isHindi ? "WPM" : "WPM"}</p>
                <p className={`text-2xl font-bold ${wpm >= exam.minimumWPM ? 'text-success' : 'text-destructive'}`}>{wpm}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{isHindi ? "सटीकता" : "Accuracy"}</p>
                <p className={`text-2xl font-bold ${accuracy >= exam.minimumAccuracy ? 'text-success' : 'text-destructive'}`}>{accuracy}%</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{isHindi ? "गलतियां" : "Errors"}</p>
                <p className="text-2xl font-bold text-destructive">{errors}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{isHindi ? "प्रगति" : "Progress"}</p>
                <p className="text-2xl font-bold text-primary">{Math.round(progress)}%</p>
              </Card>
            </div>
          )}

          {/* Progress Bar */}
          {started && (
            <Card className="p-4 mb-6">
              <Progress value={progress} className="h-2" />
            </Card>
          )}

          {/* Typing Area */}
          <Card className="p-6">
            {!started ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">
                  {isHindi ? "परीक्षा शुरू करने के लिए तैयार हैं?" : "Ready to Start the Exam?"}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {isHindi 
                    ? "जैसे ही आप टाइप करना शुरू करेंगे, टाइमर शुरू हो जाएगा"
                    : "The timer will start as soon as you begin typing"}
                </p>
                <Button onClick={() => setStarted(true)} size="lg">
                  {isHindi ? "परीक्षा शुरू करें" : "Start Exam"}
                </Button>
              </div>
            ) : (
              <>
                <div 
                  className="text-xl leading-relaxed font-mono mb-6 select-none break-words p-4 bg-muted/30 rounded-lg"
                  style={{ fontFamily: isHindi ? hindiKeyboardFont : undefined }}
                >
                  {targetText.split("").map((char, index) => (
                    <span key={index} className={getCharacterClass(index)}>
                      {char}
                    </span>
                  ))}
                </div>
                
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  className="w-full p-4 text-xl font-mono border-2 border-border rounded-lg focus:outline-none focus:border-primary resize-none bg-background"
                  placeholder={isHindi ? "यहां टाइप करें..." : "Type here..."}
                  rows={5}
                  disabled={finished}
                  spellCheck={false}
                  style={{ fontFamily: isHindi ? hindiKeyboardFont : undefined }}
                />

                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {userInput.length} / {targetText.length} {isHindi ? "अक्षर" : "characters"}
                  </span>
                  {!exam.allowBackspace && (
                    <span className="text-destructive font-semibold">
                      ⚠️ {isHindi ? "बैकस्पेस निष्क्रिय" : "Backspace Disabled"}
                    </span>
                  )}
                </div>
              </>
            )}
          </Card>

          {/* Results */}
          {finished && (
            <Card className={`p-6 mt-6 ${isPassed ? 'bg-success/10 border-success' : 'bg-destructive/10 border-destructive'}`}>
              <div className="text-center">
                {isPassed ? (
                  <>
                    <Trophy className="h-16 w-16 text-success mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-success mb-2">
                      {isHindi ? "बधाई हो! आप उत्तीर्ण हो गए! 🎉" : "Congratulations! You Passed! 🎉"}
                    </h3>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-destructive mb-2">
                      {isHindi ? "असफल - फिर से प्रयास करें" : "Failed - Try Again"}
                    </h3>
                  </>
                )}
                
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto my-6">
                  <div className="bg-background p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">{isHindi ? "आपकी गति" : "Your Speed"}</p>
                    <p className={`text-2xl font-bold ${wpm >= exam.minimumWPM ? 'text-success' : 'text-destructive'}`}>
                      {wpm} WPM
                    </p>
                    <p className="text-xs text-muted-foreground">{isHindi ? `आवश्यक: ${exam.minimumWPM}` : `Required: ${exam.minimumWPM}`}</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">{isHindi ? "आपकी सटीकता" : "Your Accuracy"}</p>
                    <p className={`text-2xl font-bold ${accuracy >= exam.minimumAccuracy ? 'text-success' : 'text-destructive'}`}>
                      {accuracy}%
                    </p>
                    <p className="text-xs text-muted-foreground">{isHindi ? `आवश्यक: ${exam.minimumAccuracy}%` : `Required: ${exam.minimumAccuracy}%`}</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button onClick={() => window.location.reload()}>
                    {isHindi ? "फिर से प्रयास करें" : "Try Again"}
                  </Button>
                  <Button onClick={() => navigate('/lessons')} variant="outline">
                    {isHindi ? "पाठों पर वापस जाएं" : "Back to Lessons"}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExamMode;
