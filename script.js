/* =================================================================
   RIYA YADAV PORTFOLIO — FINAL SCRIPT (EmailJS Working)
================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  console.log("✅ Riya Yadav Portfolio Loaded");

  /* PRELOADER */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('loaded'), 300);
    });
  }

  /* AOS */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true });
  }

  /* TYPED.JS */
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: ['Aspiring Data Analyst', 'Python & SQL Learner', 'Data Visualization Enthusiast'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true
    });
  }

  /* EMAILJS CONTACT FORM */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm) {
    const SERVICE_ID = 'service_nw14g1h';
    const TEMPLATE_TO_ME = 'template_yjaneyq';
    const TEMPLATE_AUTOREPLY = 'template_950aepk';
    const PUBLIC_KEY = 'ft0e_annKdzi4uV40';

    emailjs.init({ publicKey: PUBLIC_KEY });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        formNote.style.color = '#DC2626';
        formNote.textContent = 'Please fill all fields.';
        return;
      }

      const submitBtn = contactForm.querySelector('button');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      try {
        // Mail to Riya (You)
        await emailjs.send(SERVICE_ID, TEMPLATE_TO_ME, {
          name: name,
          email: email,
          subject: subject,
          message: message
        });

        // Auto-reply to User
        await emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, {
          to_email: email,
          name: name,
          message: message
        });

        formNote.style.color = '#0F766E';
        formNote.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
        contactForm.reset();

      } catch (error) {
        console.error("EmailJS Error:", error);
        formNote.style.color = '#DC2626';
        formNote.textContent = 'Failed to send. Please try again or email directly at riyay0640@gmail.com';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  console.log("🚀 Everything is ready!");
});