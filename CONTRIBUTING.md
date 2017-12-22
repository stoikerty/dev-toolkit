## Contributing

Check out the project locally & create a PR.

### Installation & Usage

```bash
# Clone down the repo locally
$ git clone git@github.com:stoikerty/dev-toolkit.git

# Use the correct node version for this project
$ cd dev-toolkit
$ nvm use

# Install root lerna dependencies
$ npm install

# Bootstrap all packages
$ npm run bootstrap
# If you encounter linux/osx permission issues, try this
$ npm run bootstrap-fix

# Run feature tests
$ cd feature-tests
$ npm install
$ npm run test
```

### Making changes
Your workflow will likely be to `cd` into a template of your choice in the `templates` directory where you can test `dev-toolkit` and in parallel (in a separate terminal) re-run the `bootstrap`-command in the root of the project after making changes in one of the `packages`.
