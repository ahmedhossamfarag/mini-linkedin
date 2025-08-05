import { firebaseApp } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function signUp(email: string, password: string) {
    return await createUserWithEmailAndPassword(getAuth(firebaseApp), email, password);
}

export async function signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(getAuth(firebaseApp), email, password);
}

export async function signOut() {
    return await getAuth(firebaseApp).signOut();
}