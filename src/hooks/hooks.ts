import {BeforeAll, AfterAll, Before, After, BeforeStep, AfterStep, Status} from '@cucumber/cucumber'
import { fixture } from './pageFixture'
import { Browser, Page, BrowserContext } from '@playwright/test'
import { invokeBrowser } from '../helper/browsers/browserManager'
import { getEnv } from '../helper/env/env'
import { createLogger } from 'winston'
import { options } from '../helper/util/logger'
//import fs = require("fs-extra") import for video

let page: Page
let browser: Browser
let context: BrowserContext

BeforeAll(async function () {
  getEnv()
  browser = await invokeBrowser()
})

Before(async function({pickle}){
  const scenarioName = pickle.name + pickle.id
  context = await browser.newContext()
  //method to create videos
  /*context = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos"
    }
  })*/
  page = await context.newPage()
  fixture.page = page
  fixture.logger = createLogger(options(scenarioName))
})

/*AfterStep(async function({pickle, result}){
  const img = await pageFixture.page.screenshot({path: `./test-result/screenshots/${pickle.name}.png`, type: "png"})
  await this.attach(img, "image/png")
})*/

After(async function ({pickle, result}) {
  //commented code to attach video to report
  //let videoPath: string
  let img: Buffer
  //screenshot
  console.log(result?.status)
  if(result?.status == Status.FAILED){
    img = await fixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`, type: "png"})
    //videoPath = await fixture.page.video().path()
  }
  await fixture.page.close()
  await context.close()
  if(result?.status == Status.FAILED){
    await this.attach(img, "image/png")
    /*await this.attach(
      fs.readFileSync(videoPath),
      'video/webm'
    )*/
  }
})

AfterAll(async function(){
  await browser.close()
  //fixture.logger.close() fixture close is not mandatory
})