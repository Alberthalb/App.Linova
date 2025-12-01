import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const resolveExtra = () =>
  Constants?.expoConfig?.extra ||
  Constants?.manifest?.extra ||
  Constants?.manifest2?.extra?.expoClient?.extra ||
  {};

const firebaseFromExtra = resolveExtra()?.firebase || {};
const firebaseFromEnv = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const firebaseConfig = {
  ...firebaseFromExtra,
  ...firebaseFromEnv,
};

const missingKeys = ["apiKey", "projectId", "appId"].filter((key) => !firebaseConfig[key]);
if (missingKeys.length) {
  console.warn(
    `[Firebase] Configuracao ausente: ${missingKeys.join(", ")}. Verifique .env e app.config.js (extra.firebase).`
  );
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig || {});

const createAuth = () => {
  if (Platform.OS === "web") {
    return getAuth(app);
  }
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    return getAuth(app);
  }
};

export const auth = createAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
