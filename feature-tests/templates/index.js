export default ({ testDir, pkg }) => {
  describe('templates: ', () => {
    try {
      import('./standard').then(module => {
        const standard = module.default;
        describe('standard', () => {
          standard({ testDir, pkg });
        });
      });
    } catch (e) {
      console.log(e);
    }
  });
};
