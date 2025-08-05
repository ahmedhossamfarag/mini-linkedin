'use client';
import { createPost } from "@/lib/posts";
import { useActionState } from "react";

export default function PostCreatePage() {
    async function createPostAction(prevState: any, formData: FormData) {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const { success, error } = await createPost({ title, content });
        if (success) window.location.href = "/profile";
        return { title, content, error: error };
    }
    const [state, formAction, pending] = useActionState(createPostAction, { title: "", content: "", error: "" });
    return (
        <form action={formAction} className="space-y-2 w-full p-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor="title">Title</label>
                <input className="bg-white p-2 rounded-md" type="text" id="title" name="title" defaultValue={state?.title} />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="content">Content</label>
                <textarea className="bg-white p-2 rounded-md h-36" id="content" name="content" defaultValue={state?.content} />
            </div>
            {state?.error && <p className="text-red-500">{state.error}</p>}
            <button className="w-full bg-[#1E88E5] text-white p-2 rounded-md cursor-pointer" disabled={pending}>Submit</button>
        </form>
    );
}