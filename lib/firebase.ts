import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCNm6VgJTUNks8bpjHKeFTej38Z8z3pywI",
    authDomain: "assessment-42881.firebaseapp.com",
    projectId: "assessment-42881",
    storageBucket: "assessment-42881.firebasestorage.app",
    messagingSenderId: "465006288903",
    appId: "1:465006288903:web:9a139de7cf85aa973b8aa2",
    measurementId: "G-8MT2691EMW"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
if (process.env.NODE_ENV === "development") {
    const auth = getAuth(app);
    connectAuthEmulator(auth, "http://localhost:9099");

    const db = getFirestore(app);
    connectFirestoreEmulator(db, "localhost", 8080);

    const storage = getStorage(app);
    connectStorageEmulator(storage, "localhost", 9199);
}

export const firebaseApp = app;
