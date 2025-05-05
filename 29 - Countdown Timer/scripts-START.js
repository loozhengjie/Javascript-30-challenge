let countdown;
const timerDisplay = document.querySelector(".display__time-left")
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds){
    // clear any existing timers
    clearInterval(countdown);
    // Set interval could work, but it is found unreliable as it might not run if afk for too long
    // In IOS, it will pause all intervals when scrolling
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // Check if we should stop it
        if (secondsLeft < 0){
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);

    }, 1000);
}

function displayTimeLeft(seconds){
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const display = `${mins < 10 ? "0"+ mins : mins}:${secs < 10 ? "0"+ secs : secs}`;
    timerDisplay.textContent = display;
    document.title = display;
    console.log(mins, secs);
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const mins = end.getMinutes();
    const secs = end.getSeconds();
    endTime.textContent = `Be back at ${hour > 12 ? hour-12 : hour}:${mins < 10 ? "0"+ mins : mins}${hour > 12 ? "pm" : "am"}`;
}

function startTimer(){
    timer(parseInt(this.dataset.time));
}

buttons.forEach(button => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset;
});

