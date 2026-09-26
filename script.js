document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form — submits via Web3Forms (free form-to-email API),
  // replacing the old mailto: form action which browsers flag as
  // insecure and which many phones/webmail users can't complete at all.
  var WEB3FORMS_ACCESS_KEY = "ed8b9e67-16f6-4880-9857-8d18033b5cf4";

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var statusEl = document.getElementById('formStatus');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('button[type=submit]');
      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      statusEl.className = 'form-status';

      var data = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'New message from zevoratech.in contact form',
        from_name: 'ZevoraTech website',
        name: contactForm.name.value,
        email: contactForm.email.value,
        topic: contactForm.topic.value,
        message: contactForm.message.value
      };

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          if (result.success) {
            statusEl.textContent = "Thanks — your message is on its way. We'll reply within a business day.";
            statusEl.className = 'form-status show ok';
            contactForm.reset();
          } else {
            statusEl.textContent = "Something went wrong sending that. Please email info@zevoratech.in directly.";
            statusEl.className = 'form-status show err';
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          statusEl.textContent = "Something went wrong sending that. Please email info@zevoratech.in directly.";
          statusEl.className = 'form-status show err';
        });
    });
  }
});
