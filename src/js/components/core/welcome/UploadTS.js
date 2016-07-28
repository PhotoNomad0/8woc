const React = require('react');
const fs = require(window.__base + 'node_modules/fs-extra');
const FormGroup = require('react-bootstrap/lib/FormGroup.js');
const FormControl = require('react-bootstrap/lib/FormControl.js');
const Button = require('react-bootstrap/lib/Button.js');
const Modal = require('react-bootstrap/lib/Modal.js');
const FileModule = require('../FileModule');
const ControlLabel = require('react-bootstrap/lib/ControlLabel.js');
const ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar.js');
const Checkbox = require('react-bootstrap/lib/Checkbox.js');
const ENTER = 13;
const remote = window.electron.remote;
const {dialog} = remote;

const UploadTS = React.createClass({
  getInitialState() {
    return {
    };
  },

  componentWillMount() {
  },

  render() {
    var boxStyle = {
      backgroundColor: '#ffffff',
      minHeight: '15vh',
      margin: 'auto',
      padding: '5px 0',
      width: '95%',
      position: 'relative',
      borderRadius: '15px',
      textAlign: 'center'
    }
    return (
      <div style={boxStyle}>
      <p>Hi</p>
      </div>
    );
  }
});
module.exports = UploadTS;
