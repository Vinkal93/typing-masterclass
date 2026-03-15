import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';

export interface StudentProfile {
  uid: string;
  email: string;
  studentId: string;
  displayName: string;
  createdAt: number;
  plan: 'free' | 'premium';
  status: 'pending' | 'active' | 'premium' | 'suspended';
  premiumExpiry?: number;
  completedLessons: string[];
  currentChapter: number;
  bestWpm: number;
  bestAccuracy: number;
  totalPracticeTime: number; // seconds
  lastLoginAt: number;
  loginCount: number;
  sessionExpiry?: number;
}

interface StudentContextType {
  user: User | null;
  profile: StudentProfile | null;
  loading: boolean;
  isLoggedIn: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (emailOrId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  completeLesson: (lessonId: string) => void;
  updateStats: (wpm: number, accuracy: number, timeSpent: number) => void;
  isPremium: boolean;
  isApproved: boolean;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const PROFILES_KEY = 'tm_student_profiles';
const SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 hours

const generateStudentId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'TM-';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

export const getProfiles = (): Record<string, StudentProfile> => {
  try {
    const data = localStorage.getItem(PROFILES_KEY);
    return data ? JSON.parse(data) : {};
  } catch { return {}; }
};

export const saveProfile = (profile: StudentProfile) => {
  const profiles = getProfiles();
  profiles[profile.uid] = profile;
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
};

export const saveAllProfiles = (profiles: Record<string, StudentProfile>) => {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
};

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const profiles = getProfiles();
        if (profiles[u.uid]) {
          const p = profiles[u.uid];
          // Check session expiry
          if (p.sessionExpiry && Date.now() > p.sessionExpiry) {
            signOut(auth);
            setProfile(null);
            return;
          }
          // Check premium expiry
          if (p.plan === 'premium' && p.premiumExpiry && Date.now() > p.premiumExpiry) {
            p.plan = 'free';
            p.status = 'active';
            saveProfile(p);
          }
          setProfile(p);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Session check interval
  useEffect(() => {
    if (!profile?.sessionExpiry) return;
    const interval = setInterval(() => {
      if (Date.now() > (profile.sessionExpiry || 0)) {
        signOut(auth);
        setProfile(null);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [profile?.sessionExpiry]);

  const signup = async (email: string, password: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const newProfile: StudentProfile = {
      uid: cred.user.uid,
      email,
      studentId: generateStudentId(),
      displayName: name,
      createdAt: Date.now(),
      plan: 'free',
      status: 'pending',
      completedLessons: [],
      currentChapter: 1,
      bestWpm: 0,
      bestAccuracy: 0,
      totalPracticeTime: 0,
      lastLoginAt: Date.now(),
      loginCount: 1,
      sessionExpiry: Date.now() + SESSION_DURATION,
    };
    saveProfile(newProfile);
    setProfile(newProfile);
  };

  const login = async (emailOrId: string, password: string) => {
    let email = emailOrId;
    if (emailOrId.startsWith('TM-')) {
      const profiles = getProfiles();
      const found = Object.values(profiles).find(p => p.studentId === emailOrId);
      if (found) {
        email = found.email;
      } else {
        throw new Error('Student ID not found');
      }
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // Update login info
    const profiles = getProfiles();
    if (profiles[cred.user.uid]) {
      profiles[cred.user.uid].lastLoginAt = Date.now();
      profiles[cred.user.uid].loginCount = (profiles[cred.user.uid].loginCount || 0) + 1;
      profiles[cred.user.uid].sessionExpiry = Date.now() + SESSION_DURATION;
      saveAllProfiles(profiles);
      setProfile(profiles[cred.user.uid]);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
  };

  const completeLesson = (lessonId: string) => {
    if (!profile) return;
    if (!profile.completedLessons.includes(lessonId)) {
      const updated = {
        ...profile,
        completedLessons: [...profile.completedLessons, lessonId],
      };
      saveProfile(updated);
      setProfile(updated);
    }
  };

  const updateStats = (wpm: number, accuracy: number, timeSpent: number) => {
    if (!profile) return;
    const updated = {
      ...profile,
      bestWpm: Math.max(profile.bestWpm, wpm),
      bestAccuracy: Math.max(profile.bestAccuracy, accuracy),
      totalPracticeTime: profile.totalPracticeTime + timeSpent,
    };
    saveProfile(updated);
    setProfile(updated);
  };

  const isPremiumActive = profile?.plan === 'premium' && profile?.status !== 'suspended' && 
    (!profile?.premiumExpiry || Date.now() < profile.premiumExpiry);
  const isApproved = profile?.status === 'active' || profile?.status === 'premium';

  return (
    <StudentContext.Provider value={{
      user, profile, loading, 
      isLoggedIn: !!user && !!profile,
      signup, login, logout, completeLesson, updateStats,
      isPremium: !!isPremiumActive,
      isApproved,
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudent must be used within StudentProvider');
  return ctx;
};
