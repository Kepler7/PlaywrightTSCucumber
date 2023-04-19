import {Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber"

setDefaultTimeout(60 * 1000 * 2)

import { fixture } from "../../hooks/pageFixture";
import RegisterPage from "../../pages/registerPage";
import Assert from "../../helper/wrapper/assert";
import * as data from '../../helper/util/test-data/registerUser.json'

let registerPage: RegisterPage
let assert: Assert
       
Given('I navigate to the register page', async function () {
  registerPage =  new RegisterPage(fixture.page)
  assert = new Assert(fixture.page)
  await registerPage.navigateToRegisterPage()
});

When('I created a new User', async function () {
  const username = data.userName + Date.now().toString()// to make username unique
  await registerPage.registerUser(
    data.firstName,
    data.lastName,
    username,
    data.password,
    data.confirmPassword,
    "m"
  )
});

Then('I confirm user registration is success', async function () {
  await assert.assertURL("https://bookcart.azurewebsites.net/login")
});