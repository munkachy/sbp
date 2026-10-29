// The Benedictine Beat, the school podcast, all on one page of the school website (SPRX CMS). The CMS page holds only
//   <div class="sbp" id="sbp-podcast"><p>Loading The Benedictine Beat…</p></div>
//   <script src="https://munkachy.github.io/sbp/embed/podcast.js" defer></script>
// and this file draws it: episode tabs, a listening card (cover and player) beside the essay.
//
// TO ADD AN EPISODE: put the audio in ../audio/beat-N.m4a and a square cover in ../images/beat-N.jpg, add an entry at the
// top of the list below (newest first), commit, push. "release" hides it until that moment (school time, Central);
// add ?preview to the page address to see unreleased episodes. "soundcloud" is used only while an episode has no "audio".
(function () {
  var EPISODES = /* EPISODES */ [
    {"n": 3, "guest": "Dr. Craig Mann", "short": "Dr. Craig Mann", "role": "Music Teacher", "title": "The Lessons We Learn When Making Music", "by": "Rachael Stover", "release": "2026-10-30T07:00:00-05:00", "length": "15:54", "art": "images/beat-3.jpg", "audio": "audio/beat-3.m4a", "essay": ["There are some things a student can learn by reading about them.", "And then there are things that must be held in the hands before they can be fully learned. The Appalachian dulcimer is one of those things.", "There is something special about an instrument that carries so much history in such a simple form. The dulcimer was not created with complicated machinery. It asks for patience, attention, and a willingness to try. A student must learn where to place his fingers, how to listen, and how to make something beautiful from what is in front of him.", "These are small lessons. But I have come to believe that small lessons are often the ones that stay with us.", "Dr. Mann's music class at St. Bernard Prep is, to the best of my knowledge, the only high school music class focused on the Appalachian dulcimer. That makes the work of our students especially meaningful. They are not simply learning to play an instrument. They are helping to preserve a musical tradition created in America.", "Recently, our students were invited to perform at the Cullman Oktoberfest Ball. I think opportunities like this remind us why music education matters. What begins in a classroom can eventually find its way into the wider community. Students who have spent time learning notes, practicing melodies, and working through the frustrations of a new instrument are given the opportunity to share what they have learned with others.", "There is something gratifying about watching that happen. The classroom becomes more than a place where a teacher delivers information and students receive it. It becomes a place where preparation leads to participation, and where young people begin to understand that their work has value beyond a grade.", "There are things we can explain to students, and there are things we must allow them to experience. A student can read about the Appalachian dulcimer, learn where it came from, and memorize the names of its parts. But none of that quite replaces the experience of picking one up and discovering how it sounds. The first notes will be awkward. The melody will take time. But the student begins to understand something that a description alone cannot provide.", "He learns by doing.", "I think our schools sometimes underestimate the importance of this kind of learning. Educators want students to know the right answers. But we should also want them to develop patience, confidence, and a willingness to keep working when something does not come easily. Those qualities are not always developed through lectures or examinations. Often, they grow through the ordinary work of making something with one's own hands.", "And sometimes, if we are fortunate, that work produces music.", "The Appalachian dulcimer may be an unexpected focus for a high school music class. But perhaps that is part of its value. It reminds us that education does not always have to follow the most familiar path to be worthwhile. Sometimes the most memorable lessons come from traditions we might otherwise overlook and instruments we might never have thought to play.", "And when those students carry what they have learned from the classroom to a gathering like the Cullman Oktoberfest Ball, we see something worth celebrating: not simply that they have learned to play an instrument, but that they have discovered what can happen when learning becomes something they do for themselves.", "St. Bernard Prep asks students to take part in their own education."]},
    {"n": 2, "guest": "Brother Damien Jackson, O.S.B.", "short": "Br. Damien Jackson", "role": "Latin Teacher", "title": "What Latin and Monks Can Teach Us About Living Together", "by": "Rachael Stover", "length": "10:45", "art": "images/beat-2.jpg", "audio": "audio/beat-2.m4a", "soundcloud": "https://soundcloud.com/st-bernard-preparatory-school/benedictine-beat-2", "essay": ["A student might reasonably ask, why are we learning a language that most people no longer speak in everyday conversation? I think it is a fair question. And I think the answer has less to do with translating a sentence than we might expect.", "Latin asks us to slow down. It asks us to pay attention to the relationship between words, to notice small differences, and to understand that meaning does not always reveal itself immediately. You cannot always guess your way through it. You have to look carefully, try again, and sometimes admit that you have gotten it wrong. There is something good about that kind of learning.", "At St. Bernard Prep, Latin also connects us to something much older than the school itself. It connects us to the monks who have prayed, studied, worked, and lived together here for generations. Their lives are not exactly like ours. They follow a particular religious vocation, with commitments that many of us will never make. But there is something in their daily life that I think the rest of us can learn from.", "A monastery is, among other things, a community of people who have agreed to live together. That may sound simple until we remember how difficult it can be to live with other people. We all have our preferences. We like things done a certain way. We have our own ideas about what is fair, what is important, and who ought to be doing what. Even people who care for one another can find it difficult to share space, time, and responsibility.", "I wonder if this is one of the reasons a school like St. Bernard matters so much. Education is not only about preparing a student to succeed as an individual. It is also about preparing him to live well with other people. We want our students to think clearly, speak honestly, and make good decisions. But we also want them to learn how to listen, how to be patient, how to contribute, and how to recognize that their actions affect the people around them.", "Latin can teach some of those lessons in its own quiet way. So can the presence of the monks. When a student studies Latin, he enters a conversation that began long before he was born. He encounters a language that shaped centuries of prayer, philosophy, law, and literature.", "And when a student sees the monks going about their daily lives, he has the opportunity to encounter another kind of lesson. Sometimes simply seeing a different way to live is enough to make us reconsider our own.", "I think we sometimes underestimate the value of that lesson in a world that encourages us to make nearly everything personal: our success, our opinions, our time, even our identity. We are told to find our own path, which is not necessarily bad advice. But we can become so focused on our individual paths that we forget we are walking alongside other people.", "The Benedictine tradition offers a different emphasis. It reminds us that a good life is not simply something we build for ourselves. It is something we practice with others, through ordinary acts of faithfulness, hospitality, and care. Often, those acts are not particularly impressive. They are small and repeated. A hidden life if you will.", "At St. Bernard, our students are preparing for a future that will look different from the world we know today. They will need technical skills, sound judgment, and the ability to adapt. They will also need something harder to measure: the ability to live with others, to recognize what is worth preserving, and to understand that being educated means more than knowing something.", "Perhaps a student will leave Latin class remembering a particular translation. Perhaps he will remember a difficult grammar lesson, or the satisfaction of finally understanding a passage.", "But I hope he leaves with something else. I hope he begins to appreciate the patience required to understand something unfamiliar. I hope he sees that the past is not as distant as it appears. And I hope that, by living and learning in a place shaped by the Benedictine tradition, he begins to understand that a meaningful life is not measured only by what he accomplishes, but also by what he gives to the people around him.", "We do not need to become monks to learn from the monks. We do not need to become Latin scholars to benefit from Latin. We simply need to be willing to pay attention.", "Sometimes the oldest lessons are the ones we most need to learn."]},
    {"n": 1, "guest": "James Griffin", "short": "James Griffin", "role": "History Teacher", "title": "What Thucydides Can Teach Us About Being Human", "by": "Rachael Stover", "length": "8:17", "art": "images/beat-1.jpg", "audio": "audio/beat-1.m4a", "soundcloud": "https://soundcloud.com/st-bernard-preparatory-school/benedictine-beat-episode-1", "essay": ["There are some books that we read because we are supposed to know them.", "And then there are books that, if we are fortunate, read us back. Thucydides' <em>History of the Peloponnesian War</em> is one of those books.", "More than two thousand years have passed since Thucydides watched Athens and Sparta move toward war, yet when I listen to a good history teacher discuss his work with students, I am struck by how little distance there really is between the ancient world and our own. The names are different. The weapons are different. The political institutions are different. But the people are remarkably familiar to us now. They are afraid. They want to be respected. They want security. They want power. They want to belong.", "They convince themselves that what they desire is also what is right.", "And, sometimes, they discover too late that the two are not the same thing. This is one reason I believe a school should ask more of history than the memorization of dates. History ought to help a young person become more observant about the human person. It should teach him not simply what happened, but something about why people act as they do, and, perhaps most importantly, something about oneself.", "That is where James Griffin's history classroom at St. Bernard Prep becomes especially important. Mr. Griffin is not simply a history teacher. He is also a lawyer. That combination matters. The lawyer is trained to listen carefully to competing claims, to distinguish assertion from evidence, to pay attention to motives and consequences, and to recognize that the story people tell about themselves is not always identical to the truth of what they have done.", "Those are useful habits in a history classroom. They are even more useful habits for life."]}
  ] /* END EPISODES */;
  var BASE = 'https://munkachy.github.io/sbp/';
  var SHOW = { title: 'The Benedictine Beat', by: 'A podcast from St. Bernard Preparatory School',
    about: 'Short conversations with the teachers, monks, coaches and staff who shape daily life at St. Bernard, each with an essay to read alongside. Whether you are a current parent, an alumnus, a prospective family or simply curious, we invite you to listen and get to know the people behind the school.' };

  var CSS = '#sbp-podcast{--navy:#01253d;--gold:#d8b95c;--golddk:#8a6a10;--goldsoft:#f9f0d3;--cream:#fcf9f0;--ink:#10202b;--mute:#566b7a;--line:#d3e0e7;--sans:interstate,"Helvetica Neue",Helvetica,Arial,sans-serif;--disp:gyst-variable,Georgia,serif;display:block;margin:0 0 3rem;color:var(--ink);font-family:var(--sans);font-size:17px;line-height:1.6;text-align:left;container-type:inline-size;container-name:sbpbeat}' +
    '#sbp-podcast *,#sbp-podcast *::before,#sbp-podcast *::after{box-sizing:border-box}' +
    '#sbp-podcast p{margin:0 0 1.1em;padding:0;font:inherit;color:inherit}' +
    '#sbp-podcast h2,#sbp-podcast h3{margin:0;padding:0;font-family:var(--disp);font-weight:400;line-height:1.1;color:var(--navy);text-transform:none;letter-spacing:0}' +
    '#sbp-podcast button{margin:0;padding:0;border:0;background:none;color:inherit;font:inherit;cursor:pointer;min-width:0;min-height:0;box-shadow:none;border-radius:0;text-transform:none;letter-spacing:inherit}' +
    '#sbp-podcast button::before,#sbp-podcast button::after{content:none}' +
    '#sbp-podcast button:focus-visible,#sbp-podcast input:focus-visible{outline:3px solid var(--gold);outline-offset:3px}' +
    '#sbp-podcast img{max-width:100%;margin:0;border-radius:0;box-shadow:none}' +
    '#sbp-podcast .bb-eyebrow{display:block;margin:0 0 8px;color:var(--golddk);font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}' +
    '#sbp-podcast .bb-about{max-width:46rem;color:var(--mute);font-size:17px;margin:0 0 22px}' +
    /* episode tabs */
    '#sbp-podcast .bb-tabs{display:flex;gap:10px;margin:0 0 28px;padding:2px 2px 8px;overflow-x:auto;scrollbar-width:thin}' +
    '#sbp-podcast .bb-tab{display:flex;flex:none;align-items:center;gap:10px;padding:5px 16px 5px 5px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--navy);font-size:15px;font-weight:500;line-height:1.2;white-space:nowrap;transition:border-color .15s,background-color .15s}' +
    '#sbp-podcast .bb-tab:hover{border-color:var(--gold)}' +
    '#sbp-podcast .bb-tab img{width:34px;height:34px;border-radius:50%;object-fit:cover;flex:none}' +
    '#sbp-podcast .bb-tab small{display:block;color:var(--golddk);font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}' +
    '#sbp-podcast .bb-tab[aria-selected="true"]{background:var(--navy);border-color:var(--navy);color:#fff}' +
    '#sbp-podcast .bb-tab[aria-selected="true"] small{color:var(--gold)}' +
    '#sbp-podcast .bb-new{margin-left:2px;padding:2px 7px;border-radius:999px;background:var(--gold);color:var(--navy);font-size:10px;font-weight:700;letter-spacing:.08em}' +
    /* listening card */
    '#sbp-podcast .bb-grid{display:grid;grid-template-columns:1fr;gap:30px;align-items:start}' +
    '#sbp-podcast .bb-card{overflow:hidden;border-radius:20px;background:var(--navy);color:#fff;box-shadow:0 24px 50px -28px rgba(1,37,61,.9)}' +
    '#sbp-podcast .bb-art{display:block;width:100%;aspect-ratio:1;object-fit:cover;background:#0a3654}' +
    '#sbp-podcast .bb-in{padding:20px 22px 22px;border-top:4px solid var(--gold)}' +
    '#sbp-podcast .bb-in .bb-eyebrow{color:var(--gold)}' +
    '#sbp-podcast .bb-guest{display:block;margin:0 0 4px;font-family:var(--disp);font-size:27px;line-height:1.12}' +
    '#sbp-podcast .bb-role{display:block;margin:0 0 18px;color:rgba(252,249,240,.75);font-size:15px}' +
    '#sbp-podcast .bb-player{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;align-items:center}' +
    '#sbp-podcast .bb-play{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--gold);color:var(--navy);box-shadow:0 10px 20px -10px rgba(216,185,92,.9);transition:transform .15s}' +
    '#sbp-podcast .bb-play:hover{transform:scale(1.05)}' +
    '#sbp-podcast .bb-play svg{width:22px;height:22px}' +
    '#sbp-podcast input.bb-seek{-webkit-appearance:none;appearance:none;width:100%;height:6px;margin:0;border-radius:6px;background:linear-gradient(var(--gold),var(--gold)) 0/var(--p,0%) 100% no-repeat,rgba(255,255,255,.2);cursor:pointer}' +
    '#sbp-podcast input.bb-seek::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:0}' +
    '#sbp-podcast input.bb-seek::-moz-range-thumb{width:15px;height:15px;border-radius:50%;background:#fff;border:0}' +
    '#sbp-podcast .bb-times{display:flex;justify-content:space-between;margin-top:7px;color:rgba(252,249,240,.7);font-size:12.5px;font-variant-numeric:tabular-nums}' +
    '#sbp-podcast .bb-ctrls{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:10px}' +
    '#sbp-podcast .bb-ctrls button{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border:1px solid rgba(216,185,92,.45);border-radius:999px;color:var(--cream);font-size:13px;font-weight:500}' +
    '#sbp-podcast .bb-ctrls button:hover{background:rgba(216,185,92,.15)}' +
    '#sbp-podcast .bb-ctrls svg{width:15px;height:15px}' +
    '#sbp-podcast .bb-sc{display:block;width:100%;height:166px;border:0;border-radius:10px;background:#fff}' +
    /* essay */
    '#sbp-podcast .bb-essay{max-width:40rem;font-size:18px;line-height:1.75}' +
    '#sbp-podcast .bb-essay h3{margin:0 0 .35em;font-size:clamp(28px,4cqw,38px)}' +
    '#sbp-podcast .bb-essay .bb-by{margin:0 0 1.6em;color:var(--mute);font-size:15px}' +
    '#sbp-podcast .bb-essay .bb-body>p:first-child{display:flow-root}' +
    '#sbp-podcast .bb-essay .bb-body>p:first-child::first-letter{float:left;margin:.06em .12em 0 0;color:var(--navy);font-family:var(--disp);font-size:4.1em;line-height:.8}' +
    '#sbp-podcast .bb-essay em{font-style:italic}' +
    '#sbp-podcast .bb-essay .bb-end{margin:2em 0 0;padding-top:1em;border-top:1px solid var(--gold);color:var(--mute);font-size:15px}' +
    '@container sbpbeat (min-width:640px){' +
      '#sbp-podcast .bb-grid{grid-template-columns:minmax(240px,300px) 1fr;gap:clamp(28px,4cqw,48px)}' +
      '#sbp-podcast .bb-card{position:sticky;top:120px}' +
    '}' +
    '@container sbpbeat not (min-width:640px){' +
      '#sbp-podcast .bb-art{aspect-ratio:16/10;object-position:50% 28%}' +
    '}' +
    '@media (prefers-reduced-motion:reduce){#sbp-podcast *{transition:none!important}}';

  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/></svg>',
    fwd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4"/></svg>'
  };

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var clock = function (t) { t = Math.max(0, Math.floor(t || 0)); var m = Math.floor(t / 60), s = t % 60; return m + ':' + (s < 10 ? '0' : '') + s; };
  var url = function (p) { return /^https?:/.test(p) ? p : BASE + p; };

  function start() {
    var root = document.getElementById('sbp-podcast');
    if (!root || root.getAttribute('data-live')) return;
    root.setAttribute('data-live', '1');

    var preview = /[?&]preview\b/.test(location.search), now = Date.now();
    var eps = EPISODES.filter(function (e) { return preview || !e.release || Date.parse(e.release) <= now; });
    if (!eps.length) return;
    var newest = eps[0].n;

    root.innerHTML = '<style>' + CSS + '</style>' +
      '<span class="bb-eyebrow">' + esc(SHOW.by) + '</span><p class="bb-about">' + esc(SHOW.about) + '</p>' +
      '<div class="bb-tabs" role="tablist" aria-label="Episodes">' + eps.map(function (e) {
        return '<button type="button" class="bb-tab" role="tab" id="bb-tab-' + e.n + '" data-ep="' + e.n + '" aria-controls="bb-panel">' +
          '<img src="' + url(e.art) + '" alt=""><span><small>Episode ' + e.n + (e.n === newest ? ' <span class="bb-new">NEW</span>' : '') + '</small>' + esc(e.short || e.guest) + '</span></button>';
      }).join('') + '</div>' +
      '<div class="bb-grid" id="bb-panel" role="tabpanel"><div class="bb-card"></div><article class="bb-essay"></article></div>';

    var $ = function (s) { return root.querySelector(s); };
    var audio = new Audio(), cur = null, speeds = [1, 1.25, 1.5, 2], sp = 0;
    audio.preload = 'metadata';

    function show(n, focus) {
      var e = eps.filter(function (x) { return x.n === n; })[0] || eps[0];
      cur = e;
      Array.prototype.forEach.call(root.querySelectorAll('.bb-tab'), function (t) {
        var on = +t.getAttribute('data-ep') === e.n; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      });
      $('#bb-panel').setAttribute('aria-labelledby', 'bb-tab-' + e.n);
      audio.pause();
      var player;
      if (e.audio) {
        audio.src = url(e.audio); audio.playbackRate = speeds[sp];
        player = '<div class="bb-player"><button type="button" class="bb-play" aria-label="Play">' + ICON.play + '</button>' +
          '<div><input class="bb-seek" type="range" min="0" max="1000" value="0" aria-label="Position"><div class="bb-times"><span class="bb-at">0:00</span><span class="bb-len">' + (e.length || '') + '</span></div></div>' +
          '<div class="bb-ctrls"><button type="button" data-skip="-15" aria-label="Back 15 seconds">' + ICON.back + '15</button>' +
          '<button type="button" class="bb-speed" aria-label="Playback speed">' + speeds[sp] + '×</button>' +
          '<button type="button" data-skip="30" aria-label="Forward 30 seconds">30' + ICON.fwd + '</button></div></div>';
      } else {
        audio.removeAttribute('src');
        player = '<iframe class="bb-sc" title="' + esc('Episode ' + e.n + ' on SoundCloud') + '" allow="autoplay" loading="lazy" src="https://w.soundcloud.com/player/?url=' +
          encodeURIComponent(e.soundcloud) + '&color=%23d8b95c&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"></iframe>';
      }
      $('.bb-card').innerHTML = '<img class="bb-art" src="' + url(e.art) + '" alt="' + esc(e.guest) + '">' +
        '<div class="bb-in"><span class="bb-eyebrow">Episode ' + e.n + '</span><span class="bb-guest">' + esc(e.guest) + '</span><span class="bb-role">' + esc(e.role) + '</span>' + player + '</div>';
      $('.bb-essay').innerHTML = '<span class="bb-eyebrow">The essay</span><h3>' + esc(e.title) + '</h3><p class="bb-by">By ' + esc(e.by) + '</p>' +
        '<div class="bb-body">' + e.essay.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>' +
        '<p class="bb-end">The Benedictine Beat, episode ' + e.n + '. ' + esc(e.guest) + ', ' + esc(e.role) + '.</p>';
      if (history.replaceState) history.replaceState(null, '', '#episode-' + e.n);
      if ('mediaSession' in navigator && e.audio) navigator.mediaSession.metadata = new MediaMetadata({ title: 'Episode ' + e.n + ': ' + e.guest, artist: SHOW.title, album: 'St. Bernard Preparatory School', artwork: [{ src: url(e.art), sizes: '600x600', type: 'image/jpeg' }] });
      if (focus) $('.bb-tab[aria-selected="true"]').focus();
    }

    function sync() {
      var btn = $('.bb-play'), seek = $('.bb-seek'); if (!btn) return;
      var playing = !audio.paused;
      btn.innerHTML = playing ? ICON.pause : ICON.play; btn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      if (audio.duration) {
        var pct = audio.currentTime / audio.duration * 100;
        if (!seek.matches(':active')) seek.value = Math.round(pct * 10);
        seek.style.setProperty('--p', pct + '%');
        $('.bb-at').textContent = clock(audio.currentTime); $('.bb-len').textContent = clock(audio.duration);
      }
    }
    ['play', 'pause', 'timeupdate', 'loadedmetadata', 'ended'].forEach(function (ev) { audio.addEventListener(ev, sync); });

    root.addEventListener('click', function (ev) {
      var b = ev.target.closest('button'); if (!b || !root.contains(b)) return;
      if (b.classList.contains('bb-tab')) show(+b.getAttribute('data-ep'));
      else if (b.classList.contains('bb-play')) { audio.paused ? audio.play() : audio.pause(); }
      else if (b.hasAttribute('data-skip')) { audio.currentTime = Math.max(0, Math.min((audio.duration || 0), audio.currentTime + +b.getAttribute('data-skip'))); sync(); }
      else if (b.classList.contains('bb-speed')) { sp = (sp + 1) % speeds.length; audio.playbackRate = speeds[sp]; b.textContent = speeds[sp] + '×'; }
    });
    root.addEventListener('input', function (ev) {
      if (ev.target.classList.contains('bb-seek') && audio.duration) { audio.currentTime = ev.target.value / 1000 * audio.duration; sync(); }
    });
    root.addEventListener('keydown', function (ev) {   // arrow keys move between episode tabs
      if (!ev.target.classList.contains('bb-tab') || !/Arrow(Left|Right)/.test(ev.key)) return;
      var tabs = [].slice.call(root.querySelectorAll('.bb-tab')), i = tabs.indexOf(ev.target) + (ev.key === 'ArrowRight' ? 1 : -1);
      if (tabs[i]) { show(+tabs[i].getAttribute('data-ep'), true); ev.preventDefault(); }
    });
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('seekbackward', function () { audio.currentTime -= 15; });
      navigator.mediaSession.setActionHandler('seekforward', function () { audio.currentTime += 30; });
    }

    var m = /episode-(\d+)/.exec(location.hash);
    show(m ? +m[1] : newest);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
