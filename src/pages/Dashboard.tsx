import { motion } from "framer-motion";
import {
  Zap,
  Flame,
  BookOpen,
  Trophy,
  ArrowRight,
  Target,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

const stats = [
  { label: "Total XP", value: "1,250", icon: Zap, color: "text-primary" },
  { label: "Lessons Done", value: "12", icon: BookOpen, color: "text-success" },
  { label: "Day Streak", value: "7", icon: Flame, color: "text-warning" },
  { label: "Rank", value: "#42", icon: Trophy, color: "text-primary" },
];

const recentActivity = [
  { text: "Completed lesson: INNER JOIN", xp: "+50 XP", time: "2h ago" },
  { text: "MCQ Arena: Aggregate Functions", xp: "+80 XP", time: "5h ago" },
  { text: "Completed lesson: WHERE clause", xp: "+50 XP", time: "1d ago" },
  { text: "Daily login bonus", xp: "+10 XP", time: "1d ago" },
  { text: "MCQ Arena: SELECT basics", xp: "+100 XP", time: "2d ago" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-1">Welcome back 👋</h1>
          <p className="text-muted-foreground">
            Keep the momentum going — you're on a 7-day streak!
          </p>
        </motion.div>

        {/* XP Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="surface-card p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Explorer Level</span>
            <span className="text-xs text-muted-foreground font-mono">
              1,250 / 1,500 XP to Engineer
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "83%" }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="surface-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
              <p className="text-2xl font-bold font-mono">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Cards row */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Continue learning */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="surface-card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Continue Learning</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">INNER JOIN</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Learn how to combine rows from two tables based on a related column.
              </p>
            </div>
            <Button variant="default" size="sm" className="self-start" asChild>
              <Link to="/learn/joins-inner-join">
                Resume <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </motion.div>

          {/* Daily challenge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="surface-card p-6 border-glow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-primary mb-3">
                <Target className="w-3.5 h-3.5" />
                <span className="font-medium">Daily Challenge</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">
                Window Functions Quiz
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Test your knowledge on ROW_NUMBER, RANK, and PARTITION BY.
                Earn bonus XP!
              </p>
            </div>
            <Button variant="hero" size="sm" className="self-start" asChild>
              <Link to="/mcq">
                Start Challenge <Zap className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="surface-card p-6"
        >
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-muted-foreground">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((act, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <span className="text-sm">{act.text}</span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-success">
                    {act.xp}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
