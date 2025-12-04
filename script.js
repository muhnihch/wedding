// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});





// Countdown Timer
function updateCountdown() {
    // Set your wedding date here (YYYY, MM-1, DD, HH, MM, SS)
    const weddingDate = new Date('2025-12-28T10:00:00').getTime(); // December 28, 2025 at 10:00 AM
    
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Wedding day has arrived!
        document.getElementById('countdown').innerHTML = '<h2 style="color: var(--primary-color);">Today is our special day! 💕</h2>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// RSVP Form functionality
const rsvpForm = document.getElementById('rsvpForm');
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
const guestCountGroup = document.getElementById('guestCountGroup');

// Show/hide guest count based on attendance selection
attendanceRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'yes') {
            guestCountGroup.style.display = 'block';
        } else {
            guestCountGroup.style.display = 'none';
        }
    });
});

// RSVP Form submission
rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(rsvpForm);
    const rsvpData = {
        name: formData.get('guestName'),
        email: formData.get('email'),
        attendance: formData.get('attendance'),
        guestCount: formData.get('guestCount') || '1',
        dietary: formData.get('dietary'),
        message: formData.get('message')
    };
    
    // Here you would typically send the data to your backend
    // For now, we'll show a success message
    showRSVPSuccess();
    
    // Reset form
    rsvpForm.reset();
    guestCountGroup.style.display = 'none';
});

function showRSVPSuccess() {
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 10000;
            max-width: 400px;
        ">
            <i class="fas fa-check-circle" style="color: var(--primary-color); font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">Thank You!</h3>
            <p>Your RSVP has been received. We can't wait to celebrate with you!</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                margin-top: 1rem;
            ">Close</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successMessage.parentElement) {
            successMessage.remove();
        }
    }, 5000);
}



// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.detail-card, .registry-item');
    animateElements.forEach(el => observer.observe(el));
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-image');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translate3d(0, ${speed}px, 0)`;
    }
});

// Add floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.cssText = `
        position: fixed;
        font-size: 20px;
        color: var(--primary-color);
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 4s linear forwards;
    `;
    
    // Random position at bottom of screen
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Add CSS for floating hearts animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section-title, .hero-content');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
});

// Music player (optional)
function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    if (audio.paused) {
        audio.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicBtn.title = 'Pause Music';
    } else {
        audio.pause();
        musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        musicBtn.title = 'Play Music';
    }
}

// Add music button (you'll need to add this to your HTML and provide an audio file)
const musicButton = `
    <button id="musicBtn" onclick="toggleMusic()" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        transition: all 0.3s ease;
    " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <i class="fas fa-play"></i>
    </button>
    <audio id="backgroundMusic" loop>
        <source src="music/wedding-song.mp3" type="audio/mpeg">
    </audio>
`;

// Uncomment to add music player
// document.body.insertAdjacentHTML('beforeend', musicButton);