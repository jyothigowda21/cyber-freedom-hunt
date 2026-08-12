import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CyberBackdrop, Chakra } from "@/components/CyberBackdrop";
import { readStage1, type Stage1Result } from "@/lib/hunt-progress";

export const Route = createFileRoute("/stage-2")({
  head: () => ({
    meta: [
      { title: "Stage 2 — Freedom Puzzles | CYBOTIXX Code Freedom Hunt" },
      {
        name: "description",
        content:
          "Stage 2 of the CYBOTIXX Code Freedom Hunt: Freedom Puzzles, unlocked after completing the Stage 1 Freedom Quiz.",
      },
      { property: "og:title", content: "Stage 2 — Freedom Puzzles | CYBOTIXX" },
      {
        property: "og:description",
        content: "Logic under pressure. The next mission in the Code Freedom Hunt.",
      },
    ],
  }),
  component: Stage2,
});

function Stage2() {
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState<Stage1Result | null>(null);

  useEffect(() => {
    setSaved(readStage1());
    setHydrated(true);
  }, []);

  return (
    <main className="relative min-h-screen">
      <CyberBackdrop />
      <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-20 text-center">
        <Chakra className="animate-chakra h-16 w-16" />
        <p className="text-tricolour mt-6 font-display text-xl font-black">🇮🇳 CYBOTIXX</p>
        <h1 className="mt-2 font-display text-3xl font-black">STAGE 2 — FREEDOM PUZZLES</h1>

        {hydrated && !saved ? (
          <div className="glass mt-8 rounded-3xl p-8">
            <p className="font-display text-lg font-bold text-destructive">🔒 STAGE LOCKED</p>
            <p className="mt-3 text-muted-foreground">
              Complete Stage 1 — Freedom Quiz before accessing this mission.
            </p>
            <Link
              to="/stage-1"
              className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase"
            >
              Go to Stage 1 →
            </Link>
          </div>
        ) : (
          <div className="glass mt-8 rounded-3xl p-8">
            <p className="font-mono text-sm tracking-widest text-accent">● ACCESS GRANTED</p>
            <p className="mt-3 text-muted-foreground">
              Freedom Puzzles are being deployed. Stand by, agent — your Stage 1 score of{" "}
              <span className="font-bold text-primary">{saved?.score ?? 0}/100</span> is secured.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
