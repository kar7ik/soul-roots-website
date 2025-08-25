document.getElementById('booking-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        name: form.name.value,
        email: form.email.value,
        retreat: form.retreat.value,
        message: form.message.value
    };
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby1vh7Kj9-xyC2VcGnG68mXBwYAs-jtjr3pLIzmnK-a8ju2AoUCVVjhog5ex9p08KA7/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        // Google Apps Script returns status 200 even for errors, so check response text
        const text = await response.text();
        if (response.ok && text.trim() === "Success") {
            alert('Booking submitted! We will contact you soon.');
            form.reset();
        } else {
            alert('There was an error submitting your booking: ' + text);
        }
    } catch (err) {
        alert('There was an error submitting your booking: ' + err.message);
    }
});