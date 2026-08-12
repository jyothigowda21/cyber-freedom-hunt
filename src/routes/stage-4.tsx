import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { readStage, type StageResult } from "@/lib/hunt-progress";
import { LockedStage, StageShell } from "@/components/StageShell";

export const Route = createFileRoute("/stage-4")({
  head: () => ({
    meta: [
      { title: "Stage 4 — Cyber Detective | CYBOTIXX Code Freedom Hunt" },
      {
        name: "description",
        content:
          "Stage 4 of the CYBOTIXX Code Freedom Hunt: Cyber Detective, unlocked after breaking every cipher in Stage 3.",
      },
      { property: "og:title", content: "Stage 4 — Cyber Detective | CYBOTIXX" },
      {
        property: "og:description",
        content: "Investigate the evidence. Trace the intrusion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Stage4,
});

function Stage4() {
  const [hydrated, setHydrated] = useState(false);
  const [stage3, setStage3] = useState<StageResult | null>(null);

  useEffect(() => {
    setStage3(readStage(3));
    setHydrated(true);
  }, []);

  const shellProps = {
    title: "STAGE 4 —",
    accent: "CYBER DETECTIVE",
    subtitle: "Investigate the evidence. Trace the intrusion.",
  };

  if (!hydrated) return <StageShell {...shellProps} />;

  return (
    <StageShell {...shellProps}>
      {!stage3 ? (
        <LockedStage
          stage="STAGE 4"
          message="Complete Stage 3 to unlock the next mission."
          to="/stage-3"
          backLabel="← Return to Stage 3"
        />
      ) : (
        <div className="glass mx-auto mt-10 max-w-xl rounded-3xl p-8 text-center">
          <p className="font-mono text-sm tracking-widest text-accent">● ACCESS GRANTED</p>
          <p className="mt-3 text-muted-foreground">
            The investigation files are being prepared, agent. Your Stage 3 score of{" "}
            <span className="font-bold text-primary">{stage3.score}/100</span> is secured.
          </p>
        </div>
      )}
    </StageShell>
  );
}
