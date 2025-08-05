'use client';
import { signOut } from "@/lib/auth";

export default function LogoutButton() {
    async function signOutAction() {
        await signOut();
        window.location.href = "/";
    }
    return (
        <button className="bg-[#1E88E5] w-full text-white p-2 rounded-md cursor-pointer" onClick={signOutAction}>Sign Out</button>
    )
}