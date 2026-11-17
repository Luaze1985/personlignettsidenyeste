(function () {
    // Aktiv seksjon følger leseposisjonen, også i den korte kontaktseksjonen.
    var links = Array.prototype.slice.call(document.querySelectorAll('nav a[href^="#"]'));
    var map = {};
    links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
    var sections = links
        .map(function (l) { return document.getElementById(l.getAttribute('href').slice(1)); })
        .filter(Boolean)
        // Menyrekkefølgen (Figma) kan avvike fra sidens rekkefølge; aktiv seksjon må følge siden.
        .sort(function (a, b) {
            return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
        });
    function markCurrent(id) {
        links.forEach(function (link) {
            var active = link === map[id];
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }
    var pending = false;
    function updateCurrent() {
        pending = false;
        var header = document.querySelector('header');
        var threshold = (header ? header.getBoundingClientRect().height : 0) + 120;
        var current = '';
        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top <= threshold) current = section.id;
        });
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2 && sections.length) {
            current = sections[sections.length - 1].id;
        }
        markCurrent(current);
    }
    window.addEventListener('scroll', function () {
        if (!pending) { pending = true; window.requestAnimationFrame(updateCurrent); }
    }, { passive: true });
    window.addEventListener('resize', updateCurrent);
    updateCurrent();

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

    // --- Hamburgermeny (kun aktiv paa mobil via CSS) ---
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('main-nav');
    if (toggle && nav) {
        function setMenu(open, restoreFocus) {
            nav.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
            if (restoreFocus) toggle.focus();
        }
        toggle.addEventListener('click', function () {
            setMenu(toggle.getAttribute('aria-expanded') !== 'true', false);
        });
        // Lukk meny naar bruker klikker en lenke
        nav.addEventListener('click', function (e) {
            var link = e.target.closest('a');
            if (link) {
                var id = link.getAttribute('href').slice(1);
                var target = document.getElementById(id);
                setMenu(false, false);
                markCurrent(id);
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                }
            }
        });
        // Lukk meny ved klikk utenfor header
        document.addEventListener('click', function (e) {
            if (!e.target.closest('header')) {
                setMenu(false, false);
            }
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                setMenu(false, true);
            }
        });
        window.matchMedia('(max-width: 760px)').addEventListener('change', function () {
            setMenu(false, false);
        });
        document.documentElement.classList.add('nav-ready');
    }
    var skip = document.querySelector('.skip-link');
    if (skip) skip.addEventListener('click', function () {
        document.getElementById('main').focus({ preventScroll: true });
    });
    // --- Kopier e-postadressen (brukerråd 17.11.2026: adressen vises direkte) ---
    // Knappen lages bare når JavaScript og utklippstavle finnes, så ingen får en død knapp.
    var emailLink = document.querySelector('#kontakt a.contact-email-link');
    var copyStatus = document.getElementById('copy-status');
    if (emailLink && copyStatus && navigator.clipboard && navigator.clipboard.writeText) {
        var copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.id = 'copy-email';
        copyBtn.className = 'contact-copy-btn';
        copyBtn.textContent = 'Kopier e-postadressen';
        copyBtn.addEventListener('click', function () {
            var addr = emailLink.getAttribute('href').replace(/^mailto:/, '');
            navigator.clipboard.writeText(addr).then(function () {
                copyStatus.textContent = 'E-postadressen er kopiert.';
                copyBtn.textContent = 'Kopiert';
                window.setTimeout(function () { copyBtn.textContent = 'Kopier e-postadressen'; }, 2500);
            }, function () {
                copyStatus.textContent = 'Kunne ikke kopiere. Marker adressen og kopier den selv.';
            });
        });
        emailLink.insertAdjacentElement('afterend', copyBtn);
    }

    // --- Bento-kort: rolig fremheving av trinn i grønt/gult/rødt ---
    var trafficRows = Array.prototype.slice.call(document.querySelectorAll('.traffic-row'));
    if (trafficRows.length && !reduce) {
        var activeIdx = 0;
        window.setInterval(function () {
            activeIdx = (activeIdx + 1) % trafficRows.length;
            trafficRows.forEach(function (row, idx) {
                row.classList.toggle('is-active', idx === activeIdx);
            });
        }, 3200);
    }
})();
