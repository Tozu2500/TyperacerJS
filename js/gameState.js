/**
 * Manages all mutable game state and core logic
 */

export function createInitialState() {
    return {
        target: "",
        typed: "",
        startTime: null,
        finished: false,
        errors: 0,
        totalTyped: 0,
    };
}

