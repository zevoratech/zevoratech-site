(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Headline: split into words so they rise in one after another (runs once, on load).
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', words.join(' '));
    el.innerHTML = words.map(function (w, i) {
      return '<span class="w" aria-hidden="true"><span style="--i:' + i + '">' + w + '</span></span>';
    }).join(' ');
  });

  document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Header: soft border and shadow once the page scrolls
    var nav = document.getElementById('nav');
    var onScroll = function () { if (nav) nav.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
      var close = function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    }

    // Reveal blocks and play card graphics when they scroll into view
    var watch = document.querySelectorAll('[data-reveal], [data-art], [data-count]');
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          if (en.target.hasAttribute('data-count')) countUp(en.target);
          io.unobserve(en.target);
        });
      }, { threshold: 0.18 });
      watch.forEach(function (el) { io.observe(el); });
    } else {
      watch.forEach(function (el) { el.classList.add('in'); });
    }

    function countUp(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var start = null;
      var step = function (t) {
        if (start === null) start = t;
        var p = Math.min((t - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    }

    // Forms use Web3Forms (free form-to-email service); the key is a public submit key.
    var WEB3FORMS_ACCESS_KEY = "ed8b9e67-16f6-4880-9857-8d18033b5cf4";
    function send(data) {
      data.access_key = WEB3FORMS_ACCESS_KEY;
      data.from_name = 'ZevoraTech website';
      return fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) { return res.json(); });
    }

    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      var statusEl = document.getElementById('formStatus');
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = contactForm.querySelector('button[type=submit]');
        var label = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Sending…';
        statusEl.className = 'form-status';
        var fail = function () {
          btn.disabled = false; btn.textContent = label;
          statusEl.textContent = 'Something went wrong sending that. Please email info@zevoratech.in directly.';
          statusEl.className = 'form-status show err';
        };
        send({
          subject: 'New message from zevoratech.in contact form',
          name: contactForm.name.value,
          email: contactForm.email.value,
          topic: contactForm.topic.value,
          message: contactForm.message.value
        }).then(function (r) {
          if (!r.success) return fail();
          btn.disabled = false; btn.textContent = label;
          statusEl.textContent = "Thanks — your message is on its way. We'll reply within a business day.";
          statusEl.className = 'form-status show ok';
          contactForm.reset();
        }).catch(fail);
      });
    }

    var notify = document.getElementById('notifyForm');
    if (notify) {
      var note = document.getElementById('notifyNote');
      notify.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = notify.querySelector('button');
        var label = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Saving…';
        var fail = function () {
          btn.disabled = false; btn.textContent = label;
          note.textContent = "That didn't go through. Please try again, or write to info@zevoratech.in.";
          note.className = 'form-note err';
        };
        send({
          subject: 'Notify me about new ZevoraTech products',
          email: notify.email.value,
          message: 'Please add this address to the new-product notification list.'
        }).then(function (r) {
          if (!r.success) return fail();
          btn.textContent = 'You are on the list';
          note.textContent = "Thanks. We'll write when something new ships.";
          note.className = 'form-note ok';
          notify.reset();
        }).catch(fail);
      });
    }
  });
})();
