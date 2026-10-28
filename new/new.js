// St. Bernard Prep, new design: header, menus, background video, film, phone dock and the rise-in effect.
(function () {
  var root = document.documentElement, body = document.body;
  var $ = function (id) { return document.getElementById(id); };
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktop = window.matchMedia('(min-width: 64.01em)');

  // Header turns solid once the page scrolls; the phone dock appears once the hero is gone
  var top = $('top'), dock = $('dock'), hero = document.querySelector('.hero');
  function onScroll() {
    var y = window.scrollY;
    top.classList.toggle('solid', y > 40);
    dock.classList.toggle('show', y > hero.offsetHeight * 0.8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Drop-down menus: open on click or tap, and on hover with a mouse
  var drops = Array.prototype.slice.call(document.querySelectorAll('.has-drop'));
  function closeAll(except) {
    drops.forEach(function (li) {
      if (li === except) return;
      li.classList.remove('open');
      li.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  }
  drops.forEach(function (li) {
    var b = li.querySelector('button');
    b.addEventListener('click', function () {
      var open = !li.classList.contains('open');
      closeAll(li);
      li.classList.toggle('open', open);
      b.setAttribute('aria-expanded', open);
    });
    li.addEventListener('mouseenter', function () {
      if (!desktop.matches) return;
      closeAll(li); li.classList.add('open'); b.setAttribute('aria-expanded', 'true');
    });
    li.addEventListener('mouseleave', function () {
      if (!desktop.matches) return;
      li.classList.remove('open'); b.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', function (e) { if (desktop.matches && !e.target.closest('.has-drop')) closeAll(); });

  // Full-screen menu on smaller screens
  var toggle = $('menu-toggle');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!open) closeAll();
  }
  toggle.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  desktop.addEventListener('change', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAll();
    if (body.classList.contains('menu-open')) { setMenu(false); toggle.focus(); }
  });

  // Background video: pause button; a still picture for those who ask for less motion
  var video = $('hero-video'), pause = $('hero-pause');
  function setPaused(p) {
    if (p) video.pause(); else video.play().catch(function () {});
    hero.classList.toggle('paused', p);
    pause.setAttribute('aria-label', p ? 'Play background video' : 'Pause background video');
  }
  pause.addEventListener('click', function () { setPaused(!video.paused); });
  if (calm.matches) setPaused(true);

  // The film ("The Heart of St. Bernard Prep")
  var film = $('film'), filmVideo = $('film-video');
  document.querySelectorAll('[data-film]').forEach(function (b) {
    b.addEventListener('click', function () { film.showModal(); filmVideo.play().catch(function () {}); });
  });
  film.querySelector('.film-close').addEventListener('click', function () { film.close(); });
  film.addEventListener('click', function (e) { if (e.target === film) film.close(); });
  film.addEventListener('close', function () { filmVideo.pause(); });

  // Sections rise gently into view
  if ('IntersectionObserver' in window && !calm.matches) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); seen.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el, i) {
      // cards in a row arrive one after another
      var sib = el.parentElement.querySelectorAll(':scope > .reveal');
      if (sib.length > 1) el.style.transitionDelay = (Array.prototype.indexOf.call(sib, el) * 0.08) + 's';
      seen.observe(el);
    });
    root.classList.add('js-reveal');
  }
})();
