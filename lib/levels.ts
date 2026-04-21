export function getLevel(points: number) {
  if (points >= 300) return "Main Character";
  if (points >= 180) return "Fear Breaker";
  if (points >= 80) return "Explorer";
  return "Beginner";
}