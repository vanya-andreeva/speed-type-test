const typeBoxWrapper = document.querySelector(".typeBox-wrapper");
const textArea = document.querySelector("#textArea");
const originText = document.querySelector("#textOrg p").innerHTML;
const resetButton = document.querySelector("#reset");
const speedTimer = document.querySelector(".SpeedTimer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

function addZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

function startTimer() {
    let currentTime = addZero(timer[0]) + ":" + addZero(timer[1]) + ":" + addZero(timer[2]);
    speedTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function checkSpelling() {
    let textEntered = textArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        typeBoxWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            typeBoxWrapper.style.borderColor = "#65CCf3";
        } else {
            typeBoxWrapper.style.borderColor = "#E95D0F";
        }
    }

}

function start() {
    let textEnterdLength = textArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(startTimer, 10);
    }
    console.log(textEnterdLength);
}

function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    textArea.value = "";
    speedTimer.innerHTML = "00:00:00";
    typeBoxWrapper.style.borderColor = "grey";
}

textArea.addEventListener("keypress", start, false);
textArea.addEventListener("keyup", checkSpelling, false);
resetButton.addEventListener("click", reset, false);
