// Add your template to this array for it to be tested
const templates = ['standard', 'minimal', 'with-sass', 'serverless'];
const defaultTemplate = 'standard';

export default () => {
  describe('templates: ', () => {
    templates.forEach(name => {
      // Run combined tests making sure certain things work with every template
      import('./all')
        .then(module => {
          const template = module.default;
          const isDefault = name === defaultTemplate;
          describe(`the ${name}-template${isDefault ? ' (default template)' : ''}:`, () => {
            template({ name, isDefault });
          });
        })
        .catch(e => {
          console.log("combined template-tests couldn't load:\n", e);
        });

      // Run template-specific tests
      // import(`./${name}`)
      //   .then(module => {
      //     const template = module.default;
      //     describe(`the ${name}-template:`, () => {
      //       template({ name, isDefault: name === defaultTemplate });
      //     });
      //   })
      //   .catch(e => {
      //     console.log(`template-tests for '${name}' couldn't load:\n`, e);
      //   });
    });
  });
};
