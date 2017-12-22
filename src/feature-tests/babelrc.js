module.exports = {
  presets: [require.resolve('babel-preset-env')],
  plugins: [
    // Support dynamic `import()`-statement
    require.resolve('babel-plugin-dynamic-import-node'),
    // Allow root-relative imports
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        // using `process.cwd` makes it also work with `import()`
        root: [process.cwd()],
      },
    ],
  ],
};
