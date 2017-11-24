const devToolkit = require('./dist/npmExport/dev-toolkit');

// Allow importing with `require` and as default with `import`
module.exports = devToolkit.default;
module.exports.default = devToolkit.default;
