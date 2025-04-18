// Get the play button
const playButton = document.querySelector(".toggle");

// Get the video player
const videoPlayer = document.querySelector(".viewer");

// Create a function to modify the video player status
function setVideoPlayStatus (e){
    if (videoPlayer.paused) {
        videoPlayer.play();
        playButton.textContent = "❚❚";
    } else {
        videoPlayer.pause();
        playButton.textContent = "►";
    }
}

// When the play button and the video player is preessed, call the function to modify the status
playButton.addEventListener("click", setVideoPlayStatus);
videoPlayer.addEventListener("click", setVideoPlayStatus);

// Get the progress bar
const progressBar = document.querySelector(".progress__filled");

// When the video player is playing
videoPlayer.addEventListener("timeupdate", function(){
    // Use the current video player time / video player duration to get the progress, then *100 to get the percentage
    const progress = (this.currentTime / this.duration) * 100;
    // Update the progress bar with the progress, dont forget the "%"
    progressBar.style.flexBasis = `${progress}%`;
});