import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { STAGE2_PUZZLES } from "@/lib/puzzle-data";
import {
  formatTime,
  normalize,
  readStage,
  writeStage,
  type StageResult,
} from "@/lib/hunt-progress";
import { LockedStage, ProgressBar, Stat, StageShell } from "@/components/StageShell";

export const Route = createFileRoute("/stage-2")({
  head: () => ({
    meta: [
      { title: "Stage 2 — Freedom Puzzles | CYBOTIXX Code Freedom Hunt" },
      {
        name: "description",
        content:
          "Stage 2 of the CYBOTIXX Code Freedom Hunt: ten interactive logic, pattern and cyber-reasoning puzzles for Independence Day.",
      },
      { property: "og:title", content: "Stage 2 — Freedom Puzzles | CYBOTIXX" },
      {
        property: "og:description",
        content: "Think beyond the obvious. Solve the clues. Unlock the next stage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Stage2,
});

const TOTAL = STAGE2_PUZZLES.length;
const MATCH_KEYS = ["A", "B", "C", "D"];

function Stage2() {
  const [hydrated, setHydrated] = useState(false);
  const [stage1, setStage1] = useState<StageResult | null>(null);
  const [saved, setSaved] = useState<StageResult | null>(null);

  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const finalTime = useRef(0);

  useEffect(() => {
    setStage1(readStage(1));
    setSaved(readStage(2));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || saved || finished || !stage1) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [hydrated, saved, finished, stage1]);

  const shellProps = {
    title: "STAGE 2 —",
    accent: "FREEDOM PUZZLES",
    subtitle: "Think beyond the obvious. Solve the clues. Unlock the next stage.",
  };

  if (!hydrated) return <StageShell {...shellProps} />;

  if (!stage1) {
    return (
      <StageShell {...shellProps}>
        <LockedStage
          stage="STAGE 2"
          message="Complete Stage 1 — Freedom Quiz before accessing this mission."
          to="/stage-1"
          backLabel="← Go to Stage 1"
        />
      </StageShell>
    );
  }

  if (saved) {
    return (
      <StageShell {...shellProps}>
        <div className="glass mx-auto mt-10 max-w-xl rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-accent">✓ STAGE 2 ALREADY COMPLETED</h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground">Your Stage 2 score</p>
          <p className="text-tricolour text-5xl font-black">{saved.score} / 100</p>
          <ContinueButton />
        </div>
      </StageShell>
    );
  }

  if (finished) {
    const score = correctCount * 10;
    return (
      <StageShell {...shellProps} timer={formatTime(finalTime.current)}>
        <div className="glass mx-auto mt-10 max-w-2xl rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-black">🎉 STAGE 2 COMPLETED!</h2>
          <p className="text-tricolour mt-1 font-display text-lg font-bold">
            FREEDOM PUZZLES — COMPLETE
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Stat label="Your Score" value={`${score} / 100`} />
            <Stat label="Correct Puzzles" value={`${correctCount} / ${TOTAL}`} />
            <Stat label="Accuracy" value={`${Math.round((correctCount / TOTAL) * 100)}%`} />
            <Stat label="Time Taken" value={formatTime(finalTime.current)} />
          </div>
          <p className="mt-6 font-mono text-sm tracking-widest text-accent">
            ✓ STAGE 2 — COMPLETED
          </p>
          <p className="mt-4 text-muted-foreground">
            Excellent! Your logical thinking has unlocked the next level.
          </p>
          <ContinueButton />
        </div>
      </StageShell>
    );
  }

  const p = STAGE2_PUZZLES[index]!;
  const progress = ((index + (locked ? 1 : 0)) / TOTAL) * 100;

  const submit = () => {
    if (locked) return;
    let ok = false;
    if (p.kind === "match") {
      if (Object.keys(matches).length < (p.pairs?.length ?? 0)) {
        setError("Match every item before submitting.");
        return;
      }
      ok = (p.pairs ?? []).every((pair, i) => matches[i] === pair.correct);
    } else {
      if (!value.trim()) {
        setError("Please enter an answer before submitting.");
        return;
      }
      ok = normalize(value) === normalize(p.answer);
    }
    setError("");
    setLocked(true);
    setWasCorrect(ok);
    if (ok) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (index === TOTAL - 1) {
      finalTime.current = elapsed;
      writeStage(2, {
        completed: true,
        score: correctCount * 10,
        correct: correctCount,
        total: TOTAL,
        accuracy: Math.round((correctCount / TOTAL) * 100),
        timeSeconds: elapsed,
      });
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setValue("");
    setMatches({});
    setLocked(false);
    setError("");
  };

  return (
    <StageShell {...shellProps} timer={formatTime(elapsed)}>
      <ProgressBar label={`PUZZLE ${index + 1} OF ${TOTAL}`} value={progress} />

      <div
        key={index}
        className="glass mt-6 animate-in fade-in slide-in-from-bottom-4 rounded-3xl p-6 duration-500 sm:p-8"
      >
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          Puzzle {p.n} — {p.title}
        </p>
        <h2 className="mt-3 text-lg font-bold sm:text-xl">{p.prompt}</h2>

        {p.display && (
          <pre className="mt-5 overflow-x-auto rounded-2xl border border-border bg-background/60 p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap text-primary sm:text-base">
            {p.display}
          </pre>
        )}

        {p.kind === "match" ? (
          <div className="mt-6 grid gap-4">
            <ul className="grid gap-2 rounded-2xl border border-border bg-background/40 p-4 text-sm text-muted-foreground">
              {p.options?.map((o) => <li key={o}>{o}</li>)}
            </ul>
            <div className="grid gap-3">
              {p.pairs?.map((pair, i) => {
                const chosen = matches[i];
                const right = locked && chosen === pair.correct;
                const wrong = locked && chosen !== pair.correct;
                return (
                  <div
                    key={pair.left}
                    className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                      right
                        ? "border-success bg-success/15"
                        : wrong
                          ? "border-destructive bg-destructive/15"
                          : "border-border bg-secondary/40"
                    }`}
                  >
                    <span className="text-sm font-semibold">
                      {i + 1}. {pair.left}
                    </span>
                    <div className="flex gap-2">
                      {MATCH_KEYS.map((k) => (
                        <button
                          key={k}
                          type="button"
                          disabled={locked}
                          onClick={() => {
                            setMatches((m) => ({ ...m, [i]: k }));
                            setError("");
                          }}
                          className={`h-9 w-9 rounded-lg border font-mono text-sm font-bold transition-colors disabled:cursor-not-allowed ${
                            chosen === k
                              ? "border-primary bg-primary/25 text-foreground"
                              : "border-border bg-background/60 hover:border-primary/60"
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <input
            type={p.kind === "number" ? "text" : "text"}
            inputMode={p.kind === "number" ? "numeric" : "text"}
            maxLength={p.kind === "letter" ? 1 : 40}
            disabled={locked}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={
              p.kind === "number"
                ? "Enter a number"
                : p.kind === "letter"
                  ? "Enter a letter"
                  : "Type your answer"
            }
            className="mt-6 w-full rounded-xl border border-border bg-background/60 px-4 py-3 font-mono text-base tracking-widest uppercase focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-70"
          />
        )}

        {error && <p className="mt-4 text-sm font-semibold text-destructive">{error}</p>}

        {locked && (
          <div className="mt-6 rounded-2xl border border-border bg-background/50 p-5">
            <p
              className={`font-display text-lg font-bold ${wasCorrect ? "text-success" : "text-destructive"}`}
            >
              {wasCorrect ? "✓ CORRECT!" : "✗ INCORRECT"}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-mono text-muted-foreground">Correct Answer: </span>
              <span className="font-semibold text-success">{p.answer}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{p.explanation}</p>
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
              {index === TOTAL - 1 ? "Finish Stage 2 →" : "Next Puzzle →"}
            </button>
          )}
        </div>
      </div>
    </StageShell>
  );
}

function ContinueButton() {
  return (
    <Link
      to="/stage-3"
      className="animate-pulse-glow mt-8 inline-flex rounded-2xl bg-primary px-8 py-4 font-display text-sm font-black tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105"
    >
      Continue to Stage 3 →
    </Link>
  );
}
