const bankCardEl = document.querySelector('.bankcard');
const containerEl = document.querySelector('.container');
const dropZoneEl = document.querySelector('.atm__carddrawing');

bankCardEl.addEventListener('dragstart', (ev) => {
  ev.dataTransfer.effectAllowed = 'move';
  const { x: cardX, y: cardY } = bankCardEl.getBoundingClientRect();
  ev.dataTransfer.setData('text', `${ev.x - cardX}|${ev.y - cardY}`);
  setTimeout(() => {
    ev.target.style.visibility = 'hidden';
  }, 0);
});

bankCardEl.addEventListener('dragend', (ev) => {
  ev.target.style.visibility = 'visible';
});

containerEl.addEventListener('dragover', (ev) => {
  if (ev.target == containerEl || ev.target == dropZoneEl) {
    ev.preventDefault();
  }
});

containerEl.addEventListener('drop', (ev) => {
  bankCardEl.style.transform = 'none';
  bankCardEl.style.left = 0;
  bankCardEl.style.top = 0;
  if (ev.target == containerEl) {
    const posDelta = ev.dataTransfer
      .getData('text')
      .split('|')
      .map((item) => Number(item));
    const { x: containerX, y: containerY } = containerEl.getBoundingClientRect();
    bankCardEl.style.left = `${ev.x - posDelta[0] - containerX}px`;
    bankCardEl.style.top = `${ev.y - posDelta[1] - containerY}px`;
  }
  ev.target.appendChild(bankCardEl);
});
