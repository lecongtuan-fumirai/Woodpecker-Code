let count = 0;
const btn = document.getElementById('counter-btn');
const countSpan = document.getElementById('count');

btn.addEventListener('click', () => {
  count++;
  countSpan.textContent = count;
});

console.log('Woodpecker CI Demo App loaded successfully!');
