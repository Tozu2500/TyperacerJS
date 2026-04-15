/**
 * main.js
 * Entry point. Wires quotes → state → renderer → timer together.
 * No business logic lives here — only coordination.
 */

import { getRandomQuote } from "./quotes.js";
import {
  createInitialState,
  processInput,
  calcWPM,
  calcAccuracy,
} from "./gameState.js";
import {
  renderPrompt,
  renderStats,
  renderProgress,
  renderTimer,
  renderResult,
  resetUI,
} from "./renderer.js";
import { startTicker, stopTicker } from "./timer.js";

// Module-level state 

let state = createInitialState();
const display = document.getElementById("prompt-display");
const input = document.getElementById("input-area");

// Game lifecycle

function startGame() {
  stopTicker();
  state = {
    ...createInitialState(),
    target: getRandomQuote(),
  };
  resetUI();
  renderPrompt(display, state.target, "");
}

function handleTick() {
  if (!state.startTime) return;
  const elapsed = Date.now() - state.startTime;
  renderTimer(state.startTime);
  renderStats({
    wpm: calcWPM(state.typed.length, elapsed),
    accuracy: calcAccuracy(state.totalTyped, state.errors),
    errors: state.errors,
  });
}

function finishRace() {
  stopTicker();
  input.disabled = true;
  const elapsed = Date.now() - state.startTime;
  renderProgress(100);
  renderResult({
    wpm: calcWPM(state.typed.length, elapsed),
    accuracy: calcAccuracy(state.totalTyped, state.errors),
    elapsedMs: elapsed,
  });
}

// Event listeners

input.addEventListener("input", () => {
  if (state.finished) return;

  // Start timer on first keystroke
  if (!state.startTime) {
    state = { ...state, startTime: Date.now() };
    startTicker(handleTick);
  }

  const { state: nextState, didFinish } = processInput(state, input.value);
  state = nextState;

  // Keep textarea in sync (clamped to target length)
  if (input.value.length > state.target.length) {
    input.value = state.typed;
  }

  // Update the progress bar
  const pct = Math.min(
    100,
    Math.round((state.typed.length / state.target.length) * 100)
  );
  renderProgress(pct);
  renderPrompt(display, state.target, state.typed);
  handleTick();

  if (didFinish) finishRace();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    startGame();
  }
});

document.getElementById("new-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", startGame);

// Boot the game

startGame();