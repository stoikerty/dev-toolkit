import fs from 'fs';
import path from 'path';
import each from 'lodash.foreach';
import mkdirp from 'mkdirp';
import chalk from 'chalk';
import fileExists from 'file-exists';

// TODO:
//  - cover case of `renderedRoutes` without dynamic component(s)
//  - cover case of multiple dynamic components (add all script urls to html)
//  -

// Compile all files necessary for serving
export default new class GenerateFiles {
  run({
    publicPath,
    dynamicRenderFile,
    buildFolder,
    manifestFile,
    definedRoutes,
    getComponentName,
    hasPathParameters,
    doneCallback,
  }) {
    this.publicPath = publicPath;
    this.dynamicRender = dynamicRenderFile;
    this.buildFolder = buildFolder;
    this.indexHtml = path.resolve(buildFolder, 'index.html');
    this.getComponentName = getComponentName;
    this.hasPathParameters = hasPathParameters;
    this.doneCallback = doneCallback;

    if (!fileExists(dynamicRenderFile)) {
      console.log(
        chalk.yellow('To make use of dynamic pages, add the `dynamicRender.js`-file'),
        chalk.yellow('\nsee:'),
        chalk.yellow.underline('https://github.com/stoikerty/dev-toolkit/wiki/dynamic-pages'),
        '\nA regular static build was created.');
    } else {
      try {
        console.log('Generating', chalk.magenta('index.html'), 'for each route...');

        // The expression `'' + ` is a webpack hack to avoid an error when compiling for the client.
        // "the request of a dependency is an expression"
        // see: https://github.com/webpack/webpack/issues/196
        //      https://github.com/webpack/webpack/issues/198
        // eslint-disable-next-line global-require
        this.dynamicRender = require('' + dynamicRenderFile).default;

        // Take index.html file and create an html-file for each route
        fs.readFile(manifestFile, 'utf8', (manifestError, manifestData) => {
          if (manifestError) throw manifestError;
          fs.readFile(this.indexHtml, 'utf8', (readError, data) => {
            if (readError) throw readError;
            each(definedRoutes, ({ renderPath, components }, index) => {
              const callback = (definedRoutes.length - 1) === index ? this.doneCallback : null;

              if (!this.hasPathParameters(renderPath)) {
                this.generateFile({ renderPath, components, manifestData, data, callback });
              } else {
                if (callback) callback();
              }
            });
          });
        });
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    }
  }

  generateFile({ renderPath, components, manifestData, data, callback }) {
    const routePath = path.resolve(this.buildFolder, renderPath.substring(1));
    const names = (() => {
      let componentNames = '';
      each(components, (component, index) => {
        componentNames += chalk.magenta(this.getComponentName(component)) + ', ';
      });
      return componentNames.slice(0, -2);
    })();

    // eslint-disable-next-line max-len, no-console
    console.log(chalk.blue('>'), `Generating route ${chalk.magenta(renderPath)} with: ${names}`);

    mkdirp(routePath, (mkdirError) => {
      if (mkdirError) {
        // eslint-disable-next-line no-console
        console.error(mkdirError);
      } else {
        const { reactHtml, additionalData } = this.dynamicRender(renderPath);

        if (reactHtml) {
          const htmlWithAssets = this.convertAssetPaths(manifestData, reactHtml);
          const componentPaths = this.extractComponentPaths({ manifestData, components });
          const completeHtml = this.injectMarkupIntoTemplate({
            data,
            htmlWithAssets,
            componentPaths,
            additionalData,
          });

          fs.writeFile(path.resolve(routePath, 'index.html'), completeHtml, (writeError) => {
            if (writeError) {
              throw writeError;
            }
            if (callback) callback();
          });
        } else {
          // eslint-disable-next-line no-console
          console.log(`Route "${renderPath}" doesn't exist, rendering resulted in \`null\`.`);
          if (callback) callback();
        }
      }
    });
  }

  convertAssetPaths(manifestData, html) {
    let result = html;
    const data = JSON.parse(manifestData);
    const assets = data.assets;

    each(assets, (value, key) => {
      // TODO: use rootAssetPath?
      result = result.replace(`src/client/${key}`, value);
    });

    return result;
  };

  extractComponentPaths({ manifestData, components }) {
    const extractedPaths = [];
    const data = JSON.parse(manifestData);
    const assets = data.assets;

    each(components, (component) => {
      each(assets, (value, key) => {
        const componentName = this.getComponentName(component);
        if (key.startsWith(componentName)) {
          extractedPaths.push(value);
        }
      });
    });

    return extractedPaths;
  }

  injectMarkupIntoTemplate({ data, htmlWithAssets, componentPaths, additionalData }) {
    const dynamicComponents = componentPaths.map(dynamicComponentPath => (
      `<script src="${this.publicPath}${dynamicComponentPath}"></script>`
    )).join('\n\t\t');

    let formattedData = data.replace(
      '<!-- [[[reactHtml]]] -->',
      htmlWithAssets
    ).replace(
      '<!-- [[[dynamicComponents]]] -->',
      dynamicComponents,
    );

    each(additionalData, (value, key) => {
      formattedData = formattedData.replace(
        `<!-- [[[${key}]]] -->`,
        value,
      );
    });

    return formattedData;
  };
}
