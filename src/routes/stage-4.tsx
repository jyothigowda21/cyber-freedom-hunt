import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { STAGE4_CASES, type CaseItem } from "@/lib/detective-data";
import { formatTime, normalize, readStage, writeStage, type StageResult } from "@/lib/hunt-progress";
import { LockedStage, ProgressBar, Stat, StageShell } from "@/components/StageShell";

export const Route = createFileRoute("/stage-4")({
  head: () => ({
    meta: [
      { title: "Stage 4 — Cyber Detective | CYBOTIXX Code Freedom Hunt" },
      {
        name: "description",
        content:
          "Stage 4 of the CYBOTIXX Code Freedom Hunt: ten simulated cyber investigation cases covering phishing, passwords, suspicious URLs, login logs and privacy.",
      },
      { property: "og:title", content: "Stage 4 — Cyber Detective | CYBOTIXX" },
      {
        property: "og:description",
        content: "Observe carefully. Find the clue. Protect the digital world.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Stage4,
});

const TOTAL = STAGE4_CASES.length;

function EvidenceTerminal({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-primary/40 bg-background/80">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2 font-mono text-xs tracking-widest text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-destructive" />
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className="h-2 w-2 rounded-full bg-success" />
        <span className="ml-2">🔍 {label}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm break-words whitespace-pre-wrap text-accent">
        {lines.join("\n")}
      </pre>
    </div>
  );
}

function Stage4() {
  const [hydrated, setHydrated] = useState(false);
  const [stage3, setStage3] = useState<StageResult | null>(null);
  const [saved, setSaved] = useState<StageResult | null>(null);

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [picked, setPicked] = useState<number[]>([]);
  const [clueOpen, setClueOpen] = useState(false);
  const [locked, setLocked] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [cluesUsed, setCluesUsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const finalTime = useRef(0);

  useEffect(() => {
    setStage3(readStage(3));
    setSaved(readStage(4));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || saved || finished || !stage3) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [hydrated, saved, finished, stage3]);

  const shellProps = {
    title: "STAGE 4 —",
    accent: "CYBER DETECTIVE",
    subtitle: "Observe carefully. Find the clue. Protect the digital world.",
  };

  if (!hydrated) return <StageShell {...shellProps} />;

  if (!stage3) {
    return (
      <StageShell {...shellProps}>
        <LockedStage
          stage="STAGE 4"
          message="Complete Stage 3 to unlock the next mission."
          to="/stage-3"
          backLabel="← Return to Stage 3"
        />
      </StageShell>
    );
  }

  if (saved) {
    return (
      <StageShell {...shellProps}>
        <div className="glass mx-auto mt-10 max-w-xl rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-accent">✓ STAGE 4 ALREADY COMPLETED</h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground">Your Stage 4 score</p>
          <p className="text-tricolour text-5xl font-black">{saved.score} / 100</p>
          <ContinueButton />
        </div>
      </StageShell>
    );
  }

  if (finished) {
    return (
      <StageShell {...shellProps} timer={formatTime(finalTime.current)}>
        <div className="glass mx-auto mt-10 max-w-2xl rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-black">🎉 STAGE 4 COMPLETED!</h2>
          <p className="text-tricolour mt-1 font-display text-lg font-bold">
            🕵️ CYBER DETECTIVE — COMPLETE
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Stat label="Your Score" value={`${score} / 100`} />
            <Stat label="Cases Solved" value={`${correctCount} / ${TOTAL}`} />
            <Stat label="Clues Used" value={`${cluesUsed}`} />
            <Stat label="Accuracy" value={`${Math.round((correctCount / TOTAL) * 100)}%`} />
            <Stat label="Time Taken" value={formatTime(finalTime.current)} />
          </div>
          <p className="mt-6 font-mono text-sm tracking-widest text-accent">
            ✓ STAGE 4 — COMPLETED
          </p>
          <p className="mt-4 text-muted-foreground">
            Great investigation! You identified the digital threats and protected the mission.
          </p>
          <ContinueButton />
        </div>
      </StageShell>
    );
  }

  const c: CaseItem = STAGE4_CASES[index]!;
  const progress = ((index + (locked ? 1 : 0)) / TOTAL) * 100;
  const points = clueOpen ? 8 : 10;

  const toggle = (i: number) => {
    if (locked) return;
    setError("");
    if (c.kind === "single") setPicked([i]);
    else setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  };

  const submit = () => {
    if (locked) return;
    let ok = false;
    if (c.kind === "text") {
      if (!text.trim()) {
        setError("Please record your finding before submitting.");
        return;
      }
      ok = c.accept.some((a) => normalize(a) === normalize(text));
    } else if (c.kind === "single") {
      if (picked.length === 0) {
        setError("Select one option before submitting.");
        return;
      }
      ok = picked[0] === c.correct;
    } else {
      if (picked.length === 0) {
        setError("Select your findings before submitting.");
        return;
      }
      const a = [...picked].sort().join(",");
      const b = [...c.correct].sort().join(",");
      ok = a === b;
    }
    setError("");
    setLocked(true);
    setWasCorrect(ok);
    if (ok) {
      setCorrectCount((n) => n + 1);
      setScore((s) => s + points);
    }
  };

  const next = () => {
    if (index === TOTAL - 1) {
      finalTime.current = elapsed;
      writeStage(4, {
        completed: true,
        score,
        correct: correctCount,
        total: TOTAL,
        accuracy: Math.round((correctCount / TOTAL) * 100),
        timeSeconds: elapsed,
        hintsUsed: cluesUsed,
      });
      if (typeof window !== "undefined") {
        window.localStorage.setItem("stage4CluesUsed", String(cluesUsed));
      }
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setText("");
    setPicked([]);
    setClueOpen(false);
    setLocked(false);
    setError("");
  };

  return (
    <StageShell {...shellProps} timer={formatTime(elapsed)}>
      <ProgressBar label={`CASE ${index + 1} OF ${TOTAL}`} value={progress} />

      <div
        key={index}
        className="glass mt-6 animate-in fade-in slide-in-from-bottom-4 rounded-3xl p-6 duration-500 sm:p-8"
      >
        <h2 className="font-display text-lg font-black sm:text-xl">{c.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{c.instruction}</p>

        {c.evidence.map((e) => (
          <EvidenceTerminal key={e.label} label={e.label} lines={e.lines} />
        ))}

        <p className="mt-5 font-display text-base font-bold">{c.question}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (locked || clueOpen) return;
              setClueOpen(true);
              setCluesUsed((n) => n + 1);
            }}
            disabled={locked || clueOpen}
            className="rounded-xl border border-accent/60 bg-accent/10 px-4 py-2 font-mono text-xs tracking-widest text-accent uppercase transition-colors hover:bg-accent/20 disabled:opacity-50"
          >
            💡 {clueOpen ? "Clue Revealed" : "Show Clue"}
          </button>
          <span className="font-mono text-xs text-muted-foreground">
            Worth {points} points{clueOpen ? " (clue used)" : ""}
          </span>
        </div>

        {clueOpen && (
          <p className="mt-4 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm">
            <span className="font-mono text-xs tracking-widest text-accent">CLUE — </span>
            {c.clue}
          </p>
        )}

        {c.kind === "text" ? (
          <input
            type="text"
            disabled={locked}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Type your finding"
            className="mt-6 w-full rounded-xl border border-border bg-background/60 px-4 py-3 font-mono text-base tracking-wide uppercase focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-70"
          />
        ) : (
          <div className="mt-6 grid gap-3">
            {c.options.map((opt, i) => {
              const on = picked.includes(i);
              const isRight =
                c.kind === "single" ? i === c.correct : (c.correct as number[]).includes(i);
              const state = locked
                ? isRight
                  ? "border-success bg-success/15"
                  : on
                    ? "border-destructive bg-destructive/15"
                    : "border-border bg-secondary/30"
                : on
                  ? "border-primary bg-primary/15"
                  : "border-border bg-secondary/30 hover:border-primary/60";
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={locked}
                  onClick={() => toggle(i)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${state}`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center font-mono text-xs ${
                      c.kind === "single" ? "rounded-full" : "rounded-md"
                    } border border-current text-muted-foreground`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
            {c.kind === "multi" && !locked && (
              <p className="font-mono text-xs text-muted-foreground">
                Select every correct option, then submit.
              </p>
            )}
          </div>
        )}

        {error && <p className="mt-4 text-sm font-semibold text-destructive">{error}</p>}

        {locked && (
          <div className="mt-6 rounded-2xl border border-border bg-background/50 p-5">
            <p
              className={`font-display text-lg font-bold ${wasCorrect ? "text-success" : "text-destructive"}`}
            >
              {wasCorrect ? "✓ CASE SOLVED!" : "✗ INVESTIGATION FAILED"}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-mono text-muted-foreground">Correct Finding: </span>
              <span className="font-semibold text-success">{c.answerLabel}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{c.explanation}</p>
            {wasCorrect && (
              <p className="mt-2 font-mono text-xs tracking-widest text-primary">
                +{points} POINTS
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {!locked ? (
            <button
              type="button"
              onClick={submit}
              className="rounded-xl bg-primary px-6 py-3 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Submit Finding
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="rounded-xl bg-accent px-6 py-3 font-display text-sm font-bold tracking-widest text-accent-foreground uppercase transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {index === TOTAL - 1 ? "Finish Stage 4 →" : "Next Case →"}
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
      to="/stage-5"
      className="animate-pulse-glow mt-8 inline-flex rounded-2xl bg-primary px-8 py-4 font-display text-sm font-black tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105"
    >
      Continue to Stage 5 →
    </Link>
  );
}
