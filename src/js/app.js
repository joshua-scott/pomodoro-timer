const buttons = document.querySelectorAll('[data-change]');
let isBreak = true;
let countdown;

const times = {
  break: document.querySelector('.break .time'),
  work: document.querySelector('.work .time')
};

const mainDisplay = {
  main: document.querySelector('.timer'),
  mode: document.querySelector('.timer .mode'),
  countdown: document.querySelector('.timer .countdown')
};

function setTime(e) {
  e.preventDefault();
  const { change, which } = this.dataset;
  let newTime = parseInt(times[which].textContent) + parseInt(change);
  if (newTime < 0) newTime = 0;
  times[which].textContent = newTime;
}

function timer(seconds) {
  clearInterval(countdown); // Clear any existing timers
  const startTime = Date.now();
  const endTime = startTime + seconds * 1000;

  if (isBreak) {
    mainDisplay.mode.textContent = 'Break';
    mainDisplay.main.classList.remove('worktime');
    mainDisplay.main.classList.add('breaktime');
  } else {
    mainDisplay.mode.textContent = 'Work';
    mainDisplay.main.classList.remove('breaktime');
    mainDisplay.main.classList.add('worktime');
  }

  displayTimeLeft(seconds); // We call this now to avoid having to wait a second for setInterval

  // Every second, either switch mode or show the time left
  countdown = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);
    if (secondsLeft < 0) {
      isBreak = !isBreak;
      const newTime = isBreak ? times.break.textContent * 60 : times.work.textContent * 60;
      timer(newTime);
    } else {
      displayTimeLeft(secondsLeft);
    }
  }, 1000);
}

function displayTimeLeft(secs) {
  // convert secs into hours/mins/secs
  const hours = Math.floor(secs / 3600);
  secs = secs % 3600;
  const mins = Math.floor(secs / 60);
  secs = secs % 60;

  let display = '';
  
  if (hours > 0) {
    display = `${hours}:${toTwoDigits(mins)}:${toTwoDigits(secs)}`;
  } else {
    display = `${mins}:${toTwoDigits(secs)}`;
  }

  mainDisplay.countdown.textContent = display;
  document.title = display;
}

function toTwoDigits(num) {
  return `${num < 10 ? '0' : ''}${num}`;
}

buttons.forEach(btn => btn.addEventListener('click', setTime));
mainDisplay.main.addEventListener('click', () => {
  isBreak = !isBreak;
  const newTime = isBreak ? times.break.textContent * 60 : times.work.textContent * 60;
  timer(newTime);
});