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

  // ---- Hero slideshow (no library). Advances when the active dot's progress bar finishes. ----
  var slider = document.getElementById('heroSlider');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('.dot'));
    var pauseBtn = document.getElementById('sPause');
    var cur = 0;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var wantsPlay = !reduce;
    slider.style.setProperty('--slide-time', '6.5s');

    var show = function (n) {
      cur = (n + slides.length) % slides.length;
      slides.forEach(function (sl, i) {
        var on = i === cur;
        sl.classList.toggle('is-active', on);
        sl.setAttribute('aria-hidden', on ? 'false' : 'true');
        sl.querySelectorAll('a,button').forEach(function (el) { el.tabIndex = on ? 0 : -1; });
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === cur);
        if (i === cur) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
      // restart the progress animation on the new dot
      slider.classList.remove('playing');
      void slider.offsetWidth;
      if (wantsPlay) slider.classList.add('playing');
    };

    var setPlaying = function (on) {
      wantsPlay = on;
      slider.classList.toggle('playing', on);
      if (pauseBtn) pauseBtn.setAttribute('aria-label', on ? 'Pause slideshow' : 'Play slideshow');
      if (on) show(cur);
    };

    slider.addEventListener('animationend', function (e) {
      if (e.animationName === 'sl-progress') show(cur + 1);
    });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); }); });
    document.getElementById('sNext').addEventListener('click', function () { show(cur + 1); });
    document.getElementById('sPrev').addEventListener('click', function () { show(cur - 1); });
    if (pauseBtn) pauseBtn.addEventListener('click', function () { setPlaying(!wantsPlay); });

    // pause while the visitor is reading, hovering or focused inside the slider
    var hold = function (on) { slider.classList.toggle('paused', on); };
    slider.addEventListener('mouseenter', function () { hold(true); });
    slider.addEventListener('mouseleave', function () { hold(false); });
    slider.addEventListener('focusin', function () { hold(true); });
    slider.addEventListener('focusout', function () { hold(false); });
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(cur + 1);
      else if (e.key === 'ArrowLeft') show(cur - 1);
    });

    // swipe on touch screens
    var x0 = null;
    slider.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; hold(true); }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      hold(false);
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 45) show(cur + (dx < 0 ? 1 : -1));
    }, { passive: true });

    slides.forEach(function (sl, i) { if (i) sl.querySelectorAll('a,button').forEach(function (el) { el.tabIndex = -1; }); });
    setPlaying(wantsPlay);
  }

  // ---- Fade-in as sections scroll into view ----
  if ('IntersectionObserver' in window && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('main .section-head, .capability-row, .product-card, .cta-band, section .notify-form, section .stat-row, .value-row').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
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
