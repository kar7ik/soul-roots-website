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
        const response = await fetch("/.netlify/functions/booking-proxy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const text = await response.text();
        if (response.ok && text.trim() === "Success") {
            alert('✅ Booking submitted! We will contact you soon.');
            form.reset();
        } else {
            alert('❌ Error submitting booking: ' + text);
        }
    } catch (err) {
        alert('❌ Error submitting booking: ' + err.message);
    }
});
