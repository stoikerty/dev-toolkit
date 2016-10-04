# How to contribute
Thanks for wanting to help improve the toolkit! 😃
<br>Below are some instructions to get you started.

### Installation
First, let's install and link the `dev-toolkit`. The repo contains multiple packages, so for now we will have to run a few extra commands.
- git clone [**`dev-toolkit`**](https://github.com/stoikerty/dev-toolkit) repo into a folder (example: `repos/local_modules/dev-toolkit`)
- run `npm run install-all` to install all the dependencies for all packages. This will take a bit of time ☕️
- now link all packages using `npm run link-all`
- You now have the `dev-toolkit`-command available to you. You might also have to link a package to your project by running `npm link dev-toolkit` or `npm link dynamic-pages` inside the project folder.

Preparation done. 👌
Note that you can unlink the packages later using `npm run unlink-all` in the root `dev-toolkit` folder.

### Development
This is very much an iteration phase, you'll encounter mystical errors that you'll have to fix, caching problems and whatnot. Feel free to ask a question in [the dev-toolkit chat](https://gitter.im/stoikerty/dev-toolkit) if you're stuck. Good luck! 😎
- inside the `dev-toolkit` folder, run `npm run watch-toolkit` to convert all ES2015+ files into ES5
- Now you're ready to use the toolkit via the command `dev-toolkit`.
- Follow the instructions in the [Readme](/Readme.md) to create a new project
- make changes to toolkit & document what you did
- make a PR with suggestions?
