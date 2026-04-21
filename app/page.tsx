import AppShell from "@/components/appshell";
import AppHeader from "@/components/appheader";
import ChallengeCard from "@/components/challengecard";
import { getDailyChallenges } from "@/lib/challenges";
import { Flame, Sparkles } from "lucide-react";

export default function HomePage() {
  const dailyChallenges = getDailyChallenges();

  return (
    <AppShell
      rightPanel={
        <>
          <h3 className="text-lg font-extrabold">Today’s vibe</h3>
          <div className="mt-4 hero p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Momentum
                </p>
                <h4 className="mt-2 text-xl font-black">Explorer Mode</h4>
                <p className="mt-2 text-sm text-zinc-400">
                  Take one real step today.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-3 text-black">
                <Flame size={18} />
              </div>
            </div>
          </div>
        </>
      }
    >
      <div className="page-space">
        <AppHeader
          chip={
            <div className="top-chip">
              <Sparkles size={14} />
              Real experiences only
            </div>
          }
          title="Build your real-life identity"
          subtitle="Pick a challenge, do it in real life, upload proof, and grow through actual experiences."
        />

        <section className="hero p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Daily Progress
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Small actions, real confidence
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                BKFUN is designed to make starting easy and progress visible.
              </p>
            </div>
            <div className="rounded-2xl bg-white text-black p-3">
              <Flame size={18} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="soft p-3">
              <p className="text-xs text-zinc-500">Today</p>
              <p className="mt-1 text-lg font-black">3</p>
            </div>
            <div className="soft p-3">
              <p className="text-xs text-zinc-500">Categories</p>
              <p className="mt-1 text-lg font-black">3</p>
            </div>
            <div className="soft p-3">
              <p className="text-xs text-zinc-500">Levels</p>
              <p className="mt-1 text-lg font-black">4</p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Today’s challenges</h2>
            <span className="muted text-sm">Fresh every day</span>
          </div>

          <div className="grid gap-4">
            {dailyChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}