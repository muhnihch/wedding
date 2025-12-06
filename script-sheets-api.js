/**
 * Frontend code for Google Sheets API backend
 * Replace the form submission code in script.js with this
 */

// Backend API endpoint - replace with your deployed backend URL
const BACKEND_API_URL = 'https://your-backend-url.com/api/submit';
// OR use Google Apps Script (which is already an HTTP endpoint):
// const BACKEND_API_URL = 'https://script.google.com/macros/s/AKfycbxaXM3I5tzS27Q-7QbsEBnD2Ubrpb_KC6oBqAPQRCFQqXtvaXJcTSa5xGaZZ8DpHuscTA/exec';

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.returnValue = false;

    // Validate form
    if (!validateForm()) {
        return false;
    }

    // Get form data
    const attendance = document.getElementById('attendance').value;
    const guestSide = document.getElementById('guest-side').value;
    const guestCount = document.getElementById('guest-count').value;
    const specialMessage = document.getElementById('special-message').value || '';

    // Disable submit button
    const submitBtn = document.getElementById('submit-btn');
    const submitText = submitBtn.querySelector('.submit-text');
    const submitLoading = submitBtn.querySelector('.submit-loading');
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline-block';

    // Submit using fetch (works with both backend API and Google Apps Script)
    fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            attendance: attendance,
            guestSide: guestSide,
            guestCount: guestCount,
            specialMessage: specialMessage
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
        // Success
        document.getElementById('form-success').style.display = 'block';
        form.reset();
        submitBtn.disabled = false;
        submitText.style.display = 'inline-block';
        submitLoading.style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('form-error').style.display = 'block';
        submitBtn.disabled = false;
        submitText.style.display = 'inline-block';
        submitLoading.style.display = 'none';
    });

    return false;
});

