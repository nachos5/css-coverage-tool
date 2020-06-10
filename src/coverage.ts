import * as puppeteer from 'puppeteer';

async function getCoverage(): Promise<void> {
  const browser = await puppeteer.launch({
    executablePath:
      'node_modules/puppeteer/.local-chromium/linux-756035/chrome-linux/chrome',
  });

  console.info('setup');
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Page.enable');
  await client.send('DOM.enable');
  await client.send('CSS.enable');

  console.info('coverage tracking');
  await client.send('CSS.startRuleUsageTracking');
  await page.goto('https://www.sminor.is');
  const rules = await client.send('CSS.takeCoverageDelta');
  const usedRules = rules.coverage.filter((rule) => {
    return rule.used;
  });
  console.info(usedRules);
}

export default getCoverage;
