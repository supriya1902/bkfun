"use client";

import Navbar from "@/components/navbar";
import { getLevel } from "@/lib/levels";

const mockCompleted = [
  "Say Hi First",
  "Read 10 Pages",
  "Go for a Solo Walk",
  "Journal Today",
];

export default function ProfilePage() {
  const points = 95;
  const level = getLevel(points);

  return (
    <main className="page-padding">
      <div className="main-card p-5">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold text-white">supriya</h1>
            <p className="mt-1 text-sm text-zinc-300">{points} total points</p>
            <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
              {level}
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="sub-card p-3 text-center">
            <p className="text-xs text-zinc-500">Level</p>
            <p className="mt-1 text-sm font-bold text-white">Explorer</p>
          </div>

          <div className="sub-card p-3 text-center">
            <p className="text-xs text-zinc-500">Done</p>
            <p className="mt-1 text-sm font-bold text-white">4</p>
          </div>

          <div className="sub-card p-3 text-center">
            <p className="text-xs text-zinc-500">Points</p>
            <p className="mt-1 text-sm font-bold text-white">95</p>
          </div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-white">Completed Challenges</h2>

        <div className="mt-4 space-y-3">
          {mockCompleted.map((item, index) => (
            <div
              key={index}
              className="main-card flex items-center justify-between p-4"
            >
              <div>
                <p className="font-semibold text-white">{item}</p>
                <p className="mt-1 text-xs text-zinc-500">Challenge completed</p>
              </div>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                Done
              </span>
            </div>
          ))}
        </div>
      </section>

      <Navbar />
    </main>
  );
}