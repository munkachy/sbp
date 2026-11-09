// Alumni Christmas Party date poll for the school website (SPRX CMS). Everything lives here; the CMS page holds only
//   <div class="sbp" id="sbp-alumni-poll"><p>Loading the poll… If it doesn’t appear, email festivals@stbernardprep.com.</p></div>
//   <script src="https://munkachy.github.io/sbp/embed/alumni-poll.js" defer></script>
// and this file draws the poll into that div. Answers go to a Google Sheet through the Apps Script web app in
// ../tools/alumni-poll-sheet.gs (SHEET_URL below). Nothing is kept here; the Sheet is the list of answers.
//
// TO CHANGE: edit POLL below, commit, push. The live site picks it up within about 10 minutes (Pages cache).
// closes = when the poll stops taking answers (school time, Central); '' = stays open.
(function () {
  var POLL = {
    id: 'alumni-christmas-2026',
    eyebrow: 'Alumni Christmas Party',
    question: 'Which date would you be able to attend the St. Bernard Alumni Christmas Party?',
    hint: 'Please select one.',
    options: [
      { v: 'fri', big: 'Friday', date: 'Dec. 18', time: '6:30 p.m.', label: 'Friday, Dec. 18, at 6:30 p.m. only' },
      { v: 'sat', big: 'Saturday', date: 'Dec. 19', time: '6:30 p.m.', label: 'Saturday, Dec. 19, at 6:30 p.m. only' },
      { v: 'either', big: 'Either date', sub: 'Either date works for me', label: 'Either date works for me' },
      { v: 'neither', big: 'Neither', sub: 'I’m unable to attend either date', label: 'I’m unable to attend either date' }
    ],
    closes: '',            // e.g. '2026-11-16T12:00:00-06:00'; '' = stays open until this is set
    closesText: 'We’d love to hear from you as soon as possible.',   // shown under the question while open
    thanks: 'We’ll send an invitation with the details once the date is set. Thanks for helping us choose!',
    contact: 'festivals@stbernardprep.com'
  };
  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbyKz9cwP5pT09BVz_AmRBTuYGlCUDDc3AomjMdDUOolur82MdCq2jocbVlraD9y1S5u/exec';      // the Apps Script web app URL (…/exec); until it is set the poll asks people to email

  var box = document.getElementById('sbp-alumni-poll');
  if (!box || box.getAttribute('data-ready')) return;
  box.setAttribute('data-ready', '1');

  var K = '#sbp-alumni-poll';
  // Matches the CMS page around it (alumni/reunions-events): centered text, uppercase Gyst headings on a pale-blue
  // highlight band, light Interstate body text, gold-outlined pill buttons.
  var CSS = K + '{--navy:#01253d;--navy2:#052e4a;--gold:#d8b95c;--golddk:#8a6a10;--band:rgba(167,196,210,.25);--tint:#f4f8fa;--ink:#000;--mute:#4d5f6b;--line:#c9dae3;--red:#a3271b;--sans:interstate,"Helvetica Neue",Helvetica,Arial,sans-serif;--disp:gyst-variable,"Helvetica Neue",Helvetica,Arial,sans-serif;display:block;position:relative;max-width:640px;margin:0 auto 3rem;color:var(--ink);font-family:var(--sans);font-size:19px;font-weight:300;line-height:31px;text-align:center;word-break:normal;overflow-wrap:break-word;container-type:inline-size;container-name:sbppoll}' +
    K + ' *,' + K + ' *::before,' + K + ' *::after{box-sizing:border-box}' +
    K + ' p{display:block;margin:0;padding:0;color:inherit;font:inherit}' +
    K + ' h2,' + K + ' h3{margin:0 0 20px;padding:0;color:var(--navy);font-family:var(--disp);font-weight:400;line-height:1.15;text-transform:uppercase;letter-spacing:0}' +
    K + ' h2{font-size:46px}' + K + ' h3{font-size:34px}' +
    K + ' .ap-band{padding:2px 8px;background:var(--band);-webkit-box-decoration-break:clone;box-decoration-break:clone}' +
    K + ' b{font-weight:500;background:none;padding:0}' +
    K + ' a{color:var(--navy);font-weight:400;text-decoration:underline;text-decoration-color:var(--gold);text-decoration-thickness:2px;text-underline-offset:3px}' +
    K + ' a::after{content:none}' +
    K + ' button{margin:0;padding:0;border:0;background:none;color:inherit;font:inherit;line-height:inherit;text-transform:none;letter-spacing:inherit;cursor:pointer;border-radius:0;box-shadow:none;min-width:0;min-height:0;width:auto;height:auto}' +
    K + ' button::before,' + K + ' button::after{content:none}' +
    K + ' fieldset{margin:0;padding:0;border:0;min-width:0}' +
    K + ' legend{margin:0;padding:0}' +
    K + ' label{display:block;margin:0;font:inherit;color:inherit;text-transform:none;letter-spacing:0}' +
    K + ' input[type=text]{display:block;width:100%;height:auto;margin:0;padding:12px 14px;background:#fff;border:1px solid var(--line);border-radius:0;box-shadow:none;color:var(--ink);font-family:var(--sans);font-size:18px;font-weight:400;line-height:1.3;text-align:left}' +
    K + ' input[type=text]::placeholder{color:#8a9aa5;opacity:1}' +
    K + ' input[type=text]:focus{outline:2px solid var(--gold);outline-offset:1px;border-color:var(--navy)}' +
    K + ' button:focus-visible{outline:3px solid var(--gold);outline-offset:3px}' +
    K + ' .ap-q{margin:0 0 6px}' +
    K + ' .ap-hint{margin:0 0 26px;color:var(--mute);font-size:17px}' +
    K + ' .ap-opts{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0 0 28px}' +
    K + ' .ap-opt{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:112px;padding:16px 14px;background:var(--tint);border:1px solid var(--line);color:var(--navy);cursor:pointer;transition:border-color .15s,background-color .15s,color .15s}' +
    K + ' .ap-opt:hover{border-color:var(--gold)}' +
    K + ' .ap-opt input{position:absolute;opacity:0;width:1px;height:1px;margin:0;pointer-events:none}' +
    K + ' .ap-opt .ap-big{display:block;font-family:var(--disp);font-size:27px;line-height:1.1;text-transform:uppercase}' +
    K + ' .ap-opt .ap-sub{display:block;margin-top:6px;color:var(--mute);font-size:15.5px;line-height:1.35}' +
    K + ' .ap-opt.is-on{background:var(--navy);border-color:var(--navy);color:#fff}' +
    K + ' .ap-opt.is-on .ap-sub{color:rgba(255,255,255,.85)}' +
    K + ' .ap-opt.is-on::after{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:var(--gold)}' +
    K + ' .ap-opt:focus-within{outline:3px solid var(--gold);outline-offset:2px}' +
    K + ' .ap-fields{display:grid;grid-template-columns:1fr;gap:14px;margin:0 0 26px;text-align:left}' +
    K + ' .ap-fields .ap-lab{display:block;margin:0 0 4px;color:var(--navy);font-size:16px;font-weight:500;line-height:1.4}' +
    K + ' .ap-fields .ap-lab small{color:var(--mute);font-size:15px;font-weight:300}' +
    K + ' .ap-trap{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}' +
    K + ' button.ap-btn{display:inline-flex;align-items:center;justify-content:center;padding:15px 40px;background:transparent;border:1px solid var(--gold);border-radius:35px;color:var(--navy);font-family:var(--sans);font-size:21px;font-weight:400;line-height:1.2;transition:background-color .18s,color .18s,border-color .18s}' +
    K + ' button.ap-btn:hover{background:var(--navy);border-color:var(--navy);color:#fff}' +
    K + ' button.ap-btn:disabled{opacity:.6;cursor:wait}' +
    K + ' .ap-msg{min-height:31px;margin-top:12px;color:var(--mute);font-size:17px}' +
    K + ' .ap-msg.is-err{color:var(--red);font-weight:400}' +
    K + ' .ap-done{padding:6px 0 0}' +
    K + ' .ap-pick{display:inline-block;margin:0 0 18px;padding:10px 20px;background:var(--navy);border-top:4px solid var(--gold);color:#fff;font-weight:400}' +
    K + ' .ap-thx{max-width:34rem;margin:0 auto 16px}' +
    K + ' button.ap-change{color:var(--navy);font-size:17px;text-decoration:underline;text-decoration-color:var(--gold);text-decoration-thickness:2px;text-underline-offset:3px}' +
    '@container sbppoll (min-width:560px){' + K + ' .ap-fields{grid-template-columns:2fr 1fr}}' +
    '@container sbppoll (max-width:480px){' + K + ' h2{font-size:34px}' + K + ' h3{font-size:27px}' + K + ' .ap-opt{min-height:96px;padding:14px 10px}' + K + ' .ap-opt .ap-big{font-size:22px}' + K + ' .ap-opt .ap-sub{font-size:14.5px}}' +
    '@container sbppoll (max-width:330px){' + K + ' .ap-opts{grid-template-columns:1fr}}';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function optBy(v) { for (var i = 0; i < POLL.options.length; i++) if (POLL.options[i].v === v) return POLL.options[i]; return null; }

  var KEY = 'sbp-poll-' + POLL.id;
  var who = store(KEY + '-id');
  if (!who) { who = Math.random().toString(36).slice(2) + Date.now().toString(36); store(KEY + '-id', who); }
  var saved = null;
  try { saved = JSON.parse(store(KEY) || 'null'); } catch (e) { saved = null; }

  var closed = POLL.closes && Date.now() > new Date(POLL.closes).getTime();
  var mail = '<a href="mailto:' + POLL.contact + '">' + POLL.contact + '</a>';

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  function head() {
    return '<h2><span class="ap-band">' + esc(POLL.eyebrow) + '</span></h2>' +
      '<p class="ap-q" id="ap-q">' + esc(POLL.question) + '</p>' +
      '<p class="ap-hint">' + esc(POLL.hint) + (POLL.closesText && !closed ? ' ' + esc(POLL.closesText) : '') + '</p>';
  }

  function drawForm(pre) {
    pre = pre || {};
    var opts = POLL.options.map(function (o) {
      var on = pre.choice === o.v;
      return '<label class="ap-opt' + (on ? ' is-on' : '') + '"><input type="radio" name="choice" value="' + o.v + '"' + (on ? ' checked' : '') + '>' +
        '<span class="ap-big">' + esc(o.big) + '</span>' +
        '<span class="ap-sub">' + esc(o.date ? o.date + ', ' + o.time + ' only' : o.sub) + '</span></label>';
    }).join('');
    box.innerHTML = head() + '<form novalidate>' +
      '<fieldset><legend class="ap-trap">' + esc(POLL.question) + '</legend><div class="ap-opts" role="radiogroup" aria-labelledby="ap-q">' + opts + '</div></fieldset>' +
      '<div class="ap-fields">' +
        '<label><span class="ap-lab">Your name</span><input type="text" name="name" autocomplete="name" maxlength="120" value="' + esc(pre.name || '') + '"></label>' +
        '<label><span class="ap-lab">Class of <small>(optional)</small></span><input type="text" name="year" inputmode="numeric" maxlength="12" placeholder="e.g. 1998" value="' + esc(pre.year || '') + '"></label>' +
      '</div>' +
      '<label class="ap-trap" aria-hidden="true">Leave empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label>' +
      '<button type="submit" class="ap-btn">Send my answer</button><p class="ap-msg" role="status" aria-live="polite"></p>' +
      '</form>';

    var form = box.querySelector('form'), msg = box.querySelector('.ap-msg'), btn = box.querySelector('.ap-btn');
    Array.prototype.forEach.call(form.querySelectorAll('input[name=choice]'), function (r) {
      r.addEventListener('change', function () {
        Array.prototype.forEach.call(form.querySelectorAll('.ap-opt'), function (l) { l.classList.toggle('is-on', l.querySelector('input').checked); });
      });
    });
    function err(t) { msg.className = 'ap-msg is-err'; msg.innerHTML = t; }
    form.addEventListener('input', function () { if (msg.className.indexOf('is-err') > -1) { msg.className = 'ap-msg'; msg.textContent = ''; } });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var c = form.querySelector('input[name=choice]:checked');
      var name = form.name.value.trim(), year = form.year.value.trim();
      if (!c) return err('Please choose one of the four answers.');
      if (!name) { form.name.focus(); return err('Please type your name, so we know who answered.'); }
      if (!SHEET_URL) return err('The poll isn’t taking answers online yet. Please email ' + mail + '.');
      btn.disabled = true; msg.className = 'ap-msg'; msg.textContent = 'Sending…';
      var body = new URLSearchParams({ poll: POLL.id, id: who, choice: c.value, answer: optBy(c.value).label, name: name, year: year, website: form.website.value });
      fetch(SHEET_URL, { method: 'POST', body: body })   // a plain form post: no CORS preflight, which Apps Script can't answer
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (!res || !res.ok) throw new Error(res && res.error || 'failed');
          saved = { choice: c.value, name: name, year: year };
          store(KEY, JSON.stringify(saved));
          drawDone(true);
        })
        .catch(function (e) {
          btn.disabled = false;
          err(/closed/.test(e && e.message) ? 'Sorry, the poll has closed.' : 'Sorry, your answer didn’t go through. Please try again, or email ' + mail + '.');
        });
    });
  }

  function drawDone(fresh) {
    var o = optBy(saved.choice);
    box.innerHTML = '<h2><span class="ap-band">' + esc(POLL.eyebrow) + '</span></h2><div class="ap-done" role="status">' +
      '<h3><span class="ap-band">' + (fresh ? 'Thank you' : 'You’ve answered') + (saved.name ? ', ' + esc(saved.name.split(' ')[0]) : '') + '!</span></h3>' +
      '<p class="ap-pick">' + esc(o ? o.label : saved.choice) + '</p>' +
      '<p class="ap-thx">' + esc(POLL.thanks) + '</p>' +
      (closed ? '' : '<button type="button" class="ap-change">Change my answer</button>') + '</div>';
    var ch = box.querySelector('.ap-change');
    if (ch) ch.addEventListener('click', function () { drawForm(saved); });
    if (fresh) box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function drawClosed() {
    box.innerHTML = '<h2><span class="ap-band">' + esc(POLL.eyebrow) + '</span></h2><h3><span class="ap-band">The poll has closed</span></h3>' +
      '<p class="ap-thx">Thank you to everyone who answered. Questions? Email ' + mail + '.</p>';
  }

  if (saved && saved.choice) drawDone(false);
  else if (closed) drawClosed();
  else drawForm();
})();
