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
        await fetch('https://script.google.com/macros/s/AKfycbw3cp2nP5EO3c1cTGtxyaSvctJOGRGPW4u0165Yw2xVoK7grusgij7JBh07PQmk_fJS/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        alert('Booking submitted! We will contact you soon.');
        form.reset();
    } catch (err) {
        alert('There was an error submitting your booking. Please try again.');
    }
});