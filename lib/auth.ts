'use server';
import z from "zod";
import { firebaseApp } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { encrypt } from "./session";

export type User = {
    uid: string;
    email: string;
    name: string;
    bio: string;
};

const signUpSchema = z.object({
    email: z.email({ error: "Email is invalid" }),
    name: z.string({ error: "Name is required" }).max(50, "Name must be less than 50 characters").min(3, "Name must be at least 3 characters"),
    bio: z.string({ error: "Bio is required" }).min(3, "Bio must be at least 3 characters").max(100, "Bio must be less than 100 characters"),
    password: z.string({ error: "Password is required" }).min(6, "Password must be at least 6 characters").max(50, "Password must be less than 50 characters"),
    confirmPassword: z.string({ error: "Password is required" }).min(6, "Password must be at least 6 characters").max(50, "Password must be less than 50 characters"),
});


const signInSchema = z.object({
    email: z.email({ error: "Email is invalid" }),
    password: z.string({ error: "Password is required" }).min(6, "Password must be at least 6 characters").max(50, "Password must be less than 50 characters"),
});


async function createSession() {
    const user = getAuth(firebaseApp).currentUser;
    if (user) {
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        const session = await encrypt({ uid: user.uid, expiresAt });
        const cookieStore = await cookies()

        cookieStore.set('session', session, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
        })
    }
}

async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

export async function signUp({ name, email, bio, password, confirmPassword }: { name: string, email: string, bio: string, password: string, confirmPassword: string }) {
    if (password !== confirmPassword) throw new Error("Passwords do not match");
    const validatedFields = signUpSchema.safeParse({ email, name, bio, password, confirmPassword });
    if (!validatedFields.success) throw new Error(validatedFields.error.message);
    try {
        const userCredential = await createUserWithEmailAndPassword(getAuth(firebaseApp), email, password);
        const usersCollection = collection(getFirestore(firebaseApp), "users");
        await addDoc(usersCollection, { uid: userCredential.user.uid, name, email, bio, password });
        await createSession();
    } catch (error: any) {
        if (error.code === "auth/email-already-in-use") throw new Error("Email already in use");
        if (error.code === "auth/invalid-email") throw new Error("Email is invalid");
        if (error.code === "auth/weak-password") throw new Error("Password must be at least 6 characters");
        throw new Error(error.message);
    }
}

export async function signIn({ email, password }: { email: string, password: string }) {
    const validatedFields = signInSchema.safeParse({ email, password });
    if (!validatedFields.success) throw new Error(validatedFields.error.message);
    try {
        const user = await signInWithEmailAndPassword(getAuth(firebaseApp), email, password);
        await createSession();
    } catch (error: any) {
        if (error.code === "auth/invalid-email") throw new Error("Email is invalid");
        if (error.code === "auth/user-not-found") throw new Error("User not found");
        if (error.code === "auth/wrong-password") throw new Error("Password is incorrect");
        if (error.code === "auth/invalid-credential") throw new Error("Invalid credentials");
        throw new Error(error.message);
    }
}

export async function signOut() {
    await deleteSession();
    return await getAuth(firebaseApp).signOut();
}


export async function isAuthenticated() {
    const cookieStore = await cookies()
    return cookieStore.has('session');
}