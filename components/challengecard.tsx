"use client";

import { Challenge } from "@/lib/challenges";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="glass p-4"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <span className="top-chip">{challenge.category}</span>
          <h3 className="mt-3 text-lg font-extrabold">{challenge.title}</h3>
          <p className="mt-1 text-sm leading-6 text-zinc-400">
            {challenge.description}
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 p-3">
          <Sparkles size={18} />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="soft p-3">
          <p className="text-xs text-zinc-500">Difficulty</p>
          <p className="mt-1 text-sm text-yellow-400">
            {"★".repeat(challenge.difficulty)}
          </p>
        </div>

        <div className="soft p-3 text-right">
          <p className="text-xs text-zinc-500">Reward</p>
          <p className="mt-1 text-sm font-bold">+{challenge.points} pts</p>
        </div>
      </div>

      <Link href={`/upload?challenge=${challenge.id}`}>
        <button className="primary-btn flex items-center justify-center gap-2">
          Try this
          <ArrowUpRight size={16} />
        </button>
      </Link>
    </motion.div>
  );
}