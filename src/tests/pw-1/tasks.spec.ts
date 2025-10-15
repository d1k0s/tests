import { test, expect } from '@playwright/test';

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

enum REGISTER_SELECTORS {
  REGISTER_BTN = '#register',
  USERNAME_INPUT = '#userNameOnRegister',
  PASSWORD_INPUT = '#passwordOnRegister',
  ERROR_MESSAGE = '#errorMessageOnRegister',
  BACK_BTN = '#backOnRegister'
}

enum LOGIN_SELECTORS {
  SUBMIT_BTN = '#submit',
  USERNAME_INPUT = '#userName',
  PASSWORD_INPUT = '#password',
  ERROR_MSG = '#errorMessage',
  SUCCESS_MSG = '#successMessage'
}

enum NOTIFICATIONS {
  INVALID_DATA = "Please, provide valid data",
  PSSWD_REQ = "Password is required",
  USRN_REQ = "Username is required",
  SUCCESS = "Successfully registered! Please, click Back to return on login page",
  PREFIX_POSTFIX = "Prefix and postfix spaces are not allowed is username",
  CREDS_REQUIRED = "Credentials are required",
  SUCCESS_LOGIN = "Hello, admin!",
}

interface ICredentials {
  username: string;
  password: string;
}

test.describe("Register", () => {
  const url = 'https://anatoly-karpovich.github.io/demo-login-form/';
  const validCredentials: ICredentials = {
    username: 'admin',
    password: 'Qwerty123',
  };

  const invalidCredentials: readonly ICredentials[] = [
  {
    username: ' admin',
    password: 'Qwerty123',
  },
  {
    username: 'admin ',
    password: 'Qwerty123',
  },
  {
    username: ' admin ',
    password: 'Qwerty123',
  },
  {
    username: '   ',
    password: 'Qwerty123',
  },
  {
    username: 'admin123',
    password: '   ',
  }
]

  test.beforeEach(async ({page}) => {
    await page.goto(url);
    await page.locator('#registerOnLogin').click();
  });

  test('username and password are required', async ({ page }) => {
    await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
    await expect(page.locator(REGISTER_SELECTORS.ERROR_MESSAGE)).toHaveText(NOTIFICATIONS.INVALID_DATA)
  });

  test('password is required', async ({ page }) => {
    await page.locator(REGISTER_SELECTORS.USERNAME_INPUT).fill('12345');
    await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
    await expect(page.locator(REGISTER_SELECTORS.ERROR_MESSAGE)).toHaveText(NOTIFICATIONS.PSSWD_REQ);
  });

  test('username is required', async ({page}) => {
    await page.locator(REGISTER_SELECTORS.PASSWORD_INPUT).fill('12345');
    await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
    await expect(page.locator(REGISTER_SELECTORS.ERROR_MESSAGE)).toHaveText(NOTIFICATIONS.INVALID_DATA);
  });

  test('valid data', async ({page}) => {
    await page.locator(REGISTER_SELECTORS.USERNAME_INPUT).fill(validCredentials.username);
    await page.locator(REGISTER_SELECTORS.PASSWORD_INPUT).fill(validCredentials.password);
    await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
    await expect(page.locator(REGISTER_SELECTORS.ERROR_MESSAGE)).toHaveText(NOTIFICATIONS.SUCCESS);
  });

  test('prefix space', async ({page}) => {
    const {username, password} = invalidCredentials[0]!;

    await page.locator(REGISTER_SELECTORS.USERNAME_INPUT).fill(username);
    await page.locator(REGISTER_SELECTORS.PASSWORD_INPUT).fill(password);
    await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
    await expect(page.locator(REGISTER_SELECTORS.ERROR_MESSAGE)).toHaveText(NOTIFICATIONS.PREFIX_POSTFIX);
});

  test('postfix space', async ({page}) => {
    const {username, password} = invalidCredentials[1]!;

    await page.locator(REGISTER_SELECTORS.USERNAME_INPUT).fill(username);
    await page.locator(REGISTER_SELECTORS.PASSWORD_INPUT).fill(password);
    await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
    await expect(page.locator(REGISTER_SELECTORS.ERROR_MESSAGE)).toHaveText(NOTIFICATIONS.PREFIX_POSTFIX);
}); 

  test('prefix and postfix spaces', async ({page}) => {
    const {username, password} = invalidCredentials[2]!;

    await page.locator(REGISTER_SELECTORS.USERNAME_INPUT).fill(username);
    await page.locator(REGISTER_SELECTORS.PASSWORD_INPUT).fill(password);
    await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
    await expect(page.locator(REGISTER_SELECTORS.ERROR_MESSAGE)).toHaveText(NOTIFICATIONS.PREFIX_POSTFIX);
  });

  test('only cpaces in username input', async ({page}) => {
    const {username, password} = invalidCredentials[3]!;

    await page.locator(REGISTER_SELECTORS.USERNAME_INPUT).fill(username);
    await page.locator(REGISTER_SELECTORS.PASSWORD_INPUT).fill(password);
    await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
    await expect(page.locator(REGISTER_SELECTORS.ERROR_MESSAGE)).toHaveText(NOTIFICATIONS.PREFIX_POSTFIX);
  });

  test('only spaces in password input', async ({page}) => {
    const {username, password} = invalidCredentials[4]!;
    await page.locator(REGISTER_SELECTORS.USERNAME_INPUT).fill(username);
    await page.locator(REGISTER_SELECTORS.PASSWORD_INPUT).fill(password);
    await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
    await expect(page.locator(REGISTER_SELECTORS.ERROR_MESSAGE)).toHaveText(NOTIFICATIONS.PSSWD_REQ);
  });


  test('login and password are required', async ({page}) => {
    await page.locator(REGISTER_SELECTORS.BACK_BTN).click();
    await page.locator(LOGIN_SELECTORS.SUBMIT_BTN).click();
    await expect(page.locator(LOGIN_SELECTORS.ERROR_MSG)).toHaveText(NOTIFICATIONS.CREDS_REQUIRED);
  });

  test('login is required', async ({page}) => {
    await page.locator(REGISTER_SELECTORS.BACK_BTN).click();
    await page.locator(LOGIN_SELECTORS.PASSWORD_INPUT).fill('12345');
    await page.locator(LOGIN_SELECTORS.SUBMIT_BTN).click();
    await expect(page.locator(LOGIN_SELECTORS.ERROR_MSG)).toHaveText(NOTIFICATIONS.USRN_REQ);
  });

  test('psswd is required', async ({page}) => {
    await page.locator(REGISTER_SELECTORS.BACK_BTN).click();
    await page.locator(LOGIN_SELECTORS.USERNAME_INPUT).fill('12345');
    await page.locator(LOGIN_SELECTORS.SUBMIT_BTN).click();
    await expect(page.locator(LOGIN_SELECTORS.ERROR_MSG)).toHaveText(NOTIFICATIONS.PSSWD_REQ);
  });

  test('succesfull register and login (task-2)', async ({page}) => {
    await page.locator(REGISTER_SELECTORS.USERNAME_INPUT).fill(validCredentials.username);
    await page.locator(REGISTER_SELECTORS.PASSWORD_INPUT).fill(validCredentials.password);
    await page.locator(REGISTER_SELECTORS.REGISTER_BTN).click();
    await page.locator(REGISTER_SELECTORS.BACK_BTN).click();
    await page.locator(LOGIN_SELECTORS.USERNAME_INPUT).fill(validCredentials.username);
    await page.locator(LOGIN_SELECTORS.PASSWORD_INPUT).fill(validCredentials.password);
    await page.locator(LOGIN_SELECTORS.SUBMIT_BTN).click();
    await expect(page.locator(LOGIN_SELECTORS.SUCCESS_MSG)).toHaveText(NOTIFICATIONS.SUCCESS_LOGIN);
  });
});
