import fs from 'fs';
import path from 'path';
import each from 'lodash.foreach';
import mkdirp from 'mkdirp';
import chalk from 'chalk';

// TODO:
//  - cover case of `renderedRoutes` without dynamic component(s)
//  - cover case of multiple dynamic components (add all script urls to html)
//  -

// Compile all files necessary for serving
export default (staticRender, routes, PATHS, message) => {
  const filename = path.resolve(PATHS.build, 'index.html');
  const manifestFile = PATHS.manifest;

  const injectMarkupIntoTemplate = (data, reactHtml, dynamicComponentPath) => {
    const formattedData = data.replace(
      '<div data-jshook="app-body"></div>',
      `<div data-jshook="app-body">${reactHtml}</div>`
    ).replace(
      '<!-- [[dynamicComponent]] -->',
      `<script src="${PATHS.publicPath}${dynamicComponentPath}"></script>`,
    );
    return formattedData;
  };

  const extractDynamicComponentPath = (manifestData, dynamicComponent) => {
    let componentPath = '';
    const data = JSON.parse(manifestData);
    const assets = data.assets;

    each(assets, (value, key) => {
      if (key.startsWith(`${dynamicComponent}.route`)) {
        componentPath = value;
      }
    });

    return componentPath;
  };

  const convertAssetPaths = (manifestData, html) => {
    let result = html;
    const data = JSON.parse(manifestData);
    const assets = data.assets;

    each(assets, (value, key) => {
      // TODO: use rootAssetPath
      result = result.replace(`src/client/${key}`, value);
    });

    return result;
  };

  fs.readFile(manifestFile, 'utf8', (manifestError, manifestData) => {
    if (manifestError) throw manifestError;

    fs.readFile(filename, 'utf8', (readError, data) => {
      if (readError) throw readError;

      routes.forEach((location) => {
        const { route, dynamicComponent } = location;

        const routePath = path.resolve(PATHS.build, route.substring(1));
        mkdirp(routePath, (mkdirError) => {
          // TODO: Handle multiple components in scripts and log
          console.log(chalk.blue('\n>'), `route ${chalk.magenta(route)} with dynamic Components ${chalk.magenta(dynamicComponent)}`);

          if (mkdirError) {
            console.error(mkdirError);
          } else {
            const reactHtml = staticRender(route);

            if (reactHtml) {
              const htmlWithAssets = convertAssetPaths(manifestData, reactHtml);

              const dynamicPath = extractDynamicComponentPath(manifestData, dynamicComponent);
              const completeHtml = injectMarkupIntoTemplate(data, htmlWithAssets, dynamicPath);

              fs.writeFile(path.resolve(routePath, 'index.html'), completeHtml, (writeError) => {
                if (writeError) {
                  throw writeError;
                }
              });
            } else {
              console.log(`Route "${route}" doesn't exist, rendering resulted in \`null\`.`);
            }
          }
        });
      });

      console.log(message);
    });
  });
};
