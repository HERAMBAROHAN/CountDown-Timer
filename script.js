let countdownInterval;

function previewTargetTime() {
    const input = document.getElementById("datetime").value;
    const preview = document.getElementById("preview");

    if (input) {
        const date = new Date(input);
        preview.textContent = "Target Time: " + date.toLocaleString();
    } else {
        preview.textContent = "";
    }
}

function startCountdown() {
    clearInterval(countdownInterval);

    const input = document.getElementById("datetime").value;
    const targetTime = new Date(input).getTime();
    const message = document.getElementById("message");

    if (!input || isNaN(targetTime)) {
        message.textContent = "⚠️ Please enter a valid future date and time.";
        return;
    }

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            message.textContent = "🎉 Time's up!";
            document.getElementById("alarm").play();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

        message.textContent = "";
    }, 1000);
}

function resetCountdown() {
    clearInterval(countdownInterval);
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("message").textContent = "";
    document.getElementById("datetime").value = "";
    document.getElementById("preview").textContent = "";
}
