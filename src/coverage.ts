import path from 'path';
import { launch } from 'puppeteer';

async function getCoverage(route: string): Promise<string> {
  const chromePath = path.join(
    __dirname,
    '..',
    '..',
    'node_modules/puppeteer/.local-chromium/linux-756035/chrome-linux/chrome',
  );
  const browser = await launch({
    executablePath: chromePath,
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Page.enable');
  await client.send('DOM.enable');
  await client.send('CSS.enable');

  const stylesheetsToUse = new Set();
  client.on('CSS.styleSheetAdded', (stylesheet) => {
    const { header } = stylesheet;
    if (
      header.sourceURL &&
      JSON.stringify(header.sourceURL).includes('storefront')
    ) {
      stylesheetsToUse.add(header.styleSheetId);
    }
  });

  console.info('coverage tracking');
  await client.send('CSS.startRuleUsageTracking');
  await page.goto(route);
  const rules = await client.send('CSS.takeCoverageDelta');
  const { coverage }: any = rules;
  const usedRules = coverage.filter((rule) => {
    return rule.used;
  });

  const slices = [];
  for await (const usedRule of usedRules) {
    if (stylesheetsToUse.has(usedRule.styleSheetId)) {
      const stylesheet = await client.send('CSS.getStyleSheetText', {
        styleSheetId: usedRule.styleSheetId,
      });
      const { text }: any = stylesheet;
      slices.push(text.slice(usedRule.startOffset, usedRule.endOffset));
    }
  }

  const join = slices.join('');
  await page.close();
  await browser.close();

  return join;
}

export default getCoverage;
