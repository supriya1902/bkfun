"use client";

import Navbar from "./navbar";
import { Flame, Sparkles, Trophy } from "lucide-react";

export default function AppShell({
  children,
  rightPanel,
}: {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}) {
  return (
    <div className="app-root">
      <div className="shell">
        <aside className="sidebar-desktop">
          <div className="glass desktop-nav-card">
            <div className="mb-6">
              <div className="top-chip">
                <Sparkles size={14} />
                BKFUN
              </div>
              <h1 className="mt-4 text-3xl font-black">
                Build your <span className="gradient-text">real story</span>
              </h1>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Do real challenges, upload proof, earn points, and shape your
                profile through actual experiences.
              </p>
            </div>

            <Navbar desktop />

            <div className="mt-6 space-y-3">
              <div className="soft p-4">
                <div className="flex items-center gap-3">
                  <Flame size={18} />
                  <div>
                    <p className="text-sm font-bold">Daily Momentum</p>
                    <p className="text-xs text-zinc-500">3 fresh challenges</p>
                  </div>
                </div>
              </div>

              <div className="soft p-4">
                <div className="flex items-center gap-3">
                  <Trophy size={18} />
                  <div>
                    <p className="text-sm font-bold">Progress Matters</p>
                    <p className="text-xs text-zinc-500">Real action beats scrolling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="main-column">{children}</main>

        <aside className="rightpanel-desktop">
          <div className="glass p-5">
            {rightPanel || (
              <>
                <h3 className="text-lg font-extrabold">Why BKFUN works</h3>
                <div className="mt-4 space-y-3">
                  <div className="soft p-4">
                    <p className="font-semibold">Pick fast</p>
                    <p className="mt-1 text-sm text-zinc-400">
                      Daily challenges stay simple so users can act quickly.
                    </p>
                  </div>
                  <div className="soft p-4">
                    <p className="font-semibold">Post proof</p>
                    <p className="mt-1 text-sm text-zinc-400">
                      Images + caption make progress visible and real.
                    </p>
                  </div>
                  <div className="soft p-4">
                    <p className="font-semibold">Grow profile</p>
                    <p className="mt-1 text-sm text-zinc-400">
                      Points and levels give lightweight motivation.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      <div className="mobile-nav">
        <Navbar />
      </div>
    </div>
  );
}