var React = require('react');
var ReactDOM = require('react-dom');
var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;


var Chapters = React.createClass({
  getInitialState: function () {
          return {
            chapters:'Ephesians'
          };
        },
  render: function() {
    return (
      <Panel>{this.props.chapters}</Panel>
    );
  }
});

var Root = React.createClass({
  getInitialState: function () {
          return {}
          };
        },
  render: function() {
    return (
      <NavMenu />
    );
  }
});

var Verses = React.createClass({
  getInitialState: function () {
          return {
            verses:['1', '2']
          };
        },
  render: function() {
    return (
      <Panel>{this.props.verses}</Panel>
    );
  }
});

var NavMenu = React.createClass({
  getInitialState: function () {
          return {
          };
        },
  render: function() {
    return (
      <PanelGroup>
        <Chapters value={this.props.chapters}/>
        <Verses value={this.props.verses}/>
      </PanelGroup>
    );
  }
});

module.exports = Root;
