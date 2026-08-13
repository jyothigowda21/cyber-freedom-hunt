import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { STAGE5_CHALLENGES, type FinalChallenge } from "@/lib/finale-data";
import { formatTime, normalize, readStage, writeStage, type StageResult } from "@/lib/hunt-progress";
import { LockedStage, ProgressBar, Stat, StageShell } from "@/components/StageShell";

export const Route = createFileRoute("/stage-5")({
  head: () => ({
    meta: [
      { title: "Stage 5 — Freedom Finale | CYBOTIXX Code Freedom Hunt" },
      {
        name: "description",
        content:
          "The final stage of the CYBOTIXX Code Freedom Hunt: ten easy missions mixing logic, binary, ciphers, code output and cyber safety to unlock the Freedom Flag.",
      },
      { property: "og:title", content: "Stage 5 — Freedom Finale | CYBOTIXX" },
      {
        property: "og:description",
        content: "Complete the final mission and unlock your Freedom Flag.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Stage5,
});

const TOTAL = STAGE5_CHALLENGES.length;

function formatLong(seconds: number) {
  const h = Math.floor(seconds / 3600);
  if (h === 0) return formatTime(seconds);
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${h.toString().padStart(2, "0")}:${m}:${s}`;
}

const STAGE_NAMES = [
  "Stage 1 — Freedom Quiz",
  "Stage 2 — Freedom Puzzles",
  "Stage 3 — Break the Cipher",
  "Stage 4 — Cyber Detective",
  "Stage 5 — Freedom Finale",
];

function Stage5() {
  const [hydrated, setHydrated] = useState(false);
  const [prior, setPrior] = useState<(StageResult | null)[]>([null, null, null, null]);
  const [saved, setSaved] = useState<StageResult | null>(null);

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [picked, setPicked] = useState<number | null>(null);
  const [matches, setMatches] = useState<(number | null)[]>([null, null, null, null]);
  const [clueOpen, setClueOpen] = useState(false);
  const [locked, setLocked] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [cluesUsed, setCluesUsed] = useState(0);
  const [flagUnlocked, setFlagUnlocked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const finalTime = useRef(0);

  useEffect(() => {
    setPrior([readStage(1), readStage(2), readStage(3), readStage(4)]);
    setSaved(readStage(5));
    setHydrated(true);
  }, []);

  const stage4 = prior[3];

  useEffect(() => {
    if (!hydrated || saved || finished || !stage4) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [hydrated, saved, finished, stage4]);

  const shellProps = {
    title: "STAGE 5 —",
    accent: "FREEDOM FINALE",
    subtitle:
      "You have come this far. Complete the final mission and unlock your Freedom Flag!",
  };

  if (!hydrated) return <StageShell {...shellProps} />;

  if (!stage4) {
    return (
      <StageShell {...shellProps}>
        <LockedStage
          stage="STAGE 5"
          message="Complete Stage 4 to unlock the final mission."
          to="/stage-4"
          backLabel="← Return to Stage 4"
        />
      </StageShell>
    );
  }

  if (saved || finished) {
    const stage5 = saved ?? {
      completed: true as const,
      score,
      correct: correctCount,
      total: TOTAL,
      accuracy: Math.round((correctCount / TOTAL) * 100),
      timeSeconds: finalTime.current,
      hintsUsed: cluesUsed,
    };
    const all = [...prior, stage5];
    const missing = all.some((s) => !s);
    if (missing) {
      return (
        <StageShell {...shellProps}>
          <div className="glass mx-auto mt-10 max-w-xl rounded-3xl p-8 text-center">
            <p className="font-display text-xl font-bold text-destructive">
              ⚠ MISSION DATA INCOMPLETE
            </p>
            <p className="mt-3 text-muted-foreground">
              Previous stage data could not be found. Please contact the event coordinator.
            </p>
          </div>
        </StageShell>
      );
    }
    const results = all as StageResult[];
    const totalScore = results.reduce((a, s) => a + s.score, 0);
    const totalCorrect = results.reduce((a, s) => a + s.correct, 0);
    const totalQuestions = results.reduce((a, s) => a + s.total, 0);
    const totalTime = results.reduce((a, s) => a + s.timeSeconds, 0);

    return (
      <StageShell {...shellProps} timer={formatTime(stage5.timeSeconds)}>
        <div className="glass relative mt-10 overflow-hidden rounded-3xl p-6 text-center sm:p-10">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
            style={{ background: "var(--gradient-tricolour)" }}
          />
          <p className="text-tricolour font-display text-lg font-black">🇮🇳 CODE FREEDOM HUNT</p>
          <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">
            🎉 MISSION ACCOMPLISHED
          </h2>
          <p className="mt-3 text-muted-foreground">
            You have successfully completed the CYBOTIXX Code Freedom Hunt.
          </p>

          <div className="mt-8 grid gap-3 text-left">
            {results.map((s, i) => (
              <div
                key={STAGE_NAMES[i]}
                className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-secondary/40 px-4 py-3"
              >
                <span className="font-display text-sm font-bold">{STAGE_NAMES[i]}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  SCORE <span className="text-primary">{s.score} / 100</span> · TIME{" "}
                  <span className="text-accent">{formatTime(s.timeSeconds)}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Stat label="Total Score" value={`${totalScore} / 500`} />
            <Stat label="Total Correct" value={`${totalCorrect} / ${totalQuestions}`} />
            <Stat
              label="Overall Accuracy"
              value={`${Math.round((totalCorrect / totalQuestions) * 100)}%`}
            />
            <Stat label="⏱ Total Time Taken" value={formatLong(totalTime)} />
          </div>

          <div className="animate-pulse-glow mt-10 rounded-3xl border border-primary/50 bg-background/60 p-8">
            <p className="text-3xl">🇮🇳</p>
            <p className="mt-2 font-display text-xl font-black">🚩 FREEDOM FLAG UNLOCKED 🚩</p>
            <p className="text-tricolour mt-3 font-mono text-xl font-black break-all sm:text-2xl">
              FLAG&#123;CYBOTIXX_FREEDOM&#125;
            </p>
          </div>

          <div className="mt-8 grid gap-2 font-mono text-sm tracking-widest text-accent">
            <p>✓ ALL 5 STAGES COMPLETED</p>
            <p>✓ 50 CHALLENGES COMPLETED</p>
            <p>✓ MISSION ACCOMPLISHED</p>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex rounded-2xl border border-border px-6 py-3 font-display text-xs font-bold tracking-widest uppercase transition-colors hover:bg-secondary/60"
          >
            🇮🇳 Back to Mission Home
          </Link>
        </div>
      </StageShell>
    );
  }

  const c: FinalChallenge = STAGE5_CHALLENGES[index]!;
  const progress = ((index + (locked ? 1 : 0)) / TOTAL) * 100;
  const points = clueOpen ? 8 : 10;

  const submit = () => {
    if (locked) return;
    let ok = false;
    if (c.kind === "text") {
      if (!text.trim()) {
        setError("Please enter your answer before submitting.");
        return;
      }
      ok = c.accept.some((a) => normalize(a) === normalize(text));
      if (ok && c.n === TOTAL) setFlagUnlocked(true);
    } else if (c.kind === "single") {
      if (picked === null) {
        setError("Select an option before submitting.");
        return;
      }
      ok = picked === c.correct;
    } else {
      if (matches.some((m) => m === null)) {
        setError("Match every term before submitting.");
        return;
      }
      ok = matches.every((m, i) => m === c.correct[i]);
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
      const finalScore = score;
      writeStage(5, {
        completed: true,
        score: finalScore,
        correct: correctCount,
        total: TOTAL,
        accuracy: Math.round((correctCount / TOTAL) * 100),
        timeSeconds: elapsed,
        hintsUsed: cluesUsed,
      });
      if (typeof window !== "undefined") {
        const totalTime =
          prior.reduce((a, s) => a + (s?.timeSeconds ?? 0), 0) + elapsed;
        const totalScore = prior.reduce((a, s) => a + (s?.score ?? 0), 0) + finalScore;
        window.localStorage.setItem("stage5CluesUsed", String(cluesUsed));
        window.localStorage.setItem("totalEventTime", formatLong(totalTime));
        window.localStorage.setItem("totalEventScore", String(totalScore));
      }
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setText("");
    setPicked(null);
    setMatches([null, null, null, null]);
    setClueOpen(false);
    setLocked(false);
    setError("");
  };

  return (
    <StageShell {...shellProps} timer={formatTime(elapsed)}>
      <ProgressBar label={`FINAL CHALLENGE ${index + 1} OF ${TOTAL}`} value={progress} />

      <div
        key={index}
        className="glass mt-6 animate-in fade-in slide-in-from-bottom-4 rounded-3xl p-6 duration-500 sm:p-8"
      >
        <h2 className="font-display text-lg font-black sm:text-xl">{c.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{c.instruction}</p>

        <div className="mt-5 overflow-hidden rounded-2xl border border-primary/40 bg-background/80">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2 font-mono text-xs tracking-widest text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="ml-2">{c.contentLabel}</span>
          </div>
          <pre className="overflow-x-auto px-4 py-4 font-mono text-sm break-words whitespace-pre-wrap text-accent sm:text-base">
            {c.content.join("\n")}
          </pre>
        </div>

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

        {c.kind === "text" && (
          <input
            type="text"
            disabled={locked}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={c.placeholder}
            className="mt-6 w-full rounded-xl border border-border bg-background/60 px-4 py-3 font-mono text-base tracking-wide uppercase focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-70"
          />
        )}

        {c.kind === "single" && (
          <div className="mt-6 grid gap-3">
            {c.options.map((opt, i) => {
              const on = picked === i;
              const state = locked
                ? i === c.correct
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
                  onClick={() => {
                    setPicked(i);
                    setError("");
                  }}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${state}`}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current font-mono text-xs text-muted-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {c.kind === "match" && (
          <div className="mt-6 grid gap-3">
            {c.terms.map((term, i) => (
              <div
                key={term}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/30 px-4 py-3"
              >
                <span className="font-display text-sm font-bold text-primary">{term}</span>
                <select
                  disabled={locked}
                  value={matches[i] ?? ""}
                  onChange={(e) => {
                    const v = e.target.value === "" ? null : Number(e.target.value);
                    setMatches((m) => m.map((x, k) => (k === i ? v : x)));
                    setError("");
                  }}
                  className={`min-w-[16rem] flex-1 rounded-xl border bg-background/70 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-70 ${
                    locked
                      ? matches[i] === c.correct[i]
                        ? "border-success"
                        : "border-destructive"
                      : "border-border"
                  }`}
                >
                  <option value="">Select a definition…</option>
                  {c.definitions.map((d, k) => (
                    <option key={d} value={k}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
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
              <span className="font-semibold text-success">{c.answerLabel}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{c.explanation}</p>
            {wasCorrect && (
              <p className="mt-2 font-mono text-xs tracking-widest text-primary">
                +{points} POINTS
              </p>
            )}
            {flagUnlocked && index === TOTAL - 1 && (
              <div className="animate-pulse-glow mt-5 rounded-2xl border border-primary/50 bg-background/70 p-5 text-center">
                <p className="font-display text-lg font-black">🚩 FLAG UNLOCKED</p>
                <p className="text-tricolour mt-2 font-mono text-lg font-black break-all">
                  FLAG&#123;CYBOTIXX_FREEDOM&#125;
                </p>
              </div>
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
              Submit Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="rounded-xl bg-accent px-6 py-3 font-display text-sm font-bold tracking-widest text-accent-foreground uppercase transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {index === TOTAL - 1 ? "View Final Result →" : "Next Challenge →"}
            </button>
          )}
        </div>
      </div>
    </StageShell>
  );
}
