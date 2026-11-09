// Answers for embed/alumni-poll.js, kept in a Google Sheet. Set up once:
//  1. Make a new Google Sheet (e.g. "Alumni Christmas Party poll"), share it with whoever should see the answers.
//  2. Extensions → Apps Script, delete what is there, paste this whole file, Save.
//  3. Deploy → New deployment → type "Web app"; Execute as: Me; Who has access: Anyone → Deploy, allow access.
//  4. Copy the Web app URL (ends in /exec) into SHEET_URL in embed/alumni-poll.js.
// The "Answers" tab gets one row per person (changing an answer updates that person's row); "Totals" counts them.
// To close the poll from here instead of the page: set CLOSED = true, then Deploy → Manage deployments → edit → New version.

var CLOSED = false;
var CHOICES = {
  fri: 'Friday, Dec. 18, at 6:30 p.m. only',
  sat: 'Saturday, Dec. 19, at 6:30 p.m. only',
  either: 'Either date works for me',
  neither: 'I’m unable to attend either date'
};
var HEAD = ['First answered', 'Last changed', 'Name', 'Class of', 'Answer', 'Browser id'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return out_({ ok: true });                    // the hidden field only robots fill in
  if (CLOSED) return out_({ ok: false, error: 'closed' });
  var choice = String(p.choice || ''), name = clean_(p.name, 120), year = clean_(p.year, 12), id = clean_(p.id, 40);
  if (!CHOICES[choice] || !name || !id) return out_({ ok: false, error: 'missing' });

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = sheets_().answers, now = new Date();
    var ids = sh.getLastRow() > 1 ? sh.getRange(2, 6, sh.getLastRow() - 1, 1).getValues() : [];
    for (var i = 0; i < ids.length; i++) {
      if (ids[i][0] === id) {
        sh.getRange(i + 2, 2, 1, 4).setValues([[now, name, year, CHOICES[choice]]]);
        return out_({ ok: true, updated: true });
      }
    }
    if (sh.getLastRow() > 3000) return out_({ ok: false, error: 'full' });
    sh.appendRow([now, now, name, year, CHOICES[choice], id]);
    return out_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return out_({ ready: true, closed: CLOSED }); }

// Run once from the editor (Run → setup) to make the tabs before anyone answers; doPost also makes them if missing.
function setup() { sheets_(); }

function sheets_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var a = ss.getSheetByName('Answers');
  if (!a) {
    a = ss.getSheets()[0].getLastRow() === 0 ? ss.getSheets()[0].setName('Answers') : ss.insertSheet('Answers');
    a.appendRow(HEAD);
    a.setFrozenRows(1);
    a.getRange(1, 1, 1, HEAD.length).setFontWeight('bold');
    a.getRange('A:B').setNumberFormat('ddd mmm d, h:mm am/pm');
    a.setColumnWidth(3, 220); a.setColumnWidth(5, 280);
  }
  var t = ss.getSheetByName('Totals');
  if (!t) {
    t = ss.insertSheet('Totals');
    var rows = [['Answer', 'People']];
    Object.keys(CHOICES).forEach(function (k, i) { rows.push([CHOICES[k], '=COUNTIF(Answers!E:E,A' + (i + 2) + ')']); });
    rows.push(['Can come Friday (Friday + either)', '=B2+B4']);
    rows.push(['Can come Saturday (Saturday + either)', '=B3+B4']);
    rows.push(['Total answers', '=SUM(B2:B5)']);
    t.getRange(1, 1, rows.length, 2).setValues(rows);
    t.getRange('A1:B1').setFontWeight('bold');
    t.setColumnWidth(1, 320);
  }
  return { answers: a, totals: t };
}

function clean_(v, n) { return String(v || '').replace(/[\u0000-\u001f]/g, ' ').replace(/^[=+\-@]+/, '').trim().slice(0, n); }
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
