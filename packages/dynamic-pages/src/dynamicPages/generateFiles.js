/* eslint-disable-file no-console, global-require */

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
  constructor() {
    this.readManifestFile = this.readManifestFile.bind(this);
    this.readIndexHtml = this.readIndexHtml.bind(this);
    this.createPagesFromCompiledData = this.createPagesFromCompiledData.bind(this);
    this.createPage = this.createPage.bind(this);
    this.renderRoute = this.renderRoute.bind(this);
    this.writeFile = this.writeFile.bind(this);
  }

  setupDynamicRenderFile({ dynamicRenderFile }) {
    this.dynamicRender = null;

    if (!fileExists(dynamicRenderFile)) {
      console.log(
        chalk.yellow('To make use of dynamic pages, add the `dynamicRender.js`-file'),
        chalk.yellow('\nsee:'),
        chalk.yellow.underline('https://github.com/stoikerty/dev-toolkit/wiki/dynamic-pages'),
        '\nCreating a regular static build.');
    } else {
      try {
        // The expression `'' + ` is a webpack hack to avoid an error when compiling for the client.
        // "the request of a dependency is an expression"
        // see: https://github.com/webpack/webpack/issues/196
        //      https://github.com/webpack/webpack/issues/198
        this.dynamicRender = require('' + dynamicRenderFile).default;
        this.onRouteRender = require('' + dynamicRenderFile).onRouteRender;
        this.beforeRender = require('' + dynamicRenderFile).beforeRender;
        this.afterRender = require('' + dynamicRenderFile).afterRender;
        this.beforeRouteRender = require('' + dynamicRenderFile).beforeRouteRender;
        this.afterRouteRender = require('' + dynamicRenderFile).afterRouteRender;
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    }
  }

  startRendering({
    publicPath,
    buildFolder,
    manifestFile,
    definedRoutes,
    getComponentName,
    hasPathParameters,
    doneCallback,
  }) {
    // save given options for later
    this.publicPath = publicPath;
    this.buildFolder = buildFolder;
    this.manifestFile = manifestFile;
    this.definedRoutes = definedRoutes;
    this.getComponentName = getComponentName;
    this.hasPathParameters = hasPathParameters;
    this.doneCallback = doneCallback;

    if (this.beforeRender) {
      console.log(chalk.blue('↩'), ` beforeRender`);
      this.beforeRender({ definedRoutes }).then(() => this.renderRoutes());
    } else {
      this.renderRoutes();
    }
  }

  renderRoutes(){
    if (this.onRouteRender || this.dynamicRender) {
      try {
        console.log('Generating', chalk.magenta('index.html'), 'for each route...');

        this.readManifestFile()
          .then(this.readIndexHtml)
          .then(this.createPagesFromCompiledData)
          .then(() => {
            if (this.afterRender) {
              console.log(chalk.blue('↪'), ` afterRender`);
              this.afterRender({ definedRoutes: this.definedRoutes });
            } else {
              if (this.doneCallback) {
                this.doneCallback();
              }
            }
          });
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    }
  }

  readManifestFile() {
    return new Promise((resolve) => {
      fs.readFile(this.manifestFile, 'utf8', (error, manifestData) => {
        if (error) throw error;
        resolve({ manifestData });
      });
    });
  }

  readIndexHtml({ manifestData }) {
    return new Promise((resolve) => {
      fs.readFile(path.resolve(this.buildFolder, 'index.html'), 'utf8', (error, indexData) => {
        if (error) throw error;
        resolve({ manifestData, indexData });
      });
    });
  }

  createPagesFromCompiledData({ manifestData, indexData }) {
    return new Promise((resolve) => {
      const promises = this.definedRoutes.map(({ renderPath, components, dynamicData }) =>
        this.createPage({ renderPath, components, dynamicData, manifestData, indexData }));

      Promise.all(promises).then(resolve);
    });
  }

  createPage({ renderPath, components, dynamicData, manifestData, indexData }) {
    return new Promise((resolve) => {
      const afterRouteRender = ({ routePath }) => {
        if (this.afterRouteRender) {
          console.log(chalk.gray('↦'), ` afterRouteRender (${chalk.blue(renderPath)})`);
          this.afterRouteRender({
            renderPath,
            components,
            dynamicData,
            manifestData,
            indexData,
            routePath
          }).then(resolve);
        } else {
          resolve();
        }
      };

      // Only render routes that have no parameters
      if (!this.hasPathParameters(renderPath)) {
        if (this.beforeRouteRender) {
          console.log(chalk.gray('⇥'), ` beforeRouteRender (${chalk.blue(renderPath)})`);
          this.beforeRouteRender({ renderPath, components, manifestData, indexData }).then(() =>
            this.renderRoute({ renderPath, components, dynamicData, manifestData, indexData })
              .then(afterRouteRender)
          );
        } else {
          this.renderRoute({ renderPath, components, dynamicData, manifestData, indexData })
            .then(afterRouteRender);
        }
      } else {
        resolve();
      }
    })
  }

  renderRoute({ renderPath, components, dynamicData, manifestData, indexData }) {
    return new Promise((resolve) => {
      const routePath = path.resolve(this.buildFolder, renderPath.substring(1));
      const names = (() => {
        let componentNames = '';
        each(components, (component, index) => {
          componentNames += chalk.magenta(this.getComponentName(component)) + ', ';
        });
        return componentNames.slice(0, -2);
      })();

      mkdirp(routePath, (mkdirError) => {
        if (mkdirError) {
          console.error(mkdirError);
        } else {
          const renderAndResolve = ({ reactHtml, additionalData }) => {
            if (reactHtml) {
              const htmlWithAssets = this.convertAssetPaths(manifestData, reactHtml);
              const componentPaths = this.extractComponentPaths({ manifestData, components });
              const completeHtml = this.injectMarkupIntoTemplate({
                indexData,
                htmlWithAssets,
                componentPaths,
                additionalData,
              });
              this.writeFile({ routePath, completeHtml }).then(() => resolve({ routePath }))
            } else {
              console.log(
                `Route "${renderPath}" doesn't exist, rendering resulted in \`null\`.`,
                'No HTML was rendered.'
              );
              resolve({ routePath });
            }
          };

          if (this.onRouteRender) {
            console.log(
              chalk.blue('⤳'), ` onRouteRender ${chalk.magenta(renderPath)} with: ${names}`);
            // asynchronous, expects a promise
            this.onRouteRender(renderPath, dynamicData).then(renderAndResolve);
          } else {
            console.log(
              chalk.blue('>'), `Rendering route ${chalk.magenta(renderPath)} with: ${names}`);
            // synchronous
            const { reactHtml, additionalData } = this.dynamicRender(renderPath, dynamicData);
            renderAndResolve({ reactHtml, additionalData });
          }
        }
      });
    });
  }

  writeFile({ routePath, completeHtml }) {
    return new Promise((resolve) => {
      fs.writeFile(path.resolve(routePath, 'index.html'), completeHtml, (writeError) => {
        if (writeError) {
          throw writeError;
        }
        resolve();
      });
    });
  }

  convertAssetPaths(manifestData, html) {
    let result = html;
    const data = JSON.parse(manifestData);
    const assets = data.assets;
    const isWin = process && process.platform === 'win32';

    each(assets, (value, key) => {
      // TODO: use rootAssetPath?
      const path = `src/client/${key}`;
      const normalizedPath = isWin ? path.replace(/\//g, '\\') : path;
      // TODO: check for publicPath?
      result = result.replace(normalizedPath, `/${value}`);
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

  injectMarkupIntoTemplate({ indexData, htmlWithAssets, componentPaths, additionalData }) {
    const dynamicComponents = componentPaths.map(dynamicComponentPath => (
      `<script src="${this.publicPath}${dynamicComponentPath}"></script>`
    )).join('\n\t\t');

    let formattedData = indexData.replace(
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
