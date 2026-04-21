type Post = {
  id: number;
  username: string;
  image: string;
  caption: string;
  challengeTitle: string;
  points: number;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="main-card overflow-hidden">
      <div className="p-4">
        <p className="text-sm font-semibold text-white">@{post.username}</p>
        <p className="mt-1 text-xs text-zinc-500">Challenge completed</p>
      </div>

      <img
        src={post.image}
        alt={post.challengeTitle}
        className="h-72 w-full object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-white">{post.challengeTitle}</h3>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
            +{post.points} pts
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-zinc-300">{post.caption}</p>

        <div className="mt-4 flex gap-3">
          <button className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-medium text-white">
            Like
          </button>
          <button className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black">
            Try this
          </button>
        </div>
      </div>
    </div>
  );
}