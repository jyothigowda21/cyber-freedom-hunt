import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { STAGE3_CHALLENGES } from "@/lib/cipher-data";
import {
  formatTime,
  normalize,
  readStage,
  writeStage,
  type StageResult,
} from "@/lib/hunt-progress";
import { LockedStage, ProgressBar, Stat, StageShell } from "@/components/StageShell";

export const Route = createFileRoute("/stage-3")({
  head: () => ({
    meta: [
      { title: "Stage 3 — Break the Cipher | CYBOTIXX Code Freedom Hunt" },
      {
        name: "description",
        content:
          "Stage 3 of the CYBOTIXX Code Freedom Hunt: ten cryptography challenges covering Caesar, ROT13, Atbash, Base64, binary, hex and Morse decoding.",
      },
      { property: "og:title", content: "Stage 3 — Break the Cipher | CYBOTIXX" },
      {
        property: "og:description",
        content: "Every message is hidden for a reason. Decode it. Discover it. Move forward.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Stage3,
});

const TOTAL = STAGE3_CHALLENGES.length;

function Stage3() {
  const [hydrated, setHydrated] = useState(false);
  const [stage2, setStage2] = useState<StageResult | null>(null);
  const [saved, setSaved] = useState<StageResult | null>(null);

  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [hintLevel, setHintLevel] = useState(0);
  const [locked, setLocked] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const finalTime = useRef(0);

  useEffect(() => {
    setStage2(readStage(2));
    setSaved(readStage(3));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || saved || finished || !stage2) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [hydrated, saved, finished, stage2]);

  const shellProps = {
    title: "STAGE 3 —",
    accent: "BREAK THE CIPHER",
    subtitle: "Every message is hidden for a reason. Decode it. Discover it. Move forward.",
  };

  if (!hydrated) return <StageShell {...shellProps} />;

  if (!stage2) {
    return (
      <StageShell {...shellProps}>
        <LockedStage
          stage="STAGE 3"
          message="Complete Stage 2 to unlock the next mission."
          to="/stage-2"
          backLabel="← Return to Stage 2"
        />
      </StageShell>
    );
  }

  if (saved) {
    return (
      <StageShell {...shellProps}>
        <div className="glass mx-auto mt-10 max-w-xl rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-accent">✓ STAGE 3 ALREADY COMPLETED</h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground">Your Stage 3 score</p>
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
          <h2 className="text-3xl font-black">🎉 STAGE 3 COMPLETED!</h2>
          <p className="text-tricolour mt-1 font-display text-lg font-bold">
            🔐 BREAK THE CIPHER — COMPLETE
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Stat label="Your Score" value={`${score} / 100`} />
            <Stat label="Correct Challenges" value={`${correctCount} / ${TOTAL}`} />
            <Stat label="Hints Used" value={`${hintsUsed}`} />
            <Stat label="Accuracy" value={`${Math.round((correctCount / TOTAL) * 100)}%`} />
            <Stat label="Time Taken" value={formatTime(finalTime.current)} />
          </div>
          <p className="mt-6 font-mono text-sm tracking-widest text-accent">
            ✓ STAGE 3 — COMPLETED
          </p>
          <p className="mt-4 text-muted-foreground">
            You broke the codes and uncovered the hidden messages. The next mission awaits.
          </p>
          <ContinueButton />
        </div>
      </StageShell>
    );
  }

  const c = STAGE3_CHALLENGES[index]!;
  const progress = ((index + (locked ? 1 : 0)) / TOTAL) * 100;
  const points = hintLevel === 0 ? 10 : hintLevel === 1 ? 8 : 5;

  const openHint = () => {
    if (locked || hintLevel >= 2) return;
    setHintLevel((h) => h + 1);
    setHintsUsed((h) => h + 1);
  };

  const submit = () => {
    if (locked) return;
    if (!value.trim()) {
      setError("Please enter your decoded plaintext before submitting.");
      return;
    }
    const ok = normalize(value) === normalize(c.answer);
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
      writeStage(3, {
        completed: true,
        score,
        correct: correctCount,
        total: TOTAL,
        accuracy: Math.round((correctCount / TOTAL) * 100),
        timeSeconds: elapsed,
        hintsUsed,
      });
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setValue("");
    setHintLevel(0);
    setLocked(false);
    setError("");
  };

  return (
    <StageShell {...shellProps} timer={formatTime(elapsed)}>
      <ProgressBar label={`CHALLENGE ${index + 1} OF ${TOTAL}`} value={progress} />

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
            <span className="ml-2">cipher_stream.txt</span>
          </div>
          <pre className="overflow-x-auto px-4 py-5 font-mono text-base break-words whitespace-pre-wrap text-accent sm:text-lg">
            {c.cipher}
          </pre>
        </div>

        {c.clue && (
          <p className="mt-3 font-mono text-xs tracking-wide text-muted-foreground">
            CLUE: {c.clue}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={openHint}
            disabled={locked || hintLevel >= 2}
            className="rounded-xl border border-accent/60 bg-accent/10 px-4 py-2 font-mono text-xs tracking-widest text-accent uppercase transition-colors hover:bg-accent/20 disabled:opacity-50"
          >
            💡 {hintLevel === 0 ? "Show Hint 1" : hintLevel === 1 ? "Show Hint 2" : "No more hints"}
          </button>
          {hintLevel > 0 && (
            <span className="font-mono text-xs text-muted-foreground">
              💡 Hint used: {hintLevel === 1 ? "-2" : "-5"} points (worth {points} pts)
            </span>
          )}
        </div>

        {hintLevel > 0 && (
          <div className="mt-4 grid gap-2">
            <p className="rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm">
              <span className="font-mono text-xs tracking-widest text-accent">HINT 1 — </span>
              {c.hint1}
            </p>
            {hintLevel > 1 && (
              <p className="rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm">
                <span className="font-mono text-xs tracking-widest text-accent">HINT 2 — </span>
                {c.hint2}
              </p>
            )}
          </div>
        )}

        <input
          type="text"
          disabled={locked}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Type the decoded plaintext"
          className="mt-6 w-full rounded-xl border border-border bg-background/60 px-4 py-3 font-mono text-base tracking-widest uppercase focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-70"
        />

        {error && <p className="mt-4 text-sm font-semibold text-destructive">{error}</p>}

        {locked && (
          <div className="mt-6 rounded-2xl border border-border bg-background/50 p-5">
            <p
              className={`font-display text-lg font-bold ${wasCorrect ? "text-success" : "text-destructive"}`}
            >
              {wasCorrect ? "✓ CIPHER CRACKED!" : "✗ INCORRECT"}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-mono text-muted-foreground">
                {wasCorrect ? "Plaintext: " : "Correct Plaintext: "}
              </span>
              <span className="font-semibold text-success">{c.answer}</span>
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
              Submit Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="rounded-xl bg-accent px-6 py-3 font-display text-sm font-bold tracking-widest text-accent-foreground uppercase transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {index === TOTAL - 1 ? "Finish Stage 3 →" : "Next Challenge →"}
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
      to="/stage-4"
      className="animate-pulse-glow mt-8 inline-flex rounded-2xl bg-primary px-8 py-4 font-display text-sm font-black tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105"
    >
      Continue to Stage 4 →
    </Link>
  );
}
