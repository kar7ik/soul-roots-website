// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form[action="#"]');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
            
            const data = {
                name: form.name.value,
                email: form.email.value,
                message: form.message.value,
                type: 'contact' // Distinguish from booking
            };
            
            try {
                const response = await fetch("/.netlify/functions/booking-proxy", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                
                const text = await response.text();
                if (response.ok && text.trim() === "Success") {
                    alert('✅ Message sent! We will get back to you soon.');
                    form.reset();
                } else {
                    alert('❌ Error sending message: ' + text);
                }
            } catch (err) {
                alert('❌ Error sending message: ' + err.message);
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            }
        });
    }
});
