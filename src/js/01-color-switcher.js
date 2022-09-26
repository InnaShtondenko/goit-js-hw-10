const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
stopBtn.disabled = false;

let timerID = null;
let throttle = require('lodash.throttle');
function stopClick() {
    const stopClickBtn = throttle(startBtn, 500)
}

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerID = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);

});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

stopBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerID);
});
