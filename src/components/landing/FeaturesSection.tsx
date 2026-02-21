import { motion } from "framer-motion";
import {
  Gamepad2,
  Brain,
  Terminal,
  BarChart3,
  Trophy,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Earn XP, unlock levels, maintain streaks, and collect badges as you master SQL concepts.",
  },
  {
    icon: Brain,
    title: "AI-Powered MCQs",
    description: "Challenge yourself with dynamically generated quizzes tailored to each SQL topic.",
  },
  {
    icon: Terminal,
    title: "SQL Playground",
    description: "Write and execute real SQL queries in a built-in editor with instant feedback.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visualize your learning journey with detailed stats, charts, and completion metrics.",
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    description: "Compete with learners worldwide. Climb the ranks and showcase your SQL skills.",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn certificates for completing levels and proving your SQL mastery.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to{" "}
            <span className="text-gradient">master SQL</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete learning platform designed to take you from beginner to expert
            with interactive tools and smart feedback.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="surface-card p-6 group hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
