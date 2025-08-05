import { Post } from "@/lib/posts";
import Link from "next/link";

export function PostView({ data }: { data: Post }) {
    return (
        <div className="space-y-4 w-64 h-72 rounded-xl bg-white">
            <div className="w-full bg-[#E3F2FD] p-1 rounded-t-xl">
                <p className="font-serif text-sm text-[#1E88E5]"><Link href={`/users/${data.userId}/profile`}>{data.username}</Link>@{data.createdAt.toDateString()}</p>
            </div>
            <div className="space-y-4 text-center p-4">
                <h2 className="text-2xl font-bold">{data.title}</h2>
                <p className="text-[#424242] overflow-hidden line-clamp-6 h-36">{data.content}</p>
            </div>
        </div>
    );
}