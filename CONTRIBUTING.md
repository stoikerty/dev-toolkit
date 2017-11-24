# Installation
```bash
# use the correct node version for this project
nvm use

# clone repo, inside the repo folder run
npm i && npm run boostrap

# if you encounter permission issues, try this in the repo foler
npm run fix-permissions
```

# Making changes
When you make a change inside `packages` you need to run `npm run boostrap` to install, build & link the packages together. This will also link the packages with all the templates. If you only make changes in the `templates`-folder, it's unlikely you'll have to re-run bootstrap.
