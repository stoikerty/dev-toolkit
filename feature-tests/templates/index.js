export default () => {
  describe('templates: ', () => {
    import('./standard')
      .then(module => {
        const standard = module.default;
        describe('standard', () => {
          standard();
        });
      })
      .catch(e => {
        console.log(e);
      });
  });
};
