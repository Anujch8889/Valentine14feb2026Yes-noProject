import confetti from 'canvas-confetti';

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const successMessage = document.getElementById('success-message');
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');

let isMusicPlaying = false;

// Music Toggle
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🎵 Play Music';
    } else {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        musicToggle.textContent = '⏸️ Pause Music';
    }
    isMusicPlaying = !isMusicPlaying;
});

// "No" Button Evasion Logic
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton); // For mobile

function moveButton(e) {
    // Prevent default touch behavior if it's a touch event to stop scrolling while trying to tap
    if (e && e.type === 'touchstart') {
        // e.preventDefault(); // Optional: might block scrolling excessively
    }

    const container = document.querySelector('.interaction');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate available space
    // We want to keep the button inside the container
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    // Safety padding
    const padding = 10;

    // Generate random position
    // Ensure we don't place it outside
    const randomX = Math.max(padding, Math.floor(Math.random() * (maxX - padding)));
    const randomY = Math.max(padding, Math.floor(Math.random() * (maxY - padding)));

    // Apply new position
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// "Yes" Button Logic
yesBtn.addEventListener('click', () => {
    // Hide buttons
    document.querySelector('.buttons').style.display = 'none';

    // Show success message
    successMessage.classList.remove('hidden');
    successMessage.style.display = 'block';
    successMessage.style.opacity = '1';

    // Trigger confetti
    launchConfetti();
});


function launchConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInOut(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
