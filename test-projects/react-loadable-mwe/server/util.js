import _ from 'lodash/fp'
import manifest from '../public/.manifest.json'

const getJSTags = _.flow(
  _.filter(a => (/\.js$/).test(a)),
  _.map(a => `<script defer crossorigin="anonymous" src="${ a }"></script>`),
  _.reverse,
  _.join('')
)

const assets = _.flow(
  _.map(entry => entry.assets),
  _.flattenDeep,
  _.map(a => `${ manifest.publicPath }${ a }`)
)(manifest.entrypoints)

export const JS_TAGS = getJSTags(assets)

export const LOADABLE_BUNDLES = manifest.chunks.reduce((bundles, chunk) => {
  bundles[chunk.id] = chunk.files.map(f => `${ manifest.publicPath }${ f }`)
  return bundles
}, {})

export const LOADABLE_MODULES = manifest.modules.reduce((modules, module) => {
  modules[module.id] = module.chunks
  return modules
}, {})

export const getLoadableScripts = _.flow(
  _.map(id => LOADABLE_MODULES[id]),
  _.flattenDeep,
  _.map(bundle => LOADABLE_BUNDLES[bundle]),
  _.flattenDeep,
  _.filter(scripts => !(/\.map$/.test(scripts))),
  _.map(asset => `<script defer crossorigin="anonymous" src="${ asset }"></script>`),
  _.join('')
)
