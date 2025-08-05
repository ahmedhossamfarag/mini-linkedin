'use server';
import { firebaseApp } from "./firebase";
import { collection, getFirestore, query, where, getDocs } from "firebase/firestore";
import { cookies } from "next/headers";
import { User } from "./auth";
import { decrypt } from "./session";

async function getSession() {
    const cookieStore = await cookies()
    const session = await decrypt(cookieStore.get('session')?.value);
    return session?.uid;
}


export async function getUserData(uid: string) {
    const usersCollection = collection(getFirestore(firebaseApp), "users");
    const q = query(usersCollection, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
}

export async function getCurrentUserData(): Promise<User | null> {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;
    const currentUserData = await getUserData(currentUser.uid);
    return { uid: currentUser.uid, email: currentUserData.email!, name: currentUserData.name, bio: currentUserData.bio };
}

export async function getCurrentUser() {
    return { uid: await getSession() as string };
}
