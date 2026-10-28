// St. Bernard Prep school calendar for the school website (SPRX CMS). Everything lives here; the CMS page holds only
//   <div class="sbp" id="sbp-calendar"><p>Loading the school calendar…</p></div>
//   <script src="https://munkachy.github.io/sbp/embed/calendar.js" defer></script>
// and this file draws the whole calendar into that div: coming up, month view, list, filters, "Add to calendar".
//
// TO CHANGE AN EVENT: edit the list below and commit. The live site picks it up within about 10 minutes.
// d = first day, end = last day (only for events that run several days), at = time, where = place,
// note = extra line, c = category: "event", "academic", "noschool" or "admissions".
(function () {
  var EVENTS = /* EVENTS */ [
    {"d": "2026-08-05", "end": "2026-08-07", "t": "Teacher Workdays", "c": "academic"},
    {"d": "2026-08-09", "t": "Orientation Day", "note": "Mass 10:30am; lunch 11:45am", "c": "event"},
    {"d": "2026-08-10", "t": "Classes Begin", "c": "academic"},
    {"d": "2026-08-14", "t": "Blue and White Day", "note": "Dismiss at 2pm", "c": "event"},
    {"d": "2026-09-07", "t": "Labor Day", "note": "No school", "c": "noschool"},
    {"d": "2026-09-08", "t": "Mid 1st Quarter", "note": "Grades due 9/10, 9am", "c": "academic"},
    {"d": "2026-09-12", "end": "2026-09-13", "t": "Bernard Blues & BBQ", "note": "All are asked to volunteer", "c": "event"},
    {"d": "2026-10-06", "t": "Fall Concert", "at": "6pm", "where": "Byre", "c": "event"},
    {"d": "2026-10-07", "t": "End of 1st Quarter", "note": "Grades due 10/9, 9am", "c": "academic"},
    {"d": "2026-10-12", "t": "Columbus Day", "note": "No school", "c": "noschool"},
    {"d": "2026-10-23", "t": "Parents' Night & Concert", "note": "Early dismissal", "c": "event"},
    {"d": "2026-11-06", "t": "Open House", "c": "admissions"},
    {"d": "2026-11-06", "t": "Mid 2nd Quarter", "note": "Grades due 11/9, 9am", "c": "academic"},
    {"d": "2026-11-19", "t": "Middle School Spelling Bee", "at": "8am", "where": "Founders' Hall", "c": "event"},
    {"d": "2026-11-23", "end": "2026-11-27", "t": "Thanksgiving Break", "note": "Classes resume 11/30", "c": "noschool"},
    {"d": "2026-12-04", "t": "Board Breakfast", "note": "School begins at 10am", "c": "event"},
    {"d": "2026-12-08", "t": "Christmas Concert", "at": "6pm", "where": "Byre", "note": "Band, choir and instruments", "c": "event"},
    {"d": "2026-12-14", "t": "End of 2nd Quarter", "c": "academic"},
    {"d": "2026-12-15", "end": "2026-12-17", "t": "Semester Exams", "note": "Early dismissals; gym closed", "c": "academic"},
    {"d": "2026-12-18", "t": "Teacher Workday", "note": "Grades due 9am", "c": "academic"},
    {"d": "2026-12-18", "end": "2027-01-01", "t": "Christmas Break", "note": "Classes resume 1/4", "c": "noschool"},
    {"d": "2027-01-04", "t": "Classes Resume", "c": "academic"},
    {"d": "2027-01-18", "t": "Martin Luther King Jr. Day", "note": "No school", "c": "noschool"},
    {"d": "2027-02-03", "t": "Mid 3rd Quarter", "note": "Grades due 2/5, 9am", "c": "academic"},
    {"d": "2027-02-06", "t": "Draw Down", "note": "Gym closed 2/4 and 2/5", "c": "event"},
    {"d": "2027-02-15", "t": "Presidents' Day", "note": "No school", "c": "noschool"},
    {"d": "2027-02-26", "end": "2027-02-27", "t": "Theater Production: Frozen", "at": "6:30pm", "where": "Byre", "c": "event"},
    {"d": "2027-03-02", "t": "Spring Concert", "at": "6pm", "where": "Byre", "c": "event"},
    {"d": "2027-03-08", "t": "End of 3rd Quarter", "note": "Grades due 3/10, 9am", "c": "academic"},
    {"d": "2027-03-22", "end": "2027-03-29", "t": "Spring Break", "note": "Classes resume 3/30", "c": "noschool"},
    {"d": "2027-04-14", "t": "Mid 4th Quarter", "note": "Grades due 4/16, 9am", "c": "academic"},
    {"d": "2027-04-17", "end": "2027-04-18", "t": "Bloomin' Festival", "note": "All are asked to volunteer", "c": "event"},
    {"d": "2027-05-05", "t": "Middle School Honors Ceremony", "at": "2pm", "c": "event"},
    {"d": "2027-05-05", "t": "High School Honors Ceremony", "at": "6pm", "where": "Byre", "c": "event"},
    {"d": "2027-05-11", "t": "End of Year Concert", "at": "6pm", "where": "Quad (Byre if it rains)", "c": "event"},
    {"d": "2027-05-12", "t": "Athletic Ceremony", "at": "6pm", "where": "Gym", "c": "event"},
    {"d": "2027-05-14", "t": "Field Day", "note": "Dismiss at 2pm", "c": "event"},
    {"d": "2027-05-17", "t": "End of 4th Quarter", "note": "Grades due 5/21, 9am", "c": "academic"},
    {"d": "2027-05-18", "end": "2027-05-20", "t": "Semester Exams", "note": "Early dismissals", "c": "academic"},
    {"d": "2027-05-21", "t": "Teacher Workday", "note": "Grades due 9am", "c": "academic"},
    {"d": "2027-05-23", "t": "Baccalaureate Mass", "at": "10:30am", "c": "event"},
    {"d": "2027-05-23", "t": "Graduation", "at": "2pm", "c": "event"}
  ] /* END EVENTS */;
  var YEAR = '2026–2027', FIRST = '2026-08', LAST = '2027-05';   // the school year and the months it spans

  var CATS = {
    event:      { name: 'Events',     one: 'Event' },
    academic:   { name: 'Academic',   one: 'Academic' },
    noschool:   { name: 'No school',  one: 'No school' },
    admissions: { name: 'Admissions', one: 'Admissions' }
  };
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  var CSS = '#sbp-calendar{--navy:#01253d;--gold:#d8b95c;--golddk:#8a6a10;--goldsoft:#f9f0d3;--cream:#fcf9f0;--ink:#10202b;--mute:#566b7a;--line:#d3e0e7;--line2:#a7c4d2;--sky:#d6e6ee;--sans:interstate,"Helvetica Neue",Helvetica,Arial,sans-serif;--disp:gyst-variable,"Helvetica Neue",Helvetica,Arial,sans-serif;display:block;position:relative;margin:0 0 3rem;color:var(--ink);font-family:var(--sans);font-size:17px;font-weight:400;line-height:1.5;text-align:left;word-break:normal;overflow-wrap:break-word;container-type:inline-size;container-name:sbpcal}' +
    '#sbp-calendar *,#sbp-calendar *::before,#sbp-calendar *::after{box-sizing:border-box}' +
    '#sbp-calendar p{display:block;margin:0;padding:0;color:inherit;font:inherit}' +
    '#sbp-calendar h2,#sbp-calendar h3{margin:0;padding:0;color:var(--navy);font-family:var(--disp);font-weight:400;line-height:1.08;text-transform:none;letter-spacing:0}' +
    '#sbp-calendar b{font-weight:700;background:none;padding:0}' +
    '#sbp-calendar ul,#sbp-calendar li{margin:0;padding:0;list-style:none}' +
    '#sbp-calendar li::before,#sbp-calendar li::marker{content:none}' +
    '#sbp-calendar button{margin:0;padding:0;border:0;background:none;color:inherit;font:inherit;line-height:inherit;text-transform:none;letter-spacing:inherit;cursor:pointer;border-radius:0;box-shadow:none;min-width:0;min-height:0;width:auto;height:auto}' +
    '#sbp-calendar button::after,#sbp-calendar button::before{content:none}' +
    '#sbp-calendar button:focus-visible{outline:3px solid var(--gold);outline-offset:3px}' +
    '#sbp-calendar [hidden]{display:none!important}' +
    '#sbp-calendar .sbpc-eyebrow{margin:0 0 12px;color:var(--gold);font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}' +
    '#sbp-calendar .sbpc-eyebrow.sbpc-dk{color:var(--golddk)}' +
    /* toolbar */
    /* one row: Month/List, Add all, the four filters */
    '#sbp-calendar .sbpc-tools{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin:0 0 12px}' +
    '#sbp-calendar .sbpc-left{display:flex;align-items:center;gap:8px}' +
    '#sbp-calendar .sbpc-views{display:inline-flex;padding:3px;border:1px solid var(--navy);border-radius:999px}' +
    '#sbp-calendar .sbpc-views button{padding:5px 14px;border-radius:999px;font-size:14px;font-weight:500}' +
    '#sbp-calendar .sbpc-views button[aria-pressed="true"]{background:var(--navy);color:var(--cream)}' +
    '#sbp-calendar .sbpc-addall{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid var(--gold);border-radius:999px;color:var(--navy);font-size:13.5px;white-space:nowrap;font-weight:500;transition:background-color .18s}' +
    '#sbp-calendar .sbpc-addall:hover{background:var(--goldsoft)}' +
    '#sbp-calendar .sbpc-addall svg{width:15px;height:15px;flex:none;color:var(--golddk)}' +
    '#sbp-calendar .sbpc-filters{display:flex;flex-wrap:wrap;gap:6px}' +
    '#sbp-calendar .sbpc-filter{display:inline-flex;align-items:center;gap:6px;padding:6px 11px;background:#fff;border:1px solid var(--line);border-radius:999px;color:var(--navy);font-size:13.5px;font-weight:500;white-space:nowrap;transition:opacity .15s,border-color .15s}' +
    '#sbp-calendar .sbpc-filter:hover{border-color:var(--gold)}' +
    '#sbp-calendar .sbpc-filter[aria-pressed="false"]{opacity:.45}' +
    '#sbp-calendar .sbpc-filter[aria-pressed="false"] i{background:transparent!important}' +
    '#sbp-calendar i.sbpc-k{display:inline-block;flex:none;width:12px;height:12px;border-radius:50%}' +
    '#sbp-calendar .sbpc-k-event{background:var(--gold);border:2px solid var(--gold)}' +
    '#sbp-calendar .sbpc-k-academic{border:2px solid var(--navy)}' +
    '#sbp-calendar .sbpc-k-noschool{background:var(--sky);border:2px solid var(--line2);border-radius:4px!important}' +
    '#sbp-calendar .sbpc-k-admissions{background:var(--navy);border:2px solid var(--navy)}' +
    /* coming up */
    '#sbp-calendar .sbpc-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;align-items:stretch;margin:0 0 22px}' +
    '#sbp-calendar .sbpc-stat{display:flex;flex-direction:column;justify-content:flex-start;width:100%;padding:9px 13px 11px;background:radial-gradient(120% 160% at 100% 0,rgba(70,140,188,.35) 0,rgba(70,140,188,0) 60%),var(--navy);border-top:3px solid var(--gold);border-radius:12px;color:var(--cream);text-align:left;box-shadow:0 10px 22px -16px rgba(1,37,61,.8);transition:transform .18s}' +
    '#sbp-calendar .sbpc-stat:hover{transform:translateY(-2px)}' +
    '#sbp-calendar .sbpc-stat small{display:block;color:var(--gold);font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}' +
    '#sbp-calendar .sbpc-stat .sbpc-big{display:block;margin:1px 0 2px;color:var(--gold);font-family:var(--disp);font-size:21px;line-height:1.1;white-space:nowrap}' +
    '#sbp-calendar .sbpc-stat span.sbpc-what{display:block;color:#fff;font-size:13.5px;font-weight:700;line-height:1.25}' +
    /* month card */
    '#sbp-calendar .sbpc-card{overflow:hidden;background:#fff;border-radius:16px;box-shadow:0 1px 2px rgba(1,37,61,.1),0 16px 34px -18px rgba(1,37,61,.4)}' +
    '#sbp-calendar .sbpc-bar{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;padding:14px 18px;background:var(--navy);color:var(--cream)}' +
    '#sbp-calendar .sbpc-bar h3{color:#fff;font-size:28px;text-align:center}' +
    '#sbp-calendar .sbpc-bar h3 span{color:var(--gold)}' +
    '#sbp-calendar .sbpc-bar button{display:inline-flex;align-items:center;gap:8px;justify-self:start;padding:6px 14px;border:1px solid rgba(216,185,92,.55);border-radius:999px;color:var(--cream);font-size:15px;font-weight:500;transition:background-color .18s,color .18s}' +
    '#sbp-calendar .sbpc-bar button:last-child{justify-self:end}' +
    '#sbp-calendar .sbpc-bar button:hover:not(:disabled){background:var(--gold);color:var(--navy)}' +
    '#sbp-calendar .sbpc-bar button:disabled{opacity:.3;cursor:default}' +
    '#sbp-calendar .sbpc-bar svg{width:16px;height:16px}' +
    '#sbp-calendar .sbpc-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr))}' +
    '#sbp-calendar .sbpc-wd{padding:10px 8px;background:#e8f0f5;color:var(--navy);font-size:12px;font-weight:700;letter-spacing:.12em;text-align:left;text-transform:uppercase}' +
    '#sbp-calendar .sbpc-day{display:flex;flex-direction:column;align-items:stretch;gap:4px;min-height:118px;padding:8px 7px 10px;border-top:1px solid var(--line);border-left:1px solid var(--line);text-align:left;transition:background-color .15s}' +
    '#sbp-calendar .sbpc-day:nth-child(7n+1){border-left:0}' +
    '#sbp-calendar .sbpc-day:hover{background:#f6f9fb}' +
    '#sbp-calendar .sbpc-day.is-out{background:#fbfcfd;color:#b4c1ca;cursor:default}' +
    '#sbp-calendar .sbpc-day.is-off{background:repeating-linear-gradient(135deg,#e4eef3 0 6px,#eef5f8 6px 12px)}' +
    '#sbp-calendar .sbpc-day.is-picked{box-shadow:inset 0 0 0 2px var(--gold)}' +
    '#sbp-calendar .sbpc-num{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;font-size:15px;font-variant-numeric:tabular-nums}' +
    '#sbp-calendar .is-today .sbpc-num{background:var(--gold);color:var(--navy);font-weight:700}' +
    '#sbp-calendar .sbpc-pill{display:block;padding:4px 8px;border-left:3px solid var(--gold);border-radius:5px;background:var(--goldsoft);color:var(--navy);font-size:12.5px;font-weight:500;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '#sbp-calendar .sbpc-pill.c-academic{border-left-color:var(--navy);background:#e8f0f5}' +
    '#sbp-calendar .sbpc-pill.c-noschool{border-left-color:var(--line2);background:var(--sky)}' +
    '#sbp-calendar .sbpc-pill.c-admissions{border-left-color:var(--gold);background:var(--navy);color:#fff}' +
    '#sbp-calendar .sbpc-more{padding-left:4px;color:var(--mute);font-size:12px}' +
    '#sbp-calendar .sbpc-dots{display:none;gap:3px;justify-content:center}' +
    '#sbp-calendar .sbpc-dots i{width:7px;height:7px;border-radius:50%;background:var(--gold)}' +
    '#sbp-calendar .sbpc-dots i.c-academic,#sbp-calendar .sbpc-dots i.c-admissions{background:var(--navy)}' +
    '#sbp-calendar .sbpc-dots i.c-noschool{background:var(--line2)}' +
    '#sbp-calendar .sbpc-todaylink{margin:10px 2px 0;text-align:right}' +
    '#sbp-calendar .sbpc-todaylink button,#sbp-calendar .sbpc-past{color:var(--navy);font-size:15px;font-weight:500;text-decoration:underline;text-decoration-color:var(--gold);text-decoration-thickness:2px;text-underline-offset:3px}' +
    /* event cards */
    '#sbp-calendar h3.sbpc-sh{margin:2.25rem 0 16px;padding:0 0 12px;border-bottom:1px solid var(--gold);font-size:30px}' +
    '#sbp-calendar h3.sbpc-sh span{color:var(--golddk)}' +
    '#sbp-calendar .sbpc-list{display:grid;gap:10px}' +
    '#sbp-calendar li.sbpc-ev{display:grid;grid-template-columns:66px 1fr;gap:6px 14px;align-items:center;padding:12px 14px;background:#fff;border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:14px;transition:background-color .4s}' +
    '#sbp-calendar li.sbpc-ev.c-academic{border-left-color:var(--navy)}' +
    '#sbp-calendar li.sbpc-ev.c-noschool{border-left-color:var(--line2);background:#f4f9fb}' +
    '#sbp-calendar li.sbpc-ev.c-admissions{border-left-color:var(--navy);background:var(--goldsoft)}' +
    '#sbp-calendar li.sbpc-ev.is-flash{background:#f6e8b6}' +
    '#sbp-calendar li.sbpc-ev.is-past{opacity:.6}' +
    '#sbp-calendar .sbpc-date{grid-row:span 2;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:62px;padding:6px 4px;background:var(--navy);border-radius:10px;color:#fff;text-align:center;line-height:1.1}' +
    '#sbp-calendar .sbpc-date small{display:block;color:var(--gold);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}' +
    '#sbp-calendar .sbpc-date b{display:block;margin-top:3px;font-family:var(--disp);font-size:26px;font-weight:400}' +
    '#sbp-calendar .sbpc-date.is-range b{font-family:var(--sans);font-size:16px;font-weight:700}' +
    '#sbp-calendar .sbpc-date.is-range small{font-size:10px;letter-spacing:.06em}' +
    '#sbp-calendar p.sbpc-t{color:var(--navy);font-size:18px;font-weight:700;line-height:1.3}' +
    '#sbp-calendar p.sbpc-m{color:var(--mute);font-size:15.5px;line-height:1.45}' +
    '#sbp-calendar .sbpc-side{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px}' +
    '#sbp-calendar .sbpc-tag{padding:3px 10px;border-radius:999px;background:var(--goldsoft);color:var(--golddk);font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}' +
    '#sbp-calendar .c-academic .sbpc-tag{background:#e8f0f5;color:var(--navy)}' +
    '#sbp-calendar .c-noschool .sbpc-tag{background:var(--sky);color:var(--navy)}' +
    '#sbp-calendar .c-admissions .sbpc-tag{background:var(--navy);color:var(--gold)}' +
    '#sbp-calendar .sbpc-add{color:var(--navy);font-size:14px;font-weight:500;white-space:nowrap;text-decoration:underline;text-decoration-color:var(--gold);text-decoration-thickness:2px;text-underline-offset:3px}' +
    '#sbp-calendar .sbpc-add:hover{color:var(--golddk)}' +
    '#sbp-calendar .sbpc-empty{padding:18px 4px;color:var(--mute)}' +
    '#sbp-calendar .sbpc-pastrow{margin:0 0 4px;text-align:center}' +
    /* days off */
    '#sbp-calendar .sbpc-off-box{margin:2.5rem 0 0;padding:24px 22px;background:linear-gradient(135deg,#fffdf6 0,#fbf3dc 100%);border:1px solid var(--gold);border-radius:18px}' +
    '#sbp-calendar .sbpc-off-box h3{margin:0 0 14px;font-size:27px}' +
    '#sbp-calendar .sbpc-offs{display:grid;grid-template-columns:1fr;gap:0 28px}' +
    '#sbp-calendar .sbpc-offs li{display:flex;gap:12px;align-items:baseline;padding:9px 0;border-bottom:1px solid #ecdca4}' +
    '#sbp-calendar .sbpc-offs li.is-past{opacity:.5}' +
    '#sbp-calendar .sbpc-offs b{flex:none;min-width:8.5rem;color:var(--navy);font-variant-numeric:tabular-nums}' +
    '#sbp-calendar .sbpc-foot{margin:2rem 2px 0;color:var(--mute);font-size:14.5px}' +
    '@container sbpcal (min-width:700px){' +
      '#sbp-calendar .sbpc-off-box{padding:28px 32px}' +
      '#sbp-calendar .sbpc-offs{grid-template-columns:1fr 1fr}' +
      '#sbp-calendar li.sbpc-ev{grid-template-columns:72px 1fr auto;padding:12px 18px 12px 14px}' +
      '#sbp-calendar .sbpc-date{grid-row:auto}' +
      '#sbp-calendar .sbpc-side{justify-content:flex-end}' +
      '#sbp-calendar h3.sbpc-sh{font-size:36px}' +
    '}' +
    '@container sbpcal not (min-width:700px){' +
      '#sbp-calendar .sbpc-day{min-height:58px;align-items:center;padding:6px 2px}' +
      '#sbp-calendar .sbpc-pill,#sbp-calendar .sbpc-more{display:none}' +
      '#sbp-calendar .sbpc-dots{display:flex}' +
      '#sbp-calendar .sbpc-wd{padding:9px 0;text-align:center;font-size:11px;letter-spacing:.04em}' +
      '#sbp-calendar .sbpc-bar{padding:12px}' +
      '#sbp-calendar .sbpc-bar h3{font-size:24px}' +
      '#sbp-calendar .sbpc-bar button em{display:none}' +
      '#sbp-calendar .sbpc-bar button{padding:8px 10px}' +
      '#sbp-calendar .sbpc-tools{justify-content:flex-start}' +
      '#sbp-calendar .sbpc-strip{gap:8px}' +
      '#sbp-calendar .sbpc-stat{padding:8px 10px 10px}' +
      '#sbp-calendar .sbpc-stat .sbpc-big{font-size:17px}' +
      '#sbp-calendar .sbpc-stat span.sbpc-what{font-size:12.5px}' +
    '}' +
    '@media (prefers-reduced-motion:reduce){#sbp-calendar *{transition:none!important}}';

  var ICON_CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5 12 18l2.5-2.5"/></svg>';
  var ICON_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var ICON_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var key = function (dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); };
  var parse = function (s) { var p = s.split('-'); return new Date(+p[0], p[1] - 1, +p[2]); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); };
  var stepMonth = function (ym, n) { var d = new Date(+ym.slice(0, 4), +ym.slice(5) - 1 + n, 1); return d.getFullYear() + '-' + pad(d.getMonth() + 1); };
  var monthName = function (ym) { return MONTHS[+ym.slice(5) - 1]; };
  var short = function (k) { var a = parse(k); return MONTHS[a.getMonth()].slice(0, 3) + ' ' + a.getDate(); };
  function when(e) {
    if (e.d === e.end) return short(e.d);
    var a = parse(e.d), b = parse(e.end);
    return a.getMonth() === b.getMonth() ? short(e.d) + '–' + b.getDate() : short(e.d) + ' – ' + short(e.end);
  }

  function start() {
    var root = document.getElementById('sbp-calendar');
    if (!root || root.getAttribute('data-live')) return;
    root.setAttribute('data-live', '1');

    EVENTS.forEach(function (e, i) { e.id = i; e.end = e.end || e.d; });
    var today = key(new Date());
    var on = {}; Object.keys(CATS).forEach(function (k) { on[k] = true; });
    var shown = today.slice(0, 7);
    if (shown < FIRST) shown = FIRST;
    if (shown > LAST) shown = LAST;
    var narrow = root.clientWidth < 700;
    var view = narrow ? 'list' : 'month', showPast = false, picked = null;

    var upcoming = EVENTS.filter(function (e) { return e.end >= today; });
    var next = upcoming.filter(function (e) { return e.c !== 'academic'; }).slice(0, 3);   // grading dates are for teachers
    var offs = EVENTS.filter(function (e) { return e.c === 'noschool'; });

    root.innerHTML = '<style>' + CSS + '</style>' +
      '<div class="sbpc-tools"><div class="sbpc-left"><div class="sbpc-views" role="group" aria-label="View"><button type="button" data-view="month">Month</button><button type="button" data-view="list">List</button></div>' +
      '<button type="button" class="sbpc-addall" data-ics="all" title="Add all to my calendar" aria-label="Add all to my calendar">' + ICON_CAL + 'Add all</button></div>' +
      '<div class="sbpc-filters" role="group" aria-label="Show"></div></div>' +
      '<div class="sbpc-strip">' +
      next.map(function (e, i) {
        return '<button type="button" class="sbpc-stat" data-jump="' + e.id + '"><small>' + (i ? 'Then' : 'Coming up') + '</small><span class="sbpc-big">' + when(e) + '</span><span class="sbpc-what">' + esc(e.t) + '</span></button>';
      }).join('') + '</div>' +
      '<div class="sbpc-month"><div class="sbpc-card"><div class="sbpc-bar">' +
      '<button type="button" data-step="-1">' + ICON_L + '<em style="font-style:normal" class="sbpc-pn"></em></button>' +
      '<h3 aria-live="polite"></h3>' +
      '<button type="button" data-step="1"><em style="font-style:normal" class="sbpc-nn"></em>' + ICON_R + '</button></div>' +
      '<div class="sbpc-grid" role="grid"></div></div>' +
      '<p class="sbpc-todaylink"><button type="button" data-today>Back to today</button></p>' +
      '<h3 class="sbpc-sh sbpc-mh"></h3><ul class="sbpc-list sbpc-mlist"></ul></div>' +
      '<div class="sbpc-listview"><p class="sbpc-pastrow"><button type="button" class="sbpc-past"></button></p><div class="sbpc-lbody"></div></div>' +
      '<div class="sbpc-off-box"><p class="sbpc-eyebrow sbpc-dk">No school</p><h3>Days off at a glance</h3><ul class="sbpc-offs">' +
      offs.map(function (e) { return '<li' + (e.end < today ? ' class="is-past"' : '') + '><b>' + when(e) + '</b><span>' + esc(e.t) + '</span></li>'; }).join('') +
      '</ul></div><p class="sbpc-foot">Dates can change; watch the weekly announcements for updates. Athletic schedules are posted separately.</p>';

    var $ = function (s) { return root.querySelector(s); };
    var visible = function (e) { return on[e.c]; };
    var onDay = function (k) { return EVENTS.filter(function (e) { return e.d <= k && k <= e.end && visible(e); }); };

    function dateBlock(e) {
      var a = parse(e.d), b = parse(e.end);
      if (e.d === e.end) return '<span class="sbpc-date"><small>' + DAYS[a.getDay()].slice(0, 3) + '</small><b>' + a.getDate() + '</b></span>';
      var top = a.getMonth() === b.getMonth() ? DAYS[a.getDay()].slice(0, 3) + '–' + DAYS[b.getDay()].slice(0, 3) : MONTHS[a.getMonth()].slice(0, 3) + '–' + MONTHS[b.getMonth()].slice(0, 3);
      return '<span class="sbpc-date is-range"><small>' + top + '</small><b>' + a.getDate() + '–' + b.getDate() + '</b></span>';
    }
    function card(e) {
      var meta = [e.at, e.where].filter(Boolean).join(' · ');
      return '<li class="sbpc-ev c-' + e.c + (e.end < today ? ' is-past' : '') + '" data-ev="' + e.id + '">' + dateBlock(e) +
        '<div><p class="sbpc-t">' + esc(e.t) + '</p>' + (meta ? '<p class="sbpc-m">' + esc(meta) + '</p>' : '') + (e.note ? '<p class="sbpc-m">' + esc(e.note) + '</p>' : '') + '</div>' +
        '<div class="sbpc-side"><span class="sbpc-tag">' + CATS[e.c].one + '</span><button type="button" class="sbpc-add" data-ics="' + e.id + '">Add to calendar</button></div></li>';
    }

    function renderFilters() {
      $('.sbpc-filters').innerHTML = Object.keys(CATS).map(function (k) {
        return '<button type="button" class="sbpc-filter" data-cat="' + k + '" aria-pressed="' + on[k] + '"><i class="sbpc-k sbpc-k-' + k + '"></i>' + CATS[k].name + '</button>';
      }).join('');
    }

    function renderMonth() {
      var y = +shown.slice(0, 4), m = +shown.slice(5) - 1, prev = stepMonth(shown, -1), nxt = stepMonth(shown, 1);
      $('.sbpc-bar h3').innerHTML = MONTHS[m] + ' <span>' + y + '</span>';
      $('.sbpc-pn').textContent = monthName(prev); $('.sbpc-nn').textContent = monthName(nxt);
      $('[data-step="-1"]').disabled = prev < FIRST; $('[data-step="1"]').disabled = nxt > LAST;
      $('[data-step="-1"]').setAttribute('aria-label', 'Previous month, ' + monthName(prev));
      $('[data-step="1"]').setAttribute('aria-label', 'Next month, ' + monthName(nxt));
      $('.sbpc-todaylink').hidden = shown === today.slice(0, 7) || today.slice(0, 7) < FIRST || today.slice(0, 7) > LAST;

      var html = DAYS.map(function (d) { return '<div class="sbpc-wd" role="columnheader" aria-label="' + d + '">' + d.slice(0, 3) + '</div>'; }).join('');
      var first = new Date(y, m, 1 - new Date(y, m, 1).getDay());
      for (var i = 0; i < 42; i++) {
        var dt = new Date(first.getFullYear(), first.getMonth(), first.getDate() + i);
        if (i >= 35 && dt.getMonth() !== m) break;
        var k = key(dt), out = dt.getMonth() !== m, evs = out ? [] : onDay(k);
        var cls = 'sbpc-day' + (out ? ' is-out' : '') + (k === today ? ' is-today' : '') + (k === picked ? ' is-picked' : '') +
          (evs.some(function (e) { return e.c === 'noschool'; }) ? ' is-off' : '');
        var label = DAYS[dt.getDay()] + ', ' + MONTHS[dt.getMonth()] + ' ' + dt.getDate() + (evs.length ? ': ' + evs.map(function (e) { return e.t; }).join(', ') : '');
        html += '<button type="button" role="gridcell" class="' + cls + '" data-day="' + k + '" aria-label="' + esc(label) + '"' + (out ? ' tabindex="-1" disabled' : '') + '><span class="sbpc-num">' + dt.getDate() + '</span>' +
          evs.slice(0, 3).map(function (e) { return '<span class="sbpc-pill c-' + e.c + '" title="' + esc(e.t) + '">' + esc(e.t) + '</span>'; }).join('') +
          (evs.length > 3 ? '<span class="sbpc-more">+' + (evs.length - 3) + ' more</span>' : '') +
          (evs.length ? '<span class="sbpc-dots">' + evs.slice(0, 3).map(function (e) { return '<i class="c-' + e.c + '"></i>'; }).join('') + '</span>' : '') + '</button>';
      }
      $('.sbpc-grid').innerHTML = html;

      var list = EVENTS.filter(function (e) { return visible(e) && e.d <= shown + '-31' && e.end >= shown + '-01'; });
      $('.sbpc-mh').innerHTML = MONTHS[m] + ' <span>' + y + '</span>';
      $('.sbpc-mlist').innerHTML = list.length ? list.map(card).join('') : '<li class="sbpc-empty">Nothing on the calendar this month.</li>';
    }

    function renderList() {
      var past = EVENTS.some(function (e) { return visible(e) && e.end < today; });
      $('.sbpc-pastrow').hidden = !past;
      $('.sbpc-past').textContent = showPast ? 'Hide past events' : 'Show past events';
      var list = EVENTS.filter(function (e) { return visible(e) && (showPast || e.end >= today); });
      var html = '', cur = '';
      list.forEach(function (e) {
        var ym = e.end < today ? e.d.slice(0, 7) : (e.d < today ? today.slice(0, 7) : e.d.slice(0, 7));
        if (ym !== cur) { if (cur) html += '</ul>'; cur = ym; html += '<h3 class="sbpc-sh">' + monthName(ym) + ' <span>' + ym.slice(0, 4) + '</span></h3><ul class="sbpc-list">'; }
        html += card(e);
      });
      $('.sbpc-lbody').innerHTML = list.length ? html + '</ul>' : '<p class="sbpc-empty">No upcoming events.</p>';
    }

    function render() {
      $('.sbpc-month').hidden = view !== 'month';
      $('.sbpc-listview').hidden = view !== 'list';
      Array.prototype.forEach.call(root.querySelectorAll('[data-view]'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === view)); });
      view === 'month' ? renderMonth() : renderList();
    }

    function flash(ids) {
      var hit = Array.prototype.filter.call(root.querySelectorAll('.sbpc-ev'), function (li) { return ids.indexOf(+li.getAttribute('data-ev')) > -1 && li.offsetParent; });
      if (!hit.length) return;
      hit[0].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      hit.forEach(function (li) { li.classList.add('is-flash'); setTimeout(function () { li.classList.remove('is-flash'); }, 1600); });
    }

    // A calendar file (.ics) for one event or all of them
    function ics(list) {
      var stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
      var q = function (s) { return String(s).replace(/[\\;,]/g, '\\$&'); };
      var time = function (s) { var m = /^(\d+)(?::(\d+))?\s*(am|pm)$/i.exec(s || ''); if (!m) return null; return pad(+m[1] % 12 + (/pm/i.test(m[3]) ? 12 : 0)) + (m[2] || '00') + '00'; };
      var out = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//St. Bernard Preparatory School//Calendar//EN', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:St. Bernard Prep'];
      list.forEach(function (e) {
        var t = time(e.at), d = e.d.replace(/-/g, ''), after = parse(e.end); after.setDate(after.getDate() + 1);
        out.push('BEGIN:VEVENT', 'UID:sbp-' + d + '-' + e.id + '@stbernardprep.com', 'DTSTAMP:' + stamp, 'SUMMARY:' + q(e.t));
        if (t && e.d === e.end) out.push('DTSTART:' + d + 'T' + t, 'DURATION:PT1H30M');
        else out.push('DTSTART;VALUE=DATE:' + d, 'DTEND;VALUE=DATE:' + key(after).replace(/-/g, ''));
        var desc = [e.at, e.note].filter(Boolean).join('. ');
        if (desc) out.push('DESCRIPTION:' + q(desc));
        out.push('LOCATION:' + q((e.where ? e.where + ', ' : '') + 'St. Bernard Preparatory School, 1600 St Bernard Dr SE, Cullman, AL 35055'), 'END:VEVENT');
      });
      out.push('END:VCALENDAR');
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([out.join('\r\n')], { type: 'text/calendar' }));
      a.download = list.length === 1 ? list[0].t.replace(/[^\w]+/g, '-') + '.ics' : 'St-Bernard-Prep-' + YEAR.replace('–', '-') + '.ics';
      document.body.appendChild(a); a.click(); a.remove();
    }

    root.addEventListener('click', function (ev) {
      var b = ev.target.closest('button'); if (!b || !root.contains(b)) return;
      var d = function (n) { return b.getAttribute('data-' + n); };
      if (d('view')) { view = d('view'); render(); }
      else if (d('step')) { shown = stepMonth(shown, +d('step')); picked = null; renderMonth(); }
      else if (b.hasAttribute('data-today')) { shown = today.slice(0, 7); picked = today; renderMonth(); }
      else if (d('cat')) {
        on[d('cat')] = !on[d('cat')];
        if (!Object.keys(on).some(function (k) { return on[k]; })) on[d('cat')] = true;
        renderFilters(); render();
      }
      else if (b.classList.contains('sbpc-past')) { showPast = !showPast; renderList(); }
      else if (d('ics')) ics(d('ics') === 'all' ? EVENTS.filter(visible) : [EVENTS[+d('ics')]]);
      else if (d('jump')) {
        var e = EVENTS[+d('jump')];
        var at = e.d < today ? today : e.d;   // an event already under way opens on this month
        if (view === 'month') { shown = at.slice(0, 7); picked = at; renderMonth(); }
        flash([e.id]);
      }
      else if (d('day')) {
        picked = d('day'); renderMonth();
        flash(onDay(picked).map(function (e) { return e.id; }));
      }
    });

    renderFilters(); render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
