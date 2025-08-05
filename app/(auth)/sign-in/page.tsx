'use client';
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { useActionState } from "react"

export default function SignInPage() {
    async function signInUser(prevState: any, formData: FormData) {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const { success, error } = await signIn({ email, password });
        if (success) window.location.href = "/profile";
        else return {
            email,
            error: error
        }
    }
    const [state, formAction, pending] = useActionState(signInUser, { email: "", error: null });
    return (
        <form action={formAction} className="space-y-2 w-full p-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor="email">Email</label>
                <input className="bg-white p-2 rounded-md" type="email" name="email" id="email" defaultValue={state?.email} required />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="password">Password</label>
                <input className="bg-white p-2 rounded-md" type="password" name="password" id="password" required />
            </div>
            {state?.error && <p className="text-red-500">{state.error}</p>}
            <button className="w-full bg-[#1E88E5] text-white p-2 rounded-md cursor-pointer" disabled={pending}>Sign In</button>
            <p>Don&apos;t have an account? <Link href="/sign-up" className="text-[#1E88E5]">Sign Up</Link></p>
        </form>
    )
}