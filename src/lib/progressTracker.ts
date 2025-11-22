export interface TestRecord {
  id: string;
  type: 'test' | 'lesson' | 'game' | 'drill';
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  timeSpent: number;
  timestamp: number;
  title?: string;
}

export interface ProgressData {
  tests: TestRecord[];
  totalTests: number;
  bestWpm: number;
  bestAccuracy: number;
  achievements: string[];
  lessonProgress: Record<string, boolean>;
  drillProgress: Record<string, number>;
}

const STORAGE_KEY = 'typing_progress';

export const getProgressData = (): ProgressData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading progress data:', error);
  }
  
  return {
    tests: [],
    totalTests: 0,
    bestWpm: 0,
    bestAccuracy: 0,
    achievements: [],
    lessonProgress: {},
    drillProgress: {},
  };
};

export const saveTestRecord = (record: Omit<TestRecord, 'id' | 'timestamp'>) => {
  const progress = getProgressData();
  
  const newRecord: TestRecord = {
    ...record,
    id: Date.now().toString(),
    timestamp: Date.now(),
  };
  
  progress.tests.push(newRecord);
  progress.totalTests += 1;
  progress.bestWpm = Math.max(progress.bestWpm, record.wpm);
  progress.bestAccuracy = Math.max(progress.bestAccuracy, record.accuracy);
  
  // Check for achievements
  checkAchievements(progress);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
};

export const markLessonComplete = (lessonId: string) => {
  const progress = getProgressData();
  progress.lessonProgress[lessonId] = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
};

export const updateDrillProgress = (drillId: string, score: number) => {
  const progress = getProgressData();
  progress.drillProgress[drillId] = Math.max(progress.drillProgress[drillId] || 0, score);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
};

const checkAchievements = (progress: ProgressData) => {
  const achievements = new Set(progress.achievements);
  
  if (progress.totalTests >= 1 && !achievements.has('first_test')) {
    achievements.add('first_test');
  }
  
  if (progress.bestWpm >= 40 && !achievements.has('speed_demon')) {
    achievements.add('speed_demon');
  }
  
  if (progress.bestAccuracy >= 95 && !achievements.has('accuracy_king')) {
    achievements.add('accuracy_king');
  }
  
  if (Object.keys(progress.lessonProgress).length >= 10 && !achievements.has('practice_master')) {
    achievements.add('practice_master');
  }
  
  if (progress.bestWpm >= 60 && !achievements.has('fast_fingers')) {
    achievements.add('fast_fingers');
  }
  
  if (progress.bestAccuracy === 100 && !achievements.has('perfect_score')) {
    achievements.add('perfect_score');
  }
  
  progress.achievements = Array.from(achievements);
};

export const getAverageWpm = (): number => {
  const progress = getProgressData();
  if (progress.tests.length === 0) return 0;
  const sum = progress.tests.reduce((acc, test) => acc + test.wpm, 0);
  return Math.round(sum / progress.tests.length);
};

export const getAverageAccuracy = (): number => {
  const progress = getProgressData();
  if (progress.tests.length === 0) return 0;
  const sum = progress.tests.reduce((acc, test) => acc + test.accuracy, 0);
  return Math.round(sum / progress.tests.length);
};

export const getRecentTests = (limit: number = 10): TestRecord[] => {
  const progress = getProgressData();
  return progress.tests.slice(-limit).reverse();
};