import {test, expect} from '@playwright/test';
import fs from 'fs';
import path from 'path';

enum REGISTER_SELECTORS {
  REGISTER_ON_LOGIN = '#registerOnLogin',
  REGISTER_BTN = '#register',
  USERNAME_INPUT = '#userNameOnRegister',
  PASSWORD_INPUT = '#passwordOnRegister',
  ERROR_MESSAGE = '#errorMessageOnRegister',
  BACK_BTN = '#backOnRegister'
}

const file = path.resolve(`${process.cwd()}/../src/data/invalid.data.json`);
const regData = JSON.parse(fs.readFileSync(file, 'utf-8'));

test.describe('Register - Negative data', () => {
    const url = 'https://anatoly-karpovich.github.io/demo-login-form/';
    for (const {title, credentials, message} of regData) {
        test(title, async ({page}) =>{
            await page.goto(url);
            await page.locator(REGISTER_SELECTORS.REGISTER_ON_LOGIN).click();
            await page.locator(REGISTER_SELECTORS.USERNAME_INPUT).fill(credentials.username);
            await page.locator(REGISTER_SELECTORS.PASSWORD_INPUT).fill(credentials.password);
            await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
            await expect(page.locator(REGISTER_SELECTORS.ERROR_MESSAGE)).toHaveText(message);
        });
    };
});
