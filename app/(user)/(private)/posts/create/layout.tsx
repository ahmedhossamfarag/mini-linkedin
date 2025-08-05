export default function PostCreateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96">{children}</div>
        </div>
    );
}