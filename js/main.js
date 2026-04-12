/**
 * Entry point. Wires quotes, state, rendering and timer together.
 * No logic lives here, only coordination.
 */

import { getRandomQuote } from "./quotes.js";
import {
    createInitialState,
    processInput,
    calcWPM,
    calcAccuracy
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
