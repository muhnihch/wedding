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

// Ensure HTTPS without causing loops
function ensureHTTPS() {
    // Only check, don't redirect (redirect is handled in HTML head)
    if (location.protocol === 'https:') {
        // Clear any redirect flags since we're secure
        sessionStorage.removeItem('https_redirected');
        console.log('✅ Secure connection established');
    }
}

// Mobile security and compatibility fixes
function handleMobileSecurity() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Prevent reload loops on mobile
        let reloadCount = parseInt(sessionStorage.getItem('reload_count') || '0');
        if (reloadCount > 2) {
            console.log('🛑 Preventing reload loop on mobile');
            sessionStorage.removeItem('reload_count');
            sessionStorage.removeItem('https_redirected');
            return; // Stop any further redirects
        }
        
        // Remove any problematic security meta tags dynamically
        const strictCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (strictCSP && strictCSP.content.includes('strict')) {
            strictCSP.remove();
        }
        
        // Add mobile-friendly error handling
        window.addEventListener('error', function(e) {
            console.log('Mobile error handled:', e.message);
            return true; // Prevent error from blocking page
        });
        
        // Handle security exceptions gracefully
        window.addEventListener('securitypolicyviolation', function(e) {
            console.log('Security policy handled for mobile');
            e.preventDefault();
        });
        
        // Track page loads to detect loops
        reloadCount++;
        sessionStorage.setItem('reload_count', reloadCount.toString());
        
        // Clear reload count after successful load
        setTimeout(() => {
            sessionStorage.removeItem('reload_count');
        }, 5000);
    }
}

// Mobile-specific improvements
function initMobileFeatures() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce floating hearts frequency on mobile for better performance
        clearInterval(heartInterval);
        heartInterval = setInterval(createFloatingHeart, 6000);
        
        // Add touch feedback for buttons
        const touchElements = document.querySelectorAll('.cta-button, .detail-button, .submit-button, .form-link');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Optimize countdown for mobile
        const countdownItems = document.querySelectorAll('.countdown-item');
        countdownItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Improve form experience on mobile
        const formInputs = document.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Scroll input into view on mobile
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            });
        });
    }
}

// Store interval reference for cleanup
let heartInterval = setInterval(createFloatingHeart, 3000);

// Initialize mobile features on load and resize
document.addEventListener('DOMContentLoaded', function() {
    ensureHTTPS();
    handleMobileSecurity();
    initMobileFeatures();
});
window.addEventListener('resize', initMobileFeatures);

// Prevent iOS safari bounce effect while allowing normal scrolling
document.addEventListener('touchmove', function(e) {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });

// Optimize performance on mobile
if (window.innerWidth <= 768) {
    // Reduce animation complexity
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .parallax {
                background-attachment: scroll !important;
            }
            
            * {
                animation-duration: 0.3s !important;
            }
        }
    `;
    document.head.appendChild(style);
}

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

// Custom Google Form Submission Handler
function initCustomRSVPForm() {
    const form = document.getElementById('custom-rsvp-form');
    if (!form) return;

    // Google Form endpoint and entry IDs (verified from form structure)
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeBQU91NaduWyIlPcv9bvi68wwDiBFOABbEkFS7-Wv5shAfHA/formResponse';
    const ENTRY_IDS = {
        attendance: 'entry.2114599373',
        guestSide: 'entry.1795612852',
        guestCount: 'entry.1636779595',
        specialMessage: 'entry.1564302628'
    };

    // Form validation
    function validateForm() {
        let isValid = true;
        const errors = {};

        // Validate attendance
        const attendance = document.getElementById('attendance').value;
        if (!attendance || attendance === '') {
            errors.attendance = 'Please select your attendance';
            isValid = false;
        }

        // Validate guest side
        const guestSide = document.getElementById('guest-side').value;
        if (!guestSide || guestSide === '') {
            errors.guestSide = 'Please select which side you are from';
            isValid = false;
        }

        // Validate guest count
        const guestCount = document.getElementById('guest-count').value;
        if (!guestCount || guestCount === '') {
            errors.guestCount = 'Please select guest count';
            isValid = false;
        }

        // Display errors
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(field + '-error');
            if (errorElement) {
                errorElement.textContent = errors[field];
            }
            const inputElement = document.getElementById(field === 'guestSide' ? 'guest-side' : field === 'guestCount' ? 'guest-count' : field);
            if (inputElement) {
                inputElement.style.borderColor = '#d32f2f';
            }
        });

        // Clear errors for valid fields
        ['attendance', 'guest-side', 'guest-count'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const errorId = fieldId === 'guest-side' ? 'guest-side-error' : fieldId === 'guest-count' ? 'guest-count-error' : fieldId + '-error';
            const errorElement = document.getElementById(errorId);
            if (field && field.value && errorElement) {
                errorElement.textContent = '';
                field.style.borderColor = '';
            }
        });

        return isValid;
    }

    // Clear error styling on input
    ['attendance', 'guest-side', 'guest-count'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('change', function() {
                this.style.borderColor = '';
                const errorId = fieldId === 'guest-side' ? 'guest-side-error' : fieldId === 'guest-count' ? 'guest-count-error' : fieldId + '-error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        }
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Hide previous messages
        const successMsg = document.getElementById('form-success');
        const errorMsg = document.getElementById('form-error');
        if (successMsg) successMsg.style.display = 'none';
        if (errorMsg) errorMsg.style.display = 'none';

        // Validate form
        if (!validateForm()) {
            return false;
        }

        // Get form data
        const attendance = document.getElementById('attendance').value;
        const guestSide = document.getElementById('guest-side').value;
        const guestCount = document.getElementById('guest-count').value;
        const specialMessage = document.getElementById('special-message').value || '';

        // Disable submit button and show loading
        const submitBtn = document.getElementById('submit-btn');
        const submitText = submitBtn.querySelector('.submit-text');
        const submitLoading = submitBtn.querySelector('.submit-loading');
        if (submitBtn) {
            submitBtn.disabled = true;
            if (submitText) submitText.style.display = 'none';
            if (submitLoading) submitLoading.style.display = 'inline-block';
        }

        // Function to handle success
        function handleSuccess() {
            // Show success message
            if (successMsg) {
                successMsg.style.display = 'block';
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            // Reset form
            form.reset();

            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                if (submitText) submitText.style.display = 'inline-block';
                if (submitLoading) submitLoading.style.display = 'none';
            }
        }

        // Function to handle error
        function handleError() {
            // Show error message
            if (errorMsg) {
                errorMsg.style.display = 'block';
                errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                if (submitText) submitText.style.display = 'inline-block';
                if (submitLoading) submitLoading.style.display = 'none';
            }
        }

        // Create a unique iframe name for this submission
        const iframeName = 'google-form-submit-' + Date.now();
        
        // Create hidden iframe
        const iframe = document.createElement('iframe');
        iframe.name = iframeName;
        iframe.id = iframeName;
        iframe.style.position = 'absolute';
        iframe.style.left = '-9999px';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        // Create hidden form for submission
        const hiddenForm = document.createElement('form');
        hiddenForm.method = 'POST';
        hiddenForm.action = GOOGLE_FORM_URL;
        hiddenForm.target = iframeName;
        hiddenForm.style.display = 'none';
        hiddenForm.enctype = 'application/x-www-form-urlencoded';
        hiddenForm.acceptCharset = 'UTF-8';

        // Add form fields
        const fields = [
            { name: ENTRY_IDS.attendance, value: attendance },
            { name: ENTRY_IDS.guestSide, value: guestSide },
            { name: ENTRY_IDS.guestCount, value: guestCount },
            { name: ENTRY_IDS.specialMessage, value: specialMessage }
        ];

        fields.forEach(function(field) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            hiddenForm.appendChild(input);
        });

        document.body.appendChild(hiddenForm);

        // Track if success was handled
        let successHandled = false;

        // Listen for iframe load (indicates submission completed)
        iframe.onload = function() {
            // Wait a bit for Google Forms to process
            setTimeout(function() {
                if (!successHandled) {
                    successHandled = true;
                    // Clean up
                    setTimeout(function() {
                        if (hiddenForm.parentNode) {
                            hiddenForm.parentNode.removeChild(hiddenForm);
                        }
                        if (iframe.parentNode) {
                            iframe.parentNode.removeChild(iframe);
                        }
                    }, 100);
                    // Show success
                    handleSuccess();
                }
            }, 1500);
        };

        // Fallback timeout - assume success after 2.5 seconds
        setTimeout(function() {
            if (!successHandled) {
                successHandled = true;
                // Clean up
                setTimeout(function() {
                    if (hiddenForm.parentNode) {
                        hiddenForm.parentNode.removeChild(hiddenForm);
                    }
                    if (iframe.parentNode) {
                        iframe.parentNode.removeChild(iframe);
                    }
                }, 100);
                // Assume success (Google Forms accepts submissions even if we can't verify)
                handleSuccess();
            }
        }, 2500);

        // Submit the form
        try {
            hiddenForm.submit();
        } catch (err) {
            console.error('Form submission error:', err);
            // Clean up on error
            if (hiddenForm.parentNode) {
                hiddenForm.parentNode.removeChild(hiddenForm);
            }
            if (iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
            }
            if (!successHandled) {
                successHandled = true;
                handleError();
            }
        }

        return false;
    });
}

// Initialize custom form when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initCustomRSVPForm();
});