# How to contribute
Thanks for wanting to help improve the toolkit! 😃
Below are some instructions to get you started.

### Installation
First, let's install and link the `dev-toolkit`.
- git clone [**`dev-toolkit`**](https://github.com/stoikerty/dev-toolkit) repo into a folder (example: `repos/local_modules/dev-toolkit`)
- run `npm install` inside the folder to install all the dependencies
- now link the toolkit using just `npm link`

Second, we need to link the toolkit to `dev-toolkit-starter`.
- git clone [**`dev-toolkit-starter`**](https://github.com/stoikerty/dev-toolkit-starter) into a different folder (example: `repos/dev-toolkit-starter`)
- if it has the `dev-toolkit`-dependency, remove it for npm link to work
- run `npm install` inside the folder to install all the dependencies
- now link the toolkit using `npm link dev-toolkit`

Preparation done. 👌

### Development
This is very much an iteration phase, you'll encounter mystical errors that you'll have to fix, caching problems and whatnot. Feel free to ask a question in [the dev-toolkit chat](https://gitter.im/stoikerty/dev-toolkit) if you're stuck. Good luck! 😎
- inside the `dev-toolkit` folder, run `npm run watch` to convert all ES2015+ files into ES5
- then, run `npm run dev` inside `dev-toolkit-starter` to simulate running the toolkit on an example project
- make any desired changes to `dev-toolkit` and confirm everything is working correctly by re-running `npm run dev`
- document what you did
- make a PR with suggestions?
