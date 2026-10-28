# munkachy/sbp: St. Bernard Preparatory School website (GitHub Pages)

A static copy of www.stbernardprep.com (now on the SPRX CMS by Interactive Schools), to be served free from GitHub Pages.
Preview: https://munkachy.github.io/sbp/ (Pages serves branch `main`, root folder). So far only the **front page** is built.
Plain HTML, CSS and JS: no build step, no libraries. All paths are **relative**, so the same files work under `/sbp/`
now and at the domain root later (the one exception is `404.html`, see "Going live").

| Path | What |
|---|---|
| `index.html` | The front page, **sealed** (see "Password"). The "Read More" panels are `<dialog>`s in the page. Bump `?v=N` on site.css / site.js when they change |
| `locked/`, `tools/lock.py`, `assets/lock.js` | The password lock: sealed pages, the tool that seals and opens them, the browser side |
| `assets/site.css` | All styles. Colors in `:root`. Breakpoints 64em (tablet) and 48em (phone) |
| `assets/site.js` | Menu, Festivals list, background-video pause, virtual tour player, side-scroller arrows, panels |
| `assets/fonts.css` | The school's Adobe Fonts, Gyst and Interstate (see Fonts). Link it before site.css on every page |
| `images/` | Photos, re-saved from the originals on stbernardprep.com (`/userfiles/bernardpsmvc/images/...`); `og.jpg` is the picture shown when the link is shared |
| `video/` | `hero-720.mp4` / `hero-1080.mp4` (28 s loop, no sound), `tour-720.mp4` (the 6-minute "Heart of St. Bernard Prep" virtual tour) |
| `robots.txt`, `sitemap.xml`, `404.html` | See "Going live" |
| `embed/` | The calendar for the **current** site's page www.stbernardprep.com/calendar (see "Calendar") |
| `new/` | **The proposed new design** (its `index.html` is sealed too) (https://munkachy.github.io/sbp/new/): `index.html`, `new.css`, `new.js`, sharing `../images`, `../video` and `../assets/fonts.css`. Photos for it are `images/n-*.jpg`, re-saved from the school's inner pages. Every fact on it comes from stbernardprep.com pages; keep it that way |

## Password

The preview is locked with a password (the user, 28 Oct 2026; the user knows it, never write it into the repo).
`index.html` and `new/index.html` in the repo are only lock pages; the real pages are AES-GCM sealed in `locked/`
(PBKDF2-SHA256, 600,000 rounds, same scheme as the psalter vault). The browser asks once, then remembers the key.
To edit a page: `SBP_PASSWORD=... python3 tools/lock.py open SCRATCH`, edit `SCRATCH/index.html` or
`SCRATCH/new/index.html`, then `SBP_PASSWORD=... python3 tools/lock.py seal SCRATCH` (writes `locked/` and the lock pages).
Never commit the readable pages. A new page joins `PAGES` in `tools/lock.py`. Images, video, CSS and JS are not sealed.

## Calendar (for the current site)

The SPRX CMS strips scripts written into a page but keeps `<script src>` tags, so the calendar has two parts:
`embed/calendar-block.html` is pasted once into the CMS page (plain HTML and CSS, styled like the tuition page's
`#sbp-tuition` block, readable with no script), and its last line loads `embed/calendar.js` from GitHub Pages,
which redraws it as the interactive calendar (month view, today, filters, past events hidden, .ics downloads).
**The events live only in the list at the top of `embed/calendar.js`.** To change one: edit it, run
`python3 embed/build.py` (rebuilds the plain block from the same list), test, commit, push; the live site picks it up
within about 10 minutes. Re-paste the block in the CMS only when its plain copy matters (it shows if the script fails).
No sports events (Rachael, 28 Oct 2026). Test: open the live page in Playwright, put the block into
`.calendarContainer`, and route the script URL to the local file. When the site moves to a school GitHub account,
change the script URL in `embed/build.py` and the one line in the CMS.

## Links to pages not built yet

Every link to an inner page goes to the live site (`https://www.stbernardprep.com/...`). As each page is built here,
change its links (menu, panels, footer) to the relative path, keeping the same address as the old site
(e.g. `admissions/visit-us/`), so old links and search results keep working.

## Fonts

Gyst (headings, `gyst-variable`) and Interstate (text, `interstate`), which the school is licensed to use. `fonts.css` holds
the same `@font-face` rules as the current site's stylesheet, pointing at the school's Adobe Fonts kit on use.typekit.net.
Adobe's license allows the files to be served only from Adobe, so never download them into this repository. If Adobe
ever refuses this domain, the kit's allowed domains are set in the school's Adobe Fonts account (fonts.adobe.com →
Web Projects); until then the page falls back to Georgia and Arial.

## Video

Made with ffmpeg from the Vimeo originals (account `stbernardprep`):
`ffmpeg -i in.mp4 -an -vf scale=1280:-2 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart hero-720.mp4`
(1920 for the 1080 version; the tour keeps its sound: `-c:a aac -b:a 96k`, crf 26). GitHub refuses files over 100 MB.

## Testing

Serve the parent folder so the path matches Pages: `cd .. && python3 -m http.server 8765`, open
`http://127.0.0.1:8765/sbp/`. Check desktop (1440 wide) and phone (390 wide) with Playwright: no console errors,
no sideways scroll (`document.documentElement.scrollWidth` equals the window width).

## Going live (when stbernardprep.com points here)

0. Remove the lock: `tools/lock.py open` into the repo root (overwriting the lock pages), delete `locked/`, `tools/lock.py`, `assets/lock.js`.
1. `index.html`: remove `<meta name="robots" content="noindex, nofollow">`; change `og:image` and the JSON-LD `logo`/`image`
   from `munkachy.github.io/sbp/` to `www.stbernardprep.com/`.
2. `robots.txt`: replace with the "At launch" text in it. `sitemap.xml`: list every page built.
3. `404.html`: change `/sbp/` to `/`.
4. Add a `CNAME` file with `www.stbernardprep.com`, set the domain under Settings → Pages, then change the school's DNS.
5. Verify the site in Google Search Console and submit the sitemap.

The canonical link already points to www.stbernardprep.com, so the preview never competes with the real site in search.
