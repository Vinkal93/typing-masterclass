import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';

interface StudentProfile {
  uid: string;
  email: string;
  studentId: string;
  displayName: string;
  createdAt: number;
  plan: 'free' | 'premium';
  completedLessons: string[];
  currentChapter: number;
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
  isPremium: boolean;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const PROFILES_KEY = 'tm_student_profiles';

const generateStudentId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'TM-';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const getProfiles = (): Record<string, StudentProfile> => {
  try {
    const data = localStorage.getItem(PROFILES_KEY);
    return data ? JSON.parse(data) : {};
  } catch { return {}; }
};

const saveProfile = (profile: StudentProfile) => {
  const profiles = getProfiles();
  profiles[profile.uid] = profile;
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
          setProfile(profiles[u.uid]);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const newProfile: StudentProfile = {
      uid: cred.user.uid,
      email,
      studentId: generateStudentId(),
      displayName: name,
      createdAt: Date.now(),
      plan: 'free',
      completedLessons: [],
      currentChapter: 1,
    };
    saveProfile(newProfile);
    setProfile(newProfile);
  };

  const login = async (emailOrId: string, password: string) => {
    let email = emailOrId;
    // Check if input is a student ID
    if (emailOrId.startsWith('TM-')) {
      const profiles = getProfiles();
      const found = Object.values(profiles).find(p => p.studentId === emailOrId);
      if (found) {
        email = found.email;
      } else {
        throw new Error('Student ID not found');
      }
    }
    await signInWithEmailAndPassword(auth, email, password);
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

  return (
    <StudentContext.Provider value={{
      user, profile, loading, 
      isLoggedIn: !!user && !!profile,
      signup, login, logout, completeLesson,
      isPremium: profile?.plan === 'premium',
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
