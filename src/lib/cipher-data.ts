export type Challenge = {
  n: number;
  title: string;
  instruction: string;
  cipher: string;
  clue?: string;
  hint1: string;
  hint2: string;
  answer: string;
  explanation: string;
};

export const STAGE3_CHALLENGES: Challenge[] = [
  {
    n: 1,
    title: "🔐 Challenge 1 — Caesar Cipher",
    instruction: "The message has been shifted through the alphabet. Recover the original plaintext.",
    cipher: "KHOOR",
    hint1: "The letters are not random. They have been moved by a fixed number of positions.",
    hint2: "Try shifting every letter backward by the same amount.",
    answer: "HELLO",
    explanation:
      "The message uses a Caesar shift of 3. Moving each letter three positions backward reveals the plaintext.",
  },
  {
    n: 2,
    title: "🔄 Challenge 2 — ROT13",
    instruction: "Decode this message using a letter substitution technique.",
    cipher: "PLORE",
    hint1: "Think about an alphabet of 26 letters and a shift exactly halfway around it.",
    hint2: "Every letter is replaced by the letter 13 positions away.",
    answer: "CYBER",
    explanation: "ROT13 shifts each alphabetic character by 13 positions.",
  },
  {
    n: 3,
    title: "🔁 Challenge 3 — Reverse the Alphabet",
    instruction: "The alphabet has been reversed. Decode the message.",
    cipher: "HVXFIV",
    hint1: "Think about the relationship between the beginning and the end of the alphabet.",
    hint2: "A letter near the beginning is paired with a letter near the end.",
    answer: "SECURE",
    explanation:
      "This is the Atbash cipher: A↔Z, B↔Y and so on. Reversing the alphabet reveals SECURE.",
  },
  {
    n: 4,
    title: "🧬 Challenge 4 — Encoded Data",
    instruction:
      "This does not use a traditional substitution cipher. Identify the encoding and recover the original text.",
    cipher: "Q1lCRVJTRUNVUkU=",
    hint1: "The characters used here are commonly seen when binary data is represented safely as text.",
    hint2: "The encoding uses a 64-character alphabet and commonly ends with =.",
    answer: "CYBERSECURE",
    explanation: "The ciphertext is Base64 encoded and decodes directly to CYBERSECURE.",
  },
  {
    n: 5,
    title: "💻 Challenge 5 — Binary Message",
    instruction: "Convert the binary values into readable text.",
    cipher: "01000011 01001111 01000100 01000101",
    hint1: "Each group contains 8 bits.",
    hint2: "Think about the standard character encoding used by computers for English letters.",
    answer: "CODE",
    explanation: "Each 8-bit binary value represents one ASCII character.",
  },
  {
    n: 6,
    title: "🔢 Challenge 6 — Hexadecimal Message",
    instruction: "Convert the hexadecimal values into readable text.",
    cipher: "43 59 42 4F 54 49 58 58",
    hint1: "These values use digits and the letters A to F.",
    hint2: "Each pair represents one byte. Think about character encoding.",
    answer: "CYBOTIXX",
    explanation: "The hexadecimal bytes correspond to ASCII characters.",
  },
  {
    n: 7,
    title: "📡 Challenge 7 — Morse Message",
    instruction: "Decode the symbolic message.",
    cipher: "-.-. -.-- -... . .-.",
    hint1: "This communication system uses dots and dashes.",
    hint2: "Each group separated by a space represents one letter.",
    answer: "CYBER",
    explanation: "The message is encoded using Morse code.",
  },
  {
    n: 8,
    title: "🕵️ Challenge 8 — Secret Alphabet",
    instruction:
      "Every plaintext letter was replaced consistently using one fixed alphabet mapping. Recover the plaintext.",
    cipher: "UFXXBTWI",
    clue: "Known mapping: plaintext A is written as F.",
    hint1: "Every plaintext letter has been replaced consistently by the same cipher letter.",
    hint2:
      "Use the known mapping to work out the offset between the plaintext and cipher alphabets, then apply it to every letter.",
    answer: "PASSWORD",
    explanation:
      "The substitution alphabet is shifted by 5 (A→F). Reversing that mapping gives PASSWORD.",
  },
  {
    n: 9,
    title: "🧩 Challenge 9 — Two Layers",
    instruction: "This message has more than one layer. One decoding step will reveal another.",
    cipher: "U0VSUlFCWg==",
    hint1: "The first layer is an encoding commonly used to represent binary data as text.",
    hint2: "After the first decoding step, inspect what you obtain before deciding you are finished.",
    answer: "FREEDOM",
    explanation:
      "Base64 decoding gives SERRQBZ, which is ROT13 of the plaintext. Applying ROT13 reveals FREEDOM.",
  },
  {
    n: 10,
    title: "🚩 Challenge 10 — Freedom Cipher Finale",
    instruction:
      "Your final message has been protected by multiple layers. Use everything you learned in this stage.",
    cipher: "SVVISEdSUCBYUU9SRk5IRw==",
    hint1: "The message is protected by more than one technique.",
    hint2:
      "After your first decoding step, do not assume the result is the final message. Examine it for another recognizable pattern.",
    answer: "FREEDOM UNLOCKED",
    explanation:
      "Base64 decoding gives IUHHGRP XQORFNHG, a Caesar shift of 3. Shifting back three positions reveals FREEDOM UNLOCKED.",
  },
];
