export function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form || !status) return;

    const submitBtn = form.querySelector('.submit-button');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        status.className = 'form-status sending';
        status.textContent = 'Sending your message...';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.className = 'form-status success';
                status.innerHTML = '<i class="fas fa-check-circle"></i> Message sent — I\'ll get back to you shortly.';
                form.reset();
            } else {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || 'Submission failed');
            }
        } catch (err) {
            status.className = 'form-status error';
            status.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Could not send. Please email m.hasaam.official@gmail.com directly.';
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        }
    });
}
