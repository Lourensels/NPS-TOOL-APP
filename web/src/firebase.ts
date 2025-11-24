import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import logger from "@/lib/logger"

// Public env values (must be prefixed with NEXT_PUBLIC_ in Next.js)
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
}

function canInitialize(options: FirebaseOptions) {
  // Require at minimum apiKey, authDomain, projectId, appId for web apps
  return Boolean(options.apiKey) && Boolean(options.authDomain) && Boolean(options.projectId) && Boolean(options.appId)
}

let app: FirebaseApp | undefined
let auth: Auth | undefined
let firestore: Firestore | undefined

try {
  if (canInitialize(firebaseConfig)) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig)
    auth = getAuth(app)
    firestore = getFirestore(app)
  } else {
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
      // Warn in the browser without exposing secrets
      logger.warn("Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars to enable Auth and Firestore.")
    }
  }
} catch (err) {
  logger.error("Failed to initialize Firebase:", err)
}

export function isFirebaseEnabled() {
  return Boolean(app && auth && firestore)
}

export { app, auth, firestore }