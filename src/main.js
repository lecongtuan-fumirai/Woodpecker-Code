const runBtn = document.getElementById('run-sim-btn');
const terminal = document.getElementById('terminal-output');
const stepCards = document.querySelectorAll('.step-card');

let isRunning = false;

const logSteps = [
  { text: '>> [Webhook] Nhận tín hiệu Git Push từ GitHub (commit: a9b32e1f, branch: main)', cls: 'highlight', step: 1 },
  { text: '>> [Tunnel] Tín hiệu đi qua Cloudflare Ingress bảo mật không cần mở port modem', cls: 'dim', step: 2 },
  { text: '>> [Woodpecker Server] Đưa job vào hàng đợi và phân phối tới Woodpecker Agent...', cls: 'dim', step: 3 },
  { text: '>> [Agent WSL2] Kích hoạt Docker Sandbox với giới hạn an toàn: 4 CPU Cores, 4GB RAM', cls: 'warn', step: 4 },
  { text: '>> [Docker Build] node:20-alpine -> Chạy npm install & vite build thành công (1.2s)!', cls: 'highlight', step: 4 },
  { text: '>> [Integrity Check] dist/index.html tồn tại hợp lệ (3.4 KB)!', cls: 'dim', step: 4 },
  { text: '>> [Status] Gửi trạng thái Green Checkmark về GitHub Commit: SUCCESS (Passed)!', cls: 'success', step: 5 },
  { text: '>> [Hoàn tất] Pipeline hoàn thành trong 3.8s. Host Windows mượt mà 100%!', cls: 'success', step: 5 },
];

function appendLine(text, cls = '') {
  const line = document.createElement('div');
  line.className = `line ${cls}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function setActiveStep(stepNum) {
  stepCards.forEach(card => {
    const s = parseInt(card.getAttribute('data-step'), 10);
    if (s === stepNum) {
      card.classList.add('active');
      card.style.transform = 'scale(1.05)';
      card.style.borderColor = '#38bdf8';
    } else {
      card.style.transform = '';
      card.style.borderColor = '';
    }
  });
}

runBtn.addEventListener('click', async () => {
  if (isRunning) return;
  isRunning = true;
  runBtn.disabled = true;
  runBtn.style.opacity = '0.6';
  runBtn.innerHTML = '<span>⏳</span> ĐANG CHẠY PIPELINE...';

  terminal.innerHTML = '';
  appendLine('Bắt đầu quy trình kiểm thử pipeline tự động...', 'highlight');

  for (const step of logSteps) {
    await new Promise(resolve => setTimeout(resolve, 800));
    setActiveStep(step.step);
    appendLine(step.text, step.cls);
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
  stepCards.forEach(c => {
    c.style.transform = '';
    c.style.borderColor = '';
  });

  runBtn.disabled = false;
  runBtn.style.opacity = '1';
  runBtn.innerHTML = '<span>▶</span> CHẠY LẠI MÔ PHỎNG';
  isRunning = false;
});

console.log('Woodpecker CI Mission Control Dashboard ready.');
