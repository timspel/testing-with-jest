const { Builder } = require('selenium-webdriver');
require('geckodriver');

(async function test() {
    // Create a new WebDriver instance for Firefox
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Navigate to a website (e.g., Google)
        await driver.get('https://www.google.com');

        // Log success when the page loads
        console.log("Browser opened successfully!");
    } finally {
        // Quit the browser after the test
        await driver.quit();
    }
})();