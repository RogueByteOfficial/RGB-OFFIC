import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Read config from firebase-applet-config.json or environment variables
const firebaseConfig = {
  projectId: "gen-lang-client-0758607863",
  appId: "1:570945337282:web:fd203a532d60d172d1885b",
  apiKey: "AIzaSyARoH-OFcpuHAoNo0yNx7fKOtp3KBExBko",
  authDomain: "gen-lang-client-0758607863.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-87dc3e97-d6e5-4fe4-a994-f359ddd4bf23",
  storageBucket: "gen-lang-client-0758607863.firebasestorage.app",
  messagingSenderId: "570945337282",
  measurementId: "",
  oAuthClientId: "570945337282-gcnd8hb4s9opdp42h2hi6424ml0c9ruo.apps.googleusercontent.com"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Target specific databaseId if provided
export const db = initializeFirestore(app, {}, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
