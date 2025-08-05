import HeaderView from "@/components/header";
import { PostView } from "@/components/post";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="space-y-4">
      <HeaderView />
      <div className="flex flex-col items-center space-y-4 w-full">
        {posts.map((post) => <PostView key={post.id} data={post} />)}
      </div>
    </div>
  );
}
