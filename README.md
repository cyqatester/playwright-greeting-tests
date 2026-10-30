# Playwright TypeScript — Greeting App Tests

Tests the Spring Boot app at `http://localhost:8080/greeting-app/homepage`.

## Structure

- `src/pages/`: Page Object Model classes and UI locators/actions.
- `tests/smoke/`: fast checks that the homepage and its controls load.
- `tests/regression/`: greeting submission, return navigation/clearing, names with spaces, blank input.
- `tests/api/`: HTTP checks for `GET /homepage`, `POST /greet`, and `POST /home`.
- `playwright.config.ts`: projects, base URL, reporting, and failure artifacts.

## Prerequisites and setup

Use Node.js 20+ and npm. Start the Spring Boot application in another terminal:

```bash
mvn spring-boot:run
```

Then, in this project directory:

```bash
npm install
npx playwright install chromium
```

## Run suites separately

```bash
npm run test:smoke
npm run test:regression
npm run test:api
npm test
```

Useful extras:

```bash
npm run test:headed
npm run test:ui
npm run report
```

The base URL defaults to `http://localhost:8080`. Override it if needed.

Git Bash / macOS / Linux:

```bash
BASE_URL=http://localhost:8080 npm test
```

PowerShell:

```powershell
$env:BASE_URL = "http://localhost:8080"
npm test
```

## Assumptions

The app exposes:
- `GET /`
- `POST /greet` with `firstName` and `lastName` form fields
- `POST /home`, redirecting to `/`

For accessible UI locators, form inputs should have associated labels such as `First Name` and `Last Name`, and the return button should be named `Return to Home Page`. Adjust the Page Object locators if your HTML uses different accessible names.

## Best practices included

- Page Object Model keeps page-specific locators and actions out of test cases.
- Each test starts from a known state and can run independently.
- Accessible, user-facing locators are preferred.
- Playwright's auto-retrying assertions are used.
- HTML report, trace, screenshot, and video are configured for diagnostics.
- Smoke, regression, and API suites have separate commands and directories.