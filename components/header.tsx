import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "./logout";

export default async function HeaderView() {
    const authenticated = await isAuthenticated();

    if (authenticated) return (
        <div className="w-full flex justify-center space-x-4">
            <Link href="/profile" className="w-1/3">
                <button className="bg-[#1E88E5] w-full text-white p-2 rounded-md cursor-pointer">Profile</button>
            </Link>
            <Link href="#" className="w-1/3">
                <LogoutButton />
            </Link>
        </div>
    );
    return (
        <div className="w-full flex justify-center space-x-4">
            <Link href="/sign-in" className="w-1/3">
                <button className="bg-[#1E88E5] w-full text-white p-2 rounded-md cursor-pointer">Sign In</button>
            </Link>
            <Link href="/sign-up" className="w-1/3">
                <button className="bg-[#1E88E5] w-full text-white p-2 rounded-md cursor-pointer">Sign Up</button>
            </Link>
        </div>
    )
}