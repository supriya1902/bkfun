export type Challenge = {
  id: number;
  category: "Social" | "Solo" | "Self-growth";
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  points: number;
};

export const challenges: Challenge[] = [
  { id: 1, category: "Social", title: "Say Hi First", description: "Start a small conversation with someone first.", difficulty: 1, points: 10 },
  { id: 2, category: "Social", title: "Compliment Someone", description: "Give a genuine compliment to someone today.", difficulty: 1, points: 10 },
  { id: 3, category: "Social", title: "Ask for Directions", description: "Ask someone for directions even if you know the way.", difficulty: 2, points: 20 },
  { id: 4, category: "Social", title: "Talk to a Shopkeeper", description: "Have a short friendly chat with a shopkeeper.", difficulty: 2, points: 20 },
  { id: 5, category: "Social", title: "Introduce Yourself", description: "Introduce yourself to someone new.", difficulty: 3, points: 30 },

  { id: 6, category: "Solo", title: "Go for a Solo Walk", description: "Take a 15-minute walk alone without distractions.", difficulty: 1, points: 10 },
  { id: 7, category: "Solo", title: "Visit a New Place Nearby", description: "Explore somewhere nearby you have not visited before.", difficulty: 2, points: 20 },
  { id: 8, category: "Solo", title: "Sit Without Phone", description: "Sit somewhere peaceful for 10 minutes without your phone.", difficulty: 1, points: 10 },
  { id: 9, category: "Solo", title: "Try a New Drink", description: "Order or make a drink you have never tried before.", difficulty: 1, points: 10 },
  { id: 10, category: "Solo", title: "Mini Adventure", description: "Take a short spontaneous trip in your city.", difficulty: 3, points: 30 },

  { id: 11, category: "Self-growth", title: "Read 10 Pages", description: "Read at least 10 pages of any useful book.", difficulty: 1, points: 10 },
  { id: 12, category: "Self-growth", title: "Journal Today", description: "Write 5 honest lines about your day.", difficulty: 1, points: 10 },
  { id: 13, category: "Self-growth", title: "Wake Up Earlier", description: "Wake up 30 minutes earlier than usual.", difficulty: 2, points: 20 },
  { id: 14, category: "Self-growth", title: "Learn One Small Skill", description: "Learn something practical in 20 minutes.", difficulty: 2, points: 20 },
  { id: 15, category: "Self-growth", title: "Do the Hard Thing First", description: "Finish your hardest task before anything fun.", difficulty: 3, points: 30 }
];

export function getDailyChallenges() {
  const day = new Date().getDate();
  const start = day % challenges.length;
  return [
    challenges[start % challenges.length],
    challenges[(start + 1) % challenges.length],
    challenges[(start + 2) % challenges.length],
  ];
}