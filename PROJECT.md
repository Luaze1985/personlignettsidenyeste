# Project: Nettside Sikkerhetsherding og CSP

## Architecture
This project is built using the Dual Track pattern, separating the design and execution of tests from the implementation of security features.

1. **E2E Testing Track**:
   - Creates verification scripts (`tests/header-validator.spec.js` or separate test scripts).
   - Simulates or runs a local server to test the headers specified in `netlify.toml`.
   - Asserts validity of CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.
   - Publishes `TEST_READY.md` containing test execution commands and expected outputs.

2. **Implementation Track**:
   - Performs a security audit of `index.html` (generating `security_audit.md`).
   - Implements hard security headers in `netlify.toml` according to specification.
   - Modifies `index.html` as needed to comply with CSP restrictions (e.g. hashing or extracting inline scripts).
   - Validates changes against E2E tests and hardens via adversarial verification.

## Code Layout
- `netlify.toml`: Configuration file containing header definitions.
- `index.html`: Main landing page of the website.
- `tests/`: Directory containing all test scripts.
  - `link-checker.spec.js`: Existing link checking test.
  - `header-validator.spec.js` (to be created): Script validating header hardening.
- `security_audit.md` (to be created): Security audit report.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| 1 | E2E Testing Suite | Develop automated header verification script and publish `TEST_READY.md` (Conv ID: `c5ab653a-bb25-43fe-b7d9-b57be93eeae6`) | None | IN_PROGRESS |
| 2 | Security Audit & HTML Hardening | Scan `index.html`, report vulnerabilities in `security_audit.md`, extract/hash inline scripts (Conv ID: `99ca39a3-ff4b-4ce0-b64a-ca94c04eccad`) | None | IN_PROGRESS |
| 3 | Netlify.toml Hardening | Define security headers in `netlify.toml` including CSP with necessary hashes/nonces (Conv ID: `99ca39a3-ff4b-4ce0-b64a-ca94c04eccad`) | M1, M2 | IN_PROGRESS |
| 4 | Integration & Acceptance | Run E2E tests, run Forensic Auditor, finalize reports and project delivery | M3 | PLANNED |

## Interface Contracts
### E2E Test Suite ↔ netlify.toml
- The verification script parses `netlify.toml` headers or hosts a local server serving these headers to inspect and assert their values.
- Supported headers: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
