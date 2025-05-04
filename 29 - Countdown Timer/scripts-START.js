let countdown;
const timerDisplay = document.querySelector(".display__time-left")

function timer(seconds){
    // Set interval could work, but it is found unreliable as it might not run if afk for too long
    // In IOS, it will pause all intervals when scrolling
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

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

// video stops at 11:53