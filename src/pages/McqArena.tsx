import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Clock, Check, X, ArrowRight, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const topics = [
  "SELECT basics",
  "WHERE clause",
  "ORDER BY and LIMIT",
  "AND, OR operators",
  "NULL handling",
  "LIKE pattern matching",
  "Aggregate functions (COUNT, SUM, AVG)",
  "GROUP BY and HAVING",
  "INNER JOIN",
  "LEFT JOIN and RIGHT JOIN",
  "Subqueries",
  "Common Table Expressions (CTEs)",
  "Window Functions (ROW_NUMBER, RANK)",
  "Indexes and Performance",
];

interface MCQQuestion {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

const McqArena = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (!timerActive || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          setTimerActive(false);
          handleAnswer(-1); // Time's up
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const startQuiz = async (topic: string) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);

    try {
      const { data, error } = await supabase.functions.invoke("generate-mcq", {
        body: { topic },
      });

      if (error) throw error;

      const parsed = data.questions || data;
      if (Array.isArray(parsed) && parsed.length > 0) {
        setQuestions(parsed);
        setTimer(30);
        setTimerActive(true);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("MCQ generation error:", err);
      toast({
        title: "Error generating questions",
        description: "Please try again.",
        variant: "destructive",
      });
      setSelectedTopic(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer !== null) return;
      setTimerActive(false);
      setSelectedAnswer(index);
      setShowExplanation(true);
      if (index === questions[currentIndex]?.correct_answer) {
        setScore((s) => s + 1);
      }
    },
    [selectedAnswer, questions, currentIndex]
  );

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimer(30);
    setTimerActive(true);
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsFinished(false);
    setTimerActive(false);
  };

  // Topic selection
  if (!selectedTopic) {
    return (
      <AppLayout>
        <div className="p-6 md:p-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-1">MCQ Arena</h1>
            <p className="text-muted-foreground">
              Choose a topic and test your SQL knowledge with AI-generated questions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topics.map((topic, i) => (
              <motion.button
                key={topic}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => startQuiz(topic)}
                className="surface-card p-4 text-left hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{topic}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Generating questions about {selectedTopic}...</p>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  // Finished
  if (isFinished) {
    const xpEarned = score * 10 + (score === questions.length ? 50 : 0);
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh] p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="surface-card p-8 max-w-md w-full text-center"
          >
            <div className="text-5xl mb-4">
              {score === questions.length ? "🏆" : score >= questions.length / 2 ? "🎯" : "📚"}
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground mb-6">{selectedTopic}</p>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div>
                <p className="text-3xl font-bold font-mono">
                  {score}/{questions.length}
                </p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-3xl font-bold font-mono text-primary">
                  +{xpEarned}
                </p>
                <p className="text-xs text-muted-foreground">XP Earned</p>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={resetQuiz}>
                <RotateCcw className="w-4 h-4 mr-1" />
                New Topic
              </Button>
              <Button onClick={() => startQuiz(selectedTopic)}>
                Retry
              </Button>
            </div>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  // Question view
  const q = questions[currentIndex];
  if (!q) return null;

  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-3xl mx-auto">
        {/* Progress & timer */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-mono">
              {currentIndex + 1} / {questions.length}
            </span>
            <div className="w-40 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <div
            className={`flex items-center gap-1.5 text-sm font-mono ${
              timer <= 10 ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            <Clock className="w-4 h-4" />
            {timer}s
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-6 leading-relaxed">{q.question}</h2>

            <div className="space-y-3 mb-6">
              {q.options.map((option, i) => {
                let optionClass = "surface-card p-4 cursor-pointer hover:border-primary/40 transition-colors";
                if (selectedAnswer !== null) {
                  if (i === q.correct_answer) {
                    optionClass = "p-4 rounded-xl border border-success bg-success/10 cursor-default";
                  } else if (i === selectedAnswer && i !== q.correct_answer) {
                    optionClass = "p-4 rounded-xl border border-destructive bg-destructive/10 cursor-default";
                  } else {
                    optionClass = "surface-card p-4 opacity-50 cursor-default";
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left flex items-center gap-3 ${optionClass}`}
                  >
                    <span className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-xs font-mono font-medium shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm">{option}</span>
                    {selectedAnswer !== null && i === q.correct_answer && (
                      <Check className="w-4 h-4 text-success ml-auto shrink-0" />
                    )}
                    {selectedAnswer === i && i !== q.correct_answer && (
                      <X className="w-4 h-4 text-destructive ml-auto shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="surface-elevated p-4 mb-6"
              >
                <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                  Explanation
                </p>
                <p className="text-sm text-foreground leading-relaxed">{q.explanation}</p>
              </motion.div>
            )}

            {selectedAnswer !== null && (
              <Button onClick={nextQuestion} className="w-full">
                {currentIndex + 1 >= questions.length ? "See Results" : "Next Question"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default McqArena;
