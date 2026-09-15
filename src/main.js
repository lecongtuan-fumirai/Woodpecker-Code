const runBtn = document.getElementById('run-sim-btn');
const terminal = document.getElementById('terminal-output');
const stepCards = document.querySelectorAll('.step-card');

let isRunning = false;

const logSteps = [
  { text: '>> [GitHub Event] Nhận job "build-test-deploy" từ GitHub Actions queue (branch: main)', cls: 'highlight', step: 1 },
  { text: '>> [Self-Hosted Runner] Container local-devops-runner nhận kết nối bảo mật qua TLS 443', cls: 'dim', step: 2 },
  { text: '>> [Runtime Node.js] Cài đặt dependencies và thực thi npm test (Node 20 test runner)', cls: 'dim', step: 3 },
  { text: '>> [Unit Tests Passed] 2/2 test suite hoàn thành không lỗi. Bắt đầu build web bundle...', cls: 'warn', step: 3 },
  { text: '>> [Docker Buildx] Đóng gói container ứng dụng (Multi-stage Nginx) tối ưu dung lượng', cls: 'highlight', step: 4 },
  { text: '>> [Push Registry] Xuất bản image thành công lên ghcr.io/lecongtuan-fumirai/woodpecker-code', cls: 'success', step: 5 },
  { text: '>> [Pipeline Hoàn tất] Toàn bộ quy trình hoàn thành trong 1m49s! Runner tiếp tục online.', cls: 'success', step: 5 },
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
