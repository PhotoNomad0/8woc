const CoreStore = require('../.././stores/CoreStore');
const CoreActions = require('../.././actions/CoreActions');
var progressStack;

var ProgressBar = {
  addListner: function() {
    //CoreStore.addChangeListener(this.getProgress.bind(this));
  },
  getProgress(progressObj) {
    console.log(progressObj);
    var x = CoreStore.getFullProgress();
    console.log(x);
  }
};
module.exports = ProgressBar;
