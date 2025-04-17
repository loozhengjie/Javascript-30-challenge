const playButton = document.querySelector(".toggle");
const videoPlayer = document.querySelector(".viewer");

playButton.addEventListener("click", function(e){
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
});