/**
 * No DOM here, just isomorphic exports.
 *
 * We re-export `flushWebpackRequireWeakIds` from React Loadable to guarantee
 * that we're using the same singletons when we render the app as when we dump
 * its module IDs---it **will not** work otherwise.
 */

export { App } from 'app/views'
export { flushWebpackRequireWeakIds } from 'react-loadable'
