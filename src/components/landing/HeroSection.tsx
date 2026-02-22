import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(0_0%_14%_/_0.4)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_14%_/_0.4)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Soft radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-foreground/[0.03] rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground">
            {/* Blooping circle */}
            <span className="relative flex h-3 w-3">
              <span className="absolute inset-0 rounded-full bg-foreground animate-bloop" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-foreground" />
            </span>
            <span>AI-Powered SQL Learning Platform</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Master SQL.
          <br />
          <span className="text-muted-foreground">Level by Level.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          From SELECT to window functions — learn SQL through interactive challenges,
          AI-generated quizzes, and a built-in playground. Track your progress, earn XP,
          and climb the leaderboard.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Button variant="hero" size="xl" asChild>
            <Link to="/dashboard">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="hero-outline" size="xl" asChild>
            <Link to="/learn">View Curriculum</Link>
          </Button>
        </motion.div>

        {/* Code snippet preview */}
        <motion.div
          className="mt-16 max-w-lg mx-auto surface-card p-4 text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
            <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
            <div className="w-3 h-3 rounded-full bg-muted-foreground/10" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">query.sql</span>
          </div>
          <pre className="font-mono text-sm leading-relaxed">
            <span className="text-foreground font-medium">SELECT</span>{" "}
            <span className="text-muted-foreground">u.name, COUNT(o.id)</span>{" "}
            <span className="text-foreground font-medium">AS</span>{" "}
            <span className="text-muted-foreground">total_orders</span>
            {"\n"}
            <span className="text-foreground font-medium">FROM</span>{" "}
            <span className="text-muted-foreground">users u</span>
            {"\n"}
            <span className="text-foreground font-medium">JOIN</span>{" "}
            <span className="text-muted-foreground">orders o</span>{" "}
            <span className="text-foreground font-medium">ON</span>{" "}
            <span className="text-muted-foreground">u.id = o.user_id</span>
            {"\n"}
            <span className="text-foreground font-medium">GROUP BY</span>{" "}
            <span className="text-muted-foreground">u.name</span>
            {"\n"}
            <span className="text-foreground font-medium">ORDER BY</span>{" "}
            <span className="text-muted-foreground">total_orders</span>{" "}
            <span className="text-foreground font-medium">DESC</span>
            <span className="text-muted-foreground/50">;</span>
          </pre>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
