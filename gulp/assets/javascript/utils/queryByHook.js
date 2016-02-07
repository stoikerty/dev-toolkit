export default (el, hookName)=> {
  return el.querySelector('[data-jshook~="' + hookName + '"]');
};
