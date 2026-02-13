export interface Student {
  id: string;
  name: string;
  rollNo: string;
  className: string;
  batch: string;
  registeredAt: number;
}

export interface CompetitionResult {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  className: string;
  batch: string;
  competitionId: string;
  wpm: number;
  accuracy: number;
  errors: number;
  totalChars: number;
  correctChars: number;
  date: number;
}

export interface Competition {
  id: string;
  paragraphIndex: number;
  duration: number; // seconds
  createdAt: number;
  status: 'pending' | 'active' | 'completed';
}

const STUDENTS_KEY = 'sport_students';
const RESULTS_KEY = 'sport_results';
const COMPETITIONS_KEY = 'sport_competitions';

// ─── Students ───
export const getStudents = (): Student[] => {
  try {
    return JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]');
  } catch { return []; }
};

export const saveStudent = (s: Omit<Student, 'id' | 'registeredAt'>): Student => {
  const students = getStudents();
  const student: Student = { ...s, id: Date.now().toString(), registeredAt: Date.now() };
  students.push(student);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  return student;
};

export const findStudentByRoll = (rollNo: string): Student | undefined =>
  getStudents().find(s => s.rollNo === rollNo);

// ─── Competitions ───
export const getCompetitions = (): Competition[] => {
  try {
    return JSON.parse(localStorage.getItem(COMPETITIONS_KEY) || '[]');
  } catch { return []; }
};

export const createCompetition = (paragraphIndex: number, duration: number): Competition => {
  const comps = getCompetitions();
  const comp: Competition = {
    id: Date.now().toString(),
    paragraphIndex,
    duration,
    createdAt: Date.now(),
    status: 'pending',
  };
  comps.push(comp);
  localStorage.setItem(COMPETITIONS_KEY, JSON.stringify(comps));
  return comp;
};

export const updateCompetitionStatus = (id: string, status: Competition['status']) => {
  const comps = getCompetitions();
  const idx = comps.findIndex(c => c.id === id);
  if (idx !== -1) {
    comps[idx].status = status;
    localStorage.setItem(COMPETITIONS_KEY, JSON.stringify(comps));
  }
};

// ─── Results ───
export const getResults = (): CompetitionResult[] => {
  try {
    return JSON.parse(localStorage.getItem(RESULTS_KEY) || '[]');
  } catch { return []; }
};

export const saveResult = (r: Omit<CompetitionResult, 'id' | 'date'>): CompetitionResult => {
  const results = getResults();
  const result: CompetitionResult = { ...r, id: Date.now().toString(), date: Date.now() };
  results.push(result);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  return result;
};

export const getLeaderboard = (competitionId?: string): CompetitionResult[] => {
  let results = getResults();
  if (competitionId) {
    results = results.filter(r => r.competitionId === competitionId);
  }
  return results.sort((a, b) => {
    if (b.wpm !== a.wpm) return b.wpm - a.wpm;
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
    return a.errors - b.errors;
  });
};

export const getStudentHistory = (studentId: string): CompetitionResult[] =>
  getResults().filter(r => r.studentId === studentId).sort((a, b) => b.date - a.date);

export const clearAllCompetitionData = () => {
  localStorage.removeItem(STUDENTS_KEY);
  localStorage.removeItem(RESULTS_KEY);
  localStorage.removeItem(COMPETITIONS_KEY);
};

// ─── Paragraphs ───
export const competitionParagraphs = {
  en: [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet at least once. Typing practice helps improve your speed and accuracy over time. Regular practice is the key to becoming a proficient typist. Focus on accuracy first and speed will follow naturally as your muscle memory develops.",
    "Technology has transformed the way we live and work in the modern world. Computers and smartphones have become essential tools for communication and productivity. The internet connects people across the globe instantly. Digital literacy is now a fundamental skill required in almost every profession and field of study.",
    "Education is the most powerful weapon which you can use to change the world. Knowledge opens doors to new opportunities and helps us understand the world around us. Reading books expands our vocabulary and imagination. Learning is a lifelong journey that enriches our minds and souls every single day.",
    "India is a diverse country with rich cultural heritage and traditions. The country has twenty eight states and eight union territories. Hindi is the official language spoken by millions of people. India is known for its festivals, cuisine, and ancient history that spans thousands of years.",
    "Programming is the art of telling a computer what to do through instructions. Software engineers write code in various programming languages like Python and Java. Problem solving and logical thinking are essential skills for every programmer. Clean code is readable and maintainable by other developers.",
    "The importance of physical fitness cannot be overstated in our daily lives. Regular exercise keeps our body healthy and our mind sharp and focused. Walking for thirty minutes daily can significantly improve cardiovascular health. A balanced diet combined with regular physical activity leads to overall wellbeing and longevity.",
  ],
  hi: [
    "भारत एक विविधताओं से भरा देश है जहां अनेक भाषाएं बोली जाती हैं। हिंदी हमारी राजभाषा है और करोड़ों लोग इसे बोलते हैं। टाइपिंग का अभ्यास करने से गति और सटीकता दोनों में सुधार होता है। नियमित अभ्यास से आप एक कुशल टाइपिस्ट बन सकते हैं।",
    "शिक्षा सबसे शक्तिशाली हथियार है जिसका उपयोग आप दुनिया को बदलने के लिए कर सकते हैं। ज्ञान नए अवसरों के द्वार खोलता है और हमें अपने आसपास की दुनिया को समझने में मदद करता है। किताबें पढ़ने से हमारी शब्दावली और कल्पना शक्ति बढ़ती है।",
    "कंप्यूटर आज के युग में एक आवश्यक उपकरण बन गया है। हर क्षेत्र में डिजिटल तकनीक का उपयोग बढ़ रहा है। इंटरनेट ने दुनिया को एक गांव में बदल दिया है। ऑनलाइन शिक्षा और दूरस्थ कार्य अब सामान्य हो गए हैं।",
    "स्वास्थ्य ही सबसे बड़ा धन है। नियमित व्यायाम और संतुलित आहार से शरीर स्वस्थ रहता है। प्रतिदिन तीस मिनट की सैर हृदय स्वास्थ्य में सुधार कर सकती है। योग और ध्यान मानसिक शांति प्रदान करते हैं और तनाव को कम करते हैं।",
  ],
};
