(function () {
    // --- Aktiv seksjon i meny (IntersectionObserver) ---
    var links = Array.prototype.slice.call(document.querySelectorAll('nav a[href^="#"]'));
    var map = {};
    links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
    var sections = links
        .map(function (l) { return document.getElementById(l.getAttribute('href').slice(1)); })
        .filter(Boolean);
    if ('IntersectionObserver' in window) {
        var navObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    links.forEach(function (l) { l.classList.remove('active'); });
                    if (map[e.target.id]) map[e.target.id].classList.add('active');
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(function (s) { navObs.observe(s); });
    }

    // --- Subtil fade-in (kun forsterkning; innhold er synlig uten JS) ---
    var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !reduce) {
        var revObs = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
        reveals.forEach(function (s) { revObs.observe(s); });
    } else {
        // Ingen IntersectionObserver eller reduced-motion: vis alt umiddelbart.
        reveals.forEach(function (s) { s.classList.add('is-visible'); });
    }
})();
