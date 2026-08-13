import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

const LOCK_KEY = "cybotixx_competition_locked";

function isCompetitionRoute(pathname: string) {
  return /^\/stage-[1-5]\/?$/.test(pathname);
}

export function CompetitionGuard({ children }: { children: ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isCompetition = isCompetitionRoute(pathname);

  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!isCompetition) {
      setLocked(false);
      return;
    }

    // Check whether this browser was previously locked.
    if (window.localStorage.getItem(LOCK_KEY) === "true") {
      setLocked(true);
      return;
    }

    const lockCompetition = () => {
      // Lock ONLY this browser's local storage.
      window.localStorage.setItem(LOCK_KEY, "true");

      // This unmounts the stage and therefore stops its timer.
      setLocked(true);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        lockCompetition();
      }
    };

    const handleWindowBlur = () => {
      lockCompetition();
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isCompetition]);

  if (isCompetition && locked) {
    return <CompetitionLockedScreen />;
  }

  return <>{children}</>;
}

function CompetitionLockedScreen() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.12),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-destructive/30 bg-card/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-destructive/40 bg-destructive/10 text-4xl">
          🔒
        </div>

        <p className="font-mono text-xs tracking-[0.35em] text-destructive uppercase">
          CYBOTIXX • SECURITY ALERT
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          COMPETITION LOCKED
        </h1>

        <div className="mx-auto mt-6 h-px w-24 bg-[var(--gradient-tricolour)]" />

        <p className="mt-6 text-base leading-7 text-muted-foreground">
          You left the Cyber Freedom Hunt competition window.
        </p>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Your attempt has been locked due to a tab or window switch.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-5">
          <p className="font-mono text-sm font-semibold text-accent">
            Please contact the event coordinator.
          </p>
        </div>

        <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          CODE FREEDOM HUNT • ATTEMPT TERMINATED
        </p>
      </div>
    </main>
  );
}