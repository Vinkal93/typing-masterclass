import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB8pPAokyXrNhNs6p26z3FfAMd9xHsLe44",
  authDomain: "typing-master-e5b37.firebaseapp.com",
  projectId: "typing-master-e5b37",
  storageBucket: "typing-master-e5b37.firebasestorage.app",
  messagingSenderId: "249138400809",
  appId: "1:249138400809:web:9f5b4127025d71c09e5638",
  measurementId: "G-3JM1F2NQLW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize analytics only in browser
export const initAnalytics = async () => {
  const supported = await isSupported();
  if (supported) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
