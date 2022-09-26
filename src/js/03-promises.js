import Notiflix, { Notify } from 'notiflix';

const form = document.querySelector('.form');
const promisesEl = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};


form.addEventListener('click', (event) => {
  event.preventDefault();
  let delay = Number(promisesEl.delay.value);
  let step = Number(promisesEl.step.value);
  let amount = Number(promisesEl.amount.value);


  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  
    delay += step;
  }
  
});
  
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => { 
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
    }
  }, delay);
});
};
