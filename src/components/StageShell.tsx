import { CyberBackdrop, Chakra } from "@/components/CyberBackdrop";

export function StageShell({
  title,
  accent,
  subtitle,
  timer,
  children,
}: {
  title: string;
  accent: string;
  subtitle: string;
  timer?: string;
  children?: React.ReactNode;
}) {
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
          {title} <span className="text-primary">{accent}</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>

        {children}
      </div>
    </main>
  );
}

export function ProgressBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between font-mono text-xs tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, background: "var(--gradient-tricolour)" }}
        />
      </div>
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 font-display text-2xl font-black text-primary">{value}</p>
    </div>
  );
}

export function LockedStage({
  stage,
  message,
  to,
  backLabel,
}: {
  stage: string;
  message: string;
  to: string;
  backLabel: string;
}) {
  return (
    <div className="glass mx-auto mt-10 max-w-xl rounded-3xl p-8 text-center">
      <p className="font-display text-xl font-bold text-destructive">🔒 {stage} LOCKED</p>
      <p className="mt-3 text-muted-foreground">{message}</p>
      <a
        href={to}
        className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105"
      >
        {backLabel}
      </a>
    </div>
  );
}
