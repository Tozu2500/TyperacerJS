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

/**
 * Processing a new input value and returning the next state.
 */
export function processInput(state, rawVal) {
    let val = rawVal.slice(0, state.target.length);

    let errors = state.errors;
    let totalTyped = state.totalTyped;

    // Count new character, only on additions, not deletions
    if (val.length > state.typed.length) {
        totalTyped++;
        if (val[val.length - 1] !== state.target[val.length - 1]) {
            errors++;
        }
    }

    const didFinish = val === state.target;

    return {
        state: {
            ...state,
            typed: val,
            errors,
            totalTyped,
            finished: didFinish,
        },
        didFinish,
    };
}