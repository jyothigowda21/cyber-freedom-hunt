export type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const STAGE1_QUESTIONS: Question[] = [
  {
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Utility",
      "Computer Processing User",
    ],
    answer: 0,
    explanation:
      "The CPU is the primary processor responsible for executing instructions and performing calculations.",
  },
  {
    question: "Which of the following is the strongest password?",
    options: ["india123", "password2026", "Jyothi123", "C@7m!Q9#xL2"],
    answer: 3,
    explanation:
      "A strong password uses a combination of uppercase and lowercase letters, numbers and special characters.",
  },
  {
    question: "What does HTTPS provide compared with HTTP?",
    options: [
      "Faster internet speed",
      "Encrypted communication",
      "More storage",
      "Free internet access",
    ],
    answer: 1,
    explanation:
      "HTTPS uses encryption, typically through TLS, to protect data exchanged between a browser and website.",
  },
  {
    question: "Which of these is a programming language?",
    options: ["Python", "HTML", "Wi-Fi", "USB"],
    answer: 0,
    explanation:
      "Python is a general-purpose programming language widely used in software development, automation, data science and AI.",
  },
  {
    question: "What is phishing?",
    options: [
      "A method of increasing internet speed",
      "A cyberattack that tricks users into revealing sensitive information",
      "A programming technique",
      "A method of compressing files",
    ],
    answer: 1,
    explanation:
      "Phishing commonly uses fake emails, messages or websites to trick people into providing passwords, financial information or other sensitive data.",
  },
  {
    question: "Which device connects different networks and forwards data between them?",
    options: ["Keyboard", "Monitor", "Router", "Printer"],
    answer: 2,
    explanation: "A router connects networks and forwards data packets toward their destination.",
  },
  {
    question: "What does AI stand for?",
    options: [
      "Automated Internet",
      "Artificial Intelligence",
      "Advanced Information",
      "Applied Internet",
    ],
    answer: 1,
    explanation:
      "Artificial Intelligence refers to computer systems designed to perform tasks that normally require human-like intelligence.",
  },
  {
    question: "Which Indian organization is responsible for India's space programme?",
    options: ["DRDO", "ISRO", "RBI", "UIDAI"],
    answer: 1,
    explanation:
      "ISRO stands for Indian Space Research Organisation and is responsible for India's space programme.",
  },
  {
    question: "India celebrates Independence Day on:",
    options: ["26 January", "15 August", "2 October", "14 November"],
    answer: 1,
    explanation:
      "India celebrates Independence Day every year on 15 August, commemorating independence from British rule in 1947.",
  },
  {
    question:
      "Which of the following is the safest action when you receive a suspicious email asking for your password?",
    options: [
      "Click the link immediately",
      "Reply with your password",
      "Verify the sender through an official channel and report/delete the message",
      "Forward it to everyone",
    ],
    answer: 2,
    explanation:
      "Never provide passwords through suspicious links or messages. Verify requests through trusted official channels.",
  },
];

export const STAGES = [
  { n: 1, name: "Freedom Quiz", desc: "Tech, cyber & freedom trivia", to: "/stage-1" },
  { n: 2, name: "Freedom Puzzles", desc: "Logic under pressure", to: "/stage-2" },
  { n: 3, name: "Break the Cipher", desc: "Decrypt the classified message", to: "/stage-3" },
  { n: 4, name: "Cyber Detective", desc: "Trace the intrusion", to: "/stage-4" },
  { n: 5, name: "Freedom Finale", desc: "The final mission", to: "/stage-5" },
] as const;
