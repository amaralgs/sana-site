(function () {
  var scene = document.getElementById('scene');
  if (!scene) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  scene.classList.add('animated');

  var clamp = function (v) { return Math.min(1, Math.max(0, v)); };
  var seg = function (p, a, b) { return clamp((p - a) / (b - a)); };
  var ease = function (t) { return t * t * (3 - 2 * t); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var ticking = false;

  function update() {
    ticking = false;
    var total = scene.offsetHeight - window.innerHeight;
    var p = total > 0 ? clamp(-scene.getBoundingClientRect().top / total) : 1;
    var s = scene.style;
    s.setProperty('--ipad-scale', lerp(1.36, 1, ease(seg(p, 0.12, 0.72))).toFixed(4));
    s.setProperty('--frame-o', ease(seg(p, 0.3, 0.62)).toFixed(4));
    s.setProperty('--frame-s', lerp(1.14, 1, ease(seg(p, 0.3, 0.75))).toFixed(4));
    s.setProperty('--a-o', (1 - ease(seg(p, 0.18, 0.38))).toFixed(4));
    s.setProperty('--hint-o', (1 - seg(p, 0, 0.06)).toFixed(4));
    s.setProperty('--b-o', ease(seg(p, 0.42, 0.62)).toFixed(4));
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
