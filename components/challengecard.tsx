import { Challenge } from "@/lib/challenges";

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <div className="main-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-medium text-zinc-300">
          {challenge.category}
        </span>
        <span className="text-sm font-semibold text-white">
          +{challenge.points} pts
        </span>
      </div>

      <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-300">
        {challenge.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500">Difficulty</p>
          <p className="mt-1 text-sm text-yellow-400">
            {"★".repeat(challenge.difficulty)}
          </p>
        </div>

        <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
          Try this
        </button>
      </div>
    </div>
  );
}