// St. Bernard Prep preview lock: turns the password into the key (PBKDF2, as tools/lock.py does),
// opens the sealed page with AES-GCM and shows it. The key is remembered on this browser, so the password is asked once.
(function () {
  var me = document.currentScript, pageUrl = me.dataset.page, indexUrl = me.dataset.index;
  var form = document.getElementById('lock'), pw = document.getElementById('pw'), msg = document.getElementById('msg');
  var STORE = 'sbp-key', subtle = window.crypto && crypto.subtle;
  var b64 = function (s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); };
  var toB64 = function (buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))); };
  function remembered() { try { return JSON.parse(localStorage.getItem(STORE)); } catch (e) { return null; } }
  function remember(v) { try { localStorage.setItem(STORE, JSON.stringify(v)); } catch (e) {} }

  var index = fetch(indexUrl, { cache: 'no-cache' }).then(function (r) { return r.json(); });
  var sealed = fetch(pageUrl, { cache: 'no-cache' }).then(function (r) { return r.arrayBuffer(); });

  // Resolves with the page, or rejects when the key is wrong
  function openWith(raw) {
    return subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']).then(function (key) {
      return sealed.then(function (blob) {
        return subtle.decrypt({ name: 'AES-GCM', iv: blob.slice(0, 12) }, key, blob.slice(12));
      });
    });
  }
  function show(buf) {
    var html = new TextDecoder().decode(buf);
    document.open(); document.write(html); document.close();
  }

  if (!subtle) { msg.textContent = 'This browser cannot open the preview. Please use an up-to-date browser.'; return; }

  var saved = remembered();
  if (saved) {
    document.body.classList.add('opening');
    index.then(function (idx) {
      if (saved.salt !== idx.salt) throw 0;
      return openWith(b64(saved.key));
    }).then(show, function () { document.body.classList.remove('opening'); pw.focus(); });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.textContent = 'Opening…';
    var salt;
    index.then(function (idx) {
      salt = idx.salt;
      return subtle.importKey('raw', new TextEncoder().encode(pw.value), 'PBKDF2', false, ['deriveBits']).then(function (base) {
        return subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: b64(idx.salt), iterations: idx.iter }, base, 256);
      });
    }).then(function (raw) {
      return openWith(raw).then(function (page) { remember({ salt: salt, key: toB64(raw) }); show(page); });
    }).catch(function () {
      msg.textContent = 'That password is not right.';
      pw.select();
    });
  });
})();
