# How to contribute
Thanks for wanting to help improve the toolkit! 😃
<br>Below are some instructions to get you started.

### Installation
First, let's install and link the `dev-toolkit`. The repo contains multiple packages, so for now we will have to run a few extra commands.
- git clone [**`dev-toolkit`**](https://github.com/stoikerty/dev-toolkit) repo into a folder (example: `repos/local_modules/dev-toolkit`)
- run `npm install` inside the folder to install all the dependencies for all packages
- run `npm run install-toolkit` to install all the dependencies for dev-toolkit
- now link the toolkit using `npm run link-toolkit`
- repeat the last 2 steps if you wish to work on `dynamic-pages` as well

Preparation done. 👌

### Development
This is very much an iteration phase, you'll encounter mystical errors that you'll have to fix, caching problems and whatnot. Feel free to ask a question in [the dev-toolkit chat](https://gitter.im/stoikerty/dev-toolkit) if you're stuck. Good luck! 😎
- inside the `dev-toolkit` folder, run `npm run watch-toolkit` to convert all ES2015+ files into ES5
- Now you're ready to use the toolkit via the command `dev-toolkit`.
- Follow the instructions in the [Readme](/Readme.md) to create a new project
- make changes to toolkit & document what you did
- make a PR with suggestions?
