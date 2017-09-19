// const breakLength = document.querySelector('.break .time');
// const sessionLength = document.querySelector('.session .time');
const buttons = document.querySelectorAll('[data-change]');
const times = {
  break: document.querySelector('.break .time'),
  session: document.querySelector('.session .time')
}

function setTime(e) {
  e.preventDefault();
  const { change, which } = this.dataset;
  let newTime = parseInt(times[which].textContent) + parseInt(change);
  if (newTime < 0) newTime = 0;
  times[which].textContent = newTime;
}

buttons.forEach(btn => btn.addEventListener('click', setTime));