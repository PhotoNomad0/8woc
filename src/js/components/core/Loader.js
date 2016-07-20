
const api = window.ModuleApi;
var React = api.React;
var RB = api.ReactBootstrap;
var {ProgressBar} = RB;

const Loader = React.createClass({
  componentWillMount: function() {
    
  },
  render: function() {
    return (
      <ProgressBar
        now={this.props.progress}
        style={{verticaAlign: 'middle'}}
      />
    );
  }
}

module.exports = Loader;
