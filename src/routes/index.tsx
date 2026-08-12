import { createFileRoute, Link } from "@tanstack/react-router";
import { CyberBackdrop, Chakra } from "@/components/CyberBackdrop";
import { STAGES } from "@/lib/quiz-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CYBOTIXX — Code Freedom Hunt | Independence Day Cyber Challenge" },
      {
        name: "description",
        content:
          "Join CYBOTIXX Code Freedom Hunt: 5 stages, 50 challenges of coding, ciphers and cybersecurity for India's Independence Day.",
      },
      { property: "og:title", content: "CYBOTIXX — Code Freedom Hunt" },
      {
        property: "og:description",
        content:
          "Decode. Solve. Explore. Celebrate Freedom. An Independence Day special cyber & coding challenge.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <CyberBackdrop />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-16 text-center sm:py-24">
        <span className="glass rounded-full px-4 py-1.5 font-mono text-xs tracking-[0.3em] text-primary uppercase">
          15 August • Cyber Mission
        </span>

        <div className="relative mt-10 flex items-center justify-center">
          <div className="absolute h-52 w-52 rounded-full bg-primary/20 blur-3xl sm:h-72 sm:w-72" />
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full glass sm:h-52 sm:w-52">
            <div className="absolute inset-2 rounded-full bg-gradient-to-b from-primary/25 via-transparent to-accent/25" />
            <Chakra className="animate-chakra relative h-24 w-24 drop-shadow-[0_0_18px_var(--chakra)] sm:h-32 sm:w-32" />
          </div>
        </div>

        <h1 className="mt-10 text-4xl font-black tracking-tight sm:text-6xl">
          <span className="text-tricolour">WELCOME TO CYBOTIXX</span>
        </h1>
        <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-4xl">CODE FREEDOM HUNT</h2>
        <p className="mt-5 font-mono text-sm text-primary sm:text-base">
          Decode. Solve. Explore. Celebrate Freedom.
        </p>
        <p className="mt-2 max-w-xl text-base text-muted-foreground sm:text-lg">
          An Independence Day Special Cyber &amp; Coding Challenge
        </p>

        <Link
          to="/stage-1"
          className="animate-pulse-glow mt-10 inline-flex items-center gap-3 rounded-2xl border border-primary/50 bg-primary px-10 py-5 text-lg font-black tracking-widest text-primary-foreground uppercase transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          🇮🇳 Start Now
        </Link>
        <p className="mt-4 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Click to begin the Code Freedom Hunt
        </p>

        <div className="glass mt-8 rounded-full px-6 py-2 font-mono text-sm text-accent">
          5 Stages • 50 Challenges • Easy to Hard
        </div>

        <div className="mt-16 grid w-full gap-4 text-left sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((s) => (
            <div
              key={s.n}
              className="glass group relative overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: "var(--gradient-tricolour)" }}
              />
              <div className="font-mono text-xs tracking-[0.25em] text-primary">
                STAGE {s.n}
              </div>
              <div className="mt-2 font-display text-base font-bold">{s.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-4 font-mono text-[11px] text-accent">
                {s.n === 1 ? "● UNLOCKED" : "🔒 LOCKED"}
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-16 font-mono text-xs text-muted-foreground">
          CYBOTIXX FORUM • DEPARTMENT OF COMPUTER SCIENCE
        </footer>
      </div>
    </main>
  );
}
