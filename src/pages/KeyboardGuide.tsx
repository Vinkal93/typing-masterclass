import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { RotateCcw } from "lucide-react";

interface KeyData {
  char: string;
  hindiChar?: string;
  finger: string;
  width?: string;
}

interface DrillExercise {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  text: string;
  textHindi: string;
  category: string;
  finger: string;
}

const KeyboardGuide = () => {
  const { isHindi, t } = useLanguage();
  const [activeKey, setActiveKey] = useState<string>("");
  
  // Practice mode states
  const [selectedDrill, setSelectedDrill] = useState<DrillExercise | null>(null);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Drill exercises
  const drillExercises: DrillExercise[] = [
    // Home Row - Left Hand
    {
      id: "home-left-pinky",
      name: "Home Row - Left Pinky (A)",
      nameHindi: "होम रो - बायीं छोटी उंगली (ो)",
      description: "Practice 'A' key with left pinky",
      descriptionHindi: "'ो' कुंजी का अभ्यास बायीं छोटी उंगली से",
      text: "aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa",
      textHindi: "ोोो ोोो ोोो ोोो ोोो ोोो ोोो ोोो ोोो ोोो",
      category: "homeRow",
      finger: "leftPinky"
    },
    {
      id: "home-left-ring",
      name: "Home Row - Left Ring (S)",
      nameHindi: "होम रो - बायीं अनामिका (े)",
      description: "Practice 'S' key with left ring finger",
      descriptionHindi: "'े' कुंजी का अभ्यास बायीं अनामिका से",
      text: "sss sss sss sss sss sss sss sss sss sss",
      textHindi: "ेेे ेेे ेेे ेेे ेेे ेेे ेेे ेेे ेेे ेेे",
      category: "homeRow",
      finger: "leftRing"
    },
    {
      id: "home-left-middle",
      name: "Home Row - Left Middle (D)",
      nameHindi: "होम रो - बायीं मध्य उंगली (्)",
      description: "Practice 'D' key with left middle finger",
      descriptionHindi: "'्' कुंजी का अभ्यास बायीं मध्य उंगली से",
      text: "ddd ddd ddd ddd ddd ddd ddd ddd ddd ddd",
      textHindi: "््् ््् ््् ््् ््् ््् ््् ््् ््् ्््",
      category: "homeRow",
      finger: "leftMiddle"
    },
    {
      id: "home-left-index",
      name: "Home Row - Left Index (F, G)",
      nameHindi: "होम रो - बायीं तर्जनी (ि, ु)",
      description: "Practice 'F' and 'G' keys with left index finger",
      descriptionHindi: "'ि' और 'ु' कुंजी का अभ्यास बायीं तर्जनी से",
      text: "fff ggg fff ggg fff ggg fff ggg fff ggg",
      textHindi: "ििि ुुु ििि ुुु ििि ुुु ििि ुुु ििि ुुु",
      category: "homeRow",
      finger: "leftIndex"
    },
    {
      id: "home-right-index",
      name: "Home Row - Right Index (H, J)",
      nameHindi: "होम रो - दायीं तर्जनी (प, र)",
      description: "Practice 'H' and 'J' keys with right index finger",
      descriptionHindi: "'प' और 'र' कुंजी का अभ्यास दायीं तर्जनी से",
      text: "hhh jjj hhh jjj hhh jjj hhh jjj hhh jjj",
      textHindi: "पपप ररर पपप ररर पपप ररर पपप ररर पपप ररर",
      category: "homeRow",
      finger: "rightIndex"
    },
    {
      id: "home-right-middle",
      name: "Home Row - Right Middle (K)",
      nameHindi: "होम रो - दायीं मध्य उंगली (क)",
      description: "Practice 'K' key with right middle finger",
      descriptionHindi: "'क' कुंजी का अभ्यास दायीं मध्य उंगली से",
      text: "kkk kkk kkk kkk kkk kkk kkk kkk kkk kkk",
      textHindi: "ककक ककक ककक ककक ककक ककक ककक ककक ककक ककक",
      category: "homeRow",
      finger: "rightMiddle"
    },
    {
      id: "home-right-ring",
      name: "Home Row - Right Ring (L)",
      nameHindi: "होम रो - दायीं अनामिका (त)",
      description: "Practice 'L' key with right ring finger",
      descriptionHindi: "'त' कुंजी का अभ्यास दायीं अनामिका से",
      text: "lll lll lll lll lll lll lll lll lll lll",
      textHindi: "ततत ततत ततत ततत ततत ततत ततत ततत ततत ततत",
      category: "homeRow",
      finger: "rightRing"
    },
    {
      id: "home-right-pinky",
      name: "Home Row - Right Pinky (;)",
      nameHindi: "होम रो - दायीं छोटी उंगली (च)",
      description: "Practice ';' key with right pinky",
      descriptionHindi: "'च' कुंजी का अभ्यास दायीं छोटी उंगली से",
      text: ";;; ;;; ;;; ;;; ;;; ;;; ;;; ;;; ;;; ;;;",
      textHindi: "चचच चचच चचच चचच चचच चचच चचच चचच चचच चचच",
      category: "homeRow",
      finger: "rightPinky"
    },
    
    // Top Row
    {
      id: "top-left-pinky",
      name: "Top Row - Left Pinky (Q)",
      nameHindi: "टॉप रो - बायीं छोटी उंगली (औ)",
      description: "Practice 'Q' key with left pinky",
      descriptionHindi: "'औ' कुंजी का अभ्यास बायीं छोटी उंगली से",
      text: "qqq qqq qqq qqq qqq qqq qqq qqq qqq qqq",
      textHindi: "औऔऔ औऔऔ औऔऔ औऔऔ औऔऔ औऔऔ औऔऔ औऔऔ औऔऔ औऔऔ",
      category: "topRow",
      finger: "leftPinky"
    },
    {
      id: "top-left-ring",
      name: "Top Row - Left Ring (W)",
      nameHindi: "टॉप रो - बायीं अनामिका (ै)",
      description: "Practice 'W' key with left ring finger",
      descriptionHindi: "'ै' कुंजी का अभ्यास बायीं अनामिका से",
      text: "www www www www www www www www www www",
      textHindi: "ैैै ैैै ैैै ैैै ैैै ैैै ैैै ैैै ैैै ैैै",
      category: "topRow",
      finger: "leftRing"
    },
    {
      id: "top-left-middle",
      name: "Top Row - Left Middle (E)",
      nameHindi: "टॉप रो - बायीं मध्य उंगली (ा)",
      description: "Practice 'E' key with left middle finger",
      descriptionHindi: "'ा' कुंजी का अभ्यास बायीं मध्य उंगली से",
      text: "eee eee eee eee eee eee eee eee eee eee",
      textHindi: "ााा ााा ааа ааа ааа ааа ааа ааа ааа ааа",
      category: "topRow",
      finger: "leftMiddle"
    },
    {
      id: "top-left-index",
      name: "Top Row - Left Index (R, T)",
      nameHindi: "टॉप रो - बायीं तर्जनी (ी, ू)",
      description: "Practice 'R' and 'T' keys with left index finger",
      descriptionHindi: "'ी' और 'ू' कुंजी का अभ्यास बायीं तर्जनी से",
      text: "rrr ttt rrr ttt rrr ttt rrr ttt rrr ttt",
      textHindi: "ीीी ूूू ीीी ूूू ीीी ूूू ीीी ूूू ीीी ूूू",
      category: "topRow",
      finger: "leftIndex"
    },
    {
      id: "top-right-index",
      name: "Top Row - Right Index (Y, U)",
      nameHindi: "टॉप रो - दायीं तर्जनी (ब, ह)",
      description: "Practice 'Y' and 'U' keys with right index finger",
      descriptionHindi: "'ब' और 'ह' कुंजी का अभ्यास दायीं तर्जनी से",
      text: "yyy uuu yyy uuu yyy uuu yyy uuu yyy uuu",
      textHindi: "बबबब हहह बबबब हहह बबबब हहह बबबब हहह बबबब हहह",
      category: "topRow",
      finger: "rightIndex"
    },
    {
      id: "top-right-middle",
      name: "Top Row - Right Middle (I)",
      nameHindi: "टॉप रो - दायीं मध्य उंगली (ग)",
      description: "Practice 'I' key with right middle finger",
      descriptionHindi: "'ग' कुंजी का अभ्यास दायीं मध्य उंगली से",
      text: "iii iii iii iii iii iii iii iii iii iii",
      textHindi: "गगग गगग गगग गगग गगग गगग गगग गगग गगग गगग",
      category: "topRow",
      finger: "rightMiddle"
    },
    {
      id: "top-right-ring",
      name: "Top Row - Right Ring (O)",
      nameHindi: "टॉप रो - दायीं अनामिका (द)",
      description: "Practice 'O' key with right ring finger",
      descriptionHindi: "'द' कुंजी का अभ्यास दायीं अनामिका से",
      text: "ooo ooo ooo ooo ooo ooo ooo ooo ooo ooo",
      textHindi: "ददद ददद ददद ददद ददद ददद ददद ददद ददद ददद",
      category: "topRow",
      finger: "rightRing"
    },
    {
      id: "top-right-pinky",
      name: "Top Row - Right Pinky (P)",
      nameHindi: "टॉप रो - दायीं छोटी उंगली (ज)",
      description: "Practice 'P' key with right pinky",
      descriptionHindi: "'ज' कुंजी का अभ्यास दायीं छोटी उंगली से",
      text: "ppp ppp ppp ppp ppp ppp ppp ppp ppp ppp",
      textHindi: "जजज जजज जजज जजज जजज जजज जजज जजज जजज जजज",
      category: "topRow",
      finger: "rightPinky"
    },
    
    // Bottom Row
    {
      id: "bottom-left-pinky",
      name: "Bottom Row - Left Pinky (Z)",
      nameHindi: "बॉटम रो - बायीं छोटी उंगली (ं)",
      description: "Practice 'Z' key with left pinky",
      descriptionHindi: "'ं' कुंजी का अभ्यास बायीं छोटी उंगली से",
      text: "zzz zzz zzz zzz zzz zzz zzz zzz zzz zzz",
      textHindi: "ंंं ंंं ंंं ंंं ंंं ंंं ंंं ंंं ंंं ंंं",
      category: "bottomRow",
      finger: "leftPinky"
    },
    {
      id: "bottom-left-ring",
      name: "Bottom Row - Left Ring (X)",
      nameHindi: "बॉटम रो - बायीं अनामिका (ँ)",
      description: "Practice 'X' key with left ring finger",
      descriptionHindi: "'ँ' कुंजी का अभ्यास बायीं अनामिका से",
      text: "xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx",
      textHindi: "ँँँ ँँँ ँँँ ँँँ ँँँ ँँँ ँँँ ँँँ ँँँ ँँँ",
      category: "bottomRow",
      finger: "leftRing"
    },
    {
      id: "bottom-left-middle",
      name: "Bottom Row - Left Middle (C)",
      nameHindi: "बॉटम रो - बायीं मध्य उंगली (म)",
      description: "Practice 'C' key with left middle finger",
      descriptionHindi: "'म' कुंजी का अभ्यास बायीं मध्य उंगली से",
      text: "ccc ccc ccc ccc ccc ccc ccc ccc ccc ccc",
      textHindi: "ममम ममम ममम ममम ममम ममम ममम ममम ममम ममम",
      category: "bottomRow",
      finger: "leftMiddle"
    },
    {
      id: "bottom-left-index",
      name: "Bottom Row - Left Index (V, B)",
      nameHindi: "बॉटम रो - बायीं तर्जनी (न, व)",
      description: "Practice 'V' and 'B' keys with left index finger",
      descriptionHindi: "'न' और 'व' कुंजी का अभ्यास बायीं तर्जनी से",
      text: "vvv bbb vvv bbb vvv bbb vvv bbb vvv bbb",
      textHindi: "ननन ववव ननन ववव ननन ववव ननन ववव ननन ववव",
      category: "bottomRow",
      finger: "leftIndex"
    },
    {
      id: "bottom-right-index",
      name: "Bottom Row - Right Index (N, M)",
      nameHindi: "बॉटम रो - दायीं तर्जनी (ल, स)",
      description: "Practice 'N' and 'M' keys with right index finger",
      descriptionHindi: "'ल' और 'स' कुंजी का अभ्यास दायीं तर्जनी से",
      text: "nnn mmm nnn mmm nnn mmm nnn mmm nnn mmm",
      textHindi: "ललल ससस ललल ससस ललल ससस ललल ससस ललल ससस",
      category: "bottomRow",
      finger: "rightIndex"
    },
    {
      id: "bottom-right-middle",
      name: "Bottom Row - Right Middle (,)",
      nameHindi: "बॉटम रो - दायीं मध्य उंगली (,)",
      description: "Practice ',' key with right middle finger",
      descriptionHindi: "',' कुंजी का अभ्यास दायीं मध्य उंगली से",
      text: ",,, ,,, ,,, ,,, ,,, ,,, ,,, ,,, ,,, ,,,",
      textHindi: ",,, ,,, ,,, ,,, ,,, ,,, ,,, ,,, ,,, ,,,",
      category: "bottomRow",
      finger: "rightMiddle"
    },
    {
      id: "bottom-right-ring",
      name: "Bottom Row - Right Ring (.)",
      nameHindi: "बॉटम रो - दायीं अनामिका (.)",
      description: "Practice '.' key with right ring finger",
      descriptionHindi: "'.' कुंजी का अभ्यास दायीं अनामिका से",
      text: "... ... ... ... ... ... ... ... ... ...",
      textHindi: "... ... ... ... ... ... ... ... ... ...",
      category: "bottomRow",
      finger: "rightRing"
    },
    {
      id: "bottom-right-pinky",
      name: "Bottom Row - Right Pinky (/)",
      nameHindi: "बॉटम रो - दायीं छोटी उंगली (य)",
      description: "Practice '/' key with right pinky",
      descriptionHindi: "'य' कुंजी का अभ्यास दायीं छोटी उंगली से",
      text: "/// /// /// /// /// /// /// /// /// ///",
      textHindi: "ययय ययय ययय ययय ययय ययय ययय ययय ययय ययय",
      category: "bottomRow",
      finger: "rightPinky"
    },
    
    // Numbers
    {
      id: "numbers-1-2",
      name: "Numbers - 1, 2",
      nameHindi: "नंबर - 1, 2",
      description: "Practice numbers 1 and 2",
      descriptionHindi: "नंबर 1 और 2 का अभ्यास",
      text: "111 222 111 222 111 222 111 222 111 222",
      textHindi: "१११ २२२ १११ २२२ १११ २२२ १११ २२२ १११ २२२",
      category: "numbers",
      finger: "leftPinky"
    },
    {
      id: "numbers-3-4",
      name: "Numbers - 3, 4",
      nameHindi: "नंबर - 3, 4",
      description: "Practice numbers 3 and 4",
      descriptionHindi: "नंबर 3 और 4 का अभ्यास",
      text: "333 444 333 444 333 444 333 444 333 444",
      textHindi: "३३३ ४४४ ३३३ ४४४ ३३३ ४४४ ३३३ ४४४ ३३३ ४४४",
      category: "numbers",
      finger: "leftMiddle"
    },
    {
      id: "numbers-5-6",
      name: "Numbers - 5, 6",
      nameHindi: "नंबर - 5, 6",
      description: "Practice numbers 5 and 6",
      descriptionHindi: "नंबर 5 और 6 का अभ्यास",
      text: "555 666 555 666 555 666 555 666 555 666",
      textHindi: "५५५ ६६६ ५५५ ६६६ ५५५ ६६६ ५५५ ६६६ ५५५ ६६६",
      category: "numbers",
      finger: "leftIndex"
    },
    {
      id: "numbers-7-8",
      name: "Numbers - 7, 8",
      nameHindi: "नंबर - 7, 8",
      description: "Practice numbers 7 and 8",
      descriptionHindi: "नंबर 7 और 8 का अभ्यास",
      text: "777 888 777 888 777 888 777 888 777 888",
      textHindi: "७७७ ८८८ ७७७ ८८८ ७७७ ८८८ ७७७ ८८८ ७७७ ८८८",
      category: "numbers",
      finger: "rightIndex"
    },
    {
      id: "numbers-9-0",
      name: "Numbers - 9, 0",
      nameHindi: "नंबर - 9, 0",
      description: "Practice numbers 9 and 0",
      descriptionHindi: "नंबर 9 और 0 का अभ्यास",
      text: "999 000 999 000 999 000 999 000 999 000",
      textHindi: "९९९ ००० ९९९ ००० ९९९ ००० ९९९ ००० ९९९ ०००",
      category: "numbers",
      finger: "rightPinky"
    }
  ];
  
  useEffect(() => {
    if (userInput.length > 0 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput.length > 0 && startTime && selectedDrill) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      const currentErrors = calculateErrors();
      const currentAccuracy = userInput.length > 0 
        ? Math.max(0, ((userInput.length - currentErrors) / userInput.length) * 100)
        : 100;

      setWpm(timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0);
      setAccuracy(Math.round(currentAccuracy));
      setErrors(currentErrors);
    }
  }, [userInput, startTime, selectedDrill]);

  const calculateErrors = () => {
    if (!selectedDrill) return 0;
    let errorCount = 0;
    const targetText = isHindi ? selectedDrill.textHindi : selectedDrill.text;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== targetText[i]) {
        errorCount++;
      }
    }
    return errorCount;
  };

  const handleDrillSelect = (drill: DrillExercise) => {
    setSelectedDrill(drill);
    setUserInput("");
    setStartTime(null);
    setAccuracy(100);
    setErrors(0);
    setWpm(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedDrill) return;
    const value = e.target.value;
    const targetText = isHindi ? selectedDrill.textHindi : selectedDrill.text;
    
    if (value.length <= targetText.length) {
      setUserInput(value);
    }
  };

  const handleRestart = () => {
    setUserInput("");
    setStartTime(null);
    setAccuracy(100);
    setErrors(0);
    setWpm(0);
    inputRef.current?.focus();
  };

  const getCharacterClass = (index: number) => {
    if (!selectedDrill) return "text-muted-foreground";
    if (index >= userInput.length) return "text-muted-foreground";
    const targetText = isHindi ? selectedDrill.textHindi : selectedDrill.text;
    if (userInput[index] === targetText[index]) return "text-success";
    return "text-destructive bg-destructive/10";
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, { en: string; hi: string }> = {
      homeRow: { en: "Home Row", hi: "होम रो" },
      topRow: { en: "Top Row", hi: "टॉप रो" },
      bottomRow: { en: "Bottom Row", hi: "बॉटम रो" },
      numbers: { en: "Numbers", hi: "नंबर" }
    };
    return isHindi ? names[category].hi : names[category].en;
  };

  const progress = selectedDrill 
    ? (userInput.length / (isHindi ? selectedDrill.textHindi.length : selectedDrill.text.length)) * 100 
    : 0;

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
            {!selectedDrill ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    {isHindi ? "टाइपिंग अभ्यास - फिंगर ड्रिल" : "Typing Practice - Finger Drills"}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {isHindi 
                      ? "अलग-अलग पंक्तियों और उंगलियों के लिए अभ्यास चुनें"
                      : "Select exercises for different rows and fingers"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Home Row Drills */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      {getCategoryName("homeRow")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {drillExercises.filter(d => d.category === "homeRow").map(drill => (
                        <Card 
                          key={drill.id}
                          className="cursor-pointer hover:border-primary transition-colors"
                          onClick={() => handleDrillSelect(drill)}
                        >
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2 text-sm">
                              {isHindi ? drill.nameHindi : drill.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {isHindi ? drill.descriptionHindi : drill.description}
                            </p>
                            <div className={`mt-3 w-8 h-8 rounded ${fingerColors[drill.finger]} border-2 ${fingerColorsBorder[drill.finger]}`}></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Top Row Drills */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      {getCategoryName("topRow")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {drillExercises.filter(d => d.category === "topRow").map(drill => (
                        <Card 
                          key={drill.id}
                          className="cursor-pointer hover:border-primary transition-colors"
                          onClick={() => handleDrillSelect(drill)}
                        >
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2 text-sm">
                              {isHindi ? drill.nameHindi : drill.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {isHindi ? drill.descriptionHindi : drill.description}
                            </p>
                            <div className={`mt-3 w-8 h-8 rounded ${fingerColors[drill.finger]} border-2 ${fingerColorsBorder[drill.finger]}`}></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row Drills */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      {getCategoryName("bottomRow")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {drillExercises.filter(d => d.category === "bottomRow").map(drill => (
                        <Card 
                          key={drill.id}
                          className="cursor-pointer hover:border-primary transition-colors"
                          onClick={() => handleDrillSelect(drill)}
                        >
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2 text-sm">
                              {isHindi ? drill.nameHindi : drill.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {isHindi ? drill.descriptionHindi : drill.description}
                            </p>
                            <div className={`mt-3 w-8 h-8 rounded ${fingerColors[drill.finger]} border-2 ${fingerColorsBorder[drill.finger]}`}></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Numbers Drills */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      {getCategoryName("numbers")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {drillExercises.filter(d => d.category === "numbers").map(drill => (
                        <Card 
                          key={drill.id}
                          className="cursor-pointer hover:border-primary transition-colors"
                          onClick={() => handleDrillSelect(drill)}
                        >
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2 text-sm">
                              {isHindi ? drill.nameHindi : drill.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {isHindi ? drill.descriptionHindi : drill.description}
                            </p>
                            <div className={`mt-3 w-8 h-8 rounded ${fingerColors[drill.finger]} border-2 ${fingerColorsBorder[drill.finger]}`}></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Drill Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{isHindi ? selectedDrill.nameHindi : selectedDrill.name}</CardTitle>
                        <CardDescription>{isHindi ? selectedDrill.descriptionHindi : selectedDrill.description}</CardDescription>
                      </div>
                      <Button onClick={() => setSelectedDrill(null)} variant="outline">
                        {isHindi ? "वापस जाएं" : "Back"}
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{isHindi ? "WPM" : "WPM"}</p>
                    <p className="text-2xl font-bold text-foreground">{wpm}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{isHindi ? "सटीकता" : "Accuracy"}</p>
                    <p className="text-2xl font-bold text-success">{accuracy}%</p>
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

                {/* Progress Bar */}
                <Card className="p-4">
                  <Progress value={progress} className="h-2" />
                </Card>

                {/* Typing Area */}
                <Card className="p-6">
                  <div className="text-2xl leading-relaxed font-mono mb-6 select-none break-words">
                    {(isHindi ? selectedDrill.textHindi : selectedDrill.text).split("").map((char, index) => (
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
                    rows={3}
                    autoFocus
                    spellCheck={false}
                  />

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {userInput.length} / {isHindi ? selectedDrill.textHindi.length : selectedDrill.text.length} {isHindi ? "अक्षर" : "characters"}
                    </span>
                    <Button onClick={handleRestart} variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      {isHindi ? "फिर से शुरू करें" : "Restart"}
                    </Button>
                  </div>
                </Card>

                {/* Completion Message */}
                {progress === 100 && (
                  <Card className="p-6 bg-success/10 border-success">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-success mb-2">
                        {isHindi ? "बधाई हो! 🎉" : "Congratulations! 🎉"}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {isHindi 
                          ? `आपने ${wpm} WPM की गति और ${accuracy}% सटीकता के साथ ड्रिल पूरा किया!`
                          : `You completed the drill with ${wpm} WPM speed and ${accuracy}% accuracy!`}
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Button onClick={handleRestart}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          {isHindi ? "फिर से प्रयास करें" : "Try Again"}
                        </Button>
                        <Button onClick={() => setSelectedDrill(null)} variant="outline">
                          {isHindi ? "नया ड्रिल चुनें" : "Choose New Drill"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default KeyboardGuide;
