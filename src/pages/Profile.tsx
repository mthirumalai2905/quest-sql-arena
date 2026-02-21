import { motion } from "framer-motion";
import { Zap, BookOpen, Brain, Flame, Award, Target, Star, Timer } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const badges = [
  { name: "First Query", description: "Run your first SQL query", icon: Star, earned: true },
  { name: "7-Day Streak", description: "Maintain a 7-day learning streak", icon: Flame, earned: true },
  { name: "JOIN Master", description: "Complete all JOIN lessons", icon: Award, earned: false },
  { name: "Perfect Score", description: "Score 10/10 on an MCQ quiz", icon: Target, earned: false },
  { name: "SQL Architect", description: "Complete all 7 levels", icon: Zap, earned: false },
  { name: "Speed Demon", description: "Average <10s per MCQ answer", icon: Timer, earned: false },
];

const xpHistory = [
  { day: "Mon", xp: 60 },
  { day: "Tue", xp: 110 },
  { day: "Wed", xp: 50 },
  { day: "Thu", xp: 150 },
  { day: "Fri", xp: 80 },
  { day: "Sat", xp: 200 },
  { day: "Sun", xp: 120 },
];

const maxXp = Math.max(...xpHistory.map((d) => d.xp));

const Profile = () => {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
              S
            </div>
            <div>
              <h1 className="text-2xl font-bold">SQL Learner</h1>
              <p className="text-muted-foreground text-sm">Explorer Level • Joined Jan 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total XP", value: "1,250", icon: Zap },
            { label: "Lessons", value: "12 / 28", icon: BookOpen },
            { label: "MCQ Accuracy", value: "78%", icon: Brain },
            { label: "Streak", value: "7 days", icon: Flame },
          ].map((stat) => (
            <div key={stat.label} className="surface-card p-4">
              <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                <stat.icon className="w-3.5 h-3.5" />
                {stat.label}
              </div>
              <p className="text-xl font-bold font-mono">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* XP Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="surface-card p-6 mb-8"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-6">
            XP This Week
          </h3>
          <div className="flex items-end gap-3 h-32">
            {xpHistory.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className="w-full bg-primary/80 rounded-t"
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.xp / maxXp) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                />
                <span className="text-[10px] text-muted-foreground font-mono">
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            Badges
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`surface-card p-4 ${
                  !badge.earned ? "opacity-40" : ""
                }`}
              >
                <badge.icon
                  className={`w-6 h-6 mb-2 ${
                    badge.earned ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <p className="text-sm font-medium mb-0.5">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Profile;
