import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD5ybFReD9PoftvSi_AEzcnq8As-EG8TNE",
  authDomain: "data-entry-site-16853.firebaseapp.com",
  databaseURL: "https://data-entry-site-16853-default-rtdb.firebaseio.com",
  projectId: "data-entry-site-16853",
  storageBucket: "data-entry-site-16853.firebasestorage.app",
  messagingSenderId: "950487774824",
  appId: "1:950487774824:web:5f732b259704a8e361addd",
  measurementId: "G-HF0WC9Q95D",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const CONTENT_PATH = "proyojontake/site-content";
const ADMIN_PW_PATH = "proyojontake/admin-password";

export async function fetchContentFromFirebase() {
  try {
    const snapshot = await get(ref(db, CONTENT_PATH));
    if (snapshot.exists()) return snapshot.val();
    return null;
  } catch (e) {
    console.warn("[Firebase] fetchContent failed:", e);
    return null;
  }
}

export async function saveContentToFirebase(content: unknown) {
  try {
    await set(ref(db, CONTENT_PATH), content);
    return true;
  } catch (e) {
    console.warn("[Firebase] saveContent failed:", e);
    return false;
  }
}

export async function fetchAdminPasswordFromFirebase(): Promise<string | null> {
  try {
    const snapshot = await get(ref(db, ADMIN_PW_PATH));
    if (snapshot.exists()) return snapshot.val() as string;
    return null;
  } catch {
    return null;
  }
}

export async function saveAdminPasswordToFirebase(pw: string) {
  try {
    await set(ref(db, ADMIN_PW_PATH), pw);
  } catch (e) {
    console.warn("[Firebase] saveAdminPassword failed:", e);
  }
}

export function subscribeToContent(callback: (data: unknown) => void) {
  const dbRef = ref(db, CONTENT_PATH);
  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) callback(snapshot.val());
  });
  return () => off(dbRef);
}
