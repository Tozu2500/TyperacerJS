/**
 * Wrapper for setInterval timer
 */

let _interval = null;

export function startTicker(onTick, intervalMs = 300) {
    stopTicker();
    _interval = setInterval(onTick, intervalMs);
}

// Stop timer
export function stopTicker() {
    if (_interval !== null) {
        clearInterval(_interval);
        _interval = null;
    }
}