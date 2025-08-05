import { PostView } from "@/components/post";
import { getCurrentUserData } from "@/lib/users"
import { getCurrentUserPosts } from "@/lib/posts";
import Link from "next/link";

export default async function ProfilePage() {
    const user = await getCurrentUserData();
    const posts = await getCurrentUserPosts();
    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-bold text-center">{user?.name}</h1>
                <p className="text-gray-700 text-center">{user?.email}</p>
                <p className="text-gray-500">{user?.bio}</p>
            </div>
            <div>
                <Link href={"/posts/create"}>
                    <button className="w-full bg-[#1E88E5] text-white p-2 rounded-md cursor-pointer">Create Post</button>
                </Link>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-4">
                {posts.map((post) => <PostView key={post.id} data={post} />)}
            </div>
        </div>
    )
}