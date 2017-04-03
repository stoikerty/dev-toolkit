import each from 'lodash.foreach';
import GenerateFiles from './dynamicPages/generateFiles';

// TODO:
// # getComponents
//   - handle any amount of components, not just `header` & `content`
// # generateScripts
//   - what about unique scripts, modules that use the same filename & displayname
//   - what about images that are not lazily loaded?
//       Possible solution could be to use `images-require-hook` instead of filesHook
//       see: https://github.com/ptshih/images-require-hook
// # find a way to separate server-only packages inside `generateFiles` from being bundled on client

export default new class DynamicPages {
  constructor() {
    this.isClient = false;
    this.prefetchComponents = [];
    this.definedRoutes = [];
  }

  init({ isClient }) {
    // Is the utility running on the client or the server?
    this.isClient = isClient || this.isClient;
  }

  // Utility for retrieving displayName of component
  getComponentName(component) {
    return component.WrappedComponent ?
      component.WrappedComponent.displayName : component.displayName;
  }

  // Utility for checking if a given path has parameters
  hasPathParameters(renderPath) {
    return renderPath.indexOf('/:') !== -1;
  }

  // Build an array of components to be prefetched
  addToPrefetch({ components }) {
    this.prefetchComponents.push(...components);
  }

  // Fetch all components previously added to the `prefetchComponents`-array
  runPrefetch({ logActivity }) {
    if (this.isClient) {
      // eslint-disable-next-line no-console
      const log = console && console.info ? console.info : console.log;

      // Fetch all components into browser cache, using callback
      this.prefetchComponents.forEach((component) => {
        if (typeof component === 'object') {
          const multipleComponents = component;

          each(multipleComponents, (value, key) => {
            multipleComponents[key]((module) => {
              const name = this.getComponentName(module.default);
              if (logActivity) {
                log(`Cached dynamic component "${name}"`);
              }
            });
          });
        } else {
          component((module) => {
            const name = this.getComponentName(module.default);
            if (logActivity) {
              // eslint-disable-next-line no-console
              log(`Cached dynamic component "${name}"`);
            }
          });
        }
      });
    } else {
      // Components are already loaded, no prefetching is needed
    }
  }

  // Save the route and returns needed props to react-router
  defineRoute({ renderPath, components, dynamicData }) {
    this.definedRoutes.push({ renderPath, components, dynamicData });

    // Make it work with react-router by returning necessary props
    // see: https://github.com/ReactTraining/react-router/blob/master/docs/guides/DynamicRouting.md
    return this.isClient
      // React-Router's `getComponents` fetches the components asynchronously when on the client.
      ? { getComponents: this.getComponents(components) }
      // On the Server, React-Router only forwards components to the parent view when `components`
      // is set, otherwise it is unable to forward individual component variables.
      : { components };
  }

  //
  getComponents(components) {
    return (location, cb) => {
      if (typeof components === 'object') {
        if (this.isClient) {
          // see: https://github.com/reactjs/react-router/blob/master/docs/API.md#getcomponentnextstate-callback
          const fetchedComponents = {};

          each(components, (value, key) => {
            components[key]((component) => {
              fetchedComponents[key] = component.default;
              const fetchedLastComponent =
                Object.keys(fetchedComponents).length === Object.keys(components).length;

              // use callback only if all components have been fetched
              if (fetchedLastComponent) {
                cb(null, fetchedComponents);
              }
            });
          });

          // TODO: This `if` is a hack, needs to handle any amount of components, not hardcoded ones
          if (components && components.header) {
            components.header(header => {
              components.content(content => {
                cb(null, { header: header.default, content: content.default });
              });
            });
          } else {
            const singleComponent = components;
            singleComponent.content(content => {
              cb(null, { content: content.default });
            });
          }
        } else {
          // component modules can be used directly
          each(components, (value, key) => {
            cb(null, components[key]);
          });
        }
      } else {
        if (this.isClient) {
          // component module is fetched first, via callback
          components((module) => {
            cb(null, module.default);
          });
        } else {
          const singleComponent = components;
          // component module can be used directly
          cb(null, singleComponent);
        }
      }
    };
  }

  // Create scripts for each component to insert into html
  // NOTE: Server-usage only
  generateScripts({ renderPath }) {
    let scripts = '';

    if (!this.isClient) {
      const currentRoute = this.definedRoutes.find(route => {
        let isCurrentRoute = false;

        // Does the current route have any parameters? Parameters start with `/:`
        if (this.hasPathParameters(route.renderPath)) {
          // Let's strip the parameter part out of the route
          const routePath =
            route.renderPath.substring(0, route.renderPath.indexOf('/:')).toLowerCase();
          // check whether the given `renderPath` begins with the defined `routePath`
          if (renderPath.toLowerCase().lastIndexOf(routePath, 0) === 0) {
            isCurrentRoute = true;
          }
        } else if (route.renderPath.toLowerCase() === renderPath.toLowerCase()) {
          isCurrentRoute = true;
        }

        return isCurrentRoute;
      });

      if (currentRoute) {
        each(currentRoute.components, (component) => {
          // Support ES2015-style modules
          const currentComponent = component.default ? component.default : component;
          // support wrapped components / HOC (Higher Order Components)
          const name = this.getComponentName(currentComponent);
          scripts = `${scripts}<script src="/${name}.js"></script>\n`;
        });
      }
    }

    return scripts;
  }

  // The Dynamic Page Generator
  // NOTE: Server-usage only
  importDynamicRenderFile({ dynamicRenderFile }) {
    GenerateFiles.setupDynamicRenderFile({ dynamicRenderFile });
  }
  generatePages({ publicPath, buildFolder, manifestFile, doneCallback }) {
    if (!this.isClient) {
      GenerateFiles.run({
        publicPath,
        buildFolder,
        manifestFile,
        definedRoutes: this.definedRoutes,
        getComponentName: this.getComponentName,
        hasPathParameters: this.hasPathParameters,
        doneCallback,
      });
    }
  }
};
