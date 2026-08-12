export type Puzzle = {
  n: number;
  title: string;
  kind: "number" | "letter" | "text" | "match" | "order";
  prompt: string;
  display?: string;
  answer: string;
  explanation: string;
  pairs?: { left: string; right: string; correct: string }[];
  options?: string[];
};

export const STAGE2_PUZZLES: Puzzle[] = [
  {
    n: 1,
    title: "Number Pattern",
    kind: "number",
    display: "2, 4, 8, 16, ?",
    prompt: "What number comes next?",
    answer: "32",
    explanation: "Each number is multiplied by 2.",
  },
  {
    n: 2,
    title: "Letter Shift",
    kind: "letter",
    display: "A → C\nB → D\nC → E\nD → ?",
    prompt: "What letter replaces the question mark?",
    answer: "F",
    explanation: "Each letter is shifted two positions forward in the alphabet.",
  },
  {
    n: 3,
    title: "Cyber Word Scramble",
    kind: "text",
    display: "R E H A C K",
    prompt: "Rearrange these letters to form a cybersecurity-related word.",
    answer: "HACKER",
    explanation: "The letters can be rearranged to form the word HACKER.",
  },
  {
    n: 4,
    title: "Binary Basics",
    kind: "text",
    display: "01001000 01001001",
    prompt: "Convert this binary sequence into text.",
    answer: "HI",
    explanation: "The binary values represent the ASCII characters H and I.",
  },
  {
    n: 5,
    title: "Missing Number",
    kind: "number",
    display: "3, 6, 11, 18, 27, ?",
    prompt: "Find the missing number.",
    answer: "38",
    explanation: "The differences are +3, +5, +7, +9, +11. Therefore 27 + 11 = 38.",
  },
  {
    n: 6,
    title: "Cyber Match",
    kind: "match",
    prompt: "Match each item with the correct definition.",
    answer: "1→B, 2→A, 3→C, 4→D",
    explanation:
      "A firewall controls network access, antivirus stops malicious software, a password authenticates a user and phishing tricks users into revealing information.",
    pairs: [
      { left: "Firewall", right: "", correct: "B" },
      { left: "Antivirus", right: "", correct: "A" },
      { left: "Password", right: "", correct: "C" },
      { left: "Phishing", right: "", correct: "D" },
    ],
    options: [
      "A. Protects against malicious software",
      "B. Helps prevent unauthorized network access",
      "C. Secret information used for authentication",
      "D. Tricks users into revealing sensitive information",
    ],
  },
  {
    n: 7,
    title: "Odd One Out",
    kind: "text",
    display: "Python    Java    C++    HTML",
    prompt: "Which one is different from the others?",
    answer: "HTML",
    explanation: "Python, Java and C++ are programming languages. HTML is a markup language.",
  },
  {
    n: 8,
    title: "Logical Sequence",
    kind: "number",
    display: "START ↓ 2 ↓ 4 ↓ 8 ↓ ? ↓ 32",
    prompt: "What number should replace the question mark?",
    answer: "16",
    explanation: "Each number is multiplied by 2.",
  },
  {
    n: 9,
    title: "Hidden Cyber Word",
    kind: "text",
    display:
      "“Students should always CHECK links before clicking them and verify the sender of suspicious messages.”",
    prompt: "Find the cybersecurity-related word hidden in the sentence.",
    answer: "CHECK",
    explanation:
      "Verifying — checking — a link before clicking it is a core safe-browsing habit. The hidden word is CHECK.",
  },
  {
    n: 10,
    title: "Final Logic Puzzle",
    kind: "number",
    display:
      "682 — one digit correct, correct position\n614 — one digit correct, wrong position\n206 — two digits correct, both wrong positions\n738 — no digit correct\n780 — one digit correct, wrong position",
    prompt: "A cyber locker has a 3-digit code. Find the code.",
    answer: "042",
    explanation:
      "From 738, the digits 7, 3 and 8 are excluded. From 780, 0 is present but misplaced. From 206, 0 and 2 are present but misplaced. From 682, 2 is correct in the third position. From 614, 4 is present but misplaced. The code is 042.",
  },
];
