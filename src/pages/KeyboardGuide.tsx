import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const KeyboardGuide = () => {
  const { isHindi } = useLanguage();
  const [activeKey, setActiveKey] = useState<string>("");

  const fingerColors = {
    leftPinky: "bg-red-500",
    leftRing: "bg-orange-500",
    leftMiddle: "bg-yellow-500",
    leftIndex: "bg-green-500",
    rightIndex: "bg-blue-500",
    rightMiddle: "bg-indigo-500",
    rightRing: "bg-purple-500",
    rightPinky: "bg-pink-500",
    thumb: "bg-gray-500",
  };

  const keyMapping = {
    // Numbers row
    '1': 'leftPinky', '2': 'leftRing', '3': 'leftMiddle', '4': 'leftIndex', '5': 'leftIndex',
    '6': 'rightIndex', '7': 'rightIndex', '8': 'rightMiddle', '9': 'rightRing', '0': 'rightPinky',
    // Top row (QWERTY)
    'q': 'leftPinky', 'w': 'leftRing', 'e': 'leftMiddle', 'r': 'leftIndex', 't': 'leftIndex',
    'y': 'rightIndex', 'u': 'rightIndex', 'i': 'rightMiddle', 'o': 'rightRing', 'p': 'rightPinky',
    // Home row (ASDF)
    'a': 'leftPinky', 's': 'leftRing', 'd': 'leftMiddle', 'f': 'leftIndex', 'g': 'leftIndex',
    'h': 'rightIndex', 'j': 'rightIndex', 'k': 'rightMiddle', 'l': 'rightRing', ';': 'rightPinky',
    // Bottom row (ZXCV)
    'z': 'leftPinky', 'x': 'leftRing', 'c': 'leftMiddle', 'v': 'leftIndex', 'b': 'leftIndex',
    'n': 'rightIndex', 'm': 'rightIndex', ',': 'rightMiddle', '.': 'rightRing', '/': 'rightPinky',
    ' ': 'thumb'
  };

  const hindiKeys = [
    { en: 'a', hi: 'ा', finger: 'leftPinky' },
    { en: 's', hi: 'े', finger: 'leftRing' },
    { en: 'd', hi: '्', finger: 'leftMiddle' },
    { en: 'f', hi: 'ि', finger: 'leftIndex' },
    { en: 'g', hi: 'ु', finger: 'leftIndex' },
    { en: 'h', hi: 'प', finger: 'rightIndex' },
    { en: 'j', hi: 'र', finger: 'rightIndex' },
    { en: 'k', hi: 'क', finger: 'rightMiddle' },
    { en: 'l', hi: 'त', finger: 'rightRing' },
    { en: 'q', hi: 'औ', finger: 'leftPinky' },
    { en: 'w', hi: 'ै', finger: 'leftRing' },
    { en: 'e', hi: 'ा', finger: 'leftMiddle' },
    { en: 'r', hi: 'ी', finger: 'leftIndex' },
    { en: 't', hi: 'ू', finger: 'leftIndex' },
    { en: 'y', hi: 'ब', finger: 'rightIndex' },
    { en: 'u', hi: 'ह', finger: 'rightIndex' },
    { en: 'i', hi: 'ग', finger: 'rightMiddle' },
    { en: 'o', hi: 'द', finger: 'rightRing' },
    { en: 'p', hi: 'ज', finger: 'rightPinky' },
  ];

  const KeyButton = ({ keyChar, finger }: { keyChar: string; finger: keyof typeof fingerColors }) => (
    <button
      className={`w-12 h-12 m-1 rounded ${fingerColors[finger]} text-white font-bold hover:opacity-80 transition-opacity`}
      onMouseEnter={() => setActiveKey(keyChar)}
      onMouseLeave={() => setActiveKey("")}
    >
      {keyChar.toUpperCase()}
    </button>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          {isHindi ? "कीबोर्ड गाइड" : "Keyboard Guide"}
        </h1>

        <Tabs defaultValue="english" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="english">English Keys</TabsTrigger>
            <TabsTrigger value="hindi">Hindi Keys</TabsTrigger>
            <TabsTrigger value="fingers">Finger Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="english" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>English Keyboard Layout</CardTitle>
                <CardDescription>Hover over keys to see which finger to use</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {/* Number Row */}
                <div className="flex mb-2">
                  {['1','2','3','4','5','6','7','8','9','0'].map(key => (
                    <KeyButton key={key} keyChar={key} finger={keyMapping[key] as keyof typeof fingerColors} />
                  ))}
                </div>
                {/* Top Row */}
                <div className="flex mb-2">
                  {['q','w','e','r','t','y','u','i','o','p'].map(key => (
                    <KeyButton key={key} keyChar={key} finger={keyMapping[key] as keyof typeof fingerColors} />
                  ))}
                </div>
                {/* Home Row */}
                <div className="flex mb-2">
                  {['a','s','d','f','g','h','j','k','l',';'].map(key => (
                    <KeyButton key={key} keyChar={key} finger={keyMapping[key] as keyof typeof fingerColors} />
                  ))}
                </div>
                {/* Bottom Row */}
                <div className="flex mb-2">
                  {['z','x','c','v','b','n','m',',','.','/'].map(key => (
                    <KeyButton key={key} keyChar={key} finger={keyMapping[key] as keyof typeof fingerColors} />
                  ))}
                </div>
                {/* Spacebar */}
                <div className="flex mt-4">
                  <button className={`w-96 h-12 m-1 rounded ${fingerColors.thumb} text-white font-bold`}>
                    SPACE
                  </button>
                </div>
                {activeKey && (
                  <p className="mt-4 text-lg text-muted-foreground">
                    Active Key: <span className="text-primary font-bold">{activeKey.toUpperCase()}</span>
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hindi" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Hindi Keyboard Mapping</CardTitle>
                <CardDescription>Learn Hindi character positions on English keyboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {hindiKeys.map((key) => (
                    <div key={key.en} className="p-4 border border-border rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary mb-2">{key.en.toUpperCase()}</p>
                        <p className="text-3xl mb-2">{key.hi}</p>
                        <div className={`w-8 h-8 rounded-full mx-auto ${fingerColors[key.finger as keyof typeof fingerColors]}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fingers" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Finger Placement Guide</CardTitle>
                <CardDescription>Proper finger positioning for touch typing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Left Hand</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded ${fingerColors.leftPinky}`}></div>
                        <span><strong>Pinky:</strong> Q, A, Z, 1</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded ${fingerColors.leftRing}`}></div>
                        <span><strong>Ring:</strong> W, S, X, 2</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded ${fingerColors.leftMiddle}`}></div>
                        <span><strong>Middle:</strong> E, D, C, 3</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded ${fingerColors.leftIndex}`}></div>
                        <span><strong>Index:</strong> R, F, V, T, G, B, 4, 5</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Right Hand</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded ${fingerColors.rightIndex}`}></div>
                        <span><strong>Index:</strong> Y, H, N, U, J, M, 6, 7</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded ${fingerColors.rightMiddle}`}></div>
                        <span><strong>Middle:</strong> I, K, comma, 8</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded ${fingerColors.rightRing}`}></div>
                        <span><strong>Ring:</strong> O, L, period, 9</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded ${fingerColors.rightPinky}`}></div>
                        <span><strong>Pinky:</strong> P, semicolon, slash, 0</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-center"><strong>Thumbs:</strong> Spacebar</p>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Keep your fingers on the home row (ASDF JKL;) and return after each keystroke
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default KeyboardGuide;
