import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import getCoverage from './coverage';

async function main() {
  let data;
  try {
    data = readFileSync(
      path.join(__dirname, '..', '..', 'routes.txt'),
      'utf-8',
    );
  } catch (e) {
    console.error(e);
  }
  const routes = data.split(/\r?\n/);

  // we just append everything together and let webpack resolve duplicated rules
  let allCss: string;
  for await (const route of routes) {
    console.info(`current route: ${route}`);
    const routeCss = await getCoverage(route);
    allCss += routeCss;
  }
  try {
    writeFileSync(path.join(__dirname, '..', 'all.css'), allCss);
  } catch (e) {
    console.error(e);
  }
}

main();
