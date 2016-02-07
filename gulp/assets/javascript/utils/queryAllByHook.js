export default (el, hookName)=> {
  return el.querySelectorAll('[data-jshook~="' + hookName + '"]');
};
