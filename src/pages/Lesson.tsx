import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Lightbulb, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

// Mock lesson data
const lessonData: Record<string, { title: string; chapter: string; content: string; starterSql: string; expectedOutput: string[][] }> = {
  "joins-inner-join": {
    title: "INNER JOIN",
    chapter: "Joins",
    content: `An **INNER JOIN** returns only the rows where there is a match in both tables.

**Syntax:**
\`\`\`sql
SELECT columns
FROM table_a
INNER JOIN table_b
ON table_a.id = table_b.a_id;
\`\`\`

The INNER JOIN combines rows from two tables based on a related column between them. If there's no match, the row is excluded from the result.

**Example:** Given the \`employees\` and \`departments\` tables, find all employees with their department names.`,
    starterSql: `SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.id;`,
    expectedOutput: [
      ["name", "department_name"],
      ["Alice", "Engineering"],
      ["Bob", "Marketing"],
      ["Charlie", "Engineering"],
      ["Diana", "Sales"],
    ],
  },
  "foundations-select": {
    title: "SELECT Basics",
    chapter: "Foundations",
    content: `The **SELECT** statement is used to query data from a database table.

**Syntax:**
\`\`\`sql
SELECT column1, column2
FROM table_name;
\`\`\`

Use \`SELECT *\` to retrieve all columns. This is the most fundamental SQL command and the starting point for all queries.

**Try it:** Select all columns from the \`employees\` table.`,
    starterSql: `SELECT * FROM employees;`,
    expectedOutput: [
      ["id", "name", "department_id", "salary"],
      ["1", "Alice", "1", "85000"],
      ["2", "Bob", "2", "72000"],
      ["3", "Charlie", "1", "90000"],
      ["4", "Diana", "3", "68000"],
    ],
  },
};

const defaultLesson = {
  title: "Lesson",
  chapter: "SQL",
  content: "This lesson is coming soon. Check back later!",
  starterSql: "SELECT 1;",
  expectedOutput: [["result"], ["1"]],
};

const Lesson = () => {
  const { lessonId } = useParams();
  const lesson = lessonData[lessonId || ""] || defaultLesson;
  const [sql, setSql] = useState(lesson.starterSql);
  const [output, setOutput] = useState<string[][] | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);

  const runQuery = () => {
    // Mock execution - show expected output
    setOutput(lesson.expectedOutput);
    setIsCorrect(true);
  };

  const showHint = () => {
    if (hintsUsed < 3) setHintsUsed(hintsUsed + 1);
  };

  return (
    <AppLayout>
      <div className="h-screen flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 h-12 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/learn">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wide">
              {lesson.chapter}
            </span>
            <span className="text-sm font-semibold">{lesson.title}</span>
          </div>
          {isCorrect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-success text-sm font-medium"
            >
              <Check className="w-4 h-4" />
              Correct! +50 XP
            </motion.div>
          )}
        </div>

        {/* Split layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Lesson content */}
          <div className="w-1/2 border-r border-border overflow-y-auto p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-6">{lesson.title}</h1>
              <div className="prose prose-invert prose-sm max-w-none">
                {lesson.content.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("```sql")) {
                    const code = paragraph.replace(/```sql\n?/, "").replace(/```/, "");
                    return (
                      <pre
                        key={i}
                        className="surface-elevated p-4 rounded-lg font-mono text-sm overflow-x-auto my-4"
                      >
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                          .replace(/`([^`]+)`/g, '<code class="text-primary font-mono text-xs bg-secondary px-1.5 py-0.5 rounded">$1</code>'),
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: SQL Playground */}
          <div className="w-1/2 flex flex-col">
            {/* Editor */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between px-4 h-10 border-b border-border text-xs text-muted-foreground">
                <span className="font-mono">query.sql</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={showHint}
                    disabled={hintsUsed >= 3}
                    className="h-7 text-xs"
                  >
                    <Lightbulb className="w-3 h-3 mr-1" />
                    Hint ({3 - hintsUsed} left)
                  </Button>
                  <Button size="sm" onClick={runQuery} className="h-7 text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    Run (Ctrl+Enter)
                  </Button>
                </div>
              </div>

              <textarea
                value={sql}
                onChange={(e) => setSql(e.target.value)}
                onKeyDown={(e) => {
                  if (e.ctrlKey && e.key === "Enter") runQuery();
                }}
                className="flex-1 bg-card p-4 font-mono text-sm resize-none focus:outline-none text-foreground"
                spellCheck={false}
                placeholder="Write your SQL query here..."
              />
            </div>

            {/* Output */}
            <div className="border-t border-border">
              <div className="px-4 h-8 flex items-center border-b border-border text-xs text-muted-foreground font-mono">
                Output
              </div>
              <div className="h-48 overflow-auto">
                {output ? (
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-border">
                        {output[0].map((col, i) => (
                          <th
                            key={i}
                            className="text-left p-2 text-muted-foreground font-medium"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {output.slice(1).map((row, ri) => (
                        <tr key={ri} className="border-b border-border/50">
                          {row.map((cell, ci) => (
                            <td key={ci} className="p-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                    Run a query to see results
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Lesson;
