export type MatchPair = { term: string; definition: string };

export type FinalChallenge = {
  n: number;
  title: string;
  instruction: string;
  question: string;
  content: string[];
  contentLabel: string;
  clue: string;
  explanation: string;
  answerLabel: string;
} & (
  | { kind: "text"; accept: string[]; placeholder: string }
  | { kind: "single"; options: string[]; correct: number }
  | { kind: "match"; terms: string[]; definitions: string[]; correct: number[] }
);

export const STAGE5_CHALLENGES: FinalChallenge[] = [
  {
    n: 1,
    kind: "text",
    title: "🧠 Final Mission 1 — Pattern Lock",
    instruction: "Study the sequence and find the missing number.",
    question: "What number comes next?",
    contentLabel: "pattern_lock.txt",
    content: ["5, 10, 15, 20, ?"],
    placeholder: "Enter the next number",
    accept: ["25"],
    answerLabel: "25",
    clue: "Look at the difference between consecutive numbers.",
    explanation: "Each number increases by 5, so the next value is 25.",
  },
  {
    n: 2,
    kind: "text",
    title: "💻 Final Mission 2 — Binary Key",
    instruction: "Convert the binary values into text.",
    question: "What text do these binary values represent?",
    contentLabel: "binary_key.bin",
    content: ["01000011 01011001"],
    placeholder: "Enter the decoded text",
    accept: ["CY"],
    answerLabel: "CY",
    clue: "Each group contains 8 bits and represents one character.",
    explanation: "01000011 is 67 (C) and 01011001 is 89 (Y) in ASCII, giving CY.",
  },
  {
    n: 3,
    kind: "text",
    title: "🔐 Final Mission 3 — Secret Shift",
    instruction: "Decode the message using a Caesar shift.",
    question: "What is the original word?",
    contentLabel: "secret_shift.txt",
    content: ["FRGH"],
    placeholder: "Enter the decoded word",
    accept: ["CODE"],
    answerLabel: "CODE",
    clue: "Try moving every letter 3 positions backward.",
    explanation: "Applying a Caesar shift of -3 converts FRGH into CODE.",
  },
  {
    n: 4,
    kind: "single",
    title: "🛡️ Final Mission 4 — Safety Check",
    instruction: "Read the scenario and choose the correct response.",
    question: "What should you do?",
    contentLabel: "incoming_message.txt",
    content: ["\"You receive a message asking for your OTP and password.\""],
    options: [
      "Share them because the sender sounds official",
      "Do not share them with anyone",
      "Share only the OTP",
      "Share only the password",
    ],
    correct: 1,
    answerLabel: "DO NOT SHARE THEM",
    clue: "Think about whether OTPs and passwords are meant to be shared.",
    explanation:
      "Passwords and OTPs are confidential authentication information and should never be shared.",
  },
  {
    n: 5,
    kind: "text",
    title: "💻 Final Mission 5 — What Will the Code Print?",
    instruction: "Read the simple Python program and predict the output.",
    question: "What will be printed?",
    contentLabel: "mission5.py",
    content: ["x = 5", "y = 3", "print(x + y)"],
    placeholder: "Enter the output",
    accept: ["8"],
    answerLabel: "8",
    clue: "Calculate the value of x + y.",
    explanation: "The program adds x and y, so it prints 8.",
  },
  {
    n: 6,
    kind: "text",
    title: "🔎 Final Mission 6 — Find the Word",
    instruction: "One cybersecurity-related word is hidden in the message below.",
    question: "What cybersecurity-related word appears in the message?",
    contentLabel: "hidden_message.txt",
    content: ["\"Always check links before clicking them.", ' CYBER safety starts with awareness."'],
    placeholder: "Enter the word",
    accept: ["CYBER"],
    answerLabel: "CYBER",
    clue: "Look carefully through the sentence for a word related to cybersecurity.",
    explanation: "The keyword written in capitals is CYBER.",
  },
  {
    n: 7,
    kind: "text",
    title: "🔑 Final Mission 7 — Password Lock",
    instruction: "Use the recovered clues to reconstruct the password.",
    question: "What is the password?",
    contentLabel: "password_clues.txt",
    content: [
      "- It contains 5 characters.",
      "- It begins with C.",
      "- It ends with R.",
      "- It is related to cybersecurity.",
      "- It contains YBE in the middle.",
    ],
    placeholder: "Enter the password",
    accept: ["CYBER"],
    answerLabel: "CYBER",
    clue: "Think of a five-letter cybersecurity-related word beginning with C.",
    explanation: "C + YBE + R spells CYBER, a five-letter cybersecurity word.",
  },
  {
    n: 8,
    kind: "match",
    title: "🧩 Final Mission 8 — Match the Security Tools",
    instruction: "Match each security term with what it does.",
    question: "Match every term to its correct definition.",
    contentLabel: "security_glossary.txt",
    content: ["Firewall", "Antivirus", "Password", "Phishing"],
    terms: ["Firewall", "Antivirus", "Password", "Phishing"],
    definitions: [
      "Blocks unauthorized network traffic",
      "Detects malicious software",
      "Helps authenticate a user",
      "Tricks users into revealing information",
    ],
    correct: [0, 1, 2, 3],
    answerLabel:
      "Firewall → Blocks unauthorized network traffic · Antivirus → Detects malicious software · Password → Helps authenticate a user · Phishing → Tricks users into revealing information",
    clue: "Think about what each security term is designed to do.",
    explanation:
      "A firewall filters network traffic, an antivirus detects malicious software, a password authenticates a user, and phishing tricks users into revealing information.",
  },
  {
    n: 9,
    kind: "text",
    title: "🧩 Final Mission 9 — Combine the Clues",
    instruction: "Three clues describe the same thing. Identify it.",
    question: "What am I?",
    contentLabel: "combined_clues.txt",
    content: [
      'Clue 1: "I am a programming language."',
      'Clue 2: "I am commonly used in AI and data science."',
      'Clue 3: "My name is also associated with a type of snake."',
    ],
    placeholder: "Enter your answer",
    accept: ["PYTHON"],
    answerLabel: "PYTHON",
    clue: "Think of a popular programming language that is also a snake.",
    explanation:
      "Python is a popular programming language widely used in AI, automation and data science.",
  },
  {
    n: 10,
    kind: "text",
    title: "🚩 Final Mission 10 — Unlock the Freedom Flag",
    instruction: "Combine the clues and enter the final event code.",
    question: "What is the final event code?",
    contentLabel: "final_code.txt",
    content: [
      "Clue 1: The Independence Day month is the 8th month.",
      "Clue 2: India celebrates Independence Day on the 15th.",
      "Clue 3: CYBOTIXX is conducting this event.",
    ],
    placeholder: "Enter the final event code",
    accept: ["CYBOTIXX0815"],
    answerLabel: "CYBOTIXX0815",
    clue: "Put the event name first, then the month number, then the day number.",
    explanation:
      "The event name CYBOTIXX combined with 08 (August) and 15 (Independence Day) gives CYBOTIXX0815.",
  },
];
