const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
    return (seconds) => {
        let timeLeft = {};
        timeLeft.hours = Math.floor(seconds / 60 / 60);
        timeLeft.minutes = Math.floor(seconds / 60 - timeLeft.hours * 60);
        timeLeft.seconds = Math.floor(
            seconds - timeLeft.hours * 60 * 60 - timeLeft.minutes * 60
        );
        timerEl.textContent = `${timeLeft.hours < 10 ? "0" : ""}${
            timeLeft.hours
        }:${timeLeft.minutes < 10 ? "0" : ""}${timeLeft.minutes}:${
            timeLeft.seconds < 10 ? "0" : ""
        }${timeLeft.seconds}`;

        let timeoutFlag = false;
        const intervalID = setInterval(() => {
            if (timeLeft.seconds > 0) {
                timeLeft.seconds--;
            } else if (timeLeft.minutes > 0) {
                timeLeft.minutes--;
                timeLeft.seconds = 59;
            } else if (timeLeft.hours > 0) {
                timeLeft.hours--;
                timeLeft.minutes = 59;
                timeLeft.seconds = 59;
            } else {
                timeoutFlag = true;
                clearInterval(intervalID);
            }
            if (!timeoutFlag)
                timerEl.textContent = `${timeLeft.hours < 10 ? "0" : ""}${
                    timeLeft.hours
                }:${timeLeft.minutes < 10 ? "0" : ""}${timeLeft.minutes}:${
                    timeLeft.seconds < 10 ? "0" : ""
                }${timeLeft.seconds}`;
            else {
                timerEl.textContent = "Время вышло";
            }
        }, 1000);
    };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
    // Очистите input так, чтобы в значении
    // оставались только числа
    const digits = "0123456789";
    const newSym = inputEl.value[inputEl.value.length - 1];
    if (digits.includes(newSym)) {
    } else {
        inputEl.value = inputEl.value.slice(0, inputEl.value.length - 1);
    }
});

buttonEl.addEventListener("click", () => {
    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = "";
});
