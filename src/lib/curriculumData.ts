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
  fingerGuide: string; // which fingers to highlight
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
        keys: 'F J', practiceText: 'fff jjj fjf jfj ffj jjf fjfj jfjf fff jjj fj fj jf jf fjf jfj ffjj jjff',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'left-index,right-index'
      },
      {
        id: 'L2', chapter: 1, lessonNumber: 2,
        title: 'Keys D and K', titleHindi: 'D और K कुंजियाँ',
        description: 'Learn the middle finger keys', descriptionHindi: 'मध्य अंगुली की कुंजियाँ सीखें',
        keys: 'D K', practiceText: 'ddd kkk dkd kdk ddk kkd dkdk kdkd ddd kkk dk dk kd kd dkd kdk ddkk kkdd fdjk jkdf',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'left-middle,right-middle'
      },
      {
        id: 'L3', chapter: 1, lessonNumber: 3,
        title: 'Keys S and L', titleHindi: 'S और L कुंजियाँ',
        description: 'Learn the ring finger keys', descriptionHindi: 'अनामिका अंगुली की कुंजियाँ सीखें',
        keys: 'S L', practiceText: 'sss lll sls lsl ssl lls slsl lsls sss lll sl sl ls ls sls lsl ssll llss fdsk jkls',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'left-ring,right-ring'
      },
      {
        id: 'L4', chapter: 1, lessonNumber: 4,
        title: 'Keys A and ;', titleHindi: 'A और ; कुंजियाँ',
        description: 'Learn the pinky finger keys', descriptionHindi: 'कनिष्ठा अंगुली की कुंजियाँ सीखें',
        keys: 'A ;', practiceText: 'aaa ;;; a;a ;a; aa; ;;a a;a; ;a;a aaa ;;; a; a; ;a ;a asdf jkl; asdf jkl;',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'left-pinky,right-pinky'
      },
      {
        id: 'L5', chapter: 1, lessonNumber: 5,
        title: 'Home Row Words', titleHindi: 'होम रो शब्द',
        description: 'Practice real words using home row', descriptionHindi: 'होम रो से असली शब्दों का अभ्यास करें',
        keys: 'A S D F J K L ;', practiceText: 'fall flask salad lads dad sad fad ask all shalllass slacks daffodil adds falls ask flask salad dad lads',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L6', chapter: 1, lessonNumber: 6,
        title: 'Home Row Sentences', titleHindi: 'होम रो वाक्य',
        description: 'Type full sentences with home row', descriptionHindi: 'होम रो से पूरे वाक्य टाइप करें',
        keys: 'Home Row', practiceText: 'a lad asks dad; a lass falls; sad dad adds salad; all lads fall; a flask falls; dad asks all lads',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-2',
    level: 2,
    title: 'Middle Row Extended',
    titleHindi: 'मध्य रो विस्तारित',
    description: 'Add G and H keys to your home row skills',
    descriptionHindi: 'अपने होम रो कौशल में G और H कुंजियाँ जोड़ें',
    icon: '🔑',
    lessons: [
      {
        id: 'L7', chapter: 2, lessonNumber: 7,
        title: 'Keys G and H', titleHindi: 'G और H कुंजियाँ',
        description: 'Reach for G and H with index fingers', descriptionHindi: 'तर्जनी अंगुली से G और H तक पहुँचें',
        keys: 'G H', practiceText: 'ggg hhh ghg hgh ggh hhg ghgh hghg ggg hhh gh gh hg hg gash hash glad half',
        level: 'beginner', isFree: true, minAccuracy: 85, fingerGuide: 'left-index,right-index'
      },
      {
        id: 'L8', chapter: 2, lessonNumber: 8,
        title: 'Keys E and I', titleHindi: 'E और I कुंजियाँ',
        description: 'Learn top row vowels E and I', descriptionHindi: 'ऊपरी रो स्वर E और I सीखें',
        keys: 'E I', practiceText: 'eee iii eie iei eei iie eiei ieie dedede kikiki die lie fie hie aide side hide',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-middle,right-middle'
      },
      {
        id: 'L9', chapter: 2, lessonNumber: 9,
        title: 'Keys R and U', titleHindi: 'R और U कुंजियाँ',
        description: 'Add R and U to your skills', descriptionHindi: 'अपने कौशल में R और U जोड़ें',
        keys: 'R U', practiceText: 'rrr uuu rur uru rru uur ruru urur frfrf jujuj fur rude rule dusk rush sure',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-index,right-index'
      },
      {
        id: 'L10', chapter: 2, lessonNumber: 10,
        title: 'Keys T and Y', titleHindi: 'T और Y कुंजियाँ',
        description: 'Master T and Y key positions', descriptionHindi: 'T और Y की पोजीशन सीखें',
        keys: 'T Y', practiceText: 'ttt yyy tyt yty tty yyt tyty ytyt ftftf jyjyj try yet duty tray study yesterday',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-index,right-index'
      },
      {
        id: 'L11', chapter: 2, lessonNumber: 11,
        title: 'Words Practice', titleHindi: 'शब्द अभ्यास',
        description: 'Practice real words with all learned keys', descriptionHindi: 'सभी सीखी गई कुंजियों से असली शब्दों का अभ्यास',
        keys: 'All learned', practiceText: 'the fire light hurt sight right flight surge thirsty delight yearly frightful delightful youthful',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L12', chapter: 2, lessonNumber: 12,
        title: 'Sentences Practice', titleHindi: 'वाक्य अभ्यास',
        description: 'Full sentences with home and top row', descriptionHindi: 'होम और ऊपरी रो से पूरे वाक्य',
        keys: 'All learned', practiceText: 'the light is right; she felt the sight; they rushed right; hurry due; the fire is delightful',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-3',
    level: 3,
    title: 'Top & Bottom Row',
    titleHindi: 'ऊपरी और निचली रो',
    description: 'Complete the alphabet with remaining keys',
    descriptionHindi: 'शेष कुंजियों से वर्णमाला पूरी करें',
    icon: '⌨️',
    lessons: [
      {
        id: 'L13', chapter: 3, lessonNumber: 13,
        title: 'Keys Q and P', titleHindi: 'Q और P कुंजियाँ',
        description: 'Top row pinky keys', descriptionHindi: 'ऊपरी रो कनिष्ठा कुंजियाँ',
        keys: 'Q P', practiceText: 'qqq ppp qpq pqp qqp ppq qpqp pqpq aqua quip equip pique quake plaque quarter purchase',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-pinky,right-pinky'
      },
      {
        id: 'L14', chapter: 3, lessonNumber: 14,
        title: 'Keys W and O', titleHindi: 'W और O कुंजियाँ',
        description: 'Ring finger top row keys', descriptionHindi: 'अनामिका ऊपरी रो कुंजियाँ',
        keys: 'W O', practiceText: 'www ooo wow owo wwo oow wowo owow word work world flow grow show slow follow',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-ring,right-ring'
      },
      {
        id: 'L15', chapter: 3, lessonNumber: 15,
        title: 'Bottom Row Z X C V', titleHindi: 'निचली रो Z X C V',
        description: 'Left hand bottom row', descriptionHindi: 'बायें हाथ की निचली रो',
        keys: 'Z X C V', practiceText: 'zzz xxx ccc vvv zxcv vczx cave voice exact freeze vertex complex exclusive executive',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-pinky,left-ring,left-middle,left-index'
      },
      {
        id: 'L16', chapter: 3, lessonNumber: 16,
        title: 'Bottom Row B N M', titleHindi: 'निचली रो B N M',
        description: 'Right hand bottom row and B', descriptionHindi: 'दाहिने हाथ की निचली रो और B',
        keys: 'B N M', practiceText: 'bbb nnn mmm bnm mnb been name blame number member combine remember November',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'left-index,right-index,right-middle'
      },
      {
        id: 'L17', chapter: 3, lessonNumber: 17,
        title: 'Numbers Row', titleHindi: 'नंबर रो',
        description: 'Learn number keys 1-0', descriptionHindi: 'नंबर कुंजियाँ 1-0 सीखें',
        keys: '1 2 3 4 5 6 7 8 9 0', practiceText: '111 222 333 444 555 666 777 888 999 000 123 456 789 1234567890 2024 1995 1000 500 250',
        level: 'intermediate', isFree: false, minAccuracy: 80, fingerGuide: 'all-home'
      },
      {
        id: 'L18', chapter: 3, lessonNumber: 18,
        title: 'Paragraph Practice', titleHindi: 'पैराग्राफ अभ्यास',
        description: 'Type complete paragraphs', descriptionHindi: 'पूरे पैराग्राफ टाइप करें',
        keys: 'All', practiceText: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.',
        level: 'intermediate', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
    ]
  },
  {
    id: 'level-4',
    level: 4,
    title: 'Advanced — Speed & Accuracy',
    titleHindi: 'उन्नत — गति और सटीकता',
    description: 'Build speed and accuracy with real-world content',
    descriptionHindi: 'वास्तविक सामग्री के साथ गति और सटीकता बनाएं',
    icon: '🚀',
    lessons: [
      {
        id: 'L19', chapter: 4, lessonNumber: 19,
        title: 'Speed Test', titleHindi: 'स्पीड टेस्ट',
        description: 'Test your speed with common words', descriptionHindi: 'सामान्य शब्दों से अपनी गति परखें',
        keys: 'All', practiceText: 'about after again being could every first found great house large later never other place right small still their these thing think three under water where which while world would write young',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L20', chapter: 4, lessonNumber: 20,
        title: 'Accuracy Test', titleHindi: 'सटीकता टेस्ट',
        description: 'Focus on accuracy with tricky words', descriptionHindi: 'कठिन शब्दों से सटीकता पर ध्यान दें',
        keys: 'All', practiceText: 'accommodate beginning committee environment government independent maintenance necessary occasion privilege receive separate successful unnecessary conscientious embarrassment exhilarating phenomenon pseudonym rhythm',
        level: 'advanced', isFree: false, minAccuracy: 90, fingerGuide: 'all-home'
      },
      {
        id: 'L21', chapter: 4, lessonNumber: 21,
        title: 'Real Paragraph Typing', titleHindi: 'वास्तविक पैराग्राफ टाइपिंग',
        description: 'Type real-world paragraphs', descriptionHindi: 'वास्तविक पैराग्राफ टाइप करें',
        keys: 'All', practiceText: 'Technology has revolutionized the way we communicate and work in the modern world. From smartphones to artificial intelligence, innovation continues to shape our daily lives. Learning to type efficiently is now more important than ever as we spend countless hours on computers and digital devices.',
        level: 'advanced', isFree: false, minAccuracy: 85, fingerGuide: 'all-home'
      },
      {
        id: 'L22', chapter: 4, lessonNumber: 22,
        title: 'Final Exam', titleHindi: 'अंतिम परीक्षा',
        description: 'Complete the course with a final test', descriptionHindi: 'अंतिम परीक्षा से कोर्स पूरा करें',
        keys: 'All', practiceText: 'Success is not final, failure is not fatal, it is the courage to continue that counts. Every expert was once a beginner, and every master was once a disaster. Practice consistently, embrace your mistakes as learning opportunities, and never give up on your dreams. The journey of a thousand miles begins with a single step.',
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
  
  // First lesson always unlocked
  if (lesson.lessonNumber === 1) return true;
  
  // Check if previous lesson completed
  const idx = allLessons.findIndex(l => l.id === lessonId);
  if (idx > 0) {
    const prevLesson = allLessons[idx - 1];
    if (!completedLessons.includes(prevLesson.id)) return false;
  }
  
  // Check premium
  if (!lesson.isFree && !isPremium) return false;
  
  return true;
};

export const FREE_LESSON_COUNT = curriculum.flatMap(l => l.lessons).filter(l => l.isFree).length;
