export type StageResult = {
  completed: true;
  score: number;
  correct: number;
  total: number;
  accuracy: number;
  timeSeconds: number;
  hintsUsed?: number;
};

export type Stage1Result = StageResult;

const KEY = (n: number) => `cybotixx_stage${n}`;

export function readStage(n: number): StageResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY(n));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StageResult;
    return parsed?.completed ? parsed : null;
  } catch {
    return null;
  }
}

export function writeStage(n: number, result: StageResult) {
  if (typeof window === "undefined") return;
  const ls = window.localStorage;
  ls.setItem(KEY(n), JSON.stringify(result));
  ls.setItem(`stage${n}Completed`, "true");
  ls.setItem(`stage${n}Score`, String(result.score));
  ls.setItem(`stage${n}CorrectAnswers`, String(result.correct));
  ls.setItem(`stage${n}Accuracy`, String(result.accuracy));
  ls.setItem(`stage${n}CompletionTime`, formatTime(result.timeSeconds));
  if (result.hintsUsed !== undefined) ls.setItem(`stage${n}HintsUsed`, String(result.hintsUsed));
}

export function readStage1() {
  return readStage(1);
}

export function writeStage1(result: StageResult) {
  writeStage(1, result);
}

export function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function normalize(v: string) {
  return v.trim().replace(/\s+/g, " ").toUpperCase();
}
