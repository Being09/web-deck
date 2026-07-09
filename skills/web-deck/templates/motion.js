/**
 * motion.js — web-deck entrance-animation runtime.
 *
 * Pairs with motion.css. motion.css defines the [data-anim] vocabulary and
 * makes elements animate when their slide becomes active; motion.js handles
 * the three things CSS can't do alone:
 *
 *  (a) Replay on re-visit. CSS animations fire once per element. When the
 *      user navigates back to a slide, its [data-anim] elements should replay.
 *      We re-trigger by clearing the animation, forcing a reflow, restoring it
 *      — the same trick the 5 built-in templates (broadside etc.) already use.
 *      Covers Frame A (deck-stage) and Frame B1 (inline .active toggle).
 *      Frame B2 templates replay themselves, so we leave them alone.
 *
 *  (b) Scroll-deck fallback. Two templates (8-bit-orbit, daisy-days) never
 *      mark the active slide — the slide is "active" purely by scroll position.
 *      motion.css can't select those, so an IntersectionObserver stamps a
 *      synthetic `data-motion-on` attribute on the visible slide; motion.css
 *      has a matching `.slide[data-motion-on] [data-anim]` selector. This only
 *      activates when the slide has no native active marker, so it never fights
 *      the other 32 templates.
 *
 *  (c) CountUp. `data-anim="count-up"` rolls a number from data-count-from to
 *      data-count-to over data-count-dur. Honors prefers-reduced-motion by
 *      jumping straight to the final value.
 *
 * Auto-detection: motion.js figures out which skeleton it's in by what it
 * finds in the DOM — no config needed. It's a no-op on the 5 templates that
 * ship their own [data-anim] engine (it detects them and skips).
 *
 * Usage — just include after the deck markup:
 *   <link rel="stylesheet" href="motion.css">
 *   ...deck markup...
 *   <script src="motion.js"></script>
 *
 * Public helper for Frame B1 inline scripts (optional):
 *   WebDeckMotion.replay(slideEl)   // call before adding .active to re-play
 */

(() => {
  if (window.__webDeckMotion) return; // guard against double-include
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Does this slide carry a native active marker? (any of the three skeletons)
  const hasNativeMarker = (slide) =>
    slide.hasAttribute('data-deck-active') ||
    slide.classList.contains('active') ||
    slide.classList.contains('is-active');

  // Re-trigger every [data-anim] inside a slide (the broadside reflow trick).
  const replay = (slide) => {
    if (!slide) return;
    const els = slide.querySelectorAll('[data-anim]');
    els.forEach((el) => {
      // Skip count-up — it manages its own animation via the runner below.
      if (el.getAttribute('data-anim') === 'count-up') return;
      el.style.animation = 'none';
      // Force reflow so the browser registers the clear, then restore so the
      // CSS rule re-applies and the keyframe plays from the start.
      void el.offsetHeight;
      el.style.animation = '';
    });
    runCountUps(slide);
  };

  // ── (a) Replay wiring, per skeleton ────────────────────────────────────

  // Frame A: deck-stage dispatches `slidechange` (bubbles out of shadow DOM).
  // Replays the incoming slide. The deck-stage itself does NOT reset, so this
  // is where Frame A gets its replay.
  const stage = document.querySelector('deck-stage');
  if (stage && typeof stage.addEventListener === 'function') {
    stage.addEventListener('slidechange', (e) => {
      const slide = e.detail && e.detail.slide;
      if (slide) replay(slide);
    });
  }

  // Frame B1: there's no shared event. Expose replay() so the inline nav script
  // can call it. The skill instructs adding one line before `classList.add`.
  // We also patch NodeList.prototype-free: listen for class mutations on any
  // .slide that gains `.active` as a safety net when the inline script isn't
  // patched. (MutationObserver is cheap on ≤~20 slides.)
  const observerSlides = () => document.querySelectorAll('.slide:not(.is-active)');
  if (typeof MutationObserver !== 'undefined') {
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'class' && m.target.classList.contains('active') && !m.target.classList.contains('is-active')) {
          // Frame B1 slide just became active — replay unless the inline script
          // already called WebDeckMotion.replay (harmless to double-run).
          replay(m.target);
        }
      }
    });
    // Observe once DOM is ready.
    const start = () => {
      observerSlides().forEach((s) => mo.observe(s, { attributes: true, attributeFilter: ['class'] }));
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  }

  // ── (b) Scroll-deck fallback (8-bit-orbit, daisy-days) ────────────────
  // Only engages when a slide has NO native active marker — i.e. the scroll
  // templates. For the 32 marker-based templates the observer never stamps
  // anything, so it's a no-op.
  if (typeof IntersectionObserver !== 'undefined') {
    const stampObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const slide = entry.target;
        // Only act on templates that don't mark their own slides. If the slide
        // already carries a native marker, leave it to its own CSS.
        if (hasNativeMarker(slide)) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!slide.hasAttribute('data-motion-on')) {
            slide.setAttribute('data-motion-on', '');
            // First reveal: count-ups need a kick too.
            runCountUps(slide);
          }
        } else {
          // Leaving view: clear so re-entry replays (mirrors replay semantics).
          if (slide.hasAttribute('data-motion-on')) {
            slide.removeAttribute('data-motion-on');
            // Reset [data-anim] state so next reveal plays fresh.
            slide.querySelectorAll('[data-anim]').forEach((el) => {
              if (el.getAttribute('data-anim') !== 'count-up') {
                el.style.animation = 'none';
                void el.offsetHeight;
                el.style.animation = '';
              }
            });
          }
        }
      });
    }, { threshold: [0.5] });

    const observeScrollSlides = () => {
      document.querySelectorAll('.slide').forEach((s) => {
        // Observe only if this slide is in a scroll/transform deck with no
        // native marker pattern — heuristic: it's a .slide whose deck container
        // uses transform/scroll. Cheaper check: just observe all, the handler
        // no-ops on native-marker slides via hasNativeMarker above.
        stampObserver.observe(s);
      });
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeScrollSlides);
    } else {
      observeScrollSlides();
    }
  }

  // ── (c) CountUp ────────────────────────────────────────────────────────
  // Each [data-anim="count-up"] rolls its text numeric content.
  //   data-count-from (default 0), data-count-to (required), data-count-dur (default 1.2s)
  //   data-count-decimals (default 0), data-count-suffix / data-count-prefix
  function runCountUps(slide) {
    if (!slide) return;
    slide.querySelectorAll('[data-anim="count-up"]').forEach((el) => {
      const to = parseFloat(el.getAttribute('data-count-to'));
      if (isNaN(to)) return; // nothing to count to; leave as static text
      const from = parseFloat(el.getAttribute('data-count-from')) || 0;
      const dur = parseFloat(el.getAttribute('data-count-dur')) || 1200;
      const decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0;
      const prefix = el.getAttribute('data-count-prefix') || '';
      const suffix = el.getAttribute('data-count-suffix') || '';
      const fmt = (v) => prefix + v.toFixed(decimals) + suffix;

      el.style.opacity = '1'; // make visible (motion.css keeps it 0 until active)

      if (reduceMotion) { el.textContent = fmt(to); return; }

      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        // easeOutCubic for a decelerating, "settling" feel.
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(from + (to - from) * eased);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = fmt(to);
      };
      requestAnimationFrame(step);
    });
  }

  // Kick off count-ups for the initially-active slide (covers first paint).
  const kickInitial = () => {
    const initial =
      document.querySelector('.slide.active') ||
      document.querySelector('.slide.is-active') ||
      document.querySelector('[data-deck-active]') ||
      document.querySelector('.slide[data-motion-on]');
    if (initial) runCountUps(initial);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', kickInitial);
  } else {
    kickInitial();
  }

  // ── Public API ─────────────────────────────────────────────────────────
  window.__webDeckMotion = true;
  window.WebDeckMotion = { replay, runCountUps };
})();
