import fs from 'fs';
import path from 'path';

import serverConfig from '../../serverConfig';

const indexFactory = {

};

export default (app) => {
  if (!indexFactory[app]) {
    const contents = fs.readFileSync(path.join(__dirname, serverConfig.assetsPath), 'utf-8');

    // Define to JSON type
    const assets = JSON.parse(contents);

    let rawIndexHTML = fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8');

    rawIndexHTML = rawIndexHTML.replace('_starc_edu_title_', serverConfig.title);

    // styles

    const styles =
      Object.keys(serverConfig.disk_stylesheets).map(key => (
        `<link href="${serverConfig.disk_stylesheets[key]}" rel="stylesheet"/>`));
    if (assets[app].css) {
      styles.push(`<link href="${assets[app].css}" rel="stylesheet"/>`);
    }
    rawIndexHTML = rawIndexHTML.replace('_starc_edu_styles_', styles.join('\n'));

    // scripts

    const scripts =
      Object.keys(serverConfig.disk_scripts).map(key => (
        `<script src="${serverConfig.disk_scripts[key]}"></script>`));
    scripts.push(`<script src="${assets.vendor.js}"></script>`);

    if (assets[app].js) {
      scripts.push(`<script src="${assets[app].js}"></script>`);
    }
    scripts.push(`<script src="${assets[app].js}"></script>`);

    rawIndexHTML = rawIndexHTML.replace('_starc_edu_scripts_', scripts.join('\n'));

    // register

    indexFactory[app] = rawIndexHTML;
  }

  return indexFactory[app];
};

