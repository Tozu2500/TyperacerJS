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


