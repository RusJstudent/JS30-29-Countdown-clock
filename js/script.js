'use strict';

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
const form = document.forms[0]; // или document.customForm (form.name)

let timerId;

buttons.forEach( button => {
    button.addEventListener('mousedown', startTimer);
});

function startTimer(e) {
    clearInterval(timerId);
    timer(+this.dataset.time);
}

// input.addEventListener('input', function(e) {
//     let value = +input.value;
//     if (isFinite(value) && value > 0) startCustomTimer(value);
// });

form.addEventListener('submit', startCustomTimer);

function startCustomTimer(e) {
    e.preventDefault();

    let value = +this.minutes.value;
    
    // this.minutes.value = '';
    this.reset();

    if (isFinite(value) && value > 0) {
        clearInterval(timerId);
        timer(value * 60);
    }
}

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    timerId = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        displayTimeLeft(secondsLeft);

        if (secondsLeft <= 0) {
            clearInterval(timerId);
        }
    }, 1000);
}

function displayTimeLeft(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds / 60 - hours * 60);
    let remainderSeconds = seconds % 60;

    if (minutes < 10) minutes = '0' + minutes;
    if (remainderSeconds < 10) remainderSeconds = '0' + remainderSeconds;

    let display = `${hours > 0 ? hours + ":" : ''}${minutes}:${remainderSeconds}`;

    timerDisplay.textContent = display;
    document.title = display; // Обновляем тег title
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);

    let hours = end.getHours();
    let minutes = end.getMinutes();

    if (minutes < 10) minutes = '0' + minutes;

    let display = `Вернусь в ${hours}:${minutes}`; // Be Back At
    endTime.textContent = display;
}
