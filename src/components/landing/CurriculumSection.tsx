import { motion } from "framer-motion";
import { Lock, Check, ChevronRight } from "lucide-react";

const levels = [
  { level: 1, title: "Foundations", topics: ["SELECT", "WHERE", "ORDER BY", "LIMIT"], status: "available" },
  { level: 2, title: "Filtering & Functions", topics: ["AND/OR", "NULL", "LIKE", "Aggregates"], status: "available" },
  { level: 3, title: "Joins", topics: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"], status: "available" },
  { level: 4, title: "Subqueries & CTEs", topics: ["Scalar", "Correlated", "WITH Clause", "Recursive"], status: "locked" },
  { level: 5, title: "Window Functions", topics: ["ROW_NUMBER", "RANK", "LAG/LEAD", "PARTITION BY"], status: "locked" },
  { level: 6, title: "Performance", topics: ["Indexes", "Transactions", "EXPLAIN", "Optimization"], status: "locked" },
  { level: 7, title: "Advanced", topics: ["Recursive CTEs", "JSON in SQL", "Partitioning", "Materialized Views"], status: "locked" },
];

const CurriculumSection = () => {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Structured curriculum
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            7 levels, 40+ lessons — from your first SELECT to advanced optimization.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-4">
            {levels.map((level, i) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative pl-16"
              >
                <div
                  className={`absolute left-3.5 top-5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    level.status === "locked"
                      ? "border-muted-foreground/20 bg-background"
                      : "border-foreground bg-foreground/10"
                  }`}
                >
                  {level.status === "locked" ? (
                    <Lock className="w-2.5 h-2.5 text-muted-foreground/50" />
                  ) : (
                    <Check className="w-2.5 h-2.5 text-foreground" />
                  )}
                </div>

                <div
                  className={`surface-card p-5 group cursor-pointer transition-colors duration-200 ${
                    level.status === "locked" ? "opacity-40" : "hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground">
                        LVL {level.level}
                      </span>
                      <h3 className="font-semibold">{level.title}</h3>
                    </div>
                    {level.status !== "locked" && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {level.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 text-xs rounded bg-accent text-muted-foreground font-mono"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
