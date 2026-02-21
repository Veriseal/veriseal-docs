const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, 'i18n');
const master = JSON.parse(
  fs.readFileSync(path.join(i18nDir, '_homepage_master_en.json'), 'utf8')
);

const locales = fs.readdirSync(i18nDir).filter(l =>
  fs.existsSync(path.join(i18nDir, l, 'docusaurus-plugin-content-pages'))
);

for (const locale of locales) {
  const targetPath = path.join(
    i18nDir,
    locale,
    'docusaurus-plugin-content-pages',
    'index.json'
  );

  if (!fs.existsSync(targetPath)) continue;

  const current = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

  let updated = false;

  for (const key of Object.keys(master)) {
    if (!current[key]) {
      current[key] = master[key];
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(targetPath, JSON.stringify(current, null, 2));
    console.log(`Updated ${locale}`);
  }
}

console.log('Homepage keys injection complete.');
