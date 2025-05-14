const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

// Här anger vi var testfilen ska hämtas. De konstiga replaceAll-funktionerna ersätter
// mellanslag med URL-säkra '%20' och backslash (\) på Windows med slash (/).
const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
    console.log("File under test:", fileUnderTest);
    console.log("Starting WebDriver...");
    driver = await new Builder().forBrowser('firefox').build();
    console.log("WebDriver started. Opening file...");
    await driver.get(fileUnderTest);
    console.log("File opened in browser.");
    console.log("TESTT.");

});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});


describe('Stack functionality', () => {
    it('should push an element and peek at the top of the stack', async () => {
        const pushButton = await driver.findElement(By.id('push'));
        await pushButton.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Päron");
        await alert.accept();

        const topOfStack = await driver.findElement(By.id('top_of_stack')).getText();
        expect(topOfStack).toEqual("Apelsin");

        const peekButton = await driver.findElement(By.id('peek'));
        await peekButton.click();

       
        const peekedValue = await driver.findElement(By.id('top_of_stack')).getText();
        expect(peekedValue).toEqual("Apelsin");
    });
});