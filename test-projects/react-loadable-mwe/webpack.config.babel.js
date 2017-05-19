import nodeExternals from 'webpack-node-externals'
import { resolve } from 'path'
import { StatsWriterPlugin } from 'webpack-stats-plugin'
import webpack from 'webpack'

const client = {
  name: 'client',
  context: resolve('src'),
  entry: './client',
  output: {
    chunkFilename: 'assets/js/[name].[chunkhash].js',
    filename: 'assets/js/[name].[hash].js',
    path: resolve('public'),
    pathinfo: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: true,
            presets: [
              ['env', {
                targets: {
                  browsers: ['last 4 versions']
                },
                modules: false,
                loose: true,
                useBuiltIns: true
              }],
              'react'
            ],
            plugins: [
              ['react-loadable/babel', {
                server: false,
                webpack: true
              }],
              'syntax-dynamic-import',
              'transform-export-extensions'
            ]
          }
        }]
      },
      {
        test: /\.(jpe?g|png|svg|webp)$/,
        use: [
          { loader: 'file-loader', options: { name: 'assets/img/[hash].[ext]' } }
        ]
      }
    ]
  },
  resolve: {
    enforceExtension: false,
    extensions: [
      '.js',
      '.jsx'
    ],
    modules: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new StatsWriterPlugin({
      fields: [
        'chunks',
        'entrypoints',
        'modules',
        'publicPath'
      ],
      filename: '.manifest.json'
    })
  ],
  devtool: 'source-map'
}

const server = {
  name: 'server',
  context: resolve('src'),
  entry: './server',
  output: {
    filename: 'app.js',
    libraryTarget: 'commonjs-module',
    path: resolve('server'),
    pathinfo: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: true,
            presets: [
              ['env', {
                targets: {
                  node: 'current'
                },
                modules: 'commonjs',
                loose: true,
                useBuiltIns: true
              }],
              'react'
            ],
            plugins: [
              'dynamic-import-node',
              ['react-loadable/babel', {
                server: false,
                webpack: true
              }],
              'syntax-dynamic-import',
              'transform-export-extensions'
            ]
          }
        }]
      },
      {
        test: /\.(jpe?g|png|svg|webp)$/,
        use: [
          { loader: 'file-loader', options: { emitFile: false, name: 'assets/img/[hash].[ext]' } }
        ]
      }
    ]
  },
  resolve: {
    enforceExtension: false,
    extensions: [
      '.js',
      '.jsx'
    ],
    modules: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ],
  target: 'node',
  externals: nodeExternals({
    whitelist: [
      /\.(?!(?:jsx?|json)$).{1,5}$/i,
      /react-loadable/i
    ]
  }),
  devtool: false
}

export default [client, server]
