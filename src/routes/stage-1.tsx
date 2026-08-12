import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CyberBackdrop, Chakra } from "@/components/CyberBackdrop";
import { STAGE1_QUESTIONS } from "@/lib/quiz-data";
import { formatTime, readStage1, writeStage1, type Stage1Result } from "@/lib/hunt-progress";

export const Route = createFileRoute("/stage-1")({
  head: () => ({
    meta: [
      { title: "Stage 1 — Freedom Quiz | CYBOTIXX Code Freedom Hunt" },
      {
        name: "description",
        content:
          "Stage 1 of the CYBOTIXX Code Freedom Hunt: a 10-question Freedom Quiz on computing, cybersecurity and India's independence.",
      },
      { property: "og:title", content: "Stage 1 — Freedom Quiz | CYBOTIXX" },
      {
        property: "og:description",
        content: "Test your knowledge. Choose wisely. Begin your journey to freedom.",
      },
    ],
  }),
  component: Stage1,
});

const LABELS = ["A", "B", "C", "D"];
const TOTAL = STAGE1_QUESTIONS.length;

function Stage1() {
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState<Stage1Result | null>(null);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const finalTime = useRef(0);

  useEffect(() => {
    setSaved(readStage1());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || saved || finished) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [hydrated, saved, finished]);

  if (!hydrated) return <Shell />;

  if (saved) {
    return (
      <Shell>
        <div className="glass mx-auto mt-10 max-w-xl rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-accent">✓ STAGE 1 ALREADY COMPLETED</h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground">Your Stage 1 score</p>
          <p className="text-tricolour text-5xl font-black">{saved.score} / 100</p>
          <ContinueButton />
        </div>
      </Shell>
    );
  }

  if (finished) {
    const score = correctCount * 10;
    return (
      <Shell>
        <div className="glass mx-auto mt-10 max-w-2xl rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-black">🎉 STAGE 1 COMPLETED!</h2>
          <p className="text-tricolour mt-1 font-display text-lg font-bold">CODE FREEDOM HUNT</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Stat label="Your Score" value={`${score} / 100`} />
            <Stat label="Correct Answers" value={`${correctCount} / ${TOTAL}`} />
            <Stat label="Accuracy" value={`${Math.round((correctCount / TOTAL) * 100)}%`} />
            <Stat label="Time Taken" value={formatTime(finalTime.current)} />
          </div>
          <p className="mt-6 font-mono text-sm tracking-widest text-accent">
            ✓ STAGE 1 — COMPLETED
          </p>
          <p className="mt-4 text-muted-foreground">
            Excellent work! You have successfully completed the Freedom Quiz. Your journey continues
            to the next challenge.
          </p>
          <ContinueButton />
        </div>
      </Shell>
    );
  }

  const q = STAGE1_QUESTIONS[index];
  const progress = ((index + (locked ? 1 : 0)) / TOTAL) * 100;

  const submit = () => {
    if (locked) return;
    if (selected === null) {
      setError("Please select an answer before continuing.");
      return;
    }
    setError("");
    setLocked(true);
    if (selected === q.answer) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (index === TOTAL - 1) {
      const finalCorrect = correctCount;
      finalTime.current = elapsed;
      writeStage1({
        completed: true,
        score: finalCorrect * 10,
        correct: finalCorrect,
        total: TOTAL,
        accuracy: Math.round((finalCorrect / TOTAL) * 100),
        timeSeconds: elapsed,
      });
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setLocked(false);
    setError("");
  };

  return (
    <Shell timer={formatTime(elapsed)}>
      <div className="mt-8">
        <div className="flex items-center justify-between font-mono text-xs tracking-widest text-muted-foreground">
          <span>
            QUESTION {index + 1} OF {TOTAL}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "var(--gradient-tricolour)" }}
          />
        </div>
      </div>

      <div key={index} className="glass mt-6 animate-in fade-in slide-in-from-bottom-4 rounded-3xl p-6 duration-500 sm:p-8">
        <h2 className="text-lg font-bold sm:text-xl">{q.question}</h2>

        <div className="mt-6 grid gap-3">
          {q.options.map((opt, i) => {
            const isSel = selected === i;
            const isRight = i === q.answer;
            let style =
              "border-border bg-secondary/40 hover:border-primary/60 hover:bg-secondary/70";
            if (!locked && isSel) style = "border-primary bg-primary/15 text-foreground";
            if (locked && isRight) style = "border-success bg-success/20";
            if (locked && isSel && !isRight) style = "border-destructive bg-destructive/20";
            return (
              <button
                key={i}
                type="button"
                disabled={locked}
                onClick={() => {
                  setSelected(i);
                  setError("");
                }}
                className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed ${style}`}
              >
                <span className="font-mono text-sm font-bold text-primary">{LABELS[i]}</span>
                <span className="text-sm sm:text-base">{opt}</span>
              </button>
            );
          })}
        </div>

        {error && <p className="mt-4 text-sm font-semibold text-destructive">{error}</p>}

        {locked && (
          <div className="mt-6 rounded-2xl border border-border bg-background/50 p-5">
            <p
              className={`font-display text-lg font-bold ${
                selected === q.answer ? "text-success" : "text-destructive"
              }`}
            >
              {selected === q.answer ? "✓ CORRECT ANSWER!" : "✗ INCORRECT ANSWER"}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-mono text-muted-foreground">Correct Answer: </span>
              <span className="font-semibold text-success">
                {LABELS[q.answer]}. {q.options[q.answer]}
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{q.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {!locked ? (
            <button
              type="button"
              onClick={submit}
              className="rounded-xl bg-primary px-6 py-3 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Submit Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="rounded-xl bg-accent px-6 py-3 font-display text-sm font-bold tracking-widest text-accent-foreground uppercase transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {index === TOTAL - 1 ? "Finish Stage 1 →" : "Next Question →"}
            </button>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 font-display text-2xl font-black text-primary">{value}</p>
    </div>
  );
}

function ContinueButton() {
  return (
    <Link
      to="/stage-2"
      className="animate-pulse-glow mt-8 inline-flex rounded-2xl bg-primary px-8 py-4 font-display text-sm font-black tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105"
    >
      Continue to Stage 2 →
    </Link>
  );
}

function Shell({ children, timer }: { children?: React.ReactNode; timer?: string }) {
  return (
    <main className="relative min-h-screen">
      <CyberBackdrop />
      <div className="mx-auto max-w-3xl px-5 py-10">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Chakra className="animate-chakra h-10 w-10" />
            <div>
              <p className="text-tricolour font-display text-xl font-black">🇮🇳 CYBOTIXX</p>
              <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">
                CODE FREEDOM HUNT
              </p>
            </div>
          </div>
          <div className="glass rounded-xl px-4 py-2 font-mono text-sm text-primary">
            ⏱ TIME: {timer ?? "00:00"}
          </div>
        </header>

        <h1 className="mt-8 font-display text-2xl font-black sm:text-3xl">
          STAGE 1 — <span className="text-primary">FREEDOM QUIZ</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Test your knowledge. Choose wisely. Begin your journey to freedom.
        </p>

        {children}
      </div>
    </main>
  );
}
