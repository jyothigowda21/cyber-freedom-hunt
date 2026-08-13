export type EvidenceBlock = {
  label: string;
  lines: string[];
};

export type CaseItem = {
  n: number;
  title: string;
  instruction: string;
  question: string;
  evidence: EvidenceBlock[];
  clue: string;
  explanation: string;
  answerLabel: string;
} & (
  | { kind: "text"; accept: string[] }
  | { kind: "single"; options: string[]; correct: number }
  | { kind: "multi"; options: string[]; correct: number[] }
);

export const STAGE4_CASES: CaseItem[] = [
  {
    n: 1,
    kind: "text",
    title: "📧 Case 1 — Suspicious Email",
    instruction: "Read the intercepted email carefully and name the security problem in one word.",
    question: "What is the main security problem with this message?",
    evidence: [
      {
        label: "inbox_evidence.eml",
        lines: [
          "From:    security-alert@college-login.example",
          "Subject: URGENT! Your account will be deleted today!",
          "",
          "Dear Student,",
          "",
          "Your account will be permanently deleted in 30 minutes.",
          "Click the link below and enter your username and password",
          "to verify your account.",
          "",
          "[ Verify Now ]",
          "",
          "Thank you,",
          "IT Support",
        ],
      },
    ],
    clue: "Look for signs that someone is trying to trick you into revealing sensitive information.",
    accept: ["PHISHING", "PHISHING ATTACK", "PHISHING EMAIL", "IT IS PHISHING"],
    answerLabel: "PHISHING",
    explanation:
      "The message uses urgency and asks for login credentials through a suspicious link. These are common phishing indicators.",
  },
  {
    n: 2,
    kind: "single",
    title: "🔐 Case 2 — Password Inspector",
    instruction: "Four passwords were recovered from a student notebook. Select the strongest one.",
    question: "Which password is the strongest?",
    evidence: [
      {
        label: "recovered_passwords.txt",
        lines: ["A. password123", "B. india2026", "C. Qwerty123", "D. R@7kL!9p#X2"],
      },
    ],
    options: ["password123", "india2026", "Qwerty123", "R@7kL!9p#X2"],
    correct: 3,
    clue: "Look for a combination of different types of characters and avoid common words.",
    answerLabel: "D. R@7kL!9p#X2",
    explanation:
      "A strong password should be long and difficult to guess, using a mixture of uppercase, lowercase, numbers and symbols.",
  },
  {
    n: 3,
    kind: "single",
    title: "🌐 Case 3 — URL Detective",
    instruction: "Four links appeared in a student's browser history. Identify the most suspicious one.",
    question: "Which URL is the most suspicious?",
    evidence: [
      {
        label: "browser_history.log",
        lines: [
          "A. https://www.google.com",
          "B. https://www.college.edu",
          "C. http://college-login.verify-account.example",
          "D. https://www.isro.gov.in",
        ],
      },
    ],
    options: [
      "https://www.google.com",
      "https://www.college.edu",
      "http://college-login.verify-account.example",
      "https://www.isro.gov.in",
    ],
    correct: 2,
    clue: "Look carefully at the domain name and the words placed before and after it.",
    answerLabel: "C. http://college-login.verify-account.example",
    explanation:
      "The suspicious URL hides a login-looking name inside an unrelated domain and does not use HTTPS. Always verify the real domain before entering credentials.",
  },
  {
    n: 4,
    kind: "text",
    title: "📋 Case 4 — Login Detective",
    instruction: "Analyse the server login log and describe the suspicious activity.",
    question: "What suspicious activity should the detective investigate?",
    evidence: [
      {
        label: "auth_server.log",
        lines: [
          "10:20 — Student login successful",
          "10:22 — Student login successful",
          "10:24 — Student login failed",
          "10:24 — Student login failed",
          "10:24 — Student login failed",
          "10:25 — Student login successful",
        ],
      },
    ],
    accept: [
      "MULTIPLE FAILED LOGIN ATTEMPTS",
      "MULTIPLE FAILED LOGINS",
      "REPEATED FAILED LOGIN ATTEMPTS",
      "FAILED LOGIN ATTEMPTS",
      "MANY FAILED LOGIN ATTEMPTS",
      "MULTIPLE FAILED ATTEMPTS",
    ],
    answerLabel: "MULTIPLE FAILED LOGIN ATTEMPTS",
    clue: "Look for repeated unsuccessful attempts happening close together.",
    explanation:
      "Several failed logins within the same minute, followed by a success, may indicate someone repeatedly guessing a password.",
  },
  {
    n: 5,
    kind: "multi",
    title: "🛡️ Case 5 — Safe or Unsafe?",
    instruction: "Review the daily habits below and select ALL the safe actions.",
    question: "Which of these actions are SAFE?",
    evidence: [
      {
        label: "habit_report.txt",
        lines: [
          "1. Using the same password everywhere",
          "2. Enabling two-factor authentication",
          "3. Clicking unknown links",
          "4. Sharing OTPs with friends",
          "5. Updating software regularly",
        ],
      },
    ],
    options: [
      "Using the same password everywhere",
      "Enabling two-factor authentication",
      "Clicking unknown links",
      "Sharing OTPs with friends",
      "Updating software regularly",
    ],
    correct: [1, 4],
    clue: "Choose actions that make it harder for attackers to access your accounts.",
    answerLabel: "2. Enabling two-factor authentication  +  5. Updating software regularly",
    explanation:
      "Two-factor authentication adds a second lock to your account, and regular updates fix known security holes.",
  },
  {
    n: 6,
    kind: "single",
    title: "🎭 Case 6 — The Fake Friend",
    instruction: "An unknown person messages a student. Decide the correct response.",
    question: "What should you do?",
    evidence: [
      {
        label: "chat_transcript.txt",
        lines: [
          "Unknown Person:",
          '"Hey! I\'m your classmate. I lost access to my account.',
          ' Can you send me the OTP you just received?',
          ' I need it urgently."',
        ],
      },
    ],
    options: [
      "Send the OTP because they sound urgent",
      "Do not share the OTP with anyone",
      "Share the OTP only if they know your name",
      "Send your password instead of the OTP",
    ],
    correct: 1,
    clue: "Ask yourself whether an OTP should be shared with another person.",
    answerLabel: "DO NOT SHARE THE OTP",
    explanation:
      "OTP codes are private authentication information and should never be shared, even with someone claiming to be a friend.",
  },
  {
    n: 7,
    kind: "single",
    title: "🦠 Case 7 — Suspicious Download",
    instruction: "A pop-up appears on a fictional website. Choose the safest action.",
    question: "What should you do?",
    evidence: [
      {
        label: "popup_capture.html",
        lines: [
          "CONGRATULATIONS!",
          "You have won a free smartphone!",
          "Download this file immediately:",
          "FreePhonePrize.exe",
        ],
      },
    ],
    options: [
      "Download and run the file quickly before the offer ends",
      "Do not download the file",
      "Download it and share it with classmates",
      "Disable the antivirus, then download it",
    ],
    correct: 1,
    clue: "Unexpected prizes and unknown executable files should make you cautious.",
    answerLabel: "DO NOT DOWNLOAD THE FILE",
    explanation:
      "Unknown executable (.exe) files can contain malware. Never download or run files from unexpected prize pop-ups.",
  },
  {
    n: 8,
    kind: "text",
    title: "🔒 Case 8 — Privacy Detective",
    instruction: "Read the fictional social media post and describe the biggest concern.",
    question: "What is the biggest security concern?",
    evidence: [
      {
        label: "social_post.txt",
        lines: [
          "Going on vacation for 10 days!",
          "My house will be empty.",
          "Here is my exact address:",
          "42 Chandragupta Lane, Sample Nagar (fictional)",
          "And here is my travel schedule...",
        ],
      },
    ],
    accept: [
      "SHARING TOO MUCH PERSONAL INFORMATION",
      "TOO MUCH PERSONAL INFORMATION",
      "OVERSHARING PERSONAL INFORMATION",
      "SHARING PERSONAL INFORMATION PUBLICLY",
      "OVERSHARING",
    ],
    answerLabel: "SHARING TOO MUCH PERSONAL INFORMATION",
    clue: "Think about what information a stranger could learn from this post.",
    explanation:
      "Publicly posting your address and travel dates tells strangers exactly when your home is empty. Share less, and share later.",
  },
  {
    n: 9,
    kind: "multi",
    title: "🚩 Case 9 — Find the Red Flag",
    instruction: "Select the THREE suspicious elements in this message.",
    question: "Which three lines are the red flags?",
    evidence: [
      {
        label: "message_evidence.txt",
        lines: [
          "Your college account needs verification.",
          "We noticed unusual activity.",
          "Please click this link immediately.",
          "Enter your password and OTP.",
          "Do not tell anyone about this message.",
        ],
      },
    ],
    options: [
      "Urgent language pressuring you to act immediately",
      "The message mentions a college account",
      "A request for your password and OTP",
      "A suspicious link you are told to click",
      "The message is written in English",
    ],
    correct: [0, 2, 3],
    clue: "Look for pressure, requests for sensitive information, and unusual instructions.",
    answerLabel: "Urgent language  +  Request for password/OTP  +  Suspicious link",
    explanation:
      "Urgency, credential requests, suspicious links and secrecy instructions are classic warning signs of phishing and social engineering.",
  },
  {
    n: 10,
    kind: "text",
    title: "🚨 Case 10 — The Final Case",
    instruction: "Combine all four pieces of evidence and name the attack type in one word.",
    question: "What type of attack is most likely being attempted?",
    evidence: [
      {
        label: "evidence_01_email.eml",
        lines: ["\"Your account will be locked in 10 minutes.", ' Verify your password here."'],
      },
      {
        label: "evidence_02_url.txt",
        lines: ["http://student-login.verify-account.example"],
      },
      {
        label: "evidence_03_auth.log",
        lines: [
          "21:02 — Student login failed",
          "21:02 — Student login failed",
          "21:03 — Student login failed",
          "21:04 — Student login successful",
        ],
      },
      {
        label: "evidence_04_request.txt",
        lines: ["\"Reply with your password to keep your account active.\""],
      },
    ],
    accept: ["PHISHING", "PHISHING ATTACK", "A PHISHING ATTACK"],
    answerLabel: "PHISHING",
    clue: "Look at how the victim is being pressured to provide login information.",
    explanation:
      "The fake urgent message, the misleading URL and the direct request for credentials together indicate a phishing attempt.",
  },
];
