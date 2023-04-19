import {Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber"

setDefaultTimeout(60 * 1000 * 2)

import {expect} from '@playwright/test'
import { fixture } from "../../hooks/pageFixture";

Given('User navigates to the application', async function () {
  await fixture.page.goto(process.env.BASEURL)
  fixture.logger.info("it has navigated to "+ process.env.BASEURL.toString())
});

       
Given('User click on the login link', async function () {
  fixture.logger.info("waiting for 2 seconds")
  await new Promise((r) => setTimeout(r, 2000));
  await fixture.page.locator("//span[text()='Login']").click()
});
       
Given('User enter the username as {string}', async function (username) {
  await fixture.page.locator("input[formcontrolname='username']").type(username)
});
   
Given('User enter the password as {string}', async function (password) {
  await fixture.page.locator("input[formcontrolname='password']").type(password)
});
    
When('User click on the login button', async function () {
  /*await Promise.all(
    [
      await pageFixture.page.locator("button[color='primary']").click(),
      //await pageFixture.page.waitForNavigation(),
      await pageFixture.page.waitForLoadState(),
      await pageFixture.page.waitForTimeout(3000)
    ]
  )*/
  await fixture.page.locator("button[color='primary']").click()
  await new Promise((r) => setTimeout(r, 2000));
  
});
   
Then('login should be success', async function () {
  const text = await fixture.page.locator("//button[contains(@class, 'mat-focus-indicator mat-menu-trigger')]//span[1]").textContent()
  fixture.logger.info("Username", text)
});

Then('login should fail', async function () {
  const failureMessage = await fixture.page.locator("mat-error[role='alert']")
  await expect(failureMessage).toBeVisible()
});

