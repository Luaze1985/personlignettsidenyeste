# Security Audit Report: index.html & HTTP Headers

This report details the security scan, findings, and remediation for `index.html` and the Netlify hosting configuration (`netlify.toml`).

**Audit date:** 4. juli 2026
**Status:** ✅ All findings remediated and verified

---

## 1. Executive Summary

A static front-end security review was performed on `index.html` and the Netlify hosting configuration (`netlify.toml`). All identified vulnerabilities have been remediated:

- Inline scripts extracted to external `.js` files → allows strict `script-src 'self'`
- Inline CSS extracted to external `.css` file → allows strict `style-src 'self'`
- Full security header suite configured in `netlify.toml`
- Automated E2E verification suite confirms compliance (22/22 tests passing)

---

## 2. Detailed Findings & Remediation

### Finding 1: Inline Scripts → REMEDIATED ✅
* **Original issue:** Two inline `<script>` blocks in `index.html`:
  1. `document.documentElement.classList.add("js");` (flicker mitigation)
  2. Navigation scroll + fade-in IntersectionObserver logic
* **Risk:** Inline scripts require `'unsafe-inline'` in CSP, which nullifies XSS protection.
* **Remediation applied:** Scripts extracted to `js/theme.js` and `js/navigation.js`. CSP now uses strict `script-src 'self'` with zero inline exceptions.

### Finding 2: Inline CSS → REMEDIATED ✅
* **Original issue:** All CSS was embedded in a `<style>` block inside `<head>`.
* **Risk:** Requires `'unsafe-inline'` for `style-src`, weakening CSP.
* **Remediation applied:** CSS extracted to `css/style.css`. CSP now uses strict `style-src 'self'`.

### Finding 3: Missing Security Headers → REMEDIATED ✅
* **Original issue:** `netlify.toml` had no security headers configured.
* **Remediation applied:** Full header suite now active:

| Header | Value |
|--------|-------|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=()` |

### Finding 4: Content Security Policy → REMEDIATED ✅
* **Original issue:** No CSP defined.
* **Remediation applied:** Strict CSP configured:
  ```
  default-src 'self';
  script-src 'self';
  style-src 'self';
  font-src 'self';
  img-src 'self' data:;
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests
  ```

**CSP design rationale:**
- `'self'` only for scripts, styles, and fonts — no inline or external sources permitted
- `img-src 'self' data:` — allows local images and SVG `data:` URIs (favicon)
- `object-src 'none'` — blocks Flash, Java, Silverlight plugins
- `base-uri 'self'` — prevents `<base>` tag injection attacks
- `frame-ancestors 'none'` — prevents clickjacking (mirrors X-Frame-Options: DENY)
- `upgrade-insecure-requests` — forces HTTPS for all subresources

### Finding 5: Insecure HTTP Links → PASS ✅
* All external links use `https://`. Zero `http://` links found.

### Finding 6: Client-Side Input Sanitization → PASS ✅
* No dynamic URL parameter parsing or `innerHTML` injection detected.
* JavaScript only queries static DOM elements via `querySelectorAll`.

### Finding 7: Internal Document Exposure → REMEDIATED ✅
* **Issue:** Markdown files (`SPEC.md`, `CLAUDE.md`, `ISSUES.md`, etc.) were publicly accessible via direct URL.
* **Remediation applied:** Redirect rules in `netlify.toml` return 404 for all internal `.md` files:
  `README.md`, `SPEC.md`, `CLAUDE.md`, `HANDOFF.md`, `ISSUES.md`, `AUDIT_REPORT.md`, `DARK_MODE.md`, `PROJECT.md`, `TEST_INFRA.md`, `security_audit.md`

---

## 3. Verification

### E2E Test Suite: `tests/header-validator.spec.js`
A comprehensive Playwright test suite with 22 test cases validates:

| Tier | Tests | Description |
|------|-------|-------------|
| **Tier 1** | TC-1.1 – TC-1.5 | Header presence and value assertions |
| **Tier 2** | TC-2.1 – TC-2.8 | CSP strictness, wildcard prevention, unsafe-inline/eval blocks |
| **Tier 3** | TC-3.1 – TC-3.3 | Cross-feature consistency, duplicate prevention, redirect injection |
| **Tier 4** | TC-4.1 – TC-4.8 | Full page E2E: CSP violations, font loading, images, navigation, accordions, responsive layout, reduced-motion |

**Result:** 22/22 passed ✅ (0 CSP violations, 0 console errors)

```
npx playwright test tests/header-validator.spec.js --reporter=list
```

---

## 4. Residual Risk Assessment

| Risk | Level | Notes |
|------|-------|-------|
| XSS via inline scripts | **Eliminated** | All scripts are external; CSP blocks inline execution |
| Clickjacking | **Eliminated** | Both `X-Frame-Options: DENY` and `frame-ancestors 'none'` active |
| MIME sniffing | **Eliminated** | `X-Content-Type-Options: nosniff` active |
| Referrer leakage | **Mitigated** | `strict-origin-when-cross-origin` sends origin only on cross-origin |
| Browser API abuse | **Mitigated** | 9 high-risk APIs explicitly denied via Permissions-Policy |
| Document exposure | **Mitigated** | All internal `.md` files return 404 via Netlify redirects |
