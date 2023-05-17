// @ts-check
const { writeFileSync, copyFileSync } = require('fs');
const { resolve } = require('path');
const packageJson = require('../package.json');

const argv = process.argv;
const isBeta = argv.includes('--beta');

main();

function main() {
  const projectRoot = resolve(__dirname, '..');
  const distPath = resolve(projectRoot, 'dist');
  const distPackageJson = createDistPackageJson(packageJson);

  copyFileSync(resolve(projectRoot, 'README.md'), resolve(distPath, 'README.md'));
  writeFileSync(resolve(distPath, 'package.json'), distPackageJson);
}

function randomId() {
    return btoa(`${Math.random()}`.slice(2, 8) + `${new Date().getMilliseconds()}`);
}

/**
 * @param {typeof packageJson} packageConfig
 * @return {string}
 */
function createDistPackageJson(packageConfig) {
  const { devDependencies, scripts, engines, ...distPackageJson } = packageConfig;
  if (isBeta) {
      return JSON.stringify({ ...distPackageJson, version: `${distPackageJson.version}-beta-${randomId()}` }, null, 2);
  }
  return JSON.stringify(distPackageJson, null, 2);
}
