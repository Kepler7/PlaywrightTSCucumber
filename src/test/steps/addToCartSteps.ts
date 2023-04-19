import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber'

setDefaultTimeout(60 * 1000 * 2)

import {expect} from '@playwright/test'
import { fixture } from '../../hooks/pageFixture';
      
Given('User search for a {string}', async function (book) {
  await new Promise((r) => setTimeout(r, 3000));
  fixture.logger.info("Searching for a book: " + book)
  await fixture.page.locator("input[type='search']").type(book)
  await fixture.page.waitForTimeout(1000)
  await fixture.page.locator("mat-option[role='option'] span").click()
});
     
When('user add the book to the cart', async function () {
  await new Promise((r) => setTimeout(r, 2000));
  await fixture.page.locator("button[color='primary']").click()
});

Then('the cart badge should get updated', async function () {
  const badgeCount = await fixture.page.locator("#mat-badge-content-0").textContent()
  expect(Number(badgeCount)).toBeGreaterThan(0)
});