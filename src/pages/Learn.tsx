import { motion } from "framer-motion";
import { Lock, Check, ChevronRight, Zap, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

interface Lesson {
  id: string;
  title: string;
  xp: number;
  minutes: number;
  status: "completed" | "available" | "locked";
}

interface Chapter {
  level: number;
  title: string;
  lessons: Lesson[];
}

const curriculum: Chapter[] = [
  {
    level: 1,
    title: "Foundations",
    lessons: [
      { id: "foundations-select", title: "SELECT Basics", xp: 50, minutes: 10, status: "completed" },
      { id: "foundations-where", title: "WHERE Clause", xp: 50, minutes: 12, status: "completed" },
      { id: "foundations-order-by", title: "ORDER BY", xp: 50, minutes: 8, status: "completed" },
      { id: "foundations-limit", title: "LIMIT & OFFSET", xp: 50, minutes: 8, status: "completed" },
    ],
  },
  {
    level: 2,
    title: "Filtering & Functions",
    lessons: [
      { id: "filtering-and-or", title: "AND / OR Operators", xp: 50, minutes: 10, status: "completed" },
      { id: "filtering-null", title: "Working with NULL", xp: 50, minutes: 10, status: "completed" },
      { id: "filtering-like", title: "LIKE & Pattern Matching", xp: 50, minutes: 12, status: "completed" },
      { id: "filtering-aggregates", title: "Aggregate Functions", xp: 75, minutes: 15, status: "completed" },
    ],
  },
  {
    level: 3,
    title: "Joins",
    lessons: [
      { id: "joins-inner-join", title: "INNER JOIN", xp: 75, minutes: 15, status: "available" },
      { id: "joins-left-join", title: "LEFT JOIN", xp: 75, minutes: 15, status: "available" },
      { id: "joins-right-join", title: "RIGHT JOIN", xp: 75, minutes: 12, status: "locked" },
      { id: "joins-full-join", title: "FULL OUTER JOIN", xp: 75, minutes: 12, status: "locked" },
    ],
  },
  {
    level: 4,
    title: "Subqueries & CTEs",
    lessons: [
      { id: "sub-scalar", title: "Scalar Subqueries", xp: 100, minutes: 18, status: "locked" },
      { id: "sub-correlated", title: "Correlated Subqueries", xp: 100, minutes: 20, status: "locked" },
      { id: "sub-cte", title: "Common Table Expressions", xp: 100, minutes: 18, status: "locked" },
      { id: "sub-recursive-intro", title: "Recursive CTE Intro", xp: 100, minutes: 20, status: "locked" },
    ],
  },
  {
    level: 5,
    title: "Window Functions",
    lessons: [
      { id: "window-row-number", title: "ROW_NUMBER", xp: 100, minutes: 15, status: "locked" },
      { id: "window-rank", title: "RANK & DENSE_RANK", xp: 100, minutes: 15, status: "locked" },
      { id: "window-lag-lead", title: "LAG & LEAD", xp: 100, minutes: 15, status: "locked" },
      { id: "window-partition", title: "PARTITION BY", xp: 100, minutes: 18, status: "locked" },
    ],
  },
  {
    level: 6,
    title: "Performance",
    lessons: [
      { id: "perf-indexes", title: "Indexes", xp: 125, minutes: 20, status: "locked" },
      { id: "perf-transactions", title: "Transactions", xp: 125, minutes: 18, status: "locked" },
      { id: "perf-explain", title: "EXPLAIN & Query Plans", xp: 125, minutes: 20, status: "locked" },
      { id: "perf-optimization", title: "Query Optimization", xp: 125, minutes: 22, status: "locked" },
    ],
  },
  {
    level: 7,
    title: "Advanced",
    lessons: [
      { id: "adv-recursive", title: "Recursive CTEs", xp: 150, minutes: 25, status: "locked" },
      { id: "adv-json", title: "JSON in SQL", xp: 150, minutes: 22, status: "locked" },
      { id: "adv-partitioning", title: "Table Partitioning", xp: 150, minutes: 25, status: "locked" },
      { id: "adv-materialized", title: "Materialized Views", xp: 150, minutes: 20, status: "locked" },
    ],
  },
];

const statusConfig = {
  completed: { color: "border-muted-foreground/20 bg-accent/50", dot: "bg-foreground" },
  available: { color: "border-border bg-card", dot: "bg-foreground" },
  locked: { color: "border-border/50 bg-card/30", dot: "bg-muted-foreground/30" },
};

const Learn = () => {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold mb-1">Curriculum</h1>
          <p className="text-muted-foreground">
            Your structured path from SQL beginner to expert.
          </p>
        </motion.div>

        <div className="space-y-8">
          {curriculum.map((chapter, ci) => {
            const completedCount = chapter.lessons.filter(
              (l) => l.status === "completed"
            ).length;
            const progress = (completedCount / chapter.lessons.length) * 100;

            return (
              <motion.div
                key={chapter.level}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: ci * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Level {chapter.level}
                  </span>
                  <h2 className="text-lg font-semibold">{chapter.title}</h2>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-foreground rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {completedCount}/{chapter.lessons.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {chapter.lessons.map((lesson) => {
                    const cfg = statusConfig[lesson.status];
                    const isClickable = lesson.status !== "locked";

                    const content = (
                      <div
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg border transition-colors ${cfg.color} ${
                          isClickable
                            ? "cursor-pointer hover:border-muted-foreground/30"
                            : "opacity-40 cursor-not-allowed"
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                          <span className="flex items-center gap-1 font-mono">
                            <Zap className="w-3 h-3" />
                            {lesson.xp}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.minutes}m
                          </span>
                          {lesson.status === "completed" && <Check className="w-4 h-4 text-foreground" />}
                          {lesson.status === "locked" && <Lock className="w-3.5 h-3.5" />}
                          {lesson.status === "available" && <ChevronRight className="w-4 h-4" />}
                        </div>
                      </div>
                    );

                    return isClickable ? (
                      <Link key={lesson.id} to={`/learn/${lesson.id}`}>{content}</Link>
                    ) : (
                      <div key={lesson.id}>{content}</div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Learn;
