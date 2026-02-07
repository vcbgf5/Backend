const startBtn = document.getElementById('startButton');
const stopBtn = document.getElementById('stopButton');
const logs = document.getElementById('logs');
const statusText = document.getElementById('status-text');
const apiStatus = document.getElementById('api-status');
const apiJson = document.getElementById('api-json');

function addLog(msg, isError = false) {
    const div = document.createElement('div');
    div.innerText = msg;
    if (isError) div.style.color = 'red';
    logs.appendChild(div);
    logs.scrollTop = logs.scrollHeight;
}

async function sendCommand(action) {
    try {
        const res = await fetch('https://TWÓJ_BACKEND_URL/command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, token: 'ABC123' })
        });
        const data = await res.json();
        if (!data.success) addLog(`API error: ${data.error}`, true);
        else addLog(`Command sent: ${action.toUpperCase()}`);
    } catch (e) {
        addLog('Error sending command: ' + e.message, true);
    }

    statusText.innerText = action === 'start' ? 'Active' : 'Idle';
    apiJson.innerText = JSON.stringify({ status: action }, null, 2);
}

startBtn.addEventListener('click', () => sendCommand('start'));
stopBtn.addEventListener('click', () => sendCommand('stop'));
