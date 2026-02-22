import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";

const tabs = ["All Time", "This Week", "This Month"] as const;

const leaderboardData = [
  { rank: 1, name: "SQLWizard", xp: 8420, level: "Architect", streak: 45 },
  { rank: 2, name: "DataNinja", xp: 7850, level: "Architect", streak: 32 },
  { rank: 3, name: "QueryKing", xp: 6200, level: "Engineer", streak: 28 },
  { rank: 4, name: "JoinMaster", xp: 5800, level: "Engineer", streak: 21 },
  { rank: 5, name: "AggreGator", xp: 5100, level: "Engineer", streak: 19 },
  { rank: 6, name: "SubQueryPro", xp: 4500, level: "Engineer", streak: 15 },
  { rank: 7, name: "IndexHero", xp: 4200, level: "Engineer", streak: 14 },
  { rank: 8, name: "CTEExplorer", xp: 3800, level: "Explorer", streak: 12 },
  { rank: 9, name: "WindowFan", xp: 3200, level: "Explorer", streak: 10 },
  { rank: 10, name: "SelectStar", xp: 2900, level: "Explorer", streak: 9 },
  { rank: 42, name: "You", xp: 1250, level: "Explorer", streak: 7, isCurrentUser: true },
];

const rankBadge = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All Time");

  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Leaderboard</h1>
          <p className="text-muted-foreground">See how you stack up against other learners.</p>
        </motion.div>

        <div className="flex gap-1 mb-6 p-1 bg-accent rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === tab
                  ? "bg-card text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="surface-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-4 w-16">Rank</th>
                <th className="text-left p-4">Player</th>
                <th className="text-left p-4">Level</th>
                <th className="text-right p-4">
                  <span className="flex items-center gap-1 justify-end"><Flame className="w-3 h-3" /> Streak</span>
                </th>
                <th className="text-right p-4">
                  <span className="flex items-center gap-1 justify-end"><Zap className="w-3 h-3" /> XP</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player, i) => (
                <motion.tr
                  key={player.rank}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`border-b border-border/50 transition-colors ${
                    (player as any).isCurrentUser ? "bg-foreground/[0.03]" : "hover:bg-accent/50"
                  }`}
                >
                  <td className="p-4 font-mono text-sm font-medium">{rankBadge(player.rank)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold">
                        {player.name[0]}
                      </div>
                      <span className="text-sm font-medium">{player.name}</span>
                      {(player as any).isCurrentUser && (
                        <span className="text-[10px] uppercase tracking-wide text-foreground font-medium px-1.5 py-0.5 rounded bg-foreground/10">
                          You
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{player.level}</td>
                  <td className="p-4 text-right text-sm font-mono">{player.streak}d</td>
                  <td className="p-4 text-right text-sm font-mono font-medium">{player.xp.toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Leaderboard;
