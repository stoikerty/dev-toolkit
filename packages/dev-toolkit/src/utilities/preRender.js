import help from './help';
import log from './log';

export default ({ server, webpackAssets, buildFolder }) =>
  new Promise(resolve => {
    log({ message: 'Rendering html using Server App… ', useSeparator: true });
    help({
      displayedWhen: server && typeof server.preRender !== 'function',
      warning: 'Your server needs a `preRender`-method to create a build.',
      instruction:
        'Example: `preRender({ assets, buildFolder }) { return new Promise(() => { ... }); }`',
      link: '/dev-toolkit#custom-server',
    });
    const renderPromise = server.preRender({ assets: webpackAssets, buildFolder });
    help({
      displayedWhen: typeof renderPromise.then !== 'function',
      warning: "The server `preRender`-method must return a Promise to say it's finished.",
      instruction:
        'Example: `preRender({ assets, buildFolder }) { return new Promise(() => { ... }); }`',
      link: '/dev-toolkit#custom-server',
    });
    renderPromise.then(resolve).catch(buildError => log({ error: buildError }));
  });
