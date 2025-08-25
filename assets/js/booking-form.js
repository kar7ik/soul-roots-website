document.getElementById('booking-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;

    const data = {
        name: form.name.value,
        email: form.email.value,
        retreat: form.retreat.value,
        message: form.message.value
    };

    // 👇 Replace with your deployed Apps Script Web App URL
    const endpoint = "https://script.google.com/macros/s/AKfycbx0aT6FzpsStIUMDIXZSQVrKTvg_SHZphvC5zyJPVdxFxZ6-DilpsOQCiBTvUP4sNCF/exec";

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        });

        const text = await response.text();
        if (response.ok && text.trim() === "Success") {
            alert('✅ Booking submitted! We will contact you soon.');
            form.reset();
        } else {
            alert('❌ There was an error submitting your booking: ' + text);
        }
    } catch (err) {
        alert('❌ There was an error submitting your booking: ' + err.message);
    }
});
