// Get the play button
const playButton = document.querySelector(".toggle");

// Get the video player
const videoPlayer = document.querySelector(".viewer");

// Create a function to modify the video player status
function setVideoPlayStatus (e){
    if (videoPlayer.paused) {
        videoPlayer.play();
        // Update, its ok to update the text context on toggle play / pause on clicked, but its better to do it on actual video play / pause
        // Cause there might be plugins where it will just paused the video, then this function will not get called and the text content will not get updated
        // playButton.textContent = "❚❚";
    } else {
        videoPlayer.pause();
    }
}

function updateButton(){
    if (videoPlayer.paused) {
        playButton.textContent = "►";
    } else {
        playButton.textContent = "❚❚";
    }
}

// When the play button and the video player is preessed, call the function to modify the status
playButton.addEventListener("click", setVideoPlayStatus);
videoPlayer.addEventListener("click", setVideoPlayStatus);
videoPlayer.addEventListener("play", updateButton);
videoPlayer.addEventListener("pause", updateButton);


// Get the progress bar
const progressBar = document.querySelector(".progress__filled");

// When the video player is playing
videoPlayer.addEventListener("timeupdate", function(){
    // Use the current video player time / video player duration to get the progress, then *100 to get the percentage
    const progress = (this.currentTime / this.duration) * 100;
    // Update the progress bar with the progress, dont forget the "%"
    progressBar.style.flexBasis = `${progress}%`;
});

const skipButtons = document.querySelectorAll("[data-skip]"); 

function skip(){
    console.log(this.dataset);
    videoPlayer.currentTime += parseFloat(this.dataset.skip); // This.dataset.skip is a string, so need to convert it to true number
}

skipButtons.forEach(skipButton => skipButton.addEventListener("click", skip));


// Video stop at 13:05

const ranges = document.querySelectorAll(".player-slider"); 
