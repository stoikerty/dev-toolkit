import fs from 'fs';
import path from 'path';
import each from 'lodash.foreach';
import mkdirp from 'mkdirp';
import chalk from 'chalk';
import DynamicPages from 'dynamic-pages';

// TODO:
//  - cover case of `renderedRoutes` without dynamic component(s)
//  - cover case of multiple dynamic components (add all script urls to html)
//  -

// Compile all files necessary for serving
export default (staticRender, PATHS, message) => {
  const indexHtml = path.resolve(PATHS.buildFolder, 'index.html');
  const manifestFile = PATHS.manifest;
  console.log('generating static files...', staticRender, PATHS, message);


  fs.readFile(manifestFile, 'utf8', (manifestError, manifestData) => {
    if (manifestError) throw manifestError;

    fs.readFile(indexHtml, 'utf8', (readError, data) => {
      if (readError) throw readError;

      const definedRoutes = DynamicPages.getDefinedRoutes();

      definedRoutes.forEach((definedRoute) => {
        const { renderPath, components } = definedRoute;

        // TODO: make directory with corresponding index.html file
        // const routeFolder = path.resolve(PATHS.build, renderPath.substring(1));
        // mkdirp(routeFolder, (mkdirError) => {});
      });
    });
  });
};


export default class GenerateDynamicPages {
  constructor({ staticRender, paths }) {
    this.staticRender = staticRender;
    this.paths = paths;
  }
}

// ' ⭐️  Your build with dynamic pages is ready ⭐️'
