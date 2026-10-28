"""Seal the site's pages behind the preview password, or open them again for editing.

    SBP_PASSWORD=... python3 tools/lock.py open DIR    # writes the readable pages into DIR (index.html, new/index.html)
    SBP_PASSWORD=... python3 tools/lock.py seal DIR    # seals them from DIR into locked/ and writes the lock pages

The readable pages are never committed: open them into a scratch folder, edit there, seal again.
The password is never written into the repository. Same scheme as the psalter's vault: PBKDF2-SHA256
(600,000 rounds) makes the key; each page is AES-GCM, stored as a 12-byte IV followed by the sealed bytes.
With the same password the old salt is kept, so browsers that already unlocked stay unlocked.
"""
import base64, json, os, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

ITER = 600000
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
LOCKED = os.path.join(ROOT, "locked")
PAGES = {"index.html": "home.bin", "new/index.html": "new.bin"}  # page : sealed file in locked/

LOCK_PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>St. Bernard Preparatory School</title>
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#01253d">
<link rel="icon" href="{up}images/favicon.png" type="image/png">
<link rel="stylesheet" href="{up}assets/fonts.css?v=1">
<style>
  body {{ margin: 0; min-height: 100vh; display: grid; place-items: center; text-align: center; background: #01253d; color: #fcf9f0; font: 1.1rem/1.6 "interstate", Arial, sans-serif; padding: 1.25rem; box-sizing: border-box; }}
  img {{ width: 5rem; height: auto; }}
  h1 {{ font: 400 clamp(2rem, 6vw, 3rem)/1.1 "gyst-variable", Georgia, serif; margin: 1rem 0 .5rem; }}
  form {{ display: flex; gap: .5rem; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem; }}
  input, button {{ font: inherit; padding: .65rem 1.25rem; border-radius: 2rem; border: 1px solid #d8b95c; }}
  input {{ background: #fcf9f0; color: #01253d; width: 11rem; }}
  button {{ background: #d8b95c; color: #01253d; cursor: pointer; }}
  #msg {{ min-height: 1.6em; color: #d8b95c; }}
  .opening form {{ visibility: hidden; }}
</style>
</head>
<body>
<main>
  <img src="{up}images/mark.svg" alt="">
  <h1>St. Bernard Prep</h1>
  <p>This preview is private. Enter the password to see it.</p>
  <form id="lock">
    <input id="pw" type="password" inputmode="numeric" autocomplete="current-password" aria-label="Password" required autofocus>
    <button>Enter</button>
  </form>
  <p id="msg" role="status"></p>
</main>
<script src="{up}assets/lock.js?v=1" data-page="{up}locked/{bin}" data-index="{up}locked/index.json"></script>
</body>
</html>
"""


def b64(b): return base64.b64encode(b).decode()


def key_for(pw, salt):
    return PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=ITER).derive(pw.encode())


def password():
    pw = os.environ.get("SBP_PASSWORD")
    if not pw: sys.exit("Set SBP_PASSWORD")
    return pw


def read_index():
    path = os.path.join(LOCKED, "index.json")
    return json.load(open(path)) if os.path.exists(path) else None


def open_pages(out):
    idx = read_index() or sys.exit("Nothing sealed yet")
    aes = AESGCM(key_for(password(), base64.b64decode(idx["salt"])))
    for page, fname in PAGES.items():
        blob = open(os.path.join(LOCKED, fname), "rb").read()
        try: data = aes.decrypt(blob[:12], blob[12:], None)
        except Exception: sys.exit("Wrong password")
        dest = os.path.join(out, page)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        open(dest, "wb").write(data)
        print(f"{page}: {len(data) // 1024} KB")


def seal(src):
    pw = password()
    os.makedirs(LOCKED, exist_ok=True)
    idx, salt = read_index(), os.urandom(16)
    if idx and idx.get("iter") == ITER:   # keep the salt when the password is the same
        s0 = base64.b64decode(idx["salt"])
        blob = open(os.path.join(LOCKED, next(iter(PAGES.values()))), "rb").read()
        try:
            AESGCM(key_for(pw, s0)).decrypt(blob[:12], blob[12:], None); salt = s0; print("Same password: keeping the salt.")
        except Exception:
            print("New password: new salt (every browser must unlock again).")
    aes = AESGCM(key_for(pw, salt))
    for page, fname in PAGES.items():
        data = open(os.path.join(src, page), "rb").read()
        if b"<html" not in data[:200]: sys.exit(f"{page} in {src} is not a readable page (still the lock page?)")
        iv = os.urandom(12)
        open(os.path.join(LOCKED, fname), "wb").write(iv + aes.encrypt(iv, data, None))
        up = "../" * page.count("/")
        open(os.path.join(ROOT, page), "w").write(LOCK_PAGE.format(up=up, bin=fname))
        print(f"{page}: sealed {len(data) // 1024} KB")
    json.dump({"v": 1, "salt": b64(salt), "iter": ITER}, open(os.path.join(LOCKED, "index.json"), "w"), indent=1)


if __name__ == "__main__":
    if len(sys.argv) != 3 or sys.argv[1] not in ("open", "seal"): sys.exit(__doc__)
    (open_pages if sys.argv[1] == "open" else seal)(sys.argv[2])
