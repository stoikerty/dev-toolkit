module.exports = function(errorObject) {
  console.log(errorObject.toString());
  // Keep gulp from hanging on this task
  this.emit('end');
};
