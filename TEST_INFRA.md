# TEST_INFRA.md

This document defines the E2E test infrastructure, strategy, and test case inventory for validating the security headers and front-end compliance of the personal website.

---

## 1. Test Architecture Overview

The verification suite is designed using **Playwright** as the test runner. Since the production site is hosted as a static site on Netlify, the test suite verifies security compliance by simulating the production server environment locally.

### Key Components
1. **Header Parser**: Extracts the security headers configured under `[[headers]]` in `netlify.toml`.
2. **Local Mock Server**: A lightweight, built-in Node.js HTTP server that serves `index.html` and assets (fonts, images) on `http://localhost:3000` while applying the parsed `netlify.toml` headers.
3. **Playwright Test Runner**: Launches a headless browser, navigates to the local server, inspects response headers, and interacts with the page to ensure functionality is not broken by the strict security policies.

```
+------------------+       1. Parse       +--------------+
|   netlify.toml   | -------------------> |  Test Runner |
+------------------+                      +--------------+
                                                 |
                                     2. Start    |
                                     & Inject    v
+------------------+   3. Request /       +--------------+
| Headless Browser | <------------------> | Local Server |
+------------------+                      +--------------+
                       4. Assert Headers  (serves index.html
                          & Console Logs   w/ Netlify headers)
```

---

## 2. Security Headers Specification

To achieve hardening compliance, the response headers must match or exceed the following specifications:

| Header | Expected Value / Constraint | Purpose |
| :--- | :--- | :--- |
| `Content-Security-Policy` | Restricts resources to `'self'`, allows preloaded fonts, secures inline scripts (using hashes/nonces), and blocks all wildcards (`*`) and `unsafe-eval`. | Mitigates Cross-Site Scripting (XSS) and data injection. |
| `X-Frame-Options` | `DENY` or `SAMEORIGIN` | Prevents Clickjacking attacks. |
| `X-Content-Type-Options` | `nosniff` | Blocks MIME type sniffing. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Protects sensitive referrer information during cross-origin requests. |
| `Permissions-Policy` | Restricts all unused powerful browser APIs (e.g. `camera=()`, `geolocation=()`, `microphone=()`). | Limits access to device hardware and browser capabilities. |

---

## 3. Test Case Inventory

The test suite is structured into four progressive tiers to ensure complete coverage of both security constraints and site functionality.

### Tier 1: Feature Coverage (Presence & Value Assertions)
Verifies that all required security headers are present and contain valid, secure configurations.

* **TC-1.1: CSP Presence**
  - **Goal**: Ensure the `Content-Security-Policy` header is returned.
  - **Assertion**: `headers['content-security-policy']` is defined.
* **TC-1.2: X-Frame-Options Compliance**
  - **Goal**: Prevent the site from being embedded in iframes on third-party sites.
  - **Assertion**: `headers['x-frame-options']` equals `DENY` or `SAMEORIGIN`.
* **TC-1.3: X-Content-Type-Options Compliance**
  - **Goal**: Enforce strict MIME type checking.
  - **Assertion**: `headers['x-content-type-options']` equals `nosniff`.
* **TC-1.4: Referrer-Policy Compliance**
  - **Goal**: Restrict referrer headers.
  - **Assertion**: `headers['referrer-policy']` equals `strict-origin-when-cross-origin` or a more restrictive policy (e.g., `no-referrer`).
* **TC-1.5: Permissions-Policy Compliance**
  - **Goal**: Disable unused browser features.
  - **Assertion**: `headers['permissions-policy']` exists and is formatted correctly.

### Tier 2: Boundary & Edge Cases (Strictness and Policy Constraints)
Deep-dives into the structure of the CSP and Permissions-Policy to block common bypasses and unsafe configurations.

* **TC-2.1: CSP Wildcard Prevention**
  - **Goal**: Ensure `default-src`, `script-src`, and `style-src` do not allow the broad wildcard `*` or insecure schemes (`http:`, `https:`, `data:`).
  - **Assertion**: Directives do not contain `*`, `http:`, `https:`, or `data:`.
* **TC-2.2: CSP Unsafe-Inline Script Restrictions**
  - **Goal**: Block unauthorized inline JS.
  - **Assertion**: `script-src` must NOT contain `'unsafe-inline'` unless cryptographically secured with specific SHA hashes (e.g., `'sha256-...'`) or nonces. If inline scripts are extracted to external files, `'unsafe-inline'` must be entirely absent.
* **TC-2.3: CSP Unsafe-Inline Style Restrictions**
  - **Goal**: Restrict inline CSS styling.
  - **Assertion**: If styles are extracted into `style.css`, `style-src` must not contain `'unsafe-inline'`. If styles remain inline, they must be hashed or restricted.
* **TC-2.4: CSP Unsafe-Eval Block**
  - **Goal**: Prevent runtime string evaluation (e.g., `eval()`, `new Function()`).
  - **Assertion**: `script-src` does not contain `'unsafe-eval'`.
* **TC-2.5: CSP Object Restriction**
  - **Goal**: Block plugins like Flash, Java, or Silverlight.
  - **Assertion**: `object-src` is set to `'none'`.
* **TC-2.6: CSP Base-URI Restriction**
  - **Goal**: Prevent base tag manipulation.
  - **Assertion**: `base-uri` is set to `'self'` or `'none'`.
* **TC-2.7: CSP Upgrade Insecure Requests**
  - **Goal**: Force all HTTP assets to load via HTTPS.
  - **Assertion**: CSP contains the `upgrade-insecure-requests` directive.
* **TC-2.8: Permissions-Policy API Disabling**
  - **Goal**: Verify that high-risk APIs (camera, microphone, geolocation, midi, payment) are fully disabled.
  - **Assertion**: Directives for these APIs are set to `()` (denied to all).

### Tier 3: Cross-Feature Combination Tests
Checks for policy conflicts and header parsing issues.

* **TC-3.1: CSP and X-Frame-Options Consistency**
  - **Goal**: Ensure the frame protection mechanisms match.
  - **Assertion**: If `X-Frame-Options` is `DENY`, CSP `frame-ancestors` must be `'none'`. If `X-Frame-Options` is `SAMEORIGIN`, CSP `frame-ancestors` must be `'self'`.
* **TC-3.2: Duplicate Header Prevention**
  - **Goal**: Avoid headers being defined multiple times, which causes browser interpretation conflicts.
  - **Assertion**: Assert each security header is present exactly once in the response.
* **TC-3.3: Redirect and Content Route Header Injection**
  - **Goal**: Ensure headers are injected on all routes and not skipped on index redirects.
  - **Assertion**: Verify headers are returned on both `/` and `/index.html`.

### Tier 4: Real-World Scenario Tests
Validates that the strict security headers do not break the page's actual visual layout, fonts, assets, and interactivity.

* **TC-4.1: Successful Page Load**
  - **Goal**: Confirm the site loads with no errors.
  - **Assertion**: Navigating to `http://localhost:3000` returns a HTTP 200 status code.
* **TC-4.2: Zero CSP Console Violations**
  - **Goal**: Confirm no styles, scripts, or assets are blocked by the browser due to CSP.
  - **Assertion**: Monitor browser console logs during load; zero CSP violations must be logged.
* **TC-4.3: Self-Hosted Font Loading**
  - **Goal**: Ensure preloaded Newsreader fonts load successfully.
  - **Assertion**: Font-face network requests for `.woff2` fonts succeed with HTTP 200.
* **TC-4.4: Profile Image Loading**
  - **Goal**: Ensure `images/Profil.jpg` renders properly.
  - **Assertion**: The image element exists, is visible, and its resource returns HTTP 200.
* **TC-4.5: Navigation and Active Section Highlight**
  - **Goal**: Validate that the scroll listener script and `IntersectionObserver` function correctly.
  - **Assertion**: Scrolling down the page changes the active CSS class in the header navigation menu. Clicking menu links (e.g., `#tjenester`) successfully scrolls the page.
* **TC-4.6: Accordion (Details/Summary) Interactivity**
  - **Goal**: Verify the Q&A toggle is functional.
  - **Assertion**: Clicking the `<summary>` element expands the `<details>` card, and the answer text becomes visible.
* **TC-4.7: Prefers-Reduced-Motion Compliance**
  - **Goal**: Ensure no JS errors occur when reduced motion is simulated.
  - **Assertion**: Set browser preferences to `prefers-reduced-motion: reduce` and verify page functionality.
* **TC-4.8: Responsive Layout Verification**
  - **Goal**: Confirm the page renders without errors on mobile viewports.
  - **Assertion**: Simulate a mobile device viewport (e.g., iPhone 12) and assert layout element visibility.

---

## 4. Quality & Acceptance Thresholds

The E2E test suite defines a strict pass/fail threshold. The project is considered ready for deployment only if:

1. **Pass Rate**: 100% of all Tier 1-4 test cases must pass.
2. **Console Cleanliness**: Zero CSP errors or network resource blocks.
3. **Execution Exit Code**: The test command must exit with code `0`.

---

## 5. Setup & Execution

### Prerequisites
Make sure dependencies are installed:
```bash
npm install
npx playwright install chromium
```

### Running the E2E Test Suite
To execute the header validation and functional tests:
```bash
npx playwright test tests/header-validator.spec.js
```
