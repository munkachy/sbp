"""Make the plain copy of the calendar that is pasted into stbernardprep.com/calendar.

    python3 embed/build.py      # writes embed/calendar-block.html

The events come from embed/calendar.js (the list between /* EVENTS */ and /* END EVENTS */), so there is one list.
The block is plain HTML and CSS (the CMS strips scripts written into a page) and ends with the line that loads
calendar.js from GitHub Pages, which turns it into the interactive calendar. Styled like the tuition page's block.
"""
import calendar, html, json, os, re
from datetime import date, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT_URL = "https://munkachy.github.io/sbp/embed/calendar.js"
src = open(os.path.join(HERE, "calendar.js"), encoding="utf-8").read()
EVENTS = json.loads(re.search(r"/\* EVENTS \*/(.*?)/\* END EVENTS \*/", src, re.S).group(1))
MONTHS = [(2026, m) for m in range(8, 13)] + [(2027, m) for m in range(1, 6)]
CATS = {"event": "Event", "academic": "Academic", "noschool": "No school", "admissions": "Admissions"}
RANK = ["admissions", "event", "academic"]   # which mark a day shows when it has several

D = lambda s: date.fromisoformat(s)
EV = [dict(d=D(x["d"]), end=D(x.get("end") or x["d"]), t=x["t"], at=x.get("at", ""), where=x.get("where", ""), note=x.get("note", ""), c=x["c"]) for x in EVENTS]
e = html.escape


def date_block(ev):
    a, b = ev["d"], ev["end"]
    if a == b:
        return f'<span class="sbpc-date"><small>{a:%a}</small><b>{a.day}</b></span>'
    top = f"{a:%b}–{b:%b}" if a.month != b.month else f"{a:%a}–{b:%a}"
    return f'<span class="sbpc-date sbpc-range"><small>{top}</small><b>{a.day}–{b.day}</b></span>'


def event_row(ev):
    meta = " · ".join(x for x in (ev["at"], ev["where"]) if x)
    return (f'<li class="sbpc-ev sbpc-{ev["c"]}">{date_block(ev)}<div class="sbpc-txt">'
            f'<p class="sbpc-t">{e(ev["t"])}</p>'
            + (f'<p class="sbpc-m">{e(meta)}</p>' if meta else "")
            + (f'<p class="sbpc-m">{e(ev["note"])}</p>' if ev["note"] else "")
            + f'</div><span class="sbpc-tag">{CATS[ev["c"]]}</span></li>')


def mini(y, m):
    rows = []
    for week in calendar.Calendar(firstweekday=6).monthdayscalendar(y, m):
        cells = []
        for d in week:
            if not d:
                cells.append('<td class="sbpc-x"></td>'); continue
            day = date(y, m, d)
            on = [ev for ev in EV if ev["d"] <= day <= ev["end"]]
            cls = ["sbpc-off"] if any(ev["c"] == "noschool" for ev in on) else []
            mark = next((c for c in RANK if any(ev["c"] == c for ev in on)), None)
            if mark: cls.append("sbpc-k-" + mark)
            label = f'{day:%A, %B} {d}' + (": " + ", ".join(ev["t"] for ev in on) if on else "")
            attr = f' class="{" ".join(cls)}"' if cls else ""
            tip = f' title="{e(label)}"' if on else ""
            cells.append(f'<td{attr}><span{tip}>{d}</span></td>')
        rows.append("<tr>" + "".join(cells) + "</tr>")
    head = "".join(f'<th scope="col"><abbr title="{n}">{n[0]}</abbr></th>' for n in ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])
    return (f'<div class="sbpc-mini"><table class="no-responsive sbpc-grid" role="presentation">'
            f'<thead><tr>{head}</tr></thead><tbody>{"".join(rows)}</tbody></table></div>')


def month_section(y, m):
    first, last = date(y, m, 1), date(y, m, calendar.monthrange(y, m)[1])
    evs = [ev for ev in EV if ev["d"] <= last and ev["end"] >= first]
    return (f'<div class="sbpc-sec" id="sbpc-{y}-{m:02d}"><h2 class="sbpc-sh">{calendar.month_name[m]} <span>{y}</span></h2>'
            f'<div class="sbpc-month">{mini(y, m)}<ul class="sbpc-list">{"".join(event_row(ev) for ev in evs)}</ul></div></div>')


def fmt(ev):
    a, b = ev["d"], ev["end"]
    if a == b: return f"{a:%b} {a.day}"
    return f"{a:%b} {a.day}–{b.day}" if a.month == b.month else f"{a:%b} {a.day} – {b:%b} {b.day}"


CSS = open(os.path.join(HERE, "block.css")).read().strip()
off = [ev for ev in EV if ev["c"] == "noschool"]
jump = "".join(f'<a class="sbpc-chip" href="#sbpc-{y}-{m:02d}">{calendar.month_abbr[m]}</a>' for y, m in MONTHS)
legend = "".join(f'<span class="sbpc-key sbpc-key-{c}"><i></i>{n}</span>' for c, n in CATS.items())

out = f"""<!-- ===== St. Bernard Prep: 2026-2027 school calendar. Paste into the page HTML source. The script line at the end makes it interactive; without it the plain calendar still shows. ===== -->
<div class="sbp" id="sbp-calendar">
<style type="text/css">{CSS}</style>
<div class="sbpc-hero">
<p class="sbpc-eyebrow">2026–2027 School Year</p>
<h2 class="sbpc-h">School Calendar</h2>
<p class="sbpc-lede">Key dates for St. Bernard families, from the first day of classes to Graduation. Athletic schedules are posted separately.</p>
<div class="sbpc-stats">
<div class="sbpc-stat"><span class="sbpc-big">Aug 10</span><p>Classes begin</p></div>
<div class="sbpc-stat"><span class="sbpc-big">Dec 18 – Jan 1</span><p>Christmas Break. Classes resume January 4.</p></div>
<div class="sbpc-stat"><span class="sbpc-big">May 23</span><p>Baccalaureate Mass 10:30am and Graduation 2pm</p></div>
</div>
<p class="sbpc-jl">Jump to a month</p>
<div class="sbpc-jump">{jump}</div>
</div>
<div class="sbpc-off-box">
<p class="sbpc-eyebrow sbpc-dk">No school</p>
<h3>Days off at a glance</h3>
<ul class="sbpc-offs">{"".join(f'<li><b>{fmt(ev)}</b><span>{e(ev["t"])}</span></li>' for ev in off)}</ul>
</div>
<div class="sbpc-legend">{legend}</div>
{"".join(month_section(y, m) for y, m in MONTHS)}
<p class="sbpc-foot">Dates can change. Watch the weekly announcements for updates.</p>
</div>
<script src="{SCRIPT_URL}" defer></script>
<!-- ===== end of block ===== -->
"""
open(os.path.join(HERE, "calendar-block.html"), "w", encoding="utf-8").write(out)
print(f"{len(EV)} events, {len(out) // 1024} KB")
