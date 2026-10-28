// St. Bernard Prep: the menu, festivals list, background video, virtual tour, side-scroller and "Read More" panels.
(function () {
  var body = document.body;
  var $ = function (id) { return document.getElementById(id); };

  // Full-screen menu
  var menuBtn = $('menu-btn'), nav = $('nav');
  function setMenu(open) {
    nav.hidden = !open;
    body.classList.toggle('nav-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(nav.hidden); });
  nav.querySelectorAll('button.nav-top').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') !== 'true';
      nav.querySelectorAll('button.nav-top').forEach(function (o) { o.setAttribute('aria-expanded', 'false'); });
      b.setAttribute('aria-expanded', open);
    });
  });

  // Festivals drop-down
  var fest = $('fest'), festBtn = fest.querySelector('button'), festList = $('fest-list');
  function setFest(open) { festList.hidden = !open; festBtn.setAttribute('aria-expanded', open); }
  festBtn.addEventListener('click', function () { setFest(festList.hidden); });
  document.addEventListener('click', function (e) { if (!fest.contains(e.target)) setFest(false); });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    setFest(false);
    if (!nav.hidden) { setMenu(false); menuBtn.focus(); }
  });

  // Background video: a pause button, and a still picture for those who ask their device for less motion
  var hero = document.querySelector('.hero'), heroVideo = $('hero-video'), heroPause = $('hero-pause');
  function setPaused(p) {
    if (p) heroVideo.pause(); else heroVideo.play().catch(function () {});
    hero.classList.toggle('paused', p);
    heroPause.setAttribute('aria-label', p ? 'Play background video' : 'Pause background video');
  }
  heroPause.addEventListener('click', function () { setPaused(!heroVideo.paused); });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);

  // The hero's scroll effect, as on the original site: over one screen of scrolling the title grows from 77% and rises to
  // the middle, the video darkens to navy, the logo fades and the mission statement comes up under the title. Wide screens
  // only, and not for those who ask for less motion; otherwise the page keeps the plain layout in site.css.
  var root = document.documentElement, head = $('head'), pin = $('hero-pin'), title = $('hero-title');
  var wide = window.matchMedia('(min-width: 48.01em)'), calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  var pinned = false, travel = 0, ty0 = 0, ticking = false;
  var ease = function (t) { return 1 - Math.pow(1 - t, 2); };
  var clamp = function (t) { return Math.min(1, Math.max(0, t)); };
  function measure() {
    pinned = wide.matches && !calm.matches;
    root.classList.toggle('js-pin', pinned);
    if (!pinned) {
      ['--ty', '--sc', '--pd', '--dy', '--dim', '--head-y', '--logo', '--fest'].forEach(function (v) { root.style.removeProperty(v); });
      fest.classList.remove('gone');
      return;
    }
    travel = pin.offsetHeight - window.innerHeight;
    // Where the title sits when the effect is done (no transform), and where it starts: its foot 9.5rem above the bottom
    var restBottom = title.offsetTop + title.offsetHeight;
    ty0 = Math.max(0, window.innerHeight - 9.5 * parseFloat(getComputedStyle(root).fontSize) - restBottom);
    frame();
  }
  function frame() {
    ticking = false;
    if (!pinned) return;
    var y = window.scrollY, p = clamp(y / travel), e = ease(p), s = root.style;
    s.setProperty('--ty', (ty0 * (1 - e)).toFixed(1) + 'px');
    s.setProperty('--sc', (0.77 + 0.23 * e).toFixed(4));
    s.setProperty('--pd', clamp((p - 0.08) / 0.7).toFixed(3));
    s.setProperty('--dy', (250 * (1 - e)).toFixed(1) + 'px');
    s.setProperty('--dim', (0.12 + 0.73 * p).toFixed(3));
    s.setProperty('--logo', clamp(1 - p * 1.3).toFixed(3));
    s.setProperty('--fest', clamp(1 - p * 6).toFixed(3));
    s.setProperty('--head-y', -Math.max(0, y - travel) + 'px');
    fest.classList.toggle('gone', p > 0.17);
    if (p > 0.17) setFest(false);
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener('resize', measure);
  wide.addEventListener('change', measure);
  calm.addEventListener('change', measure);
  if (document.fonts) document.fonts.ready.then(measure);
  measure();
  // The arrow finishes the effect rather than jumping past it
  $('hero-down').addEventListener('click', function (e) {
    if (!pinned) return;
    e.preventDefault();
    window.scrollTo({ top: travel, behavior: calm.matches ? 'auto' : 'smooth' });
  });

  // Rows rise into view as they are reached
  if ('IntersectionObserver' in window && !calm.matches) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); seen.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('.created-item, .life-title, .life-rail, .foot-cta').forEach(function (el) {
      el.classList.add('reveal');
      seen.observe(el);
    });
    root.classList.add('js-reveal');
  }

  // Virtual tour: plays in place, over the picture
  var tourPlayer = $('tour-player'), tourVideo = $('tour-video');
  $('tour-play').addEventListener('click', function () {
    tourPlayer.hidden = false;
    tourVideo.play().catch(function () {});
    $('tour-close').focus();
  });
  $('tour-close').addEventListener('click', function () {
    tourVideo.pause();
    tourPlayer.hidden = true;
    $('tour-play').focus();
  });

  // Prepared for Life: arrow buttons move the scroller one card at a time
  var track = $('life-track'), prev = $('life-prev'), next = $('life-next');
  function step() { var c = track.querySelector('.card'); return c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0); }
  function arrows() {
    prev.disabled = track.scrollLeft < 8;
    next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
  }
  prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  track.addEventListener('scroll', arrows, { passive: true });
  window.addEventListener('resize', arrows);
  arrows();

  // "Read More" panels
  var opener = null;
  document.querySelectorAll('[data-panel]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = $(b.dataset.panel);
      opener = b;
      d.showModal();
      d.querySelector('.panel-body').scrollTop = 0;
      body.classList.add('panel-open');
    });
  });
  document.querySelectorAll('dialog.panel').forEach(function (d) {
    d.querySelector('.panel-close').addEventListener('click', function () { d.close(); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); }); // a click on the dark backdrop
    d.addEventListener('close', function () { body.classList.remove('panel-open'); if (opener) opener.focus(); });
  });
})();
