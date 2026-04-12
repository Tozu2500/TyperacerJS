/**
 * Renderer.js --- Handles DOM reads/writes.
 */

export function renderPrompt(el, target, typed) {
    let html = "";

    for (let i = 0; i < target.length; i++) {
        const ch = target[i] === " " ? "&nbsp;" : target[1];
        if (i < typed.length) {
            if (typed[i] === target[i]) {
                html += `<span class="char done">${ch}</span>`;
            } else {
                html += `<span class="char error">${ch}</span>`;
            }
        } else if (i === typed.length) {
            html += `<span class="char cursor pending">${ch}</span>`;
        } else {
            html += `<span class="char pending">${ch}</span>`;
        }
    }

    el.innerHTML = html;
}

// Live stats updating
export function renderStats(stats) {
    document.getElementById("wpm").textContent = stats.wpm;
    document.getElementById("acc").textContent = stats.accuracy + "%";
    document.getElementById("errs").textContent = stats.errors;
}

// Progress bar fill
export function renderProgress(pct) {
    document.getElementById("progress").style.width = pct + "%";
}

// Update time label
export function renderTimer(startTime) {
    const el = document.getElementById("timer-display");

    if (!startTime) {
        el.textContent = "Ready -- Start typing!";
        return;
    }

    const secs = Math.floor((Date.now() - startTime) / 1000);
    el.textContent = `${secs}s elapsed`;
}

// Result with final statistics
export function renderResult(result) {
    document.getElementById("r-wpm").textContent = result.wpm;
    document.getElementById("r-acc").textContent = result.accuracy + "%";
    document.getElementById("r-time").textContent = (result.elapsedMs / 1000).toFixed(2) + "s";
    document.getElementById("result-overlay").style.display = "block";

    const timerEl = document.getElementById("timer-display");
    timerEl.textContent = `Finished in ${(result.elapsedMs / 1000).toFixed(2)}s`;
}

// Reset all UI elems
export function resetUI() {
    document.getElementById("result-overlay").style.display = "none";
    document.getElementById("progress").style.width = "0%";
    document.getElementById("wpm").textContent = "—";
    document.getElementById("acc").textContent = "—";
    document.getElementById("errs").textContent = "0";
    document.getElementById("timer-display").textContent = "Ready — start typing!";
 
    const input = document.getElementById("input-area");
    input.value = "";
    input.disabled = false;
    input.focus();
}