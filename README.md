# UI Tests Using Playwright

Playwright enables reliable end-to-end testing for modern web apps.

## Getting Started

Clone the code from repository,
### Prerequisites

- NodeJS
- Npm

### Installation

In root folder,enter the following command . It will Install all the dependencies present in `package.json`

```
npm install
```

```
npx playwright install
```

## Running the tests

Run UI tests, use following command,

```
npx playwright test
```

Run UI tests on the basis of tags, use following command,

```
npx playwright test --grep @loginpage
```

```
npx playwright test --grep @homepage
```

Run test using npm command,

```
npm run test:ui
```

```
npm run test:api
```

## Enable Allure HTML Reporting

By default playwright HTML reporting is enable. If you want to use Allure reporting comment the playwright reporter and uncomment Allure reporter lines mentioned below in playwright.config.js file and execute the test as per above mentioned commands.

```javascript
reporter: [
  ['allure-playwright'], 
],
globalTeardown: './global-teardown.js',
```

## Author

- **Syed Umair Hassan**
