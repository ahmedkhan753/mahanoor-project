document.addEventListener('DOMContentLoaded', () => {
    // Initial Celebration
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffafbd', '#ffc3a0', '#d42020', '#ffffff']
    });

    createFloatingHearts();
});

function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const heartEmoji = ['❤️', '💖', '💗', '💓', '💕'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerText = heartEmoji[Math.floor(Math.random() * heartEmoji.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

function nextSection() {
    document.getElementById('greeting-section').classList.remove('active');
    document.getElementById('question-section').classList.add('active');
}

function showSuccess() {
    document.getElementById('question-section').classList.remove('active');
    document.getElementById('success-section').classList.add('active');
    
    // Celebration Loop
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}

// "No" Button Escape Logic
const noBtn = document.getElementById('no-btn');

const moveButton = () => {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate random position within viewport
    const newX = Math.random() * (containerWidth - btnWidth - 40) + 20;
    const newY = Math.random() * (containerHeight - btnHeight - 40) + 20;

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.position = 'fixed';
};

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});
