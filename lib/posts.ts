import { collection, getDocs, getFirestore, query, where, addDoc } from "firebase/firestore";
import { firebaseApp } from "./firebase";
import { getCurrentUser, getCurrentUserData } from "./users";
import z from "zod";

export type Post = {
    id: string | undefined;
    title: string;
    content: string;
    createdAt: Date;
    userId: string;
    username: string;
}

const postSchema = z.object({
    title: z.string({ error: "Title is required" }).min(3, "Title must be at least 3 characters").max(50, "Title must be less than 50 characters"),
    content: z.string({ error: "Content is required" }).min(3, "Content must be at least 3 characters").max(1000, "Content must be less than 1000 characters"),
})

export async function getPosts(): Promise<Post[]> {
    const db = getFirestore(firebaseApp);
    const postsCollection = collection(db, "posts");
    const postsSnapshot = await getDocs(postsCollection);
    const posts: Post[] = postsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            title: data.title,
            content: data.content,
            createdAt: data.createdAt.toDate(),
            userId: data.userId,
            username: data.username
        };
    });
    return posts;
}

export async function getUserPosts(userId: string): Promise<Post[]> {
    const db = getFirestore(firebaseApp);
    const postsCollection = query(collection(db, "posts"), where("userId", "==", userId));
    const postsSnapshot = await getDocs(postsCollection);
    const posts: Post[] = postsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            title: data.title,
            content: data.content,
            createdAt: data.createdAt.toDate(),
            userId: data.userId,
            username: data.username
        };
    });
    return posts;
}

export async function getCurrentUserPosts(): Promise<Post[]> {
    const userId = (await getCurrentUser())?.uid;
    if (!userId) return [];
    return await getUserPosts(userId);
}

export async function createPost({ title, content }: { title: string; content: string }) {
    const validatedFields = postSchema.safeParse({ title, content });
    if (!validatedFields.success) throw new Error(validatedFields.error.message);
    const user = await getCurrentUserData();
    const post = { title, content, createdAt: new Date(), userId: user?.uid, username: user?.name };
    const db = getFirestore(firebaseApp);
    const postsCollection = collection(db, "posts");
    await addDoc(postsCollection, post);
}