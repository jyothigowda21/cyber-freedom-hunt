export type Stage1Result = {
  completed: true;
  score: number;
  correct: number;
  total: number;
  accuracy: number;
  timeSeconds: number;
};

const KEY = "cybotixx_stage1";

export function readStage1(): Stage1Result | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stage1Result;
    return parsed?.completed ? parsed : null;
  } catch {
    return null;
  }
}

export function writeStage1(result: Stage1Result) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(result));
  window.localStorage.setItem("stage1Completed", "true");
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
