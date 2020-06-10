import * as puppeteer from 'puppeteer';

async function getCoverage() {
  console.info(puppeteer);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
}

export default getCoverage;
