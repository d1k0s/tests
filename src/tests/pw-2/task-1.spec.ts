import {test, expect} from '@playwright/test';  

enum TEXT {
    HEADER_TEXT = 'Dynamic Controls',
    REMOVE_TEXT = "It's gone!",
    ADD_TEXT = "It's back!",
}

enum SELECTORS {
    DYNAMIC_CONTROLS = 'a[href="/dynamic_controls"]',
    BTN = '#checkbox-example > button',
    HEADER = '//h4[1]',
    CHECKBOX = '//input[@type="checkbox"]',
    NOTIFICATIONS = '#message',
}

test('checkboxes', async ({page}) => {
    const url = 'https://the-internet.herokuapp.com/'
    await page.goto(url);
    await page.locator(SELECTORS.DYNAMIC_CONTROLS).click();
    await page.waitForSelector(SELECTORS.BTN);
    await expect(page.locator(SELECTORS.HEADER)).toHaveText(TEXT.HEADER_TEXT)
    await page.locator(SELECTORS.CHECKBOX).check();
    await page.locator(SELECTORS.BTN).click();
    await page.locator(SELECTORS.CHECKBOX).waitFor({state: 'hidden'});
    await expect(page.locator(SELECTORS.BTN)).toHaveText('Add');
    await expect(page.locator(SELECTORS.NOTIFICATIONS)).toHaveText(TEXT.REMOVE_TEXT);
    await page.locator(SELECTORS.BTN).click();
    await page.locator(SELECTORS.CHECKBOX).waitFor({state: 'visible'}); 
    await expect(page.locator(SELECTORS.NOTIFICATIONS)).toHaveText(TEXT.ADD_TEXT);
});