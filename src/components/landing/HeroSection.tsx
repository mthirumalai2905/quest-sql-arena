import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Animated glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
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
          <span className="text-gradient">Level by Level.</span>
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
            <Link to="/signup">
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
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-warning/60" />
            <div className="w-3 h-3 rounded-full bg-success/60" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">query.sql</span>
          </div>
          <pre className="font-mono text-sm leading-relaxed">
            <span className="text-primary">SELECT</span>{" "}
            <span className="text-foreground">u.name, COUNT(o.id)</span>{" "}
            <span className="text-primary">AS</span>{" "}
            <span className="text-foreground">total_orders</span>
            {"\n"}
            <span className="text-primary">FROM</span>{" "}
            <span className="text-success">users</span>{" "}
            <span className="text-foreground">u</span>
            {"\n"}
            <span className="text-primary">JOIN</span>{" "}
            <span className="text-success">orders</span>{" "}
            <span className="text-foreground">o</span>{" "}
            <span className="text-primary">ON</span>{" "}
            <span className="text-foreground">u.id = o.user_id</span>
            {"\n"}
            <span className="text-primary">GROUP BY</span>{" "}
            <span className="text-foreground">u.name</span>
            {"\n"}
            <span className="text-primary">ORDER BY</span>{" "}
            <span className="text-foreground">total_orders</span>{" "}
            <span className="text-primary">DESC</span>
            <span className="text-muted-foreground">;</span>
          </pre>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
