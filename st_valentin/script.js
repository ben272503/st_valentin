document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const mainContainer = document.getElementById('main-container');
    const successContainer = document.getElementById('success-container');

    // Button "No" Evasion Logic
    noBtn.addEventListener('mouseover', () => {
        // Dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Switch to fixed positioning if not already
        if (noBtn.style.position !== 'fixed') {
            // To prevent layout shift of the "Yes" button, 
            // we can clone the node as a placeholder or just let it be.
            // User noted "Yes" button moved to center, which we want to avoid if possible,
            // but for now, priority is making "No" visible.
            noBtn.style.position = 'fixed';
            noBtn.style.zIndex = '10000'; // Super high z-index
        }

        // Calculate current position (or default to center logic)
        let rect = noBtn.getBoundingClientRect();

        // "Diagonal right to left" movement pattern logic
        // We will randomly pick a new location that is somewhat diagonal from current

        // Generate random new X and Y 
        // Ensure it stays within safe bounds (padding of 20px)
        const safeMargin = 20;
        const maxLeft = viewportWidth - btnWidth - safeMargin;
        const maxTop = viewportHeight - btnHeight - safeMargin;

        const newLeft = Math.random() * (maxLeft - safeMargin) + safeMargin;
        const newTop = Math.random() * (maxTop - safeMargin) + safeMargin;

        noBtn.style.left = `${newLeft}px`;
        noBtn.style.top = `${newTop}px`;
    });

    // Also trigger on click/tap for mobile if they manage to touch it
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Move it again!
        const event = new Event('mouseover');
        noBtn.dispatchEvent(event);
    });

    // Button "Yes" Logic
    yesBtn.addEventListener('click', () => {
        mainContainer.style.display = 'none';
        successContainer.classList.remove('hidden');

        // Launch Confetti
        launchConfetti();
    });

    function launchConfetti() {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 100 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
});
