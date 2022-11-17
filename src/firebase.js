import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "firebaseConfig";

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
