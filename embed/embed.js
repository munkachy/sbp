// Loads page sections hosted here into the school website (SPRX CMS), which strips scripts written into a page.
// A CMS page holds a box like <div id="sbp-embed-tuition"><p>…</p></div> and loads this file; the box is filled with
// tuition.html from this folder. To change a section: edit its .html file here, commit, push.
(function () {
  var me = document.currentScript;
  var base = me && me.src ? me.src.replace(/[^\/]*(\?.*)?$/, '') : 'https://munkachy.github.io/sbp/embed/';

  function run() {
    Array.prototype.forEach.call(document.querySelectorAll('[id^="sbp-embed-"]'), function (box) {
      var name = box.id.slice('sbp-embed-'.length);
      if (!/^[a-z0-9-]+$/.test(name) || box.getAttribute('data-loaded')) return;
      box.setAttribute('data-loaded', '1');
      fetch(base + name + '.html', { cache: 'no-cache' })   // revalidate, so an edit shows on the next page load
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(function (html) { box.innerHTML = html; if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); } })
        .catch(function () { box.removeAttribute('data-loaded'); });   // keep the box's own text
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
