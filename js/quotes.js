export const QUOTES = [
  "The quick brown fox jumps over the lazy dog near the riverbank every single morning.",
  "Coding is not just about writing lines of logic — it is about solving real problems for real people.",
  "In the middle of difficulty lies opportunity, and those who persist will always find a way forward.",
  "The best time to plant a tree was twenty years ago. The second best time is right now.",
  "Success is not final, failure is not fatal — it is the courage to continue that counts in the end.",
  "Practice makes perfect, and perfect practice makes champions who never stop improving their craft.",
  "Every expert was once a beginner who refused to give up when things became difficult and uncertain.",
  "Type fast, think faster — the keyboard is your instrument and the screen is your stage today.",
  "The universe is under no obligation to make sense to anyone, yet we keep asking beautiful questions.",
  "Simple can be harder than complex because you have to work hard to get your thinking clean.",
];

export function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}