#   Ubiquiti - Automation Test

### Description
This project is an automated testing suite using Playwright with Javascript to test the functionality of an e-commerce web application. The tests cover core user journeys such as login, finding an item, adding it to the cart and making an order.


### Prerequisites

1) Install Node.js (https://nodejs.org/en) <br/>
By running `node --version` you can check if you have Node.js installed successfully.
2) Run `npm --version` in order to check the version of the npm package manager, which is installed with Node.js


### Installation

1) Clone the repository
    `git clone https://github.com/MikaelaMichou/SauceDemo_Test.git`
2) Navigate to the Project Directory
    `cd <the project_directory>`
3) Install dependencies
    `npm install playwright` <br/>
    In the package.json file it is expected to see the dependency: "@playwright/test"
4) Install Playwright Browsers (Chromium, Firefox and Webkit)
    `npx playwright install`


### Running the tests
Run `npx playwright test ./tests/login.spec.js` for running the login test. <br/>
Run `npx playwright test ./tests/login.spec.js --project chromium --headed` for running the test in Chrome in headed mode (which shows the browser's window while running tests, but since the test is short it closes fast) <br/>

Run `npx playwright test ./tests/cart.spec.js` for running the login test. <br/>
Run `npx playwright test ./tests/cart.spec.js --project chromium --headed` for running the test in Chrome in heade mode (which shows the browser's window while running tests, but since the test is short it closes fast)  <br/>

After running the test, you can see the report by running `npx playwright show-report`

By adding the `await page.pause()` method, in any place of the script, allows you to pause the script's execution and launch the Playwright inspector, enabling you to debug the browser interaction step by step.
