document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('booking-form');
    if (!bookingForm) return;

    bookingForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

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
                toast.success('Booking submitted! We will contact you soon.');
                form.reset();
            } else {
                toast.error('Error submitting booking: ' + text);
            }
        } catch (err) {
            toast.error('Error submitting booking: ' + err.message);
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    });
});
