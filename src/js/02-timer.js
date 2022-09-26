// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),

    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};


refs.startBtn.disabled = true;
let endTime = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function pad(value){
  return String(value).padStart(2, '0');
}
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] <= Date.now()) {
      'Please choose a date in the future';
      }  else {
        refs.startBtn.disabled = false;
        endTime = selectedDates[0];
        
      }
   },
  };

flatpickr(refs.input, options);

class Timer {

constructor() {
  this.intervalId = null;
  refs.startBtn.disabled = true;
}

start() {
     refs.startBtn.disabled = true;
     refs.input.disabled = true;
     this.intervalId = setInterval(() => {
    
      const startTime = Date.now();
      const deltaTime = endTime - startTime;
      const ms = convertMs(deltaTime);

     if(deltaTime <= 1000){
      clearInterval(this.intervalId);
     }

     this.updateClockface(ms);
     
      }, 1000);
  }
 
  updateClockface ({ days, hours, minutes, seconds }) {

    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
    }
};

const timer = new Timer();
refs.startBtn.addEventListener('click', () => timer.start());