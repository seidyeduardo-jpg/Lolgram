let timeLeft = 3;
const countdownElement = document.getElementById('countdown');

const timer = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        window.location.href = '/login';
    }
}, 1000);