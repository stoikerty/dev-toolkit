# eslint-config-dev-toolkit

eslint preset for [dev-toolkit](https://github.com/stoikerty/dev-toolkit)

You will need to install the following peer-dependencies for this config to work.
```js
{
  "babel-eslint": ">= 8",
  "eslint": ">= 4",
  "eslint-import-resolver-babel-module": ">= 2",
  "eslint-plugin-import": ">= 2.7",
  "eslint-plugin-jsx-control-statements": ">= 2.2",
  "eslint-plugin-react": ">= 7"
}
```

`.eslintrc`-usage:
```js
{
  "extends": ["dev-toolkit"]
}
```

`.eslintrc`-usage with prettier & airbnb:
```js
{
  "extends": ["airbnb", "dev-toolkit", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```
