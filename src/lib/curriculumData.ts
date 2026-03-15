export interface CurriculumLesson {
  id: string;
  chapter: number;
  lessonNumber: number;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  keys: string;
  practiceText: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  isFree: boolean;
  minAccuracy: number;
  fingerGuide: string;
}

export interface CurriculumLevel {
  id: string;
  level: number;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  icon: string;
  lessons: CurriculumLesson[];
}

export const curriculum: CurriculumLevel[] = [
  {
    id: 'level-1',
    level: 1,
    title: 'Beginner — Home Row',
    titleHindi: 'शुरुआती — होम रो',
    description: 'Master the home row keys — the foundation of touch typing',
    descriptionHindi: 'होम रो कुंजियों में महारत हासिल करें — टच टाइपिंग की नींव',
    icon: '🏠',
    lessons: [
      {
        id: 'L1', chapter: 1, lessonNumber: 1,
        title: 'Keys F and J', titleHindi: 'F और J कुंजियाँ',
        description: 'Learn the index finger home position', descriptionHindi: 'तर्जनी अंगुली की होम पोजीशन सीखें',
        keys: 'F J', practiceText: 'fff jjj fjf jfj ffj jjf fjfj jfjf fff jjj fj fj jf jf fjf jfj ffjj jjff fff jjj fjf jfj ffj jjf fjfj jfjf',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'left-index,right-index'
      },
      {
        id: 'L2', chapter: 1, lessonNumber: 2,
        title: 'Keys D and K', titleHindi: 'D और K कुंजियाँ',
        description: 'Learn the middle finger keys', descriptionHindi: 'मध्य अंगुली की कुंजियाँ सीखें',
        keys: 'D K', practiceText: 'ddd kkk dkd kdk ddk kkd dkdk kdkd ddd kkk dk dk kd kd dkd kdk ddkk kkdd fdjk jkdf ddd kkk dkd kdk',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'left-middle,right-middle'
      },
      {
        id: 'L3', chapter: 1, lessonNumber: 3,
        title: 'Keys S and L', titleHindi: 'S और L कुंजियाँ',
        description: 'Learn the ring finger keys', descriptionHindi: 'अनामिका अंगुली की कुंजियाँ सीखें',
        keys: 'S L', practiceText: 'sss lll sls lsl ssl lls slsl lsls sss lll sl sl ls ls sls lsl ssll llss fdsk jkls sss lll sls lsl',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'left-ring,right-ring'
      },
      {
        id: 'L4', chapter: 1, lessonNumber: 4,
        title: 'Keys A and ;', titleHindi: 'A और ; कुंजियाँ',
        description: 'Learn the pinky finger keys', descriptionHindi: 'कनिष्ठा अंगुली की कुंजियाँ सीखें',
        keys: 'A ;', practiceText: 'aaa ;;; a;a ;a; aa; ;;a a;a; ;a;a aaa ;;; a; a; ;a ;a asdf jkl; asdf jkl; aaa ;;; a;a ;a;',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'left-pinky,right-pinky'
      },
      {
        id: 'L5', chapter: 1, lessonNumber: 5,
        title: 'Home Row Combined', titleHindi: 'होम रो संयुक्त',
        description: 'Practice all home row keys together', descriptionHindi: 'सभी होम रो कुंजियाँ एक साथ अभ्यास करें',
        keys: 'A S D F J K L ;', practiceText: 'asdf jkl; asdf jkl; fdsa ;lkj fdsa ;lkj asdfjkl; asdfjkl; fjdk slaj fkdj sla; asdf jkl; fdsa ;lkj',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L6', chapter: 1, lessonNumber: 6,
        title: 'Home Row Words', titleHindi: 'होम रो शब्द',
        description: 'Practice real words using home row', descriptionHindi: 'होम रो से असली शब्दों का अभ्यास करें',
        keys: 'A S D F J K L ;', practiceText: 'fall flask salad lads dad sad fad ask all shall lass slacks daffodil adds falls ask flask salad dad lads fall flask',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L7', chapter: 1, lessonNumber: 7,
        title: 'Home Row Sentences', titleHindi: 'होम रो वाक्य',
        description: 'Type full sentences with home row', descriptionHindi: 'होम रो से पूरे वाक्य टाइप करें',
        keys: 'Home Row', practiceText: 'a lad asks dad; a lass falls; sad dad adds salad; all lads fall; a flask falls; dad asks all lads; a sad lass asks dad',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L8', chapter: 1, lessonNumber: 8,
        title: 'Home Row Speed Drill', titleHindi: 'होम रो स्पीड ड्रिल',
        description: 'Build speed with home row keys', descriptionHindi: 'होम रो कुंजियों से गति बनाएं',
        keys: 'Home Row', practiceText: 'sad flask; add salad; all falls; dad asks; lad adds; lass falls; flask falls; salad adds; sad lads ask; all dads fall; flask salad falls',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-2',
    level: 2,
    title: 'Home Row Extended — G H',
    titleHindi: 'होम रो विस्तारित — G H',
    description: 'Add G and H keys to complete the home row',
    descriptionHindi: 'होम रो पूरी करने के लिए G और H कुंजियाँ जोड़ें',
    icon: '🔑',
    lessons: [
      {
        id: 'L9', chapter: 2, lessonNumber: 9,
        title: 'Keys G and H', titleHindi: 'G और H कुंजियाँ',
        description: 'Reach for G and H with index fingers', descriptionHindi: 'तर्जनी अंगुली से G और H तक पहुँचें',
        keys: 'G H', practiceText: 'ggg hhh ghg hgh ggh hhg ghgh hghg ggg hhh gh gh hg hg gash hash glad half gash hash glad half ghgh',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'left-index,right-index'
      },
      {
        id: 'L10', chapter: 2, lessonNumber: 10,
        title: 'Full Home Row Words', titleHindi: 'पूर्ण होम रो शब्द',
        description: 'Words with all home row including G H', descriptionHindi: 'G H सहित सभी होम रो शब्द',
        keys: 'All Home Row', practiceText: 'shall half glass flash gall gaff hall dash lash gash sash slash shall halls flash glass flags hadj',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L11', chapter: 2, lessonNumber: 11,
        title: 'Full Home Row Sentences', titleHindi: 'पूर्ण होम रो वाक्य',
        description: 'Sentences using complete home row', descriptionHindi: 'पूर्ण होम रो से वाक्य',
        keys: 'All Home Row', practiceText: 'a glad lad has a flash; half a glass shall fall; a gash shall heal; dad has a flag; the hall has glass; she shall dash',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-3',
    level: 3,
    title: 'Top Row — E R T Y U I',
    titleHindi: 'ऊपरी रो — E R T Y U I',
    description: 'Learn the most used vowels and consonants',
    descriptionHindi: 'सबसे ज्यादा उपयोग होने वाले स्वर और व्यंजन सीखें',
    icon: '⬆️',
    lessons: [
      {
        id: 'L12', chapter: 3, lessonNumber: 12,
        title: 'Keys E and I', titleHindi: 'E और I कुंजियाँ',
        description: 'Top row vowels E and I', descriptionHindi: 'ऊपरी रो स्वर E और I',
        keys: 'E I', practiceText: 'eee iii eie iei eei iie eiei ieie dedede kikiki die lie fie hie aide side hide life like fine dine',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-middle,right-middle'
      },
      {
        id: 'L13', chapter: 3, lessonNumber: 13,
        title: 'Keys R and U', titleHindi: 'R और U कुंजियाँ',
        description: 'Add R and U to your skills', descriptionHindi: 'अपने कौशल में R और U जोड़ें',
        keys: 'R U', practiceText: 'rrr uuu rur uru rru uur ruru urur frfrf jujuj fur rude rule dusk rush sure lure ruin true glue guru',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-index,right-index'
      },
      {
        id: 'L14', chapter: 3, lessonNumber: 14,
        title: 'Keys T and Y', titleHindi: 'T और Y कुंजियाँ',
        description: 'Master T and Y key positions', descriptionHindi: 'T और Y की पोजीशन सीखें',
        keys: 'T Y', practiceText: 'ttt yyy tyt yty tty yyt tyty ytyt ftftf jyjyj try yet duty tray study yesterday thirty yeast tidy fifty',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-index,right-index'
      },
      {
        id: 'L15', chapter: 3, lessonNumber: 15,
        title: 'E R T Combined', titleHindi: 'E R T संयुक्त',
        description: 'Practice left hand top row', descriptionHindi: 'बायें हाथ की ऊपरी रो अभ्यास',
        keys: 'E R T', practiceText: 'tree free tire steer treat street retell letter better tested rested fretted settled terrified ferret',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-index,left-middle'
      },
      {
        id: 'L16', chapter: 3, lessonNumber: 16,
        title: 'Y U I Combined', titleHindi: 'Y U I संयुक्त',
        description: 'Practice right hand top row', descriptionHindi: 'दाहिने हाथ की ऊपरी रो अभ्यास',
        keys: 'Y U I', practiceText: 'utility justify youthful industry injury unique figured studying issued yielding utility justify figured',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'right-index,right-middle'
      },
      {
        id: 'L17', chapter: 3, lessonNumber: 17,
        title: 'Top Row Words', titleHindi: 'ऊपरी रो शब्द',
        description: 'Real words with home + top row', descriptionHindi: 'होम + ऊपरी रो से असली शब्द',
        keys: 'All learned', practiceText: 'the fire light hurt sight right flight surge thirsty delight yearly frightful delightful youthful future territory',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L18', chapter: 3, lessonNumber: 18,
        title: 'Top Row Sentences', titleHindi: 'ऊपरी रो वाक्य',
        description: 'Full sentences with home and top row', descriptionHindi: 'होम और ऊपरी रो से पूरे वाक्य',
        keys: 'All learned', practiceText: 'the light is right; she felt the sight; they rushed right; hurry due; the fire is delightful; there is light; hurry there',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-4',
    level: 4,
    title: 'Top Row — Q W O P',
    titleHindi: 'ऊपरी रो — Q W O P',
    description: 'Complete the top row with outer keys',
    descriptionHindi: 'बाहरी कुंजियों से ऊपरी रो पूरी करें',
    icon: '🔤',
    lessons: [
      {
        id: 'L19', chapter: 4, lessonNumber: 19,
        title: 'Keys Q and P', titleHindi: 'Q और P कुंजियाँ',
        description: 'Top row pinky keys', descriptionHindi: 'ऊपरी रो कनिष्ठा कुंजियाँ',
        keys: 'Q P', practiceText: 'qqq ppp qpq pqp qqp ppq qpqp pqpq aqua quip equip pique quake plaque quarter purchase quilt require',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-pinky,right-pinky'
      },
      {
        id: 'L20', chapter: 4, lessonNumber: 20,
        title: 'Keys W and O', titleHindi: 'W और O कुंजियाँ',
        description: 'Ring finger top row keys', descriptionHindi: 'अनामिका ऊपरी रो कुंजियाँ',
        keys: 'W O', practiceText: 'www ooo wow owo wwo oow wowo owow word work world flow grow show slow follow glow throw window power',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-ring,right-ring'
      },
      {
        id: 'L21', chapter: 4, lessonNumber: 21,
        title: 'Full Top Row Practice', titleHindi: 'पूर्ण ऊपरी रो अभ्यास',
        description: 'All top row keys combined', descriptionHindi: 'सभी ऊपरी रो कुंजियाँ संयुक्त',
        keys: 'Q W E R T Y U I O P', practiceText: 'typewriter pour quietly require powertip property positive protection poetry requiring opportunity quite properly',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L22', chapter: 4, lessonNumber: 22,
        title: 'Top Row Real Words', titleHindi: 'ऊपरी रो वास्तविक शब्द',
        description: 'Common words with all learned keys', descriptionHindi: 'सभी सीखी गई कुंजियों से सामान्य शब्द',
        keys: 'All learned', practiceText: 'people would their quite power world water other write reply proof quest through property quality tower shower weather',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-5',
    level: 5,
    title: 'Bottom Row — Z X C V B N M',
    titleHindi: 'निचली रो — Z X C V B N M',
    description: 'Master the bottom row to complete the alphabet',
    descriptionHindi: 'वर्णमाला पूरी करने के लिए निचली रो सीखें',
    icon: '⬇️',
    lessons: [
      {
        id: 'L23', chapter: 5, lessonNumber: 23,
        title: 'Keys Z and X', titleHindi: 'Z और X कुंजियाँ',
        description: 'Left pinky and ring bottom row', descriptionHindi: 'बायें कनिष्ठा और अनामिका निचली रो',
        keys: 'Z X', practiceText: 'zzz xxx zxz xzx zzx xxz zxzx xzxz zone zero exit extra exact freeze oxen faux fizz flex index pixel',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-pinky,left-ring'
      },
      {
        id: 'L24', chapter: 5, lessonNumber: 24,
        title: 'Keys C and V', titleHindi: 'C और V कुंजियाँ',
        description: 'Left middle and index bottom row', descriptionHindi: 'बायें मध्य और तर्जनी निचली रो',
        keys: 'C V', practiceText: 'ccc vvv cvc vcv ccv vvc cvcv vcvc cave cover voice value civic vivid clever curve evolve device service active',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-middle,left-index'
      },
      {
        id: 'L25', chapter: 5, lessonNumber: 25,
        title: 'Keys B and N', titleHindi: 'B और N कुंजियाँ',
        description: 'Index finger bottom row reach', descriptionHindi: 'तर्जनी अंगुली निचली रो रीच',
        keys: 'B N', practiceText: 'bbb nnn bnb nbn bbn nnb bnbn nbnb been bone begin nine noble cabin brown blend brain blend banish noble',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-index,right-index'
      },
      {
        id: 'L26', chapter: 5, lessonNumber: 26,
        title: 'Keys M Comma Period', titleHindi: 'M कॉमा पीरियड कुंजियाँ',
        description: 'Right hand bottom row', descriptionHindi: 'दाहिने हाथ की निचली रो',
        keys: 'M , .', practiceText: 'mmm ,,, ... m,m m.m member, moment. machine, modern. maximum, minimum. metal, music. memory, mission.',
        level: 'intermediate', isFree: false, minAccuracy: 80, fingerGuide: 'right-index,right-middle,right-ring'
      },
      {
        id: 'L27', chapter: 5, lessonNumber: 27,
        title: 'Bottom Row Combined', titleHindi: 'निचली रो संयुक्त',
        description: 'All bottom row keys together', descriptionHindi: 'सभी निचली रो कुंजियाँ एक साथ',
        keys: 'Z X C V B N M', practiceText: 'combine maximum vertex complex exclusive executive November remember combination civilization examination',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L28', chapter: 5, lessonNumber: 28,
        title: 'Bottom Row Words', titleHindi: 'निचली रो शब्द',
        description: 'Common words using bottom row', descriptionHindi: 'निचली रो से सामान्य शब्द',
        keys: 'Bottom Row', practiceText: 'become between number change company believe common become movement continue problem combine believe government environment',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-6',
    level: 6,
    title: 'Numbers & Symbols',
    titleHindi: 'नंबर और प्रतीक',
    description: 'Master number row and common symbols',
    descriptionHindi: 'नंबर रो और सामान्य प्रतीक सीखें',
    icon: '🔢',
    lessons: [
      {
        id: 'L29', chapter: 6, lessonNumber: 29,
        title: 'Numbers 1-5', titleHindi: 'नंबर 1-5',
        description: 'Left hand number keys', descriptionHindi: 'बायें हाथ के नंबर कुंजियाँ',
        keys: '1 2 3 4 5', practiceText: '111 222 333 444 555 123 234 345 451 512 1234 2345 3451 5432 12345 54321 11 22 33 44 55 12 23 34 45 51',
        level: 'intermediate', isFree: false, minAccuracy: 80, fingerGuide: 'all-home'
      },
      {
        id: 'L30', chapter: 6, lessonNumber: 30,
        title: 'Numbers 6-0', titleHindi: 'नंबर 6-0',
        description: 'Right hand number keys', descriptionHindi: 'दाहिने हाथ के नंबर कुंजियाँ',
        keys: '6 7 8 9 0', practiceText: '666 777 888 999 000 678 789 890 906 607 67890 09876 66 77 88 99 00 67 78 89 90 06 6789 7890 9067',
        level: 'intermediate', isFree: false, minAccuracy: 80, fingerGuide: 'all-home'
      },
      {
        id: 'L31', chapter: 6, lessonNumber: 31,
        title: 'All Numbers Mixed', titleHindi: 'सभी नंबर मिश्रित',
        description: 'Practice all number keys', descriptionHindi: 'सभी नंबर कुंजियों का अभ्यास',
        keys: '1-0', practiceText: '1234567890 0987654321 1357924680 2468013579 1020304050 6070809010 1995 2024 2025 1000 500 250 100 750',
        level: 'intermediate', isFree: false, minAccuracy: 80, fingerGuide: 'all-home'
      },
      {
        id: 'L32', chapter: 6, lessonNumber: 32,
        title: 'Common Symbols', titleHindi: 'सामान्य प्रतीक',
        description: 'Practice @ # $ % & symbols', descriptionHindi: '@ # $ % & प्रतीक अभ्यास',
        keys: '@ # $ % &', practiceText: 'email@test.com user@gmail.com 100% off $50 price #trending #coding #typing 50% discount $100 worth & more',
        level: 'intermediate', isFree: false, minAccuracy: 75, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-7',
    level: 7,
    title: 'Word Mastery',
    titleHindi: 'शब्द महारत',
    description: 'Build speed with common English words',
    descriptionHindi: 'सामान्य अंग्रेजी शब्दों से गति बनाएं',
    icon: '📝',
    lessons: [
      {
        id: 'L33', chapter: 7, lessonNumber: 33,
        title: '100 Most Common Words', titleHindi: '100 सबसे सामान्य शब्द',
        description: 'The most frequently used English words', descriptionHindi: 'सबसे अधिक उपयोग किए जाने वाले अंग्रेजी शब्द',
        keys: 'All', practiceText: 'the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L34', chapter: 7, lessonNumber: 34,
        title: 'Common Short Words', titleHindi: 'सामान्य छोटे शब्द',
        description: 'Practice 3-4 letter common words', descriptionHindi: '3-4 अक्षर के सामान्य शब्द',
        keys: 'All', practiceText: 'the and for are but not you all any can her was one our out day had has him how its may new now old see way who did get let say too use',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L35', chapter: 7, lessonNumber: 35,
        title: 'Common Medium Words', titleHindi: 'सामान्य मध्यम शब्द',
        description: 'Practice 5-7 letter words', descriptionHindi: '5-7 अक्षर के शब्द',
        keys: 'All', practiceText: 'about after again being could every first found great house large later never other place right small still their these thing think three under water where which while world would write young',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L36', chapter: 7, lessonNumber: 36,
        title: 'Common Long Words', titleHindi: 'सामान्य लंबे शब्द',
        description: 'Practice 8+ letter words', descriptionHindi: '8+ अक्षर के शब्द',
        keys: 'All', practiceText: 'important different something following national political education understand community according sometimes development beginning something government president information understand different',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L37', chapter: 7, lessonNumber: 37,
        title: 'Technology Words', titleHindi: 'टेक्नोलॉजी शब्द',
        description: 'Tech vocabulary typing practice', descriptionHindi: 'टेक शब्दावली टाइपिंग अभ्यास',
        keys: 'All', practiceText: 'computer software hardware database internet website application programming algorithm interface network server browser system digital technology development framework function variable',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-8',
    level: 8,
    title: 'Sentence Mastery',
    titleHindi: 'वाक्य महारत',
    description: 'Type complete sentences fluently with punctuation',
    descriptionHindi: 'विराम चिह्नों के साथ पूरे वाक्य धाराप्रवाह टाइप करें',
    icon: '💬',
    lessons: [
      {
        id: 'L38', chapter: 8, lessonNumber: 38,
        title: 'Simple Sentences', titleHindi: 'सरल वाक्य',
        description: 'Short and simple sentences', descriptionHindi: 'छोटे और सरल वाक्य',
        keys: 'All', practiceText: 'The sun is hot. I like to run. She has a cat. We go to school. He reads a book. They play games. It is a fine day. The dog is big.',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L39', chapter: 8, lessonNumber: 39,
        title: 'Compound Sentences', titleHindi: 'मिश्र वाक्य',
        description: 'Practice longer compound sentences', descriptionHindi: 'लंबे मिश्र वाक्य अभ्यास',
        keys: 'All', practiceText: 'She went to the store, and she bought some milk. The weather was nice, so we went for a walk. He studied hard, but he did not pass the test. I like coffee, and she prefers tea.',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L40', chapter: 8, lessonNumber: 40,
        title: 'Questions & Exclamations', titleHindi: 'प्रश्न और विस्मयादिबोधक',
        description: 'Practice punctuation variety', descriptionHindi: 'विराम चिह्न विविधता अभ्यास',
        keys: 'All', practiceText: 'How are you doing today? That is amazing! Where did you go last weekend? Please help me with this task. Can you believe it? What a wonderful day! Do you know the answer? I cannot wait!',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L41', chapter: 8, lessonNumber: 41,
        title: 'Business Sentences', titleHindi: 'व्यापार वाक्य',
        description: 'Professional writing practice', descriptionHindi: 'व्यावसायिक लेखन अभ्यास',
        keys: 'All', practiceText: 'Please find the attached document for your review. We look forward to hearing from you soon. Thank you for your prompt response. The meeting has been scheduled for tomorrow at 10 AM.',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-9',
    level: 9,
    title: 'Paragraph Typing',
    titleHindi: 'पैराग्राफ टाइपिंग',
    description: 'Build endurance with longer passages',
    descriptionHindi: 'लंबे अंशों से सहनशक्ति बनाएं',
    icon: '📖',
    lessons: [
      {
        id: 'L42', chapter: 9, lessonNumber: 42,
        title: 'Short Paragraphs', titleHindi: 'छोटे पैराग्राफ',
        description: 'Two-three sentence paragraphs', descriptionHindi: 'दो-तीन वाक्य के पैराग्राफ',
        keys: 'All', practiceText: 'Technology has changed the way we live and work. From smartphones to laptops, digital devices are everywhere. Learning to type efficiently is an important skill in the modern world.',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L43', chapter: 9, lessonNumber: 43,
        title: 'Medium Paragraphs', titleHindi: 'मध्यम पैराग्राफ',
        description: 'Four-five sentence paragraphs', descriptionHindi: 'चार-पाँच वाक्य के पैराग्राफ',
        keys: 'All', practiceText: 'The internet has revolutionized communication across the globe. People can now connect with friends and family instantly, no matter where they are. Social media platforms have become a major part of daily life. Online learning has opened doors to education for millions of people worldwide.',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L44', chapter: 9, lessonNumber: 44,
        title: 'Long Paragraphs', titleHindi: 'लंबे पैराग्राफ',
        description: 'Extended typing endurance test', descriptionHindi: 'विस्तारित टाइपिंग सहनशक्ति परीक्षा',
        keys: 'All', practiceText: 'The art of touch typing is a valuable skill that can significantly improve your productivity. When you learn to type without looking at the keyboard, you can focus entirely on your thoughts and the screen. This skill takes consistent practice and patience to develop. Start with the home row keys and gradually add more keys as you build muscle memory. With daily practice, you will see remarkable improvement in both speed and accuracy.',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L45', chapter: 9, lessonNumber: 45,
        title: 'Professional Writing', titleHindi: 'व्यावसायिक लेखन',
        description: 'Business and formal paragraphs', descriptionHindi: 'व्यापार और औपचारिक पैराग्राफ',
        keys: 'All', practiceText: 'Dear Sir or Madam, I am writing to express my interest in the position advertised on your company website. With over five years of experience in software development, I believe I would be a valuable addition to your team. I have attached my resume for your review and look forward to discussing the opportunity further.',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-10',
    level: 10,
    title: 'Speed Building',
    titleHindi: 'स्पीड बिल्डिंग',
    description: 'Push your limits with timed speed drills',
    descriptionHindi: 'समयबद्ध स्पीड ड्रिल से अपनी सीमाएं पुश करें',
    icon: '🚀',
    lessons: [
      {
        id: 'L46', chapter: 10, lessonNumber: 46,
        title: 'Speed Drill — 20 WPM Goal', titleHindi: 'स्पीड ड्रिल — 20 WPM लक्ष्य',
        description: 'Achieve at least 20 WPM', descriptionHindi: 'कम से कम 20 WPM प्राप्त करें',
        keys: 'All', practiceText: 'the quick brown fox jumps over the lazy dog and the quick brown fox jumps over the lazy dog again the fox jumps high over the sleeping lazy dog in the field',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L47', chapter: 10, lessonNumber: 47,
        title: 'Speed Drill — 30 WPM Goal', titleHindi: 'स्पीड ड्रिल — 30 WPM लक्ष्य',
        description: 'Push to 30 WPM with common phrases', descriptionHindi: 'सामान्य वाक्यांशों से 30 WPM तक पहुँचें',
        keys: 'All', practiceText: 'Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump. The five boxing wizards jump quickly. Bright vixens jump; dozy fowl quack. Quick zephyrs blow, vexing daft Jim.',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L48', chapter: 10, lessonNumber: 48,
        title: 'Speed Drill — 40 WPM Goal', titleHindi: 'स्पीड ड्रिल — 40 WPM लक्ष्य',
        description: 'Target 40 WPM with varied content', descriptionHindi: 'विविध सामग्री से 40 WPM लक्ष्य',
        keys: 'All', practiceText: 'Success is not final, failure is not fatal, it is the courage to continue that counts. Every expert was once a beginner, and every master was once a disaster. Practice consistently and you will improve beyond your expectations.',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L49', chapter: 10, lessonNumber: 49,
        title: 'Accuracy Focus', titleHindi: 'सटीकता फोकस',
        description: 'Slow down and hit 95%+ accuracy', descriptionHindi: 'धीमा करें और 95%+ सटीकता हासिल करें',
        keys: 'All', practiceText: 'accommodate beginning committee environment government independent maintenance necessary occasion privilege receive separate successful unnecessary conscientious embarrassment exhilarating phenomenon',
        level: 'advanced', isFree: false, minAccuracy: 90, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-11',
    level: 11,
    title: 'Real World Typing',
    titleHindi: 'वास्तविक दुनिया टाइपिंग',
    description: 'Type real documents, emails, and code',
    descriptionHindi: 'वास्तविक दस्तावेज़, ईमेल और कोड टाइप करें',
    icon: '🌍',
    lessons: [
      {
        id: 'L50', chapter: 11, lessonNumber: 50,
        title: 'Email Writing', titleHindi: 'ईमेल लेखन',
        description: 'Practice typing professional emails', descriptionHindi: 'व्यावसायिक ईमेल टाइपिंग अभ्यास',
        keys: 'All', practiceText: 'Subject: Meeting Follow-up. Dear Team, Thank you for attending the meeting today. As discussed, please submit your reports by Friday. If you have any questions, feel free to reach out. Best regards, John Smith.',
        level: 'expert', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L51', chapter: 11, lessonNumber: 51,
        title: 'Story Typing', titleHindi: 'कहानी टाइपिंग',
        description: 'Type creative narrative content', descriptionHindi: 'रचनात्मक कथा सामग्री टाइप करें',
        keys: 'All', practiceText: 'Once upon a time, in a small village nestled between tall mountains, there lived a young girl named Maya. She had always dreamed of exploring the world beyond the mountains. One day, she packed a small bag and set out on an adventure that would change her life forever.',
        level: 'expert', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L52', chapter: 11, lessonNumber: 52,
        title: 'News Article', titleHindi: 'समाचार लेख',
        description: 'Type like a journalist', descriptionHindi: 'पत्रकार की तरह टाइप करें',
        keys: 'All', practiceText: 'In a groundbreaking announcement today, scientists at the National Research Laboratory revealed a new method for generating clean energy. The discovery, which has been in development for over five years, could potentially reduce global carbon emissions by up to forty percent within the next decade.',
        level: 'expert', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L53', chapter: 11, lessonNumber: 53,
        title: 'Code Typing', titleHindi: 'कोड टाइपिंग',
        description: 'Practice typing programming syntax', descriptionHindi: 'प्रोग्रामिंग सिंटैक्स टाइपिंग अभ्यास',
        keys: 'All + Symbols', practiceText: 'function greet(name) { return "Hello, " + name + "!"; } const result = greet("World"); console.log(result); if (result.length > 0) { console.log("Success!"); }',
        level: 'expert', isFree: false, minAccuracy: 80, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-12',
    level: 12,
    title: 'Final Mastery & Exam',
    titleHindi: 'अंतिम महारत और परीक्षा',
    description: 'Final tests to prove your typing mastery',
    descriptionHindi: 'अपनी टाइपिंग महारत साबित करने के लिए अंतिम परीक्षा',
    icon: '🏆',
    lessons: [
      {
        id: 'L54', chapter: 12, lessonNumber: 54,
        title: 'Comprehensive Review', titleHindi: 'व्यापक समीक्षा',
        description: 'Review all learned skills', descriptionHindi: 'सभी सीखे गए कौशल की समीक्षा',
        keys: 'All', practiceText: 'The journey of mastering touch typing begins with a single keystroke. From the home row to complex paragraphs, you have traveled far. Remember that consistency is key. Every great typist once sat where you are now, practicing letter by letter, word by word, sentence by sentence.',
        level: 'expert', isFree: false, minAccuracy: 90, fingerGuide: 'all-home'
      },
      {
        id: 'L55', chapter: 12, lessonNumber: 55,
        title: 'Speed Challenge', titleHindi: 'स्पीड चैलेंज',
        description: 'Push for your personal best WPM', descriptionHindi: 'अपने व्यक्तिगत सर्वश्रेष्ठ WPM के लिए प्रयास करें',
        keys: 'All', practiceText: 'Speed is not just about moving your fingers faster. It is about building efficient muscle memory, reducing hesitation, and maintaining a steady rhythm. The best typists type like flowing water, smooth and continuous, never stopping to think about where each key is located.',
        level: 'expert', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L56', chapter: 12, lessonNumber: 56,
        title: 'Accuracy Challenge', titleHindi: 'सटीकता चैलेंज',
        description: 'Achieve 95%+ accuracy on difficult text', descriptionHindi: 'कठिन पाठ पर 95%+ सटीकता प्राप्त करें',
        keys: 'All', practiceText: 'Supercalifragilisticexpialidocious. Pneumonoultramicroscopicsilicovolcanoconiosis. Antidisestablishmentarianism. Floccinaucinihilipilification. Honorificabilitudinitatibus. Thyroparathyroidectomized.',
        level: 'expert', isFree: false, minAccuracy: 90, fingerGuide: 'all-home'
      },
      {
        id: 'L57', chapter: 12, lessonNumber: 57,
        title: 'Final Typing Exam', titleHindi: 'अंतिम टाइपिंग परीक्षा',
        description: 'Complete the course with a comprehensive exam', descriptionHindi: 'व्यापक परीक्षा से कोर्स पूरा करें',
        keys: 'All', practiceText: 'Congratulations on reaching the final exam! This test covers everything you have learned throughout this typing course. You will need to demonstrate proficiency in speed, accuracy, and consistency. Type each word carefully, maintain your rhythm, and remember to use the correct fingers for each key. Good luck, and may your fingers fly across the keyboard with precision and grace!',
        level: 'expert', isFree: false, minAccuracy: 90, fingerGuide: 'all-home'
      },
    ]
  }
];

export const getTotalLessons = () => curriculum.reduce((sum, lvl) => sum + lvl.lessons.length, 0);

export const getLessonById = (id: string): CurriculumLesson | undefined => {
  for (const level of curriculum) {
    const found = level.lessons.find(l => l.id === id);
    if (found) return found;
  }
  return undefined;
};

export const getNextLesson = (currentId: string): CurriculumLesson | undefined => {
  const allLessons = curriculum.flatMap(l => l.lessons);
  const idx = allLessons.findIndex(l => l.id === currentId);
  if (idx >= 0 && idx < allLessons.length - 1) return allLessons[idx + 1];
  return undefined;
};

export const isLessonUnlocked = (lessonId: string, completedLessons: string[], isPremium: boolean): boolean => {
  const allLessons = curriculum.flatMap(l => l.lessons);
  const lesson = allLessons.find(l => l.id === lessonId);
  if (!lesson) return false;
  
  if (lesson.lessonNumber === 1) return true;
  
  const idx = allLessons.findIndex(l => l.id === lessonId);
  if (idx > 0) {
    const prevLesson = allLessons[idx - 1];
    if (!completedLessons.includes(prevLesson.id)) return false;
  }
  
  if (!lesson.isFree && !isPremium) return false;
  
  return true;
};

export const FREE_LESSON_COUNT = curriculum.flatMap(l => l.lessons).filter(l => l.isFree).length;
