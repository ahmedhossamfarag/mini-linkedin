'use client';
import { signUp } from "@/lib/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function SignUpPage() {
    async function signUpUser(prevState: any, formData: FormData) {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const bio = formData.get("bio") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        try {
            await signUp({ name, email, bio, password, confirmPassword });
            window.location.href = "/profile";
        } catch (error: any) {
            return {
                name,
                email,
                bio,
                error: error.message
            }
        }
    }
    const [state, formAction, pending] = useActionState(signUpUser, { name: "", email: "", bio: "", error: null });
    return (
        <form action={formAction} className="space-y-2 w-full p-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor="name">Name</label>
                <input className="bg-white p-2 rounded-md" type="text" name="name" id="name" defaultValue={state?.name} required />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="email">Email</label>
                <input className="bg-white p-2 rounded-md" type="email" name="email" id="email" defaultValue={state?.email} required />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="bio">Bio</label>
                <textarea className="bg-white p-2 rounded-md h-36" name="bio" id="bio" defaultValue={state?.bio} required />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="password">Password</label>
                <input className="bg-white p-2 rounded-md" type="password" name="password" id="password" required />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input className="bg-white p-2 rounded-md" type="password" name="confirmPassword" id="confirmPassword" required />
            </div>
            {state?.error && <p className="text-red-500">{state.error}</p>}
            <button className="w-full bg-[#1E88E5] text-white p-2 rounded-md cursor-pointer" disabled={pending}>Sign Up</button>
            <p>Already have an account? <Link href="/sign-in" className="text-[#1E88E5]">Sign In</Link></p>
        </form>
    )
}