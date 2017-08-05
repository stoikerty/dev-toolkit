require('babel-runner')({
  // object, filename to js or json file
  babelrc: '../../babelrc',
  // -> Node now understands everything defined in babelrc,
  //    even the nodeHooks-file can now rely on config from babelrc.

  // filename to js file
  // nodeHooks: './nodeHooks',
  // -> Node now understands everything defined in nodehooks.
  //    If you defined a cssHook, Node will now understand css-files.
});
