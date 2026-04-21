import Navbar from "@/components/navbar";
import ChallengeCard from "@/components/challengecard";
import { getDailyChallenges } from "@/lib/challenges";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  const dailyChallenges = getDailyChallenges();

  return (
    <main className="page-padding">
      <section className="mb-6">
        <div className="top-chip">
          <Sparkles size={14} />
          Real experiences only
        </div>

        <h1 className="heading-xl mt-4 text-main">BKFUN</h1>
        <p className="mt-3 text-sm leading-6 text-muted max-w-sm">
          Pick a challenge, do it in real life, upload proof, and build your
          profile through actual experiences.
        </p>
      </section>

      <section className="main-card mb-6 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-soft">
          Your Progress
        </p>
        <h2 className="heading-lg mt-2 text-main">Explorer</h2>
        <p className="mt-2 text-sm text-muted">
          Stay consistent and keep completing challenges.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="sub-card p-3">
            <p className="text-xs text-soft">Points</p>
            <p className="mt-1 text-lg font-bold text-main">95</p>
          </div>
          <div className="sub-card p-3">
            <p className="text-xs text-soft">Done</p>
            <p className="mt-1 text-lg font-bold text-main">4</p>
          </div>
          <div className="sub-card p-3">
            <p className="text-xs text-soft">Level</p>
            <p className="mt-1 text-sm font-bold text-main">Explorer</p>
          </div>
        </div>

        <button className="primary-btn mt-5">Start Today’s Challenge</button>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-main">Today’s Challenges</h2>
          <span className="text-sm text-soft">3 picks</span>
        </div>

        <div className="space-y-4">
          {dailyChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>

      <Navbar />
    </main>
  );
}