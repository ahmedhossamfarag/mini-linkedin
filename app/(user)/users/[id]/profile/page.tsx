import { PostView } from "@/components/post";
import { getUserData } from "@/lib/users"
import { getUserPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const user = await getUserData(id);
    if (!user) return notFound();
    const posts = await getUserPosts(id);
    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-bold text-center">{user?.name}</h1>
                <p className="text-gray-700 text-center">{user?.email}</p>
                <p className="text-gray-500">{user?.bio}</p>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-4">
                {posts.map((post) => <PostView key={post.id} data={post} />)}
            </div>
        </div>
    )
}