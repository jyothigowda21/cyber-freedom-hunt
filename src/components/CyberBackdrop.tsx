import { useMemo } from "react";

const SYMBOLS = ["{ }", "</>", "01", "#!", "⛨", "🔒", "0x1F", "AES", "SHA", "λ", "$_", "1010"];

export function CyberBackdrop() {
  const bits = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        delay: (i * 1.37) % 14,
        duration: 14 + ((i * 3) % 12),
        size: 10 + ((i * 5) % 12),
        text: SYMBOLS[i % SYMBOLS.length],
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 grid-circuit opacity-40" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent animate-scan" />
      {bits.map((b) => (
        <span
          key={b.id}
          className="absolute bottom-[-10vh] font-mono text-accent/40 animate-float"
          style={{
            left: `${b.left}%`,
            fontSize: `${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          {b.text}
        </span>
      ))}
    </div>
  );
}

export function Chakra({ className = "" }: { className?: string }) {
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Ashoka Chakra">
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="var(--chakra)"
        strokeWidth="3"
        opacity="0.9"
      />
      <circle cx="50" cy="50" r="6" fill="var(--chakra)" />
      {spokes.map((a) => (
        <line
          key={a}
          x1="50"
          y1="50"
          x2="50"
          y2="6"
          stroke="var(--chakra)"
          strokeWidth="1.6"
          opacity="0.8"
          transform={`rotate(${a} 50 50)`}
        />
      ))}
    </svg>
  );
}
