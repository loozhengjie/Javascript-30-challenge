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
const progressBarFill = document.querySelector(".progress__filled");

// When the video player is playing
videoPlayer.addEventListener("timeupdate", function(){
    // Use the current video player time / video player duration to get the progress, then *100 to get the percentage
    const progress = (this.currentTime / this.duration) * 100;
    // Update the progress bar with the progress, dont forget the "%"
    progressBarFill.style.flexBasis = `${progress}%`;
});

const skipButtons = document.querySelectorAll("[data-skip]"); 

function skip(){
    // console.log(this.dataset);
    videoPlayer.currentTime += parseFloat(this.dataset.skip); // This.dataset.skip is a string, so need to convert it to true number
}

skipButtons.forEach(skipButton => skipButton.addEventListener("click", skip));


// Video stop at 13:05

const ranges = document.querySelectorAll(".player__slider"); 

function handleRangeUpdate(){
    // This one gets an element and its attribute, then change that attribute value
    videoPlayer[this.name] = this.value;
}

ranges.forEach(range=>range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range=>range.addEventListener("mousemove", handleRangeUpdate));

let isMouseClicked = false;
const progressBar = document.querySelector(".progress"); 

function scrub(e){
    const scrubTime = (e.offsetX / progressBar.offsetWidth)* videoPlayer.duration;
    videoPlayer.currentTime = scrubTime;
}


progressBar.addEventListener("mouseup", ()=> isMouseClicked = false);
progressBar.addEventListener("mousedown", ()=> isMouseClicked = true);

progressBar.addEventListener("click", scrub);
// We can use "&&" as "short-circuit evaluation", so if the left side is truthy, then it will run the right hand side
progressBar.addEventListener("mousemove", (e)=> isMouseClicked && scrub(e));

const playerContainer = document.querySelector(".player");

// Full screen event test
const fullscreenButton = document.querySelector(".fullscreen"); 
fullscreenButton.addEventListener("click", function(){
    // Only the document can check if an element is fullscreen, and control it, think about it as the central hub
    if (!document.fullscreenElement) {
        // For requesting, the element has to call the document to control on its behalf
        playerContainer.requestFullscreen();
    }
    else{
        // Of course, the document controls the handling
        document.exitFullscreen();
    }
})

// Find this js fullscreen api weird tho haha, why not just make every function from zoom in and zoom out from document, 
// instead of full screen from element and exit full screen from document,
// better if document.toggleFullscreen(element);
// just a thought haha

