export default (requestedFile)=> {
  let assetPath = window.assetPath || '`window.assetPath` is not defined';

  return assetPath + requestedFile;
};
