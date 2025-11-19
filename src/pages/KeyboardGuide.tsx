import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

interface KeyData {
  char: string;
  hindiChar?: string;
  finger: string;
  width?: string;
}

const KeyboardGuide = () => {
  const { isHindi, t } = useLanguage();
  const [activeKey, setActiveKey] = useState<string>("");

  const fingerColors: Record<string, string> = {
    leftPinky: "bg-red-500",
    leftRing: "bg-orange-500",
    leftMiddle: "bg-yellow-400",
    leftIndex: "bg-green-500",
    rightIndex: "bg-blue-500",
    rightMiddle: "bg-indigo-500",
    rightRing: "bg-purple-500",
    rightPinky: "bg-pink-400",
    thumb: "bg-gray-400",
  };

  const fingerColorsBorder: Record<string, string> = {
    leftPinky: "border-red-600",
    leftRing: "border-orange-600",
    leftMiddle: "border-yellow-500",
    leftIndex: "border-green-600",
    rightIndex: "border-blue-600",
    rightMiddle: "border-indigo-600",
    rightRing: "border-purple-600",
    rightPinky: "border-pink-500",
    thumb: "border-gray-500",
  };

  // Keyboard layout with rows
  const keyboardRows: KeyData[][] = [
    // Number row
    [
      { char: '`', finger: 'leftPinky' },
      { char: '1', finger: 'leftPinky' },
      { char: '2', finger: 'leftRing' },
      { char: '3', finger: 'leftMiddle' },
      { char: '4', finger: 'leftIndex' },
      { char: '5', finger: 'leftIndex' },
      { char: '6', finger: 'rightIndex' },
      { char: '7', finger: 'rightIndex' },
      { char: '8', finger: 'rightMiddle' },
      { char: '9', finger: 'rightRing' },
      { char: '0', finger: 'rightPinky' },
      { char: '-', finger: 'rightPinky' },
      { char: '=', finger: 'rightPinky' },
      { char: 'Delete', finger: 'rightPinky', width: 'w-20' },
    ],
    // QWERTY row
    [
      { char: 'Tab', finger: 'leftPinky', width: 'w-16' },
      { char: 'Q', hindiChar: 'औ', finger: 'leftPinky' },
      { char: 'W', hindiChar: 'ै', finger: 'leftRing' },
      { char: 'E', hindiChar: 'ा', finger: 'leftMiddle' },
      { char: 'R', hindiChar: 'ी', finger: 'leftIndex' },
      { char: 'T', hindiChar: 'ू', finger: 'leftIndex' },
      { char: 'Y', hindiChar: 'ब', finger: 'rightIndex' },
      { char: 'U', hindiChar: 'ह', finger: 'rightIndex' },
      { char: 'I', hindiChar: 'ग', finger: 'rightMiddle' },
      { char: 'O', hindiChar: 'द', finger: 'rightRing' },
      { char: 'P', hindiChar: 'ज', finger: 'rightPinky' },
      { char: '[', finger: 'rightPinky' },
      { char: ']', finger: 'rightPinky' },
      { char: '\\', finger: 'rightPinky' },
    ],
    // ASDF row (Home row)
    [
      { char: 'Caps', finger: 'leftPinky', width: 'w-20' },
      { char: 'A', hindiChar: 'ो', finger: 'leftPinky' },
      { char: 'S', hindiChar: 'े', finger: 'leftRing' },
      { char: 'D', hindiChar: '्', finger: 'leftMiddle' },
      { char: 'F', hindiChar: 'ि', finger: 'leftIndex' },
      { char: 'G', hindiChar: 'ु', finger: 'leftIndex' },
      { char: 'H', hindiChar: 'प', finger: 'rightIndex' },
      { char: 'J', hindiChar: 'र', finger: 'rightIndex' },
      { char: 'K', hindiChar: 'क', finger: 'rightMiddle' },
      { char: 'L', hindiChar: 'त', finger: 'rightRing' },
      { char: ';', hindiChar: 'च', finger: 'rightPinky' },
      { char: "'", finger: 'rightPinky' },
      { char: 'Return', finger: 'rightPinky', width: 'w-24' },
    ],
    // ZXCV row
    [
      { char: 'Shift', finger: 'leftPinky', width: 'w-28' },
      { char: 'Z', hindiChar: 'ं', finger: 'leftPinky' },
      { char: 'X', hindiChar: 'ँ', finger: 'leftRing' },
      { char: 'C', hindiChar: 'म', finger: 'leftMiddle' },
      { char: 'V', hindiChar: 'न', finger: 'leftIndex' },
      { char: 'B', hindiChar: 'व', finger: 'leftIndex' },
      { char: 'N', hindiChar: 'ल', finger: 'rightIndex' },
      { char: 'M', hindiChar: 'स', finger: 'rightIndex' },
      { char: ',', hindiChar: ',', finger: 'rightMiddle' },
      { char: '.', hindiChar: '.', finger: 'rightRing' },
      { char: '/', hindiChar: 'य', finger: 'rightPinky' },
      { char: 'Shift', finger: 'rightPinky', width: 'w-28' },
    ],
    // Space row
    [
      { char: 'Control', finger: 'leftPinky', width: 'w-20' },
      { char: 'Alt', finger: 'leftPinky', width: 'w-16' },
      { char: 'Cmd', finger: 'leftPinky', width: 'w-16' },
      { char: 'Space', finger: 'thumb', width: 'flex-1' },
      { char: 'Alt', finger: 'rightPinky', width: 'w-16' },
      { char: 'Fn', finger: 'rightPinky', width: 'w-16' },
      { char: 'Control', finger: 'rightPinky', width: 'w-20' },
    ],
  ];

  const KeyCap = ({ keyData, showHindi }: { keyData: KeyData; showHindi: boolean }) => {
    const displayChar = showHindi && keyData.hindiChar ? keyData.hindiChar : keyData.char;
    const baseWidth = keyData.width || 'w-12';
    
    return (
      <div
        className={`${baseWidth} h-12 m-0.5 rounded border-2 ${fingerColors[keyData.finger]} ${fingerColorsBorder[keyData.finger]} 
        flex items-center justify-center text-xs font-bold text-white shadow-md hover:scale-105 transition-transform cursor-pointer`}
        onMouseEnter={() => setActiveKey(keyData.char)}
        onMouseLeave={() => setActiveKey("")}
      >
        <span className="text-center">{displayChar}</span>
      </div>
    );
  };

  const HandDiagram = () => (
    <div className="flex justify-center items-center gap-8 mt-8">
      {/* Left Hand */}
      <div className="relative">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">{isHindi ? "बायां हाथ" : "Left Hand"}</h3>
          <p className="text-sm text-muted-foreground">{isHindi ? "कुंजियाँ" : "Keys"}</p>
        </div>
        <svg width="200" height="250" viewBox="0 0 200 250" className="mx-auto">
          {/* Palm */}
          <ellipse cx="100" cy="180" rx="60" ry="70" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
          
          {/* Fingers */}
          {/* Pinky - Red */}
          <ellipse cx="40" cy="80" rx="12" ry="40" fill="#ef4444" stroke="#333" strokeWidth="2" transform="rotate(-15 40 80)"/>
          {/* Ring - Orange */}
          <ellipse cx="65" cy="50" rx="12" ry="45" fill="#f97316" stroke="#333" strokeWidth="2" transform="rotate(-5 65 50)"/>
          {/* Middle - Yellow */}
          <ellipse cx="90" cy="40" rx="12" ry="50" fill="#facc15" stroke="#333" strokeWidth="2"/>
          {/* Index - Green */}
          <ellipse cx="115" cy="50" rx="12" ry="45" fill="#22c55e" stroke="#333" strokeWidth="2" transform="rotate(5 115 50)"/>
          {/* Thumb - Gray */}
          <ellipse cx="150" cy="160" rx="15" ry="35" fill="#9ca3af" stroke="#333" strokeWidth="2" transform="rotate(45 150 160)"/>
        </svg>
      </div>

      {/* Right Hand */}
      <div className="relative">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">{isHindi ? "दायां हाथ" : "Right Hand"}</h3>
          <p className="text-sm text-muted-foreground">{isHindi ? "कुंजियाँ" : "Keys"}</p>
        </div>
        <svg width="200" height="250" viewBox="0 0 200 250" className="mx-auto">
          {/* Palm */}
          <ellipse cx="100" cy="180" rx="60" ry="70" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
          
          {/* Fingers */}
          {/* Index - Blue */}
          <ellipse cx="85" cy="50" rx="12" ry="45" fill="#3b82f6" stroke="#333" strokeWidth="2" transform="rotate(-5 85 50)"/>
          {/* Middle - Indigo */}
          <ellipse cx="110" cy="40" rx="12" ry="50" fill="#6366f1" stroke="#333" strokeWidth="2"/>
          {/* Ring - Purple */}
          <ellipse cx="135" cy="50" rx="12" ry="45" fill="#a855f7" stroke="#333" strokeWidth="2" transform="rotate(5 135 50)"/>
          {/* Pinky - Pink */}
          <ellipse cx="160" cy="80" rx="12" ry="40" fill="#ec4899" stroke="#333" strokeWidth="2" transform="rotate(15 160 80)"/>
          {/* Thumb - Gray */}
          <ellipse cx="50" cy="160" rx="15" ry="35" fill="#9ca3af" stroke="#333" strokeWidth="2" transform="rotate(-45 50 160)"/>
        </svg>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          {isHindi ? "कीबोर्ड गाइड" : "Keyboard Guide"}
        </h1>

        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="visual">{isHindi ? "विज़ुअल गाइड" : "Visual Guide"}</TabsTrigger>
            <TabsTrigger value="practice">{isHindi ? "अभ्यास" : "Practice"}</TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {isHindi ? "कीबोर्ड लेआउट - रंग-कोडित फिंगर गाइड" : "Keyboard Layout - Color-Coded Finger Guide"}
                </CardTitle>
                <CardDescription className="text-center">
                  {isHindi 
                    ? "प्रत्येक रंग दिखाता है कि किस उंगली से कुंजी दबानी है"
                    : "Each color shows which finger to use for that key"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Language Toggle */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex rounded-lg border border-border p-1">
                    <button
                      onClick={() => setActiveKey("")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        !isHindi ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setActiveKey("")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        isHindi ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      हिंदी
                    </button>
                  </div>
                </div>

                {/* Keyboard Layout */}
                <div className="bg-muted/30 p-6 rounded-xl border-2 border-border max-w-4xl mx-auto">
                  {keyboardRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center mb-1">
                      {row.map((keyData, keyIndex) => (
                        <KeyCap key={`${rowIndex}-${keyIndex}`} keyData={keyData} showHindi={isHindi} />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Color Legend */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-red-500 border-2 border-red-600"></div>
                    <span className="text-sm">{isHindi ? "बायीं छोटी उंगली" : "Left Pinky"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-orange-500 border-2 border-orange-600"></div>
                    <span className="text-sm">{isHindi ? "बायीं अनामिका" : "Left Ring"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-yellow-400 border-2 border-yellow-500"></div>
                    <span className="text-sm">{isHindi ? "बायीं मध्य उंगली" : "Left Middle"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-green-500 border-2 border-green-600"></div>
                    <span className="text-sm">{isHindi ? "बायीं तर्जनी" : "Left Index"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-blue-500 border-2 border-blue-600"></div>
                    <span className="text-sm">{isHindi ? "दायीं तर्जनी" : "Right Index"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-indigo-500 border-2 border-indigo-600"></div>
                    <span className="text-sm">{isHindi ? "दायीं मध्य उंगली" : "Right Middle"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-purple-500 border-2 border-purple-600"></div>
                    <span className="text-sm">{isHindi ? "दायीं अनामिका" : "Right Ring"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-pink-400 border-2 border-pink-500"></div>
                    <span className="text-sm">{isHindi ? "दायीं छोटी उंगली" : "Right Pinky"}</span>
                  </div>
                </div>

                {/* Hand Diagrams */}
                <HandDiagram />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {isHindi ? "टाइपिंग अभ्यास" : "Typing Practice"}
                </CardTitle>
                <CardDescription className="text-center">
                  {isHindi 
                    ? "कुंजी दबाएं और देखें कि कौन सी उंगली उपयोग करनी है"
                    : "Press keys to see which finger to use"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">
                    {isHindi 
                      ? "टाइपिंग शुरू करें और रंग-कोडित फीडबैक देखें"
                      : "Start typing to see color-coded feedback"}
                  </p>
                  <div className="max-w-2xl mx-auto p-8 bg-muted/30 rounded-lg border-2 border-border">
                    <p className="text-xl font-mono">
                      {isHindi 
                        ? "अभ्यास मोड जल्द आ रहा है..."
                        : "Practice mode coming soon..."}
                    </p>
                  </div>
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
