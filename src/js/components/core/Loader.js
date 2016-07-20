const React = require('react');
const CoreStore = require('../../stores/CoreStore.js');
const ProgressBar = require('react-bootstrap/lib/ProgressBar.js');
var progressStack = [];
var currentProgress = 0;

const Loader = React.createClass({
  getInitialState: function() {
    return {
      progress:0
    };
  },
  componentWillMount: function() {
    CoreStore.addChangeListener(this.sendProgressForKey);
  },
  sendProgressForKey: function(){
    var progressArray = CoreStore.getProgress();
    if (progressArray) {
      var progressKey = progressArray[0];
      var specificProgressForKey = progressArray[1];
      var elementIndex = progressStack[progressKey];
      if ( elementIndex == undefined){
        progressStack[progressKey] = specificProgressForKey;
      } else {
        var overallProgress = Object.keys(progressStack).length * 100;
        for (var progressElement in progressStack) {
          currentProgress += progressStack[progressElement];
        }
        this.setState({
          progress: currentProgress
        });
      }
    } else {
      currentProgress = 0;
      progressStack = [];
      this.setState({
        progress: 0
      });
    }
  },
  render: function() {
    return (
      <ProgressBar now={this.state.progress} style={{verticaAlign: 'middle'}} />
    );
  }
});

module.exports = Loader;
