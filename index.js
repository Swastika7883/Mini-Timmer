document.addEventListener("DOMContentLoaded", function () {
    // Elements for background music
    const bgMusic = document.getElementById("bg-music");
    const musicSource = document.getElementById("bg-music-source");
    const musicSelect = document.getElementById("bg-music-select");
    const muteButton = document.getElementById("mute-button");

    // Elements for settings menu
    const settingsBtn = document.getElementById("settings-btn");
    const settingsMenu = document.getElementById("settings-menu");

    // Elements for timer and alarm
    const startButton = document.querySelector(".start-btn");
    const countdownDisplay = document.getElementById("countdown-display");

    const hoursInput = document.getElementById("hours");
    const minutesInput = document.getElementById("minutes");
    const secondsInput = document.getElementById("seconds");

    const alarmPopup = document.getElementById("alarm-popup");
    const alarmSound = document.getElementById("alarm-sound");
    const closeAlarmButton = document.getElementById("close-alarm");

    let countdownTime;
    let countdownInterval;

    // Enable audio after user interaction (for autoplay restrictions)
    document.body.addEventListener("click", function () {
        if (bgMusic.paused) {
            bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
        }
    }, { once: true });

    // Mute/Unmute Background Music (Toggle Button)
    muteButton.addEventListener("click", function () {
        bgMusic.muted = !bgMusic.muted;
        muteButton.textContent = bgMusic.muted ? "🔊 Unmute" : "🔇 Mute";
    });

    // Show/hide settings menu
    settingsBtn.addEventListener("click", function (event) {
        event.preventDefault();
        settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
    });

    // Hide settings menu if clicked outside
    document.addEventListener("click", function (event) {
        if (!settingsBtn.contains(event.target) && !settingsMenu.contains(event.target)) {
            settingsMenu.style.display = "none";
        }
    });

    // Change background music
    musicSelect.addEventListener("change", function () {
        musicSource.src = musicSelect.value;
        bgMusic.load();
        bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
    });

    // Timer function
    function getTotalSeconds() {
        const hours = parseInt(hoursInput.value, 10) || 0;
        const minutes = parseInt(minutesInput.value, 10) || 0;
        const seconds = parseInt(secondsInput.value, 10) || 0;
        return hours * 3600 + minutes * 60 + seconds;
    }

    function formatTime(time) {
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = time % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function startTimer() {
        if (countdownInterval) clearInterval(countdownInterval);

        countdownTime = getTotalSeconds();
        if (countdownTime <= 0) {
            alert("Please enter a valid time.");
            return;
        }

        countdownDisplay.textContent = `Time Left: ${formatTime(countdownTime)}`;

        countdownInterval = setInterval(() => {
            countdownTime--;
            countdownDisplay.textContent = `Time Left: ${formatTime(countdownTime)}`;

            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                triggerAlarm();
            }
        }, 1000);
    }

    function triggerAlarm() {
        alarmPopup.style.display = "block";
        alarmSound.play();
        setTimeout(stopAlarm, 15000); // Stop alarm after 15 seconds
    }

    function stopAlarm() {
        alarmPopup.style.display = "none";
        alarmSound.pause();
        alarmSound.currentTime = 0; // Reset sound
    }

    startButton.addEventListener("click", startTimer);
    closeAlarmButton.addEventListener("click", stopAlarm);

    // Play default song
    bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
});
