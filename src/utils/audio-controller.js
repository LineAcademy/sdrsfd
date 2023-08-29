export function ringBell() {
    var playPromise = document.getElementById("beepAudio4").play();
    if (playPromise !== undefined) {
        playPromise
            .then((_) => {
            })
            .catch((error) => {
            });
    }
}

export function stopRingBell() {
    var sound = document.getElementById("beepAudio4");
    sound.pause();
    sound.currentTime = 0;
}